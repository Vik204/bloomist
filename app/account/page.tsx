"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser") || localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
    const handleAuthChanged = (e: Event) => {
      try {
        // @ts-ignore
        const detail = e && (e as CustomEvent)?.detail
        if (detail && detail.user) {
          setUser(detail.user)
          return
        }
        const raw2 = localStorage.getItem("user")
        if (raw2) setUser(JSON.parse(raw2))
        else setUser(null)
      } catch (err) {
        setUser(null)
      }
    }

    try {
      window.addEventListener('authChanged', handleAuthChanged)
      window.addEventListener('storage', handleAuthChanged)
    } catch (e) {
      // ignore
    }

    return () => {
      try {
        window.removeEventListener('authChanged', handleAuthChanged)
        window.removeEventListener('storage', handleAuthChanged)
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      document.cookie = "auth=; Max-Age=0; path=/";
      document.cookie = "user=; Max-Age=0; path=/";
    }
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">My Account</h1>
        {user ? (
          <div className="space-y-3">
            <p>
              <strong>Name: </strong>
              {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "-"}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <div className="pt-4">
              <Button onClick={signOut}>Sign Out</Button>
            </div>
          </div>
        ) : (
          <p>No user signed in.</p>
        )}
      </div>
    </div>
  );
}
