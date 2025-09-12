// Header.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LuMenu } from "react-icons/lu";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {};

  return (
    <header className="fixed w-full top-0 z-40 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Mobile menu button */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle menu">
            <LuMenu size={22} className="h-5 w-5" />
          </Button>
        </div>

        {/* Left side - Desktop logo */}
        <div className="hidden sm:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            Portfolio
          </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
