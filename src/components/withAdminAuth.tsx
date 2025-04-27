"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Loading screen component
const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

// Higher-Order Component with generics
export default function withAdminAuth<T extends object>(
  Component: React.ComponentType<T>
) {
  return function ProtectedRoute(props: T) {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push("/");
        } else if (!isAdmin()) {
          router.push("/");
        } else {
          setChecking(false);
        }
      }
    }, [user, loading, router, isAdmin]);

    if (loading || checking) {
      return <LoadingScreen />;
    }

    // Render component only if the user is an admin
    return <Component {...props} />;
  };
}
