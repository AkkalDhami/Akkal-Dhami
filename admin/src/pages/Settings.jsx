
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   User,
//   Globe,
//   Shield,
//   Bell,
//   Download,
//   Upload,
//   Save,
//   Trash2,
// } from "lucide-react";
// import { useAppDispatch } from "@/lib/hooks/redux";
// import { openConfirmModal } from "@/lib/features/ui/uiSlice";

// export default function Settings() {
//   const [profileData, setProfileData] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     bio: "Full-stack developer passionate about creating amazing web experiences. I love working with modern technologies and solving complex problems.",
//     location: "San Francisco, CA",
//     website: "https://johndoe.dev",
//     linkedin: "https://linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//     twitter: "https://twitter.com/johndoe",
//   });

//   const [portfolioSettings, setPortfolioSettings] = useState({
//     theme: "light",
//     showContactForm: true,
//     showResume: true,
//     showProjects: true,
//     showSkills: true,
//     showExperience: true,
//     allowDownloads: true,
//     enableAnalytics: true,
//   });

//   const [securitySettings, setSecuritySettings] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     twoFactorEnabled: false,
//   });

//   const [notificationSettings, setNotificationSettings] = useState({
//     emailNotifications: true,
//     newMessages: true,
//     projectViews: false,
//     weeklyReports: true,
//   });

//   const dispatch = useAppDispatch();

//   const handleProfileSave = () => {
//     // Save profile data
//     console.log("Saving profile:", profileData);
//   };

//   const handlePortfolioSave = () => {
//     // Save portfolio settings
//     console.log("Saving portfolio settings:", portfolioSettings);
//   };

//   const handleSecuritySave = () => {
//     // Save security settings
//     console.log("Saving security settings:", securitySettings);
//   };

//   const handleNotificationSave = () => {
//     // Save notification settings
//     console.log("Saving notification settings:", notificationSettings);
//   };

//   const handleDeleteAccount = () => {
//     dispatch(
//       openConfirmModal({
//         title: "Delete Account",
//         message:
//           "Are you sure you want to permanently delete your account? This action cannot be undone and will remove all your data.",
//         type: "danger",
//         onConfirm: () => {
//           console.log("Deleting account...");
//           // In a real app, this would delete the account
//         },
//       })
//     );
//   };

//   return (
//     <main className="flex-1 overflow-y-auto p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
//             <p className="text-muted-foreground mt-1">
//               Manage your portfolio configuration and account preferences.
//             </p>
//           </div>
//         </div>

//         <Tabs defaultValue="profile" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="profile" className="gap-2">
//               <User className="h-4 w-4" />
//               Profile
//             </TabsTrigger>
//             <TabsTrigger value="portfolio" className="gap-2">
//               <Globe className="h-4 w-4" />
//               Portfolio
//             </TabsTrigger>
//             <TabsTrigger value="security" className="gap-2">
//               <Shield className="h-4 w-4" />
//               Security
//             </TabsTrigger>
//             <TabsTrigger value="notifications" className="gap-2">
//               <Bell className="h-4 w-4" />
//               Notifications
//             </TabsTrigger>
//             <TabsTrigger value="data" className="gap-2">
//               <Download className="h-4 w-4" />
//               Data
//             </TabsTrigger>
//           </TabsList>

//           {/* Profile Settings */}
//           <TabsContent value="profile" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Profile Information</CardTitle>
//                 <CardDescription>
//                   Update your personal information and social links.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex items-center gap-6">
//                   <Avatar className="h-20 w-20">
//                     <AvatarImage src="/placeholder.svg" />
//                     <AvatarFallback className="text-lg">JD</AvatarFallback>
//                   </Avatar>
//                   <div className="space-y-2">
//                     <Button variant="outline" className="gap-2 bg-transparent">
//                       <Upload className="h-4 w-4" />
//                       Change Photo
//                     </Button>
//                     <p className="text-sm text-muted-foreground">
//                       JPG, PNG or GIF. Max size 2MB.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       value={profileData.name}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           name: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={profileData.email}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           email: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio">Bio</Label>
//                   <Textarea
//                     id="bio"
//                     value={profileData.bio}
//                     onChange={(e) =>
//                       setProfileData({
//                         ...profileData,
//                         bio: e.target.value,
//                       })
//                     }
//                     rows={4}
//                   />
//                 </div>

//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="location">Location</Label>
//                     <Input
//                       id="location"
//                       value={profileData.location}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           location: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="website">Website</Label>
//                     <Input
//                       id="website"
//                       value={profileData.website}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           website: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h4 className="text-sm font-medium mb-4">Social Links</h4>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <div className="space-y-2">
//                       <Label htmlFor="linkedin">LinkedIn</Label>
//                       <Input
//                         id="linkedin"
//                         value={profileData.linkedin}
//                         onChange={(e) =>
//                           setProfileData({
//                             ...profileData,
//                             linkedin: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="github">GitHub</Label>
//                       <Input
//                         id="github"
//                         value={profileData.github}
//                         onChange={(e) =>
//                           setProfileData({
//                             ...profileData,
//                             github: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="twitter">Twitter</Label>
//                       <Input
//                         id="twitter"
//                         value={profileData.twitter}
//                         onChange={(e) =>
//                           setProfileData({
//                             ...profileData,
//                             twitter: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <Button onClick={handleProfileSave} className="gap-2">
//                     <Save className="h-4 w-4" />
//                     Save Changes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Portfolio Settings */}
//           <TabsContent value="portfolio" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Portfolio Configuration</CardTitle>
//                 <CardDescription>
//                   Customize how your portfolio appears to visitors.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="theme">Theme</Label>
//                   <Select
//                     value={portfolioSettings.theme}
//                     onValueChange={(value) =>
//                       setPortfolioSettings({
//                         ...portfolioSettings,
//                         theme: value,
//                       })
//                     }>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="light">Light</SelectItem>
//                       <SelectItem value="dark">Dark</SelectItem>
//                       <SelectItem value="auto">Auto (System)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h4 className="text-sm font-medium mb-4">
//                     Sections Visibility
//                   </h4>
//                   <div className="space-y-4">
//                     {[
//                       {
//                         key: "showProjects",
//                         label: "Projects Section",
//                         description: "Display your portfolio projects",
//                       },
//                       {
//                         key: "showSkills",
//                         label: "Skills Section",
//                         description: "Show your technical skills",
//                       },
//                       {
//                         key: "showExperience",
//                         label: "Experience Section",
//                         description: "Display work experience",
//                       },
//                       {
//                         key: "showContactForm",
//                         label: "Contact Form",
//                         description: "Allow visitors to contact you",
//                       },
//                       {
//                         key: "showResume",
//                         label: "Resume Download",
//                         description: "Provide resume download link",
//                       },
//                     ].map((setting) => (
//                       <div
//                         key={setting.key}
//                         className="flex items-center justify-between">
//                         <div>
//                           <div className="text-sm font-medium">
//                             {setting.label}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             {setting.description}
//                           </div>
//                         </div>
//                         <Switch
//                           checked={portfolioSettings[setting.key]}
//                           onCheckedChange={(checked) =>
//                             setPortfolioSettings({
//                               ...portfolioSettings,
//                               [setting.key]: checked,
//                             })
//                           }
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h4 className="text-sm font-medium mb-4">Features</h4>
//                   <div className="space-y-4">
//                     {[
//                       {
//                         key: "allowDownloads",
//                         label: "Allow Downloads",
//                         description:
//                           "Let visitors download your resume and project files",
//                       },
//                       {
//                         key: "enableAnalytics",
//                         label: "Analytics Tracking",
//                         description:
//                           "Track visitor behavior and portfolio performance",
//                       },
//                     ].map((setting) => (
//                       <div
//                         key={setting.key}
//                         className="flex items-center justify-between">
//                         <div>
//                           <div className="text-sm font-medium">
//                             {setting.label}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             {setting.description}
//                           </div>
//                         </div>
//                         <Switch
//                           checked={portfolioSettings[setting.key]}
//                           onCheckedChange={(checked) =>
//                             setPortfolioSettings({
//                               ...portfolioSettings,
//                               [setting.key]: checked,
//                             })
//                           }
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <Button onClick={handlePortfolioSave} className="gap-2">
//                     <Save className="h-4 w-4" />
//                     Save Changes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Security Settings */}
//           <TabsContent value="security" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Security Settings</CardTitle>
//                 <CardDescription>
//                   Manage your account security and password.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div>
//                   <h4 className="text-sm font-medium mb-4">Change Password</h4>
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="currentPassword">Current Password</Label>
//                       <Input
//                         id="currentPassword"
//                         type="password"
//                         value={securitySettings.currentPassword}
//                         onChange={(e) =>
//                           setSecuritySettings({
//                             ...securitySettings,
//                             currentPassword: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="newPassword">New Password</Label>
//                       <Input
//                         id="newPassword"
//                         type="password"
//                         value={securitySettings.newPassword}
//                         onChange={(e) =>
//                           setSecuritySettings({
//                             ...securitySettings,
//                             newPassword: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="confirmPassword">
//                         Confirm New Password
//                       </Label>
//                       <Input
//                         id="confirmPassword"
//                         type="password"
//                         value={securitySettings.confirmPassword}
//                         onChange={(e) =>
//                           setSecuritySettings({
//                             ...securitySettings,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <Separator />

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-sm font-medium">
//                       Two-Factor Authentication
//                     </div>
//                     <div className="text-sm text-muted-foreground">
//                       Add an extra layer of security to your account
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Badge
//                       variant={
//                         securitySettings.twoFactorEnabled
//                           ? "default"
//                           : "secondary"
//                       }>
//                       {securitySettings.twoFactorEnabled
//                         ? "Enabled"
//                         : "Disabled"}
//                     </Badge>
//                     <Switch
//                       checked={securitySettings.twoFactorEnabled}
//                       onCheckedChange={(checked) =>
//                         setSecuritySettings({
//                           ...securitySettings,
//                           twoFactorEnabled: checked,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <Button onClick={handleSecuritySave} className="gap-2">
//                     <Save className="h-4 w-4" />
//                     Save Changes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Notifications Settings */}
//           <TabsContent value="notifications" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Notification Preferences</CardTitle>
//                 <CardDescription>
//                   Choose what notifications you want to receive.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   {[
//                     {
//                       key: "emailNotifications",
//                       label: "Email Notifications",
//                       description: "Receive notifications via email",
//                     },
//                     {
//                       key: "newMessages",
//                       label: "New Messages",
//                       description: "Get notified when someone contacts you",
//                     },
//                     {
//                       key: "projectViews",
//                       label: "Project Views",
//                       description: "Get notified when your projects are viewed",
//                     },
//                     {
//                       key: "weeklyReports",
//                       label: "Weekly Reports",
//                       description: "Receive weekly analytics reports",
//                     },
//                   ].map((setting) => (
//                     <div
//                       key={setting.key}
//                       className="flex items-center justify-between">
//                       <div>
//                         <div className="text-sm font-medium">
//                           {setting.label}
//                         </div>
//                         <div className="text-sm text-muted-foreground">
//                           {setting.description}
//                         </div>
//                       </div>
//                       <Switch
//                         checked={notificationSettings[setting.key]}
//                         onCheckedChange={(checked) =>
//                           setNotificationSettings({
//                             ...notificationSettings,
//                             [setting.key]: checked,
//                           })
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-end">
//                   <Button onClick={handleNotificationSave} className="gap-2">
//                     <Save className="h-4 w-4" />
//                     Save Changes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Data Management */}
//           <TabsContent value="data" className="space-y-6">
//             <ExportManager />

//             {/* Account Deletion Section */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-red-600">Danger Zone</CardTitle>
//                 <CardDescription>
//                   Irreversible actions that will permanently affect your
//                   account.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50/50 dark:bg-red-950/20 dark:border-red-800">
//                   <div>
//                     <div className="text-sm font-medium text-red-900 dark:text-red-100">
//                       Delete Account
//                     </div>
//                     <div className="text-sm text-red-700 dark:text-red-300">
//                       Permanently delete your account and all data
//                     </div>
//                   </div>
//                   <Button
//                     variant="destructive"
//                     onClick={handleDeleteAccount}
//                     className="gap-2">
//                     <Trash2 className="h-4 w-4" />
//                     Delete Account
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </main>
//   );
// }

import React from 'react'

const Settings = () => {
  return (
    <div>Settings</div>
  )
}

export default Settings