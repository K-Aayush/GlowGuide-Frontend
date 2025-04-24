import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  Menu,
  UserCircle,
  LogOut,
  Home,
  Calendar,
  Droplets,
  Camera,
  Settings,
  Search,
  MessageSquare,
  Bot,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { AppContext } from "../context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import NotificationCenter from "./notification/NotificationCenter";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userData, logout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Define links based on user role
  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: "/", label: "Home", icon: <Home className="w-5 h-5 mr-2" /> },
        {
          to: "/skincare-101",
          label: "Skincare 101",
          icon: <Droplets className="w-5 h-5 mr-2" />,
        },
        {
          to: "/about-us",
          label: "About Us",
          icon: <UserCircle className="w-5 h-5 mr-2" />,
        },
      ];
    }

    if (userData?.role === "USER") {
      return [
        {
          to: "/user/dashboard",
          label: "Dashboard",
          icon: <Home className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/skin-assessment",
          label: "Skin Assessment",
          icon: <Search className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/routines",
          label: "My Routines",
          icon: <Calendar className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/progress",
          label: "Progress Tracker",
          icon: <Camera className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/products",
          label: "Products",
          icon: <Droplets className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/ai-recommendations",
          label: "Ai",
          icon: <Bot className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/chat",
          label: "Chat",
          icon: <MessageSquare className="w-5 h-5 mr-2" />,
        },
        {
          to: "/user/appointments",
          label: "Appointments",
          icon: <Calendar className="w-5 h-5 mr-2" />,
        },
      ];
    }

    if (userData?.role === "DERMATOLOGISTS") {
      return [
        {
          to: "/dermatologist/dashboard",
          label: "Dashboard",
          icon: <Home className="w-5 h-5 mr-2" />,
        },
        {
          to: "/dermatologist/chat",
          label: "Chat",
          icon: <MessageSquare className="w-5 h-5 mr-2" />,
        },
        {
          to: "/dermatologist/appointments",
          label: "Appointments",
          icon: <Calendar className="w-5 h-5 mr-2" />,
        },
      ];
    }

    if (userData?.role === "ADMIN") {
      return [
        {
          to: "/admin/dashboard",
          label: "Dashboard",
          icon: <Home className="w-5 h-5 mr-2" />,
        },
        {
          to: "/admin/products",
          label: "Products",
          icon: <Droplets className="w-5 h-5 mr-2" />,
        },
        {
          to: "/admin/users",
          label: "Users",
          icon: <UserCircle className="w-5 h-5 mr-2" />,
        },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full h-16 px-6 mx-auto">
        <div className="flex items-center">
          <Link
            to={
              isAuthenticated
                ? userData?.role === "USER"
                  ? "/user/dashboard"
                  : userData?.role === "DERMATOLOGISTS"
                  ? "/dermatologist/dashboard"
                  : "/admin/dashboard"
                : "/"
            }
            className="flex items-center space-x-2 mr-4git"
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="hidden text-xl font-bold sm:inline-block">
              GlowGuide
            </span>
          </Link>

          <nav className="items-center hidden ml-6 space-x-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center transition-colors hover:text-primary ${
                  location.pathname === link.to
                    ? "text-primary font-medium"
                    : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated && <NotificationCenter />}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 focus:ring-0"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden md:inline">
                    {userData?.name || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex flex-col py-4">
                <Link
                  to={
                    isAuthenticated
                      ? userData?.role === "USER"
                        ? "/user/dashboard"
                        : userData?.role === "DERMATOLOGISTS"
                        ? "/dermatologist/dashboard"
                        : "/admin/dashboard"
                      : "/"
                  }
                  className="flex items-center mb-6 space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">GlowGuide</span>
                </Link>

                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        location.pathname === link.to
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}

                  {isAuthenticated && (
                    <>
                      <div className="h-px my-2 bg-border" />
                      <Link
                        to={
                          userData?.role === "USER"
                            ? "/user/profile"
                            : userData?.role === "DERMATOLOGISTS"
                            ? "/dermatologist/profile"
                            : "/admin/profile"
                        }
                        className="flex items-center p-2 rounded-lg hover:bg-muted"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5 mr-2" />
                        Profile
                      </Link>
                      <button
                        className="flex items-center w-full p-2 text-left text-red-500 rounded-lg hover:bg-red-500/10"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
