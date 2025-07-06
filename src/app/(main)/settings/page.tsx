'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Setup2FADialog } from "@/components/dialogs/setup-2fa-dialog";
import { ChangePlanDialog } from "@/components/dialogs/change-plan-dialog";
import { UpdatePaymentDialog } from "@/components/dialogs/update-payment-dialog";
import { Download, Bot, Loader2 } from "lucide-react";
import { seedDatabase } from "@/lib/seed";
import { useAuth } from "@/components/auth-provider";
import { useState, useEffect, useMemo } from "react";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { updateDocument } from "@/lib/data";
import { DataTable } from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type BillingHistoryItem = { id: string; date: string; amount: number; description: string };
const billingHistoryData: BillingHistoryItem[] = [
    { id: 'bill_1', date: '2024-07-01', amount: 20.00, description: 'Pro Plan - Monthly' },
    { id: 'bill_2', date: '2024-06-01', amount: 20.00, description: 'Pro Plan - Monthly' },
    { id: 'bill_3', date: '2024-05-01', amount: 20.00, description: 'Pro Plan - Monthly' },
];

type LoginHistoryItem = { id: string; device: string; location: string; ip: string; lastSeen: string };
const loginHistoryData: LoginHistoryItem[] = [
    { id: 'session_1', device: 'Chrome on MacOS', location: 'New York, US', ip: '192.168.1.1', lastSeen: 'July 4, 2024' },
    { id: 'session_2', device: 'Safari on iPhone', location: 'New York, US', ip: '192.168.1.1', lastSeen: 'July 3, 2024' },
    { id: 'session_3', device: 'Paymint Desktop App', location: 'London, UK', ip: '10.0.0.1', lastSeen: 'July 1, 2024' },
]

export default function SettingsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { user, userProfile, refetchUserProfile } = useAuth();

    const [isSeeding, setIsSeeding] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // URL-driven state
    const tab = searchParams.get('tab') || 'profile';
    const action = searchParams.get('action');

    const is2FAOpen = action === 'setup-2fa';
    const isChangePlanOpen = action === 'change-plan';
    const isUpdatePaymentOpen = action === 'update-payment';

    const handleOpen = (newAction: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('action', newAction);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('action');
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        if(user) {
            const nameParts = user.displayName?.split(' ') || ['', ''];
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSaveChanges = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const newDisplayName = `${firstName} ${lastName}`.trim();
            if (auth.currentUser) {
              await updateProfile(auth.currentUser, { displayName: newDisplayName });
            }
            await updateDocument(user.uid, 'users', user.uid, { displayName: newDisplayName });
            refetchUserProfile();
            toast({
                title: "Settings Saved",
                description: "Your changes have been saved successfully.",
            });
        } catch (error) {
             toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    }

    const handleSeedDatabase = async () => {
        if (!user) {
            toast({ title: "Error", description: "You must be logged in to seed the database.", variant: "destructive" });
            return;
        }
        setIsSeeding(true);
        try {
            await seedDatabase(user.uid);
            toast({
                title: "Database Seeded",
                description: "Your database has been populated with sample data. Please refresh the page.",
            });
        } catch (error) {
             toast({
                title: "Seeding Failed",
                description: "An error occurred while seeding the database.",
                variant: "destructive"
            });
            console.error(error);
        } finally {
            setIsSeeding(false);
        }

    }
    
    const billingColumns = useMemo<ColumnDef<BillingHistoryItem>[]>(() => [
        { accessorKey: "date", header: "Date" },
        { accessorKey: "description", header: "Description" },
        { 
            accessorKey: "amount", 
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => <div className="text-right">{row.original.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
        },
        { 
            id: 'actions',
            cell: () => (
                <div className="text-right">
                    <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download invoice</span>
                    </Button>
                </div>
            )
        }
    ], []);

    const loginColumns = useMemo<ColumnDef<LoginHistoryItem>[]>(() => [
        { accessorKey: "device", header: "Device" },
        { accessorKey: "location", header: "Location" },
        { accessorKey: "lastSeen", header: "Last Seen" },
        { accessorKey: "ip", header: "IP Address" }
    ], []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <Setup2FADialog open={is2FAOpen} onOpenChange={(open) => !open && handleClose()} />
            <ChangePlanDialog 
                open={isChangePlanOpen} 
                onOpenChange={(open) => !open && handleClose()}
                currentPlan={userProfile?.subscription?.plan} 
                onSuccess={() => {
                    refetchUserProfile();
                    handleClose();
                }}
            />
            <UpdatePaymentDialog open={isUpdatePaymentOpen} onOpenChange={(open) => !open && handleClose()} />

            <Tabs value={tab} onValueChange={(value) => router.push(`${pathname}?tab=${value}`)} className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="developer">Developer</TabsTrigger>
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
                                        <AvatarImage src={user?.photoURL || "https://placehold.co/80x80.png"} data-ai-hint="woman avatar" />
                                        <AvatarFallback>{firstName?.[0]}{lastName?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Change Photo</Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">First Name</Label>
                                        <Input id="firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Last Name</Label>
                                        <Input id="lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} disabled />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <div className="flex justify-end w-full">
                                    <Button onClick={handleSaveChanges} disabled={isSaving}>
                                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
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
                                <Separator />
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
                                    <Button onClick={() => toast({ title: "Settings Saved" })}>Save Changes</Button>
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
                                <h3 className="text-lg font-medium">Change Password</h3>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                                    <div className="flex justify-end items-end w-full col-span-full">
                                        <Button onClick={() => toast({ title: "Password Changed (Simulated)" })}>Save Changes</Button>
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
                                        <Button variant="outline" onClick={() => handleOpen('setup-2fa')}>Setup</Button>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Login History</h3>
                                    <DataTable columns={loginColumns} data={loginHistoryData} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="billing">
                        { !userProfile || !userProfile.subscription ? (
                            <Card><CardContent className="p-6"><Skeleton className="h-96 w-full" /></CardContent></Card>
                        ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing</CardTitle>
                                <CardDescription>Manage your billing and subscription.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl">{userProfile.subscription.plan} Plan</CardTitle>
                                            <CardDescription>
                                                {userProfile.subscription.plan === 'Pro' && '$20 / month'}
                                                {userProfile.subscription.plan === 'Starter' && 'Free plan'}
                                                {userProfile.subscription.plan === 'Enterprise' && 'Custom pricing'}
                                            </CardDescription>
                                        </div>
                                        <Button variant="outline" onClick={() => handleOpen('change-plan')}>Change Plan</Button>
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
                                        <Button variant="outline" onClick={() => handleOpen('update-payment')}>Update</Button>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <DataTable columns={billingColumns} data={billingHistoryData} />
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                        )}
                    </TabsContent>
                     <TabsContent value="developer">
                        <Card>
                            <CardHeader>
                                <CardTitle>Developer</CardTitle>
                                <CardDescription>Actions for development and testing.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Seed Database</p>
                                        <p className="text-sm text-muted-foreground">Populate your Firestore database with sample data.</p>
                                    </div>
                                    <Button variant="outline" onClick={handleSeedDatabase} disabled={isSeeding}>
                                        {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                                        {isSeeding ? "Seeding..." : "Seed Data"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
