import React, { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { aboutSchema } from "../../schemas/aboutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAddBasicInfoMutation,
  useGetAboutQuery,
} from "../../features/about/aboutApi";

const AboutContent = () => {
  const { data, isLoading } = useGetAboutQuery();
  const [addBasicInfo, { isLoading: isAdding }] = useAddBasicInfoMutation();

  const initialData = data?.data;

  const form = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      location: "",
      shortIntro: "",
      roles: [],
    },
  });

  // ✅ Reset form when API data loads
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        email: initialData.email || "",
        contact: initialData.contact || "",
        location: initialData.location || "",
        shortIntro: initialData.shortIntro || "",
        roles: initialData.roles || [],
      });
    }
  }, [initialData, form]);

  const [newRole, setNewRole] = useState("");

  const addRole = () => {
    const trimmed = newRole.trim();
    if (trimmed && !form.getValues("roles").includes(trimmed)) {
      form.setValue("roles", [...form.getValues("roles"), trimmed]);
    }
    setNewRole("");
  };

  const removeRole = (role) => {
    form.setValue(
      "roles",
      form.getValues("roles").filter((r) => r !== role)
    );
  };

  const handleSubmit = async (values) => {
    try {
      const res = await addBasicInfo(values).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Failed to add basic info"
      );
    }
  };

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-medium">About Content</CardTitle>
        <CardDescription>Manage your basic information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Add your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Short Intro */}
            <FormField
              control={form.control}
              name="shortIntro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Intro</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add your short intro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact + Location */}
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact *</FormLabel>
                    <FormControl>
                      <Input placeholder="Add your contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Add your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Roles */}
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add a role and press Enter"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addRole();
                        }
                      }}
                    />
                  </FormControl>
                  <div className="mt-2 space-y-1.5">
                    {field.value.map((role, index) => (
                      <p
                        key={index}
                        className="flex items-center gap-2 text-sm">
                        {index + 1}. {role}
                        <button
                          type="button"
                          onClick={() => removeRole(role)}
                          className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </p>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="submit" disabled={isAdding}>
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AboutContent;
