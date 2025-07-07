'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { seedDatabase } from "@/lib/seed";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // 1. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update their auth profile displayName
            await updateProfile(user, {
              displayName: name
            });
            
            // 3. Create a user document in Firestore to store app-specific data
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: name,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString(),
                subscription: { plan: 'Starter', status: 'active' },
            });

            // 4. Seed the database with sample data for the new user
            await seedDatabase(user.uid);

            toast({
                title: "Account Created & Sample Data Added",
                description: "You have been successfully registered. Please log in to see your new dashboard.",
            });
            
            router.push('/login');
        } catch (error: any) {
            let errorMessage = "An unknown error occurred.";
             if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = "This email is already in use.";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "Please enter a valid email address.";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "The password must be at least 6 characters long.";
                        break;
                    default:
                        errorMessage = "Failed to register. Please try again.";
                        break;
                }
            }
            toast({
                title: "Registration Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your details below to get started
        </p>
      </div>
      <form onSubmit={handleRegister} className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Max Robinson" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
        </div>
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
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
        </div>
        <p className="text-xs text-muted-foreground">By creating an account, you agree to our <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.</p>
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create an account
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
