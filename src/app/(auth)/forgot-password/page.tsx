'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast({
                title: "Password Reset Email Sent",
                description: "If an account exists with that email, a reset link has been sent.",
            });
            router.push('/login');
        } catch (error: any) {
             toast({
                title: "Error",
                description: "Failed to send password reset email. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Card>
        <CardHeader className="text-left">
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
                Enter your email and we'll send you a link to reset your password.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleReset} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Remembered your password?{" "}
                <Link href="/login" className="underline">
                    Sign in
                </Link>
            </div>
        </CardContent>
    </Card>
  )
}
