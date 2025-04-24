import React from "react"
import Link from "next/link"
import { Twitter, Linkedin, Youtube, Github, Send } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black px-4 py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between space-y-4 md:space-y-0">
        {/* Navigation links */}
        <nav className="flex w-full flex-wrap justify-center space-x-4 md:w-auto md:justify-start md:space-x-6">
          <Link
            href="/about-us"
            className="transition-colors hover:text-gray-300"
          >
            About Us
          </Link>
          <Link
            href="/gitbook"
            className="flex items-center transition-colors hover:text-gray-300"
          >
            Go to Gitbook
            <Send className="ml-1 h-4 w-4 rotate-45" />
          </Link>
        </nav>

        {/* Social icons and text */}
        <div className="flex w-full flex-col items-center justify-center space-y-4 md:w-auto md:flex-row md:justify-between md:space-x-8 md:space-y-0">
          <div className="flex justify-center space-x-4">
            <Link
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              <Send className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center text-sm text-gray-300 md:flex-row md:space-x-4 md:space-y-0 md:text-left">
            <span>© 2024 Spheroid. All rights reserved.</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
