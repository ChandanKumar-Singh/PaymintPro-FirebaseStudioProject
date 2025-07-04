'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { toast } = useToast();
    
    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock reset logic
        toast({
            title: "Password Reset Email Sent",
            description: "If an account exists with that email, a reset link has been sent.",
        });
        router.push('/login');
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
                    />
                </div>
                <Button type="submit" className="w-full">
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
