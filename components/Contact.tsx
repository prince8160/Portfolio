"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  ArrowRight,
  LogOut,
  Loader2,
  Github,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import { auth, db } from "../lib/firebase";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Contact() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [hasCopied, setHasCopied] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser && currentUser.displayName) {
        const parts = currentUser.displayName.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.length > 1 ? parts.slice(1).join(" ") : "");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);
    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      setAuthError("");
    } catch (err: any) {
      if (err.code === "auth/popup-blocked") {
        setAuthError("Popup blocked. Please allow popups or use a new tab.");
      } else if (
        err.message &&
        err.message.includes("Pending promise was never set")
      ) {
        setAuthError(
          "Popup was closed or blocked by iframe. Please try opening the app in a new tab.",
        );
      } else {
        setAuthError(err.message || "Google Auth failed");
      }
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    setBookingSuccess(false);
    setFirstName("");
    setLastName("");
    setProjectDetails("");
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    setBookingError("");
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        firstName,
        lastName,
        email: user.email,
        projectDetails,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setBookingSuccess(true);
      setProjectDetails("");
    } catch (err: any) {
      console.error("Firestore booking error:", err);
      if (err.message?.includes("Missing or insufficient permissions")) {
        setBookingError(
          "Permission denied. Please update your Firestore Security Rules in the Firebase Console to allow writes to the 'bookings' collection.",
        );
      } else {
        setBookingError(err.message || "Failed to submit booking");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kallaprince221@gmail.com");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Let&apos;s Build <br /> Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Great.
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light max-w-md">
              If you have any questions, feedback, business inquiries, or
              support-related concerns, feel free to contact us anytime. We are
              committed to providing professional web development services,
              modern digital solutions, and the best possible user experience.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 mb-16">
              <a
                href="https://github.com/prince8160"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                  <Github
                    size={28}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0">
                  GitHub
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/prince-kala-b38754334"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                  <Linkedin
                    size={28}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  LinkedIn
                </span>
              </a>

              <a
                href="mailto:kallaprince221@gmail.com"
                className="group relative flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                  <Mail
                    size={28}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0">
                  Email
                </span>
              </a>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit mb-16 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
              <Mail className="text-orange-500 w-5 h-5 hidden sm:block" />
              <span className="text-gray-300 font-medium">
                kallaprince221@gmail.com
              </span>
              <button
                onClick={handleCopyEmail}
                className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
                aria-label="Copy email address"
              >
                {hasCopied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {!user ? (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {authMode === "login"
                        ? "Sign In to Book"
                        : "Create an Account"}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Please authenticate to submit your project request.
                    </p>
                  </div>

                  {authError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl py-4 font-medium transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Authenticating..."
                        : authMode === "login"
                          ? "Sign In"
                          : "Sign Up"}
                    </button>
                  </form>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#0B0B0B] text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleGoogleAuth}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl py-4 font-medium hover:bg-gray-100 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>

                  <div className="text-center mt-6">
                    <button
                      onClick={() =>
                        setAuthMode(authMode === "login" ? "signup" : "login")
                      }
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {authMode === "login"
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Project Booking
                      </h3>
                      <p className="text-sm text-orange-400">
                        Signed in as {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Sign Out"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>

                  {bookingSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        Booking Received!
                      </h4>
                      <p className="text-gray-400 mb-6">
                        Thank you for reaching out. I will get back to you
                        shortly.
                      </p>
                      <button
                        onClick={() => setBookingSuccess(false)}
                        className="text-orange-400 hover:text-orange-300 font-medium"
                      >
                        Submit another booking
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submitBooking} className="space-y-6">
                      {bookingError && (
                        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                          {bookingError}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400 ml-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400 ml-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user.email || ""}
                          className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-4 text-gray-400 cursor-not-allowed font-light"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">
                          Project Details
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={projectDetails}
                          onChange={(e) => setProjectDetails(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-light resize-none"
                          placeholder="Tell me about your project requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl py-4 font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Send Message"}
                        {!isSubmitting && (
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
