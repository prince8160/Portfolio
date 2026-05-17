'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, Check, ArrowRight, Sparkles } from 'lucide-react';
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
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset states when mode changes
  useEffect(() => {
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  }, [mode, isOpen]);

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
        throw new Error("Firestore permission denied. Please check rules.");
      }
      throw err;
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }
      if (!agreeTerms) {
        return setError('You must agree to the Terms & Conditions');
      }
    }

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
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
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
      setError(err.message || 'Google authentication failed.');
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
            className={`fixed inset-0 z-[60] backdrop-blur-md transition-colors duration-700 ${mode === 'login' ? 'bg-black/80' : 'bg-indigo-50/60'}`}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                /* =======================
                   SIGN IN PAGE (DARK UI)
                   ======================= */
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-[360px] bg-[#0A0A0B] border border-white/5 p-7 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative pointer-events-auto overflow-hidden"
                >
                  {/* Subtle Dark Blue Gradient Background */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent pointer-events-none" />

                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                  >
                    <X size={16} />
                  </button>

                  <div className="text-center mb-6 relative z-10">
                    <h2 className="text-xl font-bold text-white tracking-tight mb-1">
                      Welcome Back
                    </h2>
                    <p className="text-gray-400 text-xs">
                      Sign in to your professional account
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center relative z-10">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleAuth} className="space-y-3.5 relative z-10">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#121214] border border-white/5 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                        placeholder="name@company.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Password</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#121214] border border-white/5 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-white/20 group-hover:border-white/40'}`}>
                          {rememberMe && <Check size={10} className="text-white" />}
                        </div>
                        <span className="text-[11px] text-gray-400 group-hover:text-gray-300">Remember me</span>
                        <input type="checkbox" className="hidden" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                      </label>
                      <a href="#" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 bg-white text-black hover:bg-gray-100 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : 'Log In'}
                    </button>
                  </form>

                  <div className="my-5 relative flex items-center justify-center z-10">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/5"></div>
                    </div>
                    <span className="relative bg-[#0A0A0B] px-3 text-[10px] text-gray-500 uppercase tracking-wider">Or</span>
                  </div>

                  <button
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    type="button"
                    className="w-full relative z-10 flex items-center justify-center gap-2 bg-[#121214] border border-white/5 hover:bg-white/5 text-gray-300 rounded-lg py-2.5 text-[13px] font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>

                  <p className="mt-5 text-center text-[13px] text-gray-500 relative z-10">
                    Don't have an account?{' '}
                    <button onClick={() => setMode('signup')} className="text-white hover:text-blue-400 font-medium transition-colors">
                      Sign Up
                    </button>
                  </p>
                </motion.div>
              ) : (
                /* =======================
                   SIGN UP PAGE (BRIGHT UI)
                   ======================= */
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: -5 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="w-full max-w-[800px] bg-white rounded-3xl relative pointer-events-auto overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_rgba(236,72,153,0.15)] border border-pink-100/50"
                  style={{ transformPerspective: 1200 }}
                >
                  {/* Left Side: Modern Colorful Design */}
                  <div className="hidden md:flex md:w-[45%] relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex-col justify-between overflow-hidden">
                    {/* Abstract Shapes */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                    <motion.div 
                      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-10 -right-10 w-48 h-48 bg-cyan-400/30 rounded-full blur-2xl"
                    />
                    <motion.div 
                      animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-black/20 to-transparent" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                        <Sparkles className="text-white" size={24} />
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">Join the Future.</h3>
                      <p className="text-white/90 text-sm leading-relaxed font-light max-w-[260px]">
                        Create an account to unlock premium features and start building amazing experiences today.
                      </p>
                    </div>

                    <div className="relative z-10 p-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-fit shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2.5">
                          <img src="https://i.pravatar.cc/100?img=4" className="w-8 h-8 rounded-full border-2 border-purple-500" alt="Avatar" />
                          <img src="https://i.pravatar.cc/100?img=5" className="w-8 h-8 rounded-full border-2 border-pink-500" alt="Avatar" />
                          <img src="https://i.pravatar.cc/100?img=6" className="w-8 h-8 rounded-full border-2 border-indigo-500" alt="Avatar" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white text-xs font-bold">10k+ creators</span>
                          <span className="text-white/70 text-[10px]">Joined this week</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Bright Form */}
                  <div className="w-full md:w-[55%] p-7 sm:p-10 relative bg-slate-50/50">
                    <button
                      onClick={onClose}
                      className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-500 hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50 transition-all z-10"
                    >
                      <X size={16} />
                    </button>

                    <div className="mb-6 mt-2">
                      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Get Started</h2>
                      <p className="text-gray-500 text-sm mt-1">Create your free account below</p>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs text-center font-medium">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-sm shadow-sm"
                          placeholder="Your amazing name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-sm shadow-sm"
                          placeholder="hello@creative.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-700">Password</label>
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-sm shadow-sm"
                            placeholder="Min 8 chars"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-700">Confirm</label>
                          <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-sm shadow-sm"
                            placeholder="Repeat it"
                          />
                        </div>
                      </div>

                      <label className="flex items-start gap-2.5 mt-4 cursor-pointer group">
                        <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${agreeTerms ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent' : 'border-gray-300 bg-white group-hover:border-pink-400'}`}>
                          {agreeTerms && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-600 select-none leading-relaxed">
                          I agree to the <a href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 font-semibold border-b border-pink-200 pb-0.5">Terms of Service</a> & <a href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 font-semibold border-b border-pink-200 pb-0.5">Privacy</a>
                        </span>
                        <input type="checkbox" className="hidden" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                      </label>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 text-[13px]"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : (
                          <>Create Account <ArrowRight size={16} /></>
                        )}
                      </button>
                    </form>

                    <div className="my-6 relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <span className="relative bg-slate-50 px-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Or sign up with</span>
                    </div>

                    <button
                      onClick={handleGoogleAuth}
                      disabled={loading}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-xl py-3 text-[13px] font-semibold transition-all duration-300 shadow-sm disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </button>

                    <p className="mt-6 text-center text-[13px] text-gray-500">
                      Already have an account?{' '}
                      <button onClick={() => setMode('login')} className="text-purple-600 hover:text-pink-600 font-bold transition-colors">
                        Sign In
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

