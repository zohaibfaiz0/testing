'use client';

import { useEffect, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const joinDate = useMemo(() => new Date().toLocaleDateString(), []);

  // Loading State
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-purple-600" size={64} />
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Loading Your Profile
          </div>
          <p className="text-gray-500 text-sm">
            Preparing your personalized experience...
          </p>
          <div className="w-full h-1 bg-gradient-to-r from-purple-600 to-blue-500 animate-pulse rounded-full"></div>
        </div>
      </div>
    );
  }

  // Unauthenticated State
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <div className="text-lg font-semibold">
          You must be logged in to view this page.
        </div>
      </div>
    );
  }

  // Authenticated State
  return (
    <div className="relative min-h-screen bg-gray-100 pt-24">
      {/* Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="absolute top-6 right-6 bg-accent text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-blackish transition duration-300"
      >
        Logout
      </button>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 bg-white shadow-2xl rounded-2xl lg:px-8 pt-12 pb-8">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-blackish mb-8 text-center">My Profile</h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 bg-gray-200 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-black font-semibold">
              {session.user?.username?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>

          {/* User Info */}
          <div className="w-full md:flex-1">
            <div className="mb-4">
              <p className="font-medium text-accent text-lg mb-2">Username</p>
              <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                <p className="text-blackish font-semibold">{session.user?.username || 'N/A'}</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-accent text-lg mb-2">Email</p>
              <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                <p className="text-blackish font-semibold">{session.user?.email || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-blackish mb-4">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-accent mb-2">Join Date</h3>
              <p className="text-gray-600">{joinDate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-accent mb-2">Account Type</h3>
              <p className="text-gray-600">Regular User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
