import { useState } from "react";
import { Bell, Lock, Eye, Globe, Trash2, LogOut, Save, Check } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/gradient-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    messages: true,
    requests: true,
    updates: true,
    newsletter: false,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowMessages: true,
    searchable: true,
  });

  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("english");
  const [savedSettings, setSavedSettings] = useState(false);

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    setSavedSettings(false);
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
    setSavedSettings(false);
  };

  const handleSave = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock size={16} />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Eye size={16} />
              Display
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Globe size={16} />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Message Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when you receive new messages
                    </p>
                  </div>
                  <Switch
                    checked={notifications.messages}
                    onCheckedChange={() => handleNotificationChange("messages")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Request Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified about new skill exchange requests
                    </p>
                  </div>
                  <Switch
                    checked={notifications.requests}
                    onCheckedChange={() => handleNotificationChange("requests")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Product Updates
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified about new features and improvements
                    </p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={() => handleNotificationChange("updates")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Newsletter
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Subscribe to our weekly newsletter
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={() => handleNotificationChange("newsletter")}
                  />
                </div>
              </div>

              <div className="mt-6">
                <GradientButton onClick={handleSave} className="w-full md:w-auto">
                  {savedSettings ? (
                    <>
                      <Check size={16} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Preferences
                    </>
                  )}
                </GradientButton>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-4">
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Public Profile
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Allow others to view your profile
                    </p>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={() => handlePrivacyChange("profilePublic")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Show Email Publicly
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Display your email on your profile
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={() => handlePrivacyChange("showEmail")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Allow Direct Messages
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Allow anyone to send you messages
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={() => handlePrivacyChange("allowMessages")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div>
                    <Label className="text-base font-medium text-foreground cursor-pointer">
                      Searchable Profile
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Appear in search results
                    </p>
                  </div>
                  <Switch
                    checked={privacy.searchable}
                    onCheckedChange={() => handlePrivacyChange("searchable")}
                  />
                </div>
              </div>

              <div className="mt-6">
                <GradientButton onClick={handleSave} className="w-full md:w-auto">
                  {savedSettings ? (
                    <>
                      <Check size={16} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Privacy Settings
                    </>
                  )}
                </GradientButton>
              </div>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display" className="space-y-4">
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Display Settings</h2>

              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <Label className="text-base font-medium text-foreground mb-3 block">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Choose your preferred color scheme
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium text-foreground mb-3 block">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select your preferred language
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <GradientButton onClick={handleSave} className="w-full md:w-auto">
                  {savedSettings ? (
                    <>
                      <Check size={16} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Display Settings
                    </>
                  )}
                </GradientButton>
              </div>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <Card className="p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Account Management</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <Label className="text-base font-medium text-foreground block mb-3">Change Password</Label>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <GradientButton className="w-full">Update Password</GradientButton>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
                  <Label className="text-base font-medium text-foreground block mb-2">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <GradientButton className="w-full md:w-auto">Enable 2FA</GradientButton>
                </div>

                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <Label className="text-base font-medium text-destructive block mb-2">Danger Zone</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Irreversible actions. Please proceed with caution.
                  </p>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <button className="px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2 font-medium">
                      <Trash2 size={16} />
                      Delete Account
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors flex items-center justify-center gap-2 font-medium">
                      <LogOut size={16} />
                      Logout All Devices
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
