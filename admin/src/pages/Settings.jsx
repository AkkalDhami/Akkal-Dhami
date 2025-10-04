import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AboutContent from "../components/settings/AboutContent";

const Settings = () => {
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "My Portfolio",
    siteDescription: "Personal portfolio website",
    email: "admin@example.com",
    phone: "+1234567890",
    location: "New York, USA",
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    enableDarkMode: true,
    animations: true,
    compactMode: false,
  });

  // Handle General Settings Changes
  const handleGeneralChange = (field, value) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Appearance Changes
  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your portfolio admin settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic information and site configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      handleGeneralChange("siteName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) =>
                      handleGeneralChange("email", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) =>
                    handleGeneralChange("siteDescription", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={generalSettings.phone}
                    onChange={(e) =>
                      handleGeneralChange("phone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={generalSettings.location}
                    onChange={(e) =>
                      handleGeneralChange("location", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("general")}>
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <AboutContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
