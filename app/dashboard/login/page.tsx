"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Hexagon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // In a real app, you would validate credentials against a backend
      if (formData.email === "admin@example.com" && formData.password === "password") {
        // Store token and user data
        localStorage.setItem("admin-token", "mock-jwt-token")
        localStorage.setItem(
          "user-data",
          JSON.stringify({
            id: "1",
            name: "Admin User",
            email: formData.email,
            role: "administrator",
          }),
        )

        toast({
          title: "Login successful",
          description: "Welcome back to the admin dashboard",
        })

        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-token")
    localStorage.removeItem("user-data")
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
    router.push("/dashboard/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Background grid pattern */}
          <div className="h-full w-full bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
      </div>

      <Card className="mx-auto max-w-sm bg-slate-900/70 border-slate-700/50 backdrop-blur-sm text-slate-100">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Hexagon className="h-10 w-10 text-cyan-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-800/50 border-slate-700 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Button variant="link" className="h-auto p-0 text-sm text-cyan-400 hover:text-cyan-300" type="button">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-slate-800/50 border-slate-700 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
