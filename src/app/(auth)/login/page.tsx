'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { seedDatabase } from "@/lib/seed";

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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
            // The AuthProvider will handle the redirect
        } catch (error: any) {
            let errorMessage = "An unknown error occurred.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        errorMessage = "Invalid email or password.";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "Please enter a valid email address.";
                        break;
                    default:
                        errorMessage = "Failed to log in. Please try again.";
                        break;
                }
            }
            toast({
                title: "Login Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user document already exists
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // New user via Google: create user doc and seed database
                 await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                    subscription: { plan: 'Starter', status: 'active' },
                });
                await seedDatabase(user.uid);
                toast({
                    title: "Welcome! Sample Data Added",
                    description: "Your account has been created and populated with sample data.",
                });
            } else {
                 toast({
                    title: "Login Successful",
                    description: "Welcome back!",
                });
            }
             // The AuthProvider will handle the redirect
        } catch (error: any) {
             toast({
                title: "Google Login Failed",
                description: "Could not log in with Google. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGoogleLoading(false);
        }
    }

  return (
    <div className="w-full">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm text-primary hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <Input id="password" type="password" required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
            </Button>
        </form>
        <Separator className="my-6" />
        <div className="grid gap-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading || isGoogleLoading}>
                {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2"/>}
                {isGoogleLoading ? 'Redirecting...' : 'Sign in with Google'}
            </Button>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    </div>
  )
}
