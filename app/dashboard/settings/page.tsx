"use client"

import { useState, useEffect } from "react"
import { Bell, Globe, Lock, Moon, Save, Sun, User } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { toast } = useToast()
  const [theme, setTheme] = useState("dark")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  // Profile settings with initial empty state
  const [profileSettings, setProfileSettings] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  })

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    language: "en",
    timezone: "Africa/Addis_Ababa",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    complaintAssignments: true,
    statusUpdates: true,
    systemAlerts: true,
    dailyReports: false,
    weeklyReports: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Fetch profile data from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (error) throw error

          if (profile) {
            setProfileSettings({
              name: profile.name || "",
              email: session.user.email || "",
              phone: profile.phone || "",
              bio: profile.bio || "",
            })
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data.",
        })
      }
    }

    fetchUserProfile()
  }, [supabase, toast])

  // Handle profile update
  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        throw new Error("No user session")
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileSettings.name,
          phone: profileSettings.phone,
          bio: profileSettings.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle system settings update
  const handleSystemUpdate = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "System settings updated",
        description: "Your system settings have been updated successfully.",
      })
      setIsLoading(false)
    }, 1000)
  }

  // Handle notification settings update
  const handleNotificationUpdate = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated successfully.",
      })
      setIsLoading(false)
    }, 1000)
  }

  // Handle security settings update
  const handleSecurityUpdate = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
      })
      setIsLoading(false)
    }, 1000)
  }

  // Handle theme toggle
  const handleThemeToggle = (newTheme: string) => {
    setTheme(newTheme)
    toast({
      title: `Theme changed to ${newTheme}`,
      description: `The system theme has been updated to ${newTheme} mode.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`${
              theme === "light" ? "bg-slate-800 text-slate-100" : "bg-transparent border-slate-700 text-slate-300"
            }`}
            onClick={() => handleThemeToggle("light")}
          >
            <Sun className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`${
              theme === "dark" ? "bg-slate-800 text-slate-100" : "bg-transparent border-slate-700 text-slate-300"
            }`}
            onClick={() => handleThemeToggle("dark")}
          >
            <Moon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            <Globe className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={profileSettings.bio}
                  onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                  className="min-h-32 bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleProfileUpdate}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Configure system preferences and localization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-slate-300">
                    Language
                  </Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                  >
                    <SelectTrigger id="language" className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="am">Amharic</SelectItem>
                      <SelectItem value="or">Oromo</SelectItem>
                      <SelectItem value="ti">Tigrinya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-slate-300">
                    Timezone
                  </Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                  >
                    <SelectTrigger id="timezone" className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectItem value="Africa/Addis_Ababa">Addis Ababa (UTC+3)</SelectItem>
                      <SelectItem value="Africa/Nairobi">Nairobi (UTC+3)</SelectItem>
                      <SelectItem value="Africa/Cairo">Cairo (UTC+2)</SelectItem>
                      <SelectItem value="Europe/London">London (UTC+0/+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat" className="text-slate-300">
                    Date Format
                  </Label>
                  <Select
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, dateFormat: value })}
                  >
                    <SelectTrigger id="dateFormat" className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeFormat" className="text-slate-300">
                    Time Format
                  </Label>
                  <Select
                    value={systemSettings.timeFormat}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, timeFormat: value })}
                  >
                    <SelectTrigger id="timeFormat" className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSystemUpdate}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Notification Channels</h3>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Email Notifications</Label>
                    <p className="text-sm text-slate-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">SMS Notifications</Label>
                    <p className="text-sm text-slate-400">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Notification Types</h3>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Complaint Assignments</Label>
                    <p className="text-sm text-slate-400">When a complaint is assigned to you or your department</p>
                  </div>
                  <Switch
                    checked={notificationSettings.complaintAssignments}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, complaintAssignments: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Status Updates</Label>
                    <p className="text-sm text-slate-400">When a complaint status is updated</p>
                  </div>
                  <Switch
                    checked={notificationSettings.statusUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, statusUpdates: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">System Alerts</Label>
                    <p className="text-sm text-slate-400">Important system alerts and announcements</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Reports</h3>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Daily Reports</Label>
                    <p className="text-sm text-slate-400">Receive daily summary reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, dailyReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Weekly Reports</Label>
                    <p className="text-sm text-slate-400">Receive weekly summary reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleNotificationUpdate}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your account security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Authentication</h3>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Two-Factor Authentication</Label>
                    <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Session Management</h3>
                <Separator className="bg-slate-700" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-slate-300">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    <p className="text-xs text-slate-400">Time before automatic logout due to inactivity</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Password Policy</h3>
                <Separator className="bg-slate-700" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry" className="text-slate-300">
                      Password Expiry (days)
                    </Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    <p className="text-xs text-slate-400">Days before password must be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts" className="text-slate-300">
                      Failed Login Attempts
                    </Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    <p className="text-xs text-slate-400">Number of attempts before account lockout</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-100">Change Password</h3>
                <Separator className="bg-slate-700" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-slate-300">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-slate-300">
                      New Password
                    </Label>
                    <Input id="newPassword" type="password" className="bg-slate-800 border-slate-700 text-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-300">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSecurityUpdate}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
