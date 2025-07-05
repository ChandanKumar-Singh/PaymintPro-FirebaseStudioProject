'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firebaseConfig } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

function FullScreenLoader() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
             <svg className="animate-spin h-16 w-16 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );
}

function FirebaseConfigError() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md rounded-lg border-2 border-dashed border-destructive p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-destructive">Firebase Configuration Missing</h1>
                <p className="mt-4 text-muted-foreground">
                    Your Firebase API Key is not configured correctly. Please open the <strong>.env</strong> file in the root of your project and replace the placeholder values with your actual Firebase project credentials.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                    You can find these in your Firebase Console under Project Settings {'>'} General {'>'} Your apps.
                </p>
            </div>
        </div>
    );
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isConfigInvalid = !firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here' || !auth;

  useEffect(() => {
    if (isConfigInvalid || !auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isConfigInvalid]);

  useEffect(() => {
    if (loading || isConfigInvalid) return;

    const isAuthRoute = ['/login', '/register', '/forgot-password'].some(route => pathname.startsWith(route));
    const isPublicRoute = ['/', '/terms', '/privacy'].some(route => pathname.startsWith(route)) || isAuthRoute;
    
    if (!user && !isPublicRoute) {
      router.push('/login');
    }

    if (user && isAuthRoute) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router, isConfigInvalid]);

  if (isConfigInvalid) {
      return <FirebaseConfigError />;
  }
  
  if (loading && !['/', '/terms', '/privacy'].some(route => pathname.startsWith(route))) {
    return <FullScreenLoader />;
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
