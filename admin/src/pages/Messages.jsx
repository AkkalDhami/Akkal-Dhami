import { useState, useEffect } from "react";
import {
  useDeleteMessageMutation,
  useGetMessagesQuery,
  useMarkMessageAsReadMutation,
} from "../features/messages/messageApi";
import { toast } from "react-hot-toast";
import {
  MessageSquareMore,
  Trash2,
  Reply,
  Archive,
  Mail,
  Search,
  Filter,
  MoreVertical,
  Clock,
  User,
  MailOpen,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Messages() {
  const [page, setPage] = useState(1);
  const { data, isError, error, isLoading, isFetching } = useGetMessagesQuery({
    page,
    limit: 10,
  });

  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
  const [markMessageAsRead] = useMarkMessageAsReadMutation();

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Merge new pages
  useEffect(() => {
    if (data?.messages) {
      if (page === 1) {
        setMessages(data.messages);
      } else {
        setMessages((prev) => [...prev, ...data.messages]);
      }
    }
  }, [data, page]);

  // Error toast
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load messages");
    }
  }, [isError, error]);

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter((message) => !message.read).length;

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      try {
        await markMessageAsRead({ id: message._id, read: true });
        setMessages((prev) =>
          prev.map((m) => (m._id === message._id ? { ...m, read: true } : m))
        );
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  const loadMore = () => {
    if (!isFetching && page < data.pages) {
      setPage((prev) => prev + 1);
    }
  };

  const openDeleteDialog = (message) => {
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };

  const deleteMessageHandler = async () => {
    if (!messageToDelete) return;

    try {
      const res = await deleteMessage(messageToDelete._id).unwrap();
      setMessages((prev) => prev.filter((m) => m._id !== messageToDelete._id));
      if (selectedMessage?._id === messageToDelete._id) {
        setSelectedMessage(null);
      }
      toast.success(res?.message || "Message deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete message");
    } finally {
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className=" px-6 py-4">
          <div className="flex items-center flex-wrap gap-3 justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Mail className="h-12 w-12 text-orange-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Messages</h1>
                <p className="text-sm text-muted-foreground">
                  {data?.total} messages • {unreadCount} unread
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  className="pl-10 w-80"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Message List Sidebar */}
          <Card className="lg:col-span-1 border-zinc-500/40 bg-transparent">
            <CardHeader className="pb-3 border-b border-gray-500/30">
              <CardTitle className="text-lg">Inbox</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-500/30 max-h-[calc(100vh-12rem)] overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        selectedMessage?._id === message._id
                          ? "bg-orange-50 text-white dark:bg-orange-500/10 border-b-zinc-500/30 border-r-2 border-orange-500"
                          : ""
                      }`}
                      onClick={() => handleSelectMessage(message)}>
                      <div className="flex items-start space-x-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                            !message.read
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 dark:bg-gray-600 text-muted-foreground"
                          }`}>
                          {message.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`font-medium text-sm truncate ${
                                !message.read
                                  ? "text-gray-900 dark:text-white font-semibold"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}>
                              {message.name}
                            </span>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatTime(message.createdAt)}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">
                            {message.email}
                          </p>

                          <p
                            className={`text-sm truncate ${
                              !message.read
                                ? "text-gray-900 dark:text-white font-medium"
                                : "text-gray-600 dark:text-gray-400"
                            }`}>
                            {message.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {formatDate(message.createdAt)}
                            </span>
                            {!message.read && (
                              <Badge
                                variant="secondary"
                                className="bg-orange-500 text-white text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <MailOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                )}

                {page < data?.pages && (
                  <div className="p-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={loadMore}
                      disabled={isFetching}>
                      {isFetching ? "Loading..." : "Load More Messages"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Message Detail Panel */}
          <Card className="lg:col-span-3  border-zinc-500/40 bg-transparent">
            <CardContent className="p-0">
              {selectedMessage ? (
                <div className="h-full flex flex-col">
                  {/* Message Header */}
                  <div className="border-b border-zinc-500/30 p-6">
                    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {selectedMessage.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">
                            {selectedMessage.name}
                          </h2>
                          <p className="text-muted-foreground">
                            {selectedMessage.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap  items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            await markMessageAsRead({
                              id: selectedMessage._id,
                              read: !selectedMessage.read,
                            });
                            setMessages((prev) =>
                              prev.map((m) =>
                                m._id === selectedMessage._id
                                  ? { ...m, read: !m.read }
                                  : m
                              )
                            );
                            setSelectedMessage({
                              ...selectedMessage,
                              read: !selectedMessage.read,
                            });
                          }}>
                          {selectedMessage.read ? (
                            <Mail className="h-4 w-4 mr-2" />
                          ) : (
                            <MailOpen className="h-4 w-4 mr-2" />
                          )}
                          {selectedMessage.read ? "Mark Unread" : "Mark Read"}
                        </Button>

                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: Message from your portfolio`}>
                          <Button variant="outline" size="sm">
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </a>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(selectedMessage)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {new Date(selectedMessage.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                      {!selectedMessage.read && (
                        <Badge variant="default" className="bg-orange-500">
                          Unread
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="prose border-l-4 pl-4 border-orange-500 dark:prose-invert max-w-none">
                      <p className="text-foreground dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-500/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Received via portfolio contact form</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: Message from your portfolio`}>
                          <Button>
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center p-8">
                  <MessageSquareMore className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No message selected
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Select a message from the list to view its contents. You can
                    read, reply to, or manage messages from your portfolio
                    visitors.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone and the message will be permanently removed from your
              records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteMessageHandler}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Message"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
