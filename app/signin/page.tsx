'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple client-side authentication check (demo only)
      // Check if a user exists in localStorage
      const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      if (!raw) {
        throw new Error('No account found. Please sign up first.')
      }

      const stored = JSON.parse(raw)
      console.log('Sign in attempt:', { email })

      if (stored.email !== email || stored.password !== password) {
        throw new Error('Invalid email or password')
      }

      // Credentials match — set auth cookie, notify app and redirect
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(stored))
        document.cookie = `auth=1; path=/; max-age=${60 * 60 * 24 * 7}`
        document.cookie = `user=${encodeURIComponent(email)}; path=/; max-age=${60 * 60 * 24 * 7}`

        // Notify other components in this tab
        try {
          window.dispatchEvent(new CustomEvent('authChanged', { detail: { user: stored } }))
        } catch (e) {
          // ignore
        }

        // Inform the user
        try {
          alert('Signed in')
        } catch (e) {
          // ignore
        }
      }
      router.push('/')
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
            Forgot password?
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-600 font-semibold hover:text-purple-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
