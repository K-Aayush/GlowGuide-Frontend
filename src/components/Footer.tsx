import { Link } from "react-router-dom";
import { Sparkles, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">GlowGuide</span>
            </div>
            <p className="mt-4 text-sm text-foreground/70">
              Your personal guide to achieving healthy, glowing skin. We provide
              personalized routines, expert advice, and progress tracking.
            </p>
            <div className="flex mt-6 space-x-4">
              <a
                href="#"
                className="transition-colors text-foreground/70 hover:text-primary"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="transition-colors text-foreground/70 hover:text-primary"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="transition-colors text-foreground/70 hover:text-primary"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Learn</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/skincare-101"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Skincare 101
                </Link>
              </li>
              <li>
                <Link
                  to="/ingredients-guide"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Ingredients Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/product-recommendations"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Product Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Sustainable Beauty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about-us"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/for-dermatologists"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  For Dermatologists
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm transition-colors text-foreground/70 hover:text-primary"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center pt-8 mt-8 border-t border-border md:flex-row md:justify-between">
          <p className="text-xs text-foreground/70">
            &copy; {new Date().getFullYear()} GlowGuide. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <a
              href="mailto:contact@glowguide.com"
              className="flex items-center text-xs transition-colors text-foreground/70 hover:text-primary"
            >
              <Mail className="w-4 h-4 mr-1" />
              contact@glowguide.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
