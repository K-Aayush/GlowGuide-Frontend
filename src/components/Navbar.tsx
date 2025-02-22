import { Link } from "react-router-dom";
import { Sparkles, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-6 flex w-full h-14 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">GlowGuide</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/analysis"
              className="transition-colors hover:text-foreground/80"
            >
              Skin Analysis
            </Link>
            <Link
              to="/routine"
              className="transition-colors hover:text-foreground/80"
            >
              Routine
            </Link>
            <Link
              to="/progress"
              className="transition-colors hover:text-foreground/80"
            >
              Progress
            </Link>
            <Link
              to="/dashboard"
              className="transition-colors hover:text-foreground/80"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6" />
                <span className="font-bold">GlowGuide</span>
              </Link>
              <Link to="/analysis">Skin Analysis</Link>
              <Link to="/routine">Routine</Link>
              <Link to="/progress">Progress</Link>
              <Link to="/dashboard">Dashboard</Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </header>
  );
}
