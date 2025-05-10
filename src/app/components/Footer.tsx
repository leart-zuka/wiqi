"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  // Update year if needed when component mounts
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  WiQi
                </span>
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
              Exploring quantum computing concepts through interactive education
              and visualization. Making quantum accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/posts/quantum_tuesdays"
                  className="text-sm text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  Quantum Tuesdays
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/entries"
                  className="text-sm text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  Entries
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © {year}, Built with{" "}
            <span className="inline-block animate-pulse text-red-500 dark:text-red-400">
              <Heart className="inline h-4 w-4" />
            </span>{" "}
            by Humans for Humans
          </p>
        </div>
      </div>
    </footer>
  );
}
