"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react'

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="">
      <Card className="w-full  mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">John Doe</CardTitle>
            <CardDescription>john.doe@example.com</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="location" className="pl-8" placeholder="New York, USA" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" placeholder="https://example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work">Work</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="work" className="pl-8" placeholder="Software Engineer at Tech Co." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birth Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="birthdate" className="pl-8" type="date" />
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="account" className="mt-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" className="pl-8" type="email" placeholder="john.doe@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" className="pl-8" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="username" className="pl-8" placeholder="johndoe" />
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch id="push-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new products and features</p>
                  </div>
                  <Switch id="marketing-emails" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="mt-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="current-password" className="pl-8" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="new-password" className="pl-8" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="confirm-password" className="pl-8" type="password" />
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

