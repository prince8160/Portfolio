'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const saveUserToFirestore = async (user: any, additionalData?: any) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || additionalData?.name || 'Anonymous User',
          email: user.email,
          photoURL: user.photoURL || null,
          createdAt: serverTimestamp()
        });
      }
    } catch (err: any) {
      console.error("Firestore user creation error:", err);
      if (err.message?.includes('Missing or insufficient permissions')) {
        throw new Error("Firestore permission denied. Please update your Firestore Security Rules in the Firebase Console to allow writes to the 'users' collection.");
      }
      throw err;
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCred.user);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
        await saveUserToFirestore(userCred.user, { name });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      await saveUserToFirestore(userCred.user);
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        const domain = typeof window !== 'undefined' ? window.location.hostname : 'this domain';
        setError(`Please add "${domain}" to Authorized Domains in Firebase Console (Authentication > Settings > Authorized domains).`);
      } else {
        setError(err.message || 'Google authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] m-auto w-full max-w-md h-fit max-h-[90vh] overflow-y-auto"
          >
            <div className="relative bg-[#0B0B0B] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl mx-4">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                type="button"
              >
                <X size={24} />
              </button>

              <div className="mb-8 font-display">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-400 text-sm">
                  {mode === 'login' 
                    ? 'Sign in to access your bookings and manage your projects.' 
                    : 'Join us to start booking projects and crafting digital experiences.'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1 overflow-hidden"
                    >
                      <label className="text-xs font-medium text-gray-400 ml-1 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required={mode === 'signup'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                        placeholder="John Doe"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1 bg-transparent">
                  <label className="text-xs font-medium text-gray-400 ml-1 uppercase tracking-wider bg-transparent">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 ml-1 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl py-3.5 font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : (mode === 'login' ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 border-t border-white/10"></div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
                <div className="flex-1 border-t border-white/10"></div>
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={loading}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black rounded-xl py-3.5 font-medium transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
