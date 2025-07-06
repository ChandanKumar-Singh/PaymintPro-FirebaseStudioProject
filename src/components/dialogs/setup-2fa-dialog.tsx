'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface Setup2FADialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function Setup2FADialog({ open, onOpenChange }: Setup2FADialogProps) {
    const { toast } = useToast();

    const handleEnable2FA = () => {
        toast({
            title: "Two-Factor Authentication Enabled",
            description: "Your account is now protected with 2FA.",
        });
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleEnable2FA}>Enable 2FA</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
