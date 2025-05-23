"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Hexagon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "@/lib/supabase/auth"

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    
    try {
      const { data, error } = await signIn(values.email, values.password)
      
      if (error) throw error
      
      toast({
        title: "Login successful",
        description: "Welcome back to the admin dashboard",
      })
      
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid email or password",
      })
    } finally {
      setIsLoading(false)
    }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@example.com"
                        className="bg-slate-800/50 border-slate-700 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-300">Password</FormLabel>
                      <Button variant="link" className="h-auto p-0 text-sm text-cyan-400 hover:text-cyan-300" type="button">
                        Forgot password?
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-slate-800/50 border-slate-700 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </Form>
        <div className="p-4 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Button variant="link" className="h-auto p-0 text-sm text-cyan-400 hover:text-cyan-300" onClick={() => router.push('/auth/register')}>
            Register here
          </Button>
        </div>
      </Card>
    </div>
  )
}