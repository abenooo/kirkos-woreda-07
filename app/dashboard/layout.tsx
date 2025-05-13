"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  Command,
  Hexagon,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Suspense } from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Simulate authentication check
  useEffect(() => {
    // In a real app, you would check for a valid session/token
    const checkAuth = () => {
      const token = localStorage.getItem("admin-token")
      if (!token && pathname !== "/dashboard/login") {
        setIsAuthenticated(false)
        router.push("/dashboard/login")
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("admin-token")
    localStorage.removeItem("user-data")
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
    router.push("/dashboard/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Command,
    },
    {
      name: "Complaints",
      href: "/dashboard/complaints",
      icon: MessageSquare,
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: ClipboardList,
    },
    {
      name: "Departments",
      href: "/dashboard/departments",
      icon: Building2,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Client Portal",
      href: "/client",
      icon: Users,
      external: true,
    },
  ]

  // If on login page, don't show the dashboard layout
  if (pathname === "/dashboard/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col bg-slate-900/50 border-r border-slate-700/50 backdrop-blur-sm h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
              <div className="flex items-center space-x-2">
                <Hexagon className="h-8 w-8 text-cyan-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Sub-City Admin
                </span>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-slate-800 text-slate-100"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {item.external && <ExternalLink className="ml-1 h-3 w-3" />}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-700/50 px-4">
                <div className="text-xs text-slate-500 mb-2 font-mono px-2">SYSTEM STATUS</div>
                <div className="space-y-3">
                  <StatusItem label="Core Systems" value={85} color="cyan" />
                  <StatusItem label="Security" value={75} color="green" />
                  <StatusItem label="Network" value={92} color="blue" />
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-slate-700/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="bg-slate-700 text-cyan-500">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-slate-400">Administrator</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="border-b border-slate-700/50">
            <div className="flex h-16 items-center px-4 md:px-6">
              <div className="md:hidden">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                  <Command className="h-5 w-5" />
                </Button>
              </div>

              <div className="hidden md:flex md:flex-1 md:items-center md:space-x-2 md:ml-4">
                <div className="bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-slate-400 mr-2" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                        <AvatarFallback className="bg-slate-700 text-cyan-500">AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700 text-slate-100">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="hover:bg-slate-700">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-700">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem onClick={handleLogout} className="hover:bg-slate-700">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            <Suspense fallback={<>Loading...</>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active?: boolean }) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
