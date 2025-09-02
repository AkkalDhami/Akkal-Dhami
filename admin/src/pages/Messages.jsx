import { useState, useEffect } from "react";
import {
  useGetMessagesQuery,
  useMarkMessageAsReadMutation,
} from "../features/messages/messageApi";
import { toast } from "sonner";

export default function Messages() {
  const [page, setPage] = useState(1);
  const { data, isError, error, isLoading, isFetching } = useGetMessagesQuery({
    page,
    limit: 2,
  });
  const [markMessageAsRead] = useMarkMessageAsReadMutation();

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Merge new pages
  useEffect(() => {
    if (data?.messages) {
      setMessages((prev) => [...prev, ...data.messages]);
    }
  }, [data]);

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
    if (!isFetching && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg._id !== id));
    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <div className="p-6">Loading messages...</div>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-zinc-400"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Message List */}
          <div className="w-full md:w-1/3 rounded-lg shadow overflow-hidden">
            <div className="border-b border-zinc-500/30 px-4 py-3 bg-zinc-500/10">
              <h2 className="text-lg font-medium ">
                All Messages ({messages.length})
              </h2>
            </div>
            <div className="divide-y divide-zinc-500/30 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedMessage?._id === message._id
                        ? "bg-orange-500/10"
                        : "hover:bg-zinc-500/10"
                    }`}
                    onClick={() => handleSelectMessage(message)}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-medium">
                            {message.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-zinc-900 truncate">
                              {message.name}
                            </p>
                            <p className="text-sm text-zinc-600 truncate">
                              {message.email}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                      {!message.read && (
                        <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-orange-500"></span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-zinc-700">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">No messages found</div>
              )}
              {page < data?.totalPages && (
                <button
                  className="w-full py-2 text-center text-orange-600 hover:underline"
                  onClick={loadMore}>
                  Load more
                </button>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="w-full md:w-2/3 rounded-lg shadow overflow-hidden">
            {selectedMessage ? (
              <div className="px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Message Details</h2>
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-500/10">
                    Delete
                  </button>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-xl">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">
                      {selectedMessage.name}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {selectedMessage.email}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-zinc-700">
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                </div>

                <div className="bg-zinc-500/10 border-l-4 border-orange-600 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-6 flex space-x-3">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm border-orange-600 hover:text-orange-600">
                    Reply
                  </a>
                  <button
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
                    }}
                    className="inline-flex items-center px-4 py-2 border border-zinc-500/10 text-sm font-medium rounded-md text-zinc-700 bg-white hover:bg-zinc-50">
                    {selectedMessage.read ? "Mark as Unread" : "Mark as Read"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center text-zinc-500">
                Select a message from the list to view details.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
