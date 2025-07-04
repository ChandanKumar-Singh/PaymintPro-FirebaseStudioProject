'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function Setup2FADialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleEnable2FA = () => {
        toast({
            title: "Two-Factor Authentication Enabled",
            description: "Your account is now protected with 2FA.",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Setup</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                        Scan the QR code with your authenticator app, then enter the code below.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <Image src="https://placehold.co/200x200.png" data-ai-hint="qr code" alt="QR Code" width={200} height={200} />
                    <div className="w-full space-y-2">
                        <Label htmlFor="auth-code">Authentication Code</Label>
                        <Input id="auth-code" placeholder="123456" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleEnable2FA}>Enable 2FA</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
