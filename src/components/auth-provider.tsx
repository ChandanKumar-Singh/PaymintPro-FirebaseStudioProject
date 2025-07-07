'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured, db } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/data';

function FirebaseConfigErrorComponent() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-lg border bg-card p-8 text-center text-card-foreground">
                <h1 className="text-2xl font-bold">Firebase Not Configured</h1>
                <p className="text-muted-foreground">
                    It looks like you haven't configured your Firebase credentials yet. Please add your project's keys to the 
                    <code className="mx-1 rounded bg-muted px-1.5 py-1 font-mono text-sm">.env</code> 
                    file in the root of your project.
                </p>
                <Button asChild>
                    <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">
                        Go to Firebase Console
                    </a>
                </Button>
            </div>
        </div>
    );
}


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

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isFirebaseConfigValid: boolean;
  refetchUserProfile: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    userProfile: null, 
    loading: true, 
    isFirebaseConfigValid: true,
    refetchUserProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigValid, setFirebaseConfigValid] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUserProfile = useCallback(async (authUser: User | null) => {
    if (authUser) {
      const userDocRef = doc(db, "users", authUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile;
        // Gracefully handle missing subscription data for older user documents
        if (!profileData.subscription) {
            profileData.subscription = { plan: 'Starter', status: 'active' };
        }
        setUserProfile(profileData);
      }
    } else {
      setUserProfile(null);
    }
    setLoading(false);
  }, []);

  const refetchUserProfile = useCallback(() => {
    if (auth.currentUser) {
        fetchUserProfile(auth.currentUser);
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
        setFirebaseConfigValid(false);
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      fetchUserProfile(authUser);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (loading || !isFirebaseConfigValid) return;

    const authRoutes = ['/login', '/register', '/forgot-password'];
    const publicRoutes = ['/home', '/business', '/terms', '/privacy'];
    
    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || isAuthRoute;

    // If user is not authenticated and is trying to access a protected route, redirect to login.
    if (!user && !isPublicRoute) {
      router.push('/login');
    }

    // If user is authenticated and is on an auth route, redirect to the dashboard.
    if (user && isAuthRoute) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router, isFirebaseConfigValid]);


  if (!isFirebaseConfigValid) {
    return <FirebaseConfigErrorComponent />;
  }

  // Show a loader while auth state is being determined, but not for public marketing pages
  if (loading && !['/home', '/business', '/terms', '/privacy'].some(route => pathname.startsWith(route))) {
    return <FullScreenLoader />;
  }

  return <AuthContext.Provider value={{ user, userProfile, loading, isFirebaseConfigValid, refetchUserProfile }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
