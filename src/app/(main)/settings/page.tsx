'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const billingHistory = [
    { id: 'bill_1', date: '2024-07-01', amount: 20.00, description: 'Pro Plan - Monthly' },
    { id: 'bill_2', date: '2024-06-01', amount: 20.00, description: 'Pro Plan - Monthly' },
    { id: 'bill_3', date: '2024-05-01', amount: 20.00, description: 'Pro Plan - Monthly' },
];

export default function SettingsPage() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'profile';
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "Your changes have been saved successfully.",
        });
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <Tabs defaultValue={tab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>This is how others will see you on the site.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                 <div className="flex items-center space-x-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="https://placehold.co/80x80.png" data-ai-hint="woman avatar" />
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Change Photo</Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">First Name</Label>
                                        <Input id="firstname" defaultValue="Olivia" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Last Name</Label>
                                        <Input id="lastname" defaultValue="Martin" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="olivia.martin@email.com" />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                               <div className="flex justify-end w-full">
                                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications">
                         <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Manage how you receive notifications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">By Email</h3>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="email-comments">Comments</Label>
                                        <Switch id="email-comments" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="email-reminders">Payment Reminders</Label>
                                        <Switch id="email-reminders" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="email-security">Security Alerts</Label>
                                        <Switch id="email-security" />
                                    </div>
                                </div>
                                <Separator/>
                                 <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Push Notifications</h3>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="push-everything">Everything</Label>
                                        <Switch id="push-everything" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="push-mentions">Direct Mentions</Label>
                                        <Switch id="push-mentions" defaultChecked />
                                    </div>
                                     <div className="flex items-center justify-between">
                                        <Label htmlFor="push-none">No push notifications</Label>
                                        <Switch id="push-none" />
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter className="border-t px-6 py-4">
                               <div className="flex justify-end w-full">
                                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="security">
                         <Card>
                            <CardHeader>
                                <CardTitle>Security</CardTitle>
                                <CardDescription>Manage your account security settings.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Change Password</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                     <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                     <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Enable 2FA</p>
                                            <p className="text-sm text-muted-foreground">Secure your account with an extra layer of protection.</p>
                                        </div>
                                        <Button variant="outline">Setup</Button>
                                     </div>
                                </div>
                            </CardContent>
                             <CardFooter className="border-t px-6 py-4">
                               <div className="flex justify-end w-full">
                                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="billing">
                         <Card>
                            <CardHeader>
                                <CardTitle>Billing</CardTitle>
                                <CardDescription>Manage your billing and subscription.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                               <Card>
                                   <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl">Pro Plan</CardTitle>
                                            <CardDescription>$20 / month</CardDescription>
                                        </div>
                                        <Button variant="outline">Change Plan</Button>
                                   </CardHeader>
                               </Card>
                                <Card>
                                   <CardHeader>
                                        <CardTitle>Payment Method</CardTitle>
                                   </CardHeader>
                                   <CardContent className="flex items-center justify-between">
                                       <div className="flex items-center gap-4">
                                           <Avatar>
                                                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="visa logo" />
                                           </Avatar>
                                           <div>
                                               <p className="font-medium">Visa ending in 1234</p>
                                               <p className="text-sm text-muted-foreground">Expires 08/2028</p>
                                           </div>
                                       </div>
                                       <Button variant="outline">Update</Button>
                                   </CardContent>
                                </Card>
                                 <Card>
                                   <CardHeader>
                                        <CardTitle>Billing History</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <Table>
                                           <TableHeader>
                                               <TableRow>
                                                   <TableHead>Date</TableHead>
                                                   <TableHead>Description</TableHead>
                                                   <TableHead className="text-right">Amount</TableHead>
                                               </TableRow>
                                           </TableHeader>
                                           <TableBody>
                                               {billingHistory.map(item => (
                                                   <TableRow key={item.id}>
                                                       <TableCell>{item.date}</TableCell>
                                                       <TableCell>{item.description}</TableCell>
                                                       <TableCell className="text-right">{item.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                                                   </TableRow>
                                               ))}
                                           </TableBody>
                                       </Table>
                                   </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
