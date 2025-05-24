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
  LogOut,
  MessageSquare,
  Settings,
  Users,
  UserPlus,
  Shield,
  Newspaper,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Suspense } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) throw error

        if (session) {
          setUser(session.user)
          setUserRole(session.user.user_metadata?.role || "staff")
        }
      } catch (error) {
        console.error("Auth error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setUserRole(session?.user?.user_metadata?.role || "staff")
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      })
      router.push("/dashboard/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      })
    }
  }

  // Define navigation items with role-based filtering
  const getNavItems = () => {
    const baseItems = [
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
        name: "Feedback",
        href: "/dashboard/feedbacks",
        icon: ClipboardList,
      },
      {
        name: "Anonymous Complaints",
        href: "/dashboard/anonymous_complaints",
        icon: Shield,
      },
    ]

    const adminItems = [
      {
        name: "Register",
        href: "/dashboard/register",
        icon: UserPlus,
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
        name: "News",
        href: "/dashboard/news",
        icon: Newspaper,
      },
      {
        name: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
      },
    ]

    const commonItems = [
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]

    // Return different navigation based on role
    if (userRole === "administrator") {
      return [...baseItems, ...adminItems, ...commonItems]
    } else {
      // For department heads and staff, show limited navigation
      return [...baseItems, ...commonItems]
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (pathname === "/dashboard/login") {
    return <>{children}</>
  }

  const navItems = getNavItems()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Shield className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin Dashboard</span>
                    <span className="truncate text-xs">
                      {userRole === "administrator" ? "System Admin" : "Department User"}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <h1 className="text-lg font-semibold">
              {navItems.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
