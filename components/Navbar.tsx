"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { AuthModal } from "./AuthModal";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Skills", href: "/#skills" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut(auth);
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            className="text-2xl font-display font-bold tracking-tighter"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              KALLA
            </span>{" "}
            PRINCE
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
              {!user ? (
                <>
                  <button
                    onClick={() => openAuth("login")}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth("signup")}
                    className="px-5 py-2 rounded-full border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-orange-500/30 bg-white/5 transition-all"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.displayName?.charAt(0).toUpperCase() ||
                          user.email?.charAt(0).toUpperCase() ||
                          "U"}
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden py-2"
                      >
                        <div className="px-4 py-2 border-b border-white/5 mb-2">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Signed in as
                          </p>
                          <p className="text-sm text-white font-medium truncate">
                            {user.displayName || user.email}
                          </p>
                        </div>
                        <a
                          href="#contact"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          Book Project
                        </a>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 top-0 pt-24 pb-8 px-6 md:hidden bg-black/98 backdrop-blur-2xl overflow-y-auto z-40 flex flex-col"
            >
              <div className="flex flex-col items-center gap-6 mb-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-medium text-gray-300 hover:text-white transition-colors font-display"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4 max-w-sm mx-auto w-full">
                {!user ? (
                  <>
                    <button
                      onClick={() => openAuth("login")}
                      className="w-full py-4 rounded-xl border border-white/20 text-white font-medium text-lg hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuth("signup")}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                          {user.displayName?.charAt(0).toUpperCase() ||
                            user.email?.charAt(0).toUpperCase() ||
                            "U"}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-white font-medium truncate">
                          {user.displayName || "Developer"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full py-4 rounded-xl border border-red-500/30 text-red-400 font-medium text-lg hover:bg-red-500/10 transition-colors flex justify-center items-center gap-2"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
}
