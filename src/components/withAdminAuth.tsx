'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default function withAdminAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/');
        } else if (!isAdmin()) {
          router.push('/');
        } else {
          setChecking(false);
        }
      }
    }, [user, loading, router, isAdmin]);

    if (loading || checking) {
      return <LoadingScreen />;
    }

    // Render komponen hanya jika user adalah admin
    return <Component {...props} />;
  };
}