import React, { useState } from 'react';
import { useUser } from '@/contexts/user-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { UserIcon, SettingsIcon, BellIcon, MoonIcon, SunIcon, CheckIcon } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { apiRequest } from '@/lib/queryClient';

const Profile = () => {
  const { user, setUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [username, setUsername] = useState(user.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [profileUpdateError, setProfileUpdateError] = useState<string | null>(null);
  const [passwordUpdateError, setPasswordUpdateError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [notifications, setNotifications] = useState({
    chatResponses: true,
    optimizationCompleted: true,
    codeScoreResults: true,
    weeklyProgress: false,
    tips: true
  });
  
  const [preferences, setPreferences] = useState({
    language: 'javascript',
    indentSize: '2',
    autoSave: true,
    defaultView: 'chat'
  });
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setProfileUpdateError(null);
      
      // In a real app, this would send data to the server
      await apiRequest('PUT', '/api/user/profile', {
        displayName,
        username
      });
      
      // Update local user state
      setUser({
        ...user,
        displayName,
        username
      });
      
      setProfileUpdateSuccess(true);
      setTimeout(() => setProfileUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setProfileUpdateError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordUpdateError('New passwords do not match.');
      return;
    }
    
    try {
      setIsLoading(true);
      setPasswordUpdateError(null);
      
      // In a real app, this would send data to the server
      await apiRequest('PUT', '/api/user/password', {
        currentPassword,
        newPassword
      });
      
      setPasswordUpdateSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update password:', error);
      setPasswordUpdateError('Failed to update password. Please check your current password and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };
  
  const handlePreferenceChange = (key: keyof typeof preferences, value: string | boolean) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences.
          </p>
        </header>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">
              <UserIcon className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <SettingsIcon className="h-4 w-4 mr-2" /> Security
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <SettingsIcon className="h-4 w-4 mr-2" /> Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <BellIcon className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and public profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate}>
                  <div className="space-y-4">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-3xl">
                          {displayName?.[0] || username?.[0] || "U"}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{displayName || username}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.role || 'Developer'}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Your display name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Your username"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value="user@example.com"
                          disabled
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Email address cannot be changed
                        </p>
                      </div>
                    </div>
                    
                    {profileUpdateSuccess && (
                      <Alert className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                        <CheckIcon className="h-4 w-4 mr-2" />
                        <AlertDescription>Profile updated successfully!</AlertDescription>
                      </Alert>
                    )}
                    
                    {profileUpdateError && (
                      <Alert variant="destructive">
                        <AlertDescription>{profileUpdateError}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Update your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter a new password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    {passwordUpdateSuccess && (
                      <Alert className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                        <CheckIcon className="h-4 w-4 mr-2" />
                        <AlertDescription>Password updated successfully!</AlertDescription>
                      </Alert>
                    )}
                    
                    {passwordUpdateError && (
                      <Alert variant="destructive">
                        <AlertDescription>{passwordUpdateError}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                    >
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience and coding preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Toggle between light and dark theme
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SunIcon className="h-4 w-4 text-gray-500" />
                        <Switch 
                          checked={theme === 'dark'}
                          onCheckedChange={toggleTheme}
                        />
                        <MoonIcon className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Code Editor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">Default Language</Label>
                        <Select 
                          value={preferences.language} 
                          onValueChange={(value) => handlePreferenceChange('language', value)}
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="csharp">C#</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="indentSize">Indent Size</Label>
                        <Select 
                          value={preferences.indentSize} 
                          onValueChange={(value) => handlePreferenceChange('indentSize', value)}
                        >
                          <SelectTrigger id="indentSize">
                            <SelectValue placeholder="Select indent size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 spaces</SelectItem>
                            <SelectItem value="4">4 spaces</SelectItem>
                            <SelectItem value="tab">Tab</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Application Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Auto Save</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Automatically save code changes
                          </p>
                        </div>
                        <Switch 
                          checked={preferences.autoSave}
                          onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="defaultView">Default View</Label>
                        <Select 
                          value={preferences.defaultView} 
                          onValueChange={(value) => handlePreferenceChange('defaultView', value)}
                        >
                          <SelectTrigger id="defaultView">
                            <SelectValue placeholder="Select default view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chat">Chat Assistant</SelectItem>
                            <SelectItem value="optimization">Code Optimization</SelectItem>
                            <SelectItem value="score">Score Your Code</SelectItem>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage what notifications you receive from Code Buddy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Application Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Chat Responses</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when AI responds to your queries
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.chatResponses}
                        onCheckedChange={() => handleNotificationChange('chatResponses')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Optimization Completed</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when code optimization is completed
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.optimizationCompleted}
                        onCheckedChange={() => handleNotificationChange('optimizationCompleted')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Code Score Results</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when your code has been scored
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.codeScoreResults}
                        onCheckedChange={() => handleNotificationChange('codeScoreResults')}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Weekly Progress</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive weekly summary of your coding progress
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyProgress}
                        onCheckedChange={() => handleNotificationChange('weeklyProgress')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Tips and Tutorials</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive tips, tutorials, and best practices
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.tips}
                        onCheckedChange={() => handleNotificationChange('tips')}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
