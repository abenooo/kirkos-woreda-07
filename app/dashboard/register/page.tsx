// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { useToast } from "@/components/ui/use-toast"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { UserPlus, Users, CheckCircle2, AlertTriangle, Mail, RefreshCw } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { getAuthenticatedUsers } from "@/app/actions/user-actions"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
//   role: z.string().min(1, {
//     message: "Please select a role.",
//   }),
//   department_id: z.string().min(1, {
//     message: "Please select a department.",
//   }),
// })

// interface Department {
//   id: number
//   name: string
//   code: string
// }

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   department_id: number
//   status: string
//   created_at: string
//   email_confirmed_at?: string
//   last_sign_in_at?: string
// }

// export default function RegisterPage() {
//   const [departments, setDepartments] = useState<Department[]>([])
//   const [users, setUsers] = useState<User[]>([])
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [currentUser, setCurrentUser] = useState<any>(null)
//   const [userRole, setUserRole] = useState<string>("")
//   const [loading, setLoading] = useState(true)
//   const [fetchingUsers, setFetchingUsers] = useState(false)

//   const supabase = createClientComponentClient()
//   const { toast } = useToast()
//   const router = useRouter()

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//       department_id: "",
//     },
//   })

//   // Check if user is admin
//   useEffect(() => {
//     const checkAuth = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession()

//       if (!session?.user) {
//         router.push("/dashboard/login")
//         return
//       }

//       const role = session.user.user_metadata?.role || "staff"
//       setCurrentUser(session.user)
//       setUserRole(role)

//       // Only administrators can access this page
//       if (role !== "administrator") {
//         toast({
//           variant: "destructive",
//           title: "Access Denied",
//           description: "Only administrators can register new users.",
//         })
//         router.push("/dashboard")
//         return
//       }

//       setLoading(false)
//     }

//     checkAuth()
//   }, [supabase, router, toast])

//   // Fetch departments and users
//   useEffect(() => {
//     if (userRole === "administrator") {
//       fetchDepartments()
//       fetchUsers()
//     }
//   }, [userRole])

//   const fetchDepartments = async () => {
//     try {
//       const { data, error } = await supabase.from("departments").select("*").order("name")
//       if (error) throw error
//       setDepartments(data || [])
//     } catch (error) {
//       console.error("Error fetching departments:", error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch departments.",
//       })
//     }
//   }

//   const fetchUsers = async () => {
//     setFetchingUsers(true)
//     try {
//       console.log("Fetching users via server action...")

//       const result = await getAuthenticatedUsers()

//       if (!result.success) {
//         console.error("Server action error:", result.error)
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: result.error || "Failed to fetch users",
//         })
//         return
//       }

//       console.log("Users fetched successfully:", result.users.length)
//       setUsers(result.users)
//     } catch (error) {
//       console.error("Exception fetching users:", error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch users. Check console for details.",
//       })
//     } finally {
//       setFetchingUsers(false)
//     }
//   }

//   const getDepartmentName = (departmentId: number) => {
//     const dept = departments.find((d) => d.id === departmentId)
//     return dept ? dept.name : "Unknown"
//   }

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       console.log("Registering user with metadata:", {
//         name: values.name,
//         role: values.role,
//         department_id: Number.parseInt(values.department_id),
//         status: "active",
//       })

//       // Sign up the user with proper email confirmation
//       const { data, error } = await supabase.auth.signUp({
//         email: values.email,
//         password: values.password,
//         options: {
//           data: {
//             name: values.name,
//             role: values.role,
//             department_id: Number.parseInt(values.department_id),
//             status: "active",
//           },
//           emailRedirectTo: `${window.location.origin}/dashboard/login`,
//         },
//       })

//       if (error) {
//         console.error("Signup error:", error)
//         toast({
//           variant: "destructive",
//           title: "Registration Failed",
//           description: error.message || "Failed to register user. Please try again.",
//         })
//       } else {
//         console.log("Signup successful:", data)

//         // Check if user was created but needs email confirmation
//         if (data.user && !data.user.email_confirmed_at) {
//           toast({
//             title: "User Registered Successfully",
//             description: (
//               <div className="flex items-start space-x-2">
//                 <Mail className="h-4 w-4 mt-0.5 text-blue-500" />
//                 <div>
//                   <p className="font-medium">{values.name} has been registered!</p>
//                   <p className="text-sm text-muted-foreground">
//                     A confirmation email has been sent to {values.email}. They must confirm their email before logging
//                     in.
//                   </p>
//                 </div>
//               </div>
//             ),
//           })
//         } else {
//           toast({
//             title: "User Registered Successfully",
//             description: `${values.name} has been registered and can now log in.`,
//           })
//         }

//         // Reset form
//         form.reset()

//         // Refresh users list
//         fetchUsers()
//       }
//     } catch (error) {
//       console.error("Registration error:", error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const resendConfirmationEmail = async (email: string, userName: string) => {
//     try {
//       const { error } = await supabase.auth.resend({
//         type: "signup",
//         email: email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/dashboard/login`,
//         },
//       })

//       if (error) {
//         toast({
//           variant: "destructive",
//           title: "Failed to Resend Email",
//           description: error.message,
//         })
//       } else {
//         toast({
//           title: "Confirmation Email Sent",
//           description: `A new confirmation email has been sent to ${email}`,
//         })
//       }
//     } catch (error) {
//       console.error("Error resending confirmation email:", error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to resend confirmation email.",
//       })
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   // Get the 5 most recent users, sorted by creation date
//   const recentUsers = users
//     .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
//     .slice(0, 5)

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight flex items-center">
//             <UserPlus className="h-8 w-8 mr-3 text-primary" />
//             User Registration
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Register new users and manage user accounts. Users will receive email confirmation.
//           </p>
//         </div>
//       </div>

//       {/* Email Configuration Notice */}
//       <Card className="border-blue-200 bg-blue-50">
//         <CardContent className="pt-6">
//           <div className="flex items-start space-x-3">
//             <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
//             <div>
//               <h3 className="font-medium text-blue-900">Email Confirmation Required</h3>
//               <p className="text-sm text-blue-700 mt-1">
//                 New users will receive a confirmation email and must verify their email address before they can log in.
//                 Make sure your Supabase email settings are properly configured.
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Registration Form */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <UserPlus className="h-5 w-5 mr-2" />
//               Register New User
//             </CardTitle>
//             <CardDescription>
//               Create a new user account. The user will receive an email confirmation link.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Full Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John Doe" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email Address</FormLabel>
//                       <FormControl>
//                         <Input type="email" placeholder="john.doe@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input type="password" placeholder="Minimum 8 characters" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="staff">Staff</SelectItem>
//                           <SelectItem value="department_head">Department Head</SelectItem>
//                           <SelectItem value="administrator">Administrator</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="department_id"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Department</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a department" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {departments.map((department) => (
//                             <SelectItem key={department.id} value={department.id.toString()}>
//                               {department.name} ({department.code})
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button type="submit" className="w-full" disabled={isSubmitting}>
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
//                       Registering User...
//                     </>
//                   ) : (
//                     <>
//                       <UserPlus className="w-4 h-4 mr-2" />
//                       Register User
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>

//         {/* Recent Users */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 Recent Users
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={fetchUsers}
//                 disabled={fetchingUsers}
//                 className="flex items-center gap-2"
//               >
//                 <RefreshCw className={`h-4 w-4 ${fetchingUsers ? "animate-spin" : ""}`} />
//                 {fetchingUsers ? "Loading..." : "Refresh"}
//               </Button>
//             </CardTitle>
//             <CardDescription>5 most recently registered users in the system.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {fetchingUsers ? (
//                 <div className="text-center py-8 text-muted-foreground">
//                   <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
//                   <p>Loading recent users...</p>
//                 </div>
//               ) : recentUsers.length === 0 ? (
//                 <div className="text-center py-8 text-muted-foreground">
//                   <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                   <p>No users found.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {recentUsers.map((user) => (
//                     <div
//                       key={user.id}
//                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
//                           {user.name?.charAt(0)?.toUpperCase() || "U"}
//                         </div>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-muted-foreground">{user.email}</p>
//                           {!user.email_confirmed_at && (
//                             <p className="text-xs text-yellow-600 flex items-center">
//                               <AlertTriangle className="h-3 w-3 mr-1" />
//                               Pending email confirmation
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="text-right flex items-center space-x-2">
//                         <div>
//                           <div className="flex items-center space-x-2 mb-1">
//                             <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
//                               {user.role}
//                             </span>
//                             {user.email_confirmed_at ? (
//                               <CheckCircle2 className="h-4 w-4 text-green-500" />
//                             ) : (
//                               <AlertTriangle className="h-4 w-4 text-yellow-500" />
//                             )}
//                           </div>
//                           <p className="text-xs text-muted-foreground">{getDepartmentName(user.department_id)}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(user.created_at).toLocaleDateString()}
//                           </p>
//                         </div>
//                         {!user.email_confirmed_at && (
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => resendConfirmationEmail(user.email, user.name)}
//                             className="text-xs"
//                           >
//                             <Mail className="h-3 w-3 mr-1" />
//                             Resend
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {users.length > 5 && (
//                 <div className="text-center pt-4">
//                   <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/users")}>
//                     View All {users.length} Users
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* All Registered Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Registered Users</CardTitle>
//           <CardDescription>Complete list of all users in the system.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Registered</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {fetchingUsers ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-8">
//                       <div className="flex items-center justify-center">
//                         <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2"></div>
//                         Loading users...
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : users.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-8">
//                       No users found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   users.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell className="font-medium">{user.name}</TableCell>
//                       <TableCell>
//                         <div className="flex flex-col">
//                           <span>{user.email}</span>
//                           {user.email_confirmed_at ? (
//                             <span className="text-xs text-green-600 flex items-center">
//                               <CheckCircle2 className="h-3 w-3 mr-1" />
//                               Email confirmed
//                             </span>
//                           ) : (
//                             <span className="text-xs text-yellow-600 flex items-center">
//                               <AlertTriangle className="h-3 w-3 mr-1" />
//                               Pending confirmation
//                             </span>
//                           )}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
//                           {user.role}
//                         </span>
//                       </TableCell>
//                       <TableCell>{getDepartmentName(user.department_id)}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center space-x-2">
//                           {user.email_confirmed_at ? (
//                             <>
//                               <CheckCircle2 className="h-4 w-4 text-green-500" />
//                               <div className="flex flex-col">
//                                 <span className="text-green-700 text-sm">Active</span>
//                                 {user.last_sign_in_at && (
//                                   <span className="text-xs text-muted-foreground">
//                                     Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}
//                                   </span>
//                                 )}
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <AlertTriangle className="h-4 w-4 text-yellow-500" />
//                               <span className="text-yellow-700">Pending Email Confirmation</span>
//                             </>
//                           )}
//                         </div>
//                       </TableCell>
//                       <TableCell>{user.created_at ? new Date(user.created_at).toLocaleDateString() : ""}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { UserPlus, Users, CheckCircle2, AlertTriangle, Mail, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { getAuthenticatedUsers } from "@/app/actions/user-actions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string().min(1, {
    message: "Please select a role.",
  }),
  department_id: z.string().min(1, {
    message: "Please select a department.",
  }),
})

interface Department {
  id: number
  name: string
  code: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  department_id: number
  status: string
  created_at: string
  email_confirmed_at?: string
  last_sign_in_at?: string
}

export default function RegisterPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [fetchingUsers, setFetchingUsers] = useState(false)

  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      department_id: "",
    },
  })

  // Check if user is admin
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push("/dashboard/login")
        return
      }

      const role = session.user.user_metadata?.role || "staff"
      setCurrentUser(session.user)
      setUserRole(role)

      // Only administrators can access this page
      if (role !== "administrator") {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Only administrators can register new users.",
        })
        router.push("/dashboard")
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [supabase, router, toast])

  // Fetch departments and users
  useEffect(() => {
    if (userRole === "administrator") {
      fetchDepartments()
      fetchUsers()
    }
  }, [userRole])

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase.from("departments").select("*").order("name")
      if (error) throw error
      setDepartments(data || [])
    } catch (error) {
      console.error("Error fetching departments:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch departments.",
      })
    }
  }

  const fetchUsers = async () => {
    setFetchingUsers(true)
    try {
      console.log("Fetching users via server action...")

      const result = await getAuthenticatedUsers()

      if (!result.success) {
        console.error("Server action error:", result.error)
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to fetch users",
        })
        return
      }

      console.log("Users fetched successfully:", result.users.length)
      setUsers(result.users)
    } catch (error) {
      console.error("Exception fetching users:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users. Check console for details.",
      })
    } finally {
      setFetchingUsers(false)
    }
  }

  const getDepartmentName = (departmentId: number) => {
    const dept = departments.find((d) => d.id === departmentId)
    return dept ? dept.name : "Unknown"
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      console.log("Registering user with metadata:", {
        name: values.name,
        role: values.role,
        department_id: Number.parseInt(values.department_id),
        status: "active",
      })

      // Sign up the user with proper email confirmation
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            role: values.role,
            department_id: Number.parseInt(values.department_id),
            status: "active",
          },
          emailRedirectTo: `${window.location.origin}/dashboard/login`,
        },
      })

      if (error) {
        console.error("Signup error:", error)
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: (
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 text-red-500" />
              <div>
                <p className="font-medium">Unable to register user</p>
                <p className="text-sm text-muted-foreground">
                  {error.message || "Failed to register user. Please try again."}
                </p>
              </div>
            </div>
          ),
          duration: 6000,
        })
      } else {
        console.log("Signup successful:", data)

        // Check if user was created but needs email confirmation
        if (data.user && !data.user.email_confirmed_at) {
          toast({
            title: "✅ User Registered Successfully!",
            description: (
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-green-900">{values.name} has been registered!</p>
                  <p className="text-sm text-green-700 mt-1">
                    📧 A confirmation email has been sent to <strong>{values.email}</strong>
                  </p>
                  <p className="text-xs text-green-600 mt-1">They must confirm their email before logging in.</p>
                </div>
              </div>
            ),
            duration: 8000,
          })
        } else {
          toast({
            title: "✅ User Registered Successfully!",
            description: (
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-green-900">{values.name} has been registered!</p>
                  <p className="text-sm text-green-700">🎉 They can now log in immediately.</p>
                </div>
              </div>
            ),
            duration: 5000,
          })
        }

        // Reset form
        form.reset()

        // Refresh users list
        fetchUsers()

        // Show a brief success animation on the form
        const formElement = document.querySelector("form")
        if (formElement) {
          formElement.classList.add("animate-pulse")
          setTimeout(() => {
            formElement.classList.remove("animate-pulse")
          }, 1000)
        }
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resendConfirmationEmail = async (email: string, userName: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/login`,
        },
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to Resend Email",
          description: error.message,
        })
      } else {
        toast({
          title: "📧 Confirmation Email Sent!",
          description: (
            <div className="flex items-start space-x-2">
              <Mail className="h-4 w-4 mt-0.5 text-blue-500" />
              <div>
                <p className="font-medium">Email sent successfully</p>
                <p className="text-sm text-muted-foreground">
                  A new confirmation email has been sent to <strong>{email}</strong>
                </p>
              </div>
            </div>
          ),
          duration: 5000,
        })
      }
    } catch (error) {
      console.error("Error resending confirmation email:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend confirmation email.",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Get the 5 most recent users, sorted by creation date
  const recentUsers = users
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <UserPlus className="h-8 w-8 mr-3 text-primary" />
            User Registration
          </h1>
          <p className="text-muted-foreground mt-2">
            Register new users and manage user accounts. Users will receive email confirmation.
          </p>
        </div>
      </div>

      {/* Email Configuration Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Email Confirmation Required</h3>
              <p className="text-sm text-blue-700 mt-1">
                New users will receive a confirmation email and must verify their email address before they can log in.
                Make sure your Supabase email settings are properly configured.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Register New User
            </CardTitle>
            <CardDescription>
              Create a new user account. The user will receive an email confirmation link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Minimum 8 characters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="department_head">Department Head</SelectItem>
                          <SelectItem value="administrator">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem key={department.id} value={department.id.toString()}>
                              {department.name} ({department.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Registering User...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Register User
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Users
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUsers}
                disabled={fetchingUsers}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${fetchingUsers ? "animate-spin" : ""}`} />
                {fetchingUsers ? "Loading..." : "Refresh"}
              </Button>
            </CardTitle>
            <CardDescription>5 most recently registered users in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fetchingUsers ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading recent users...</p>
                </div>
              ) : recentUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No users found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          {!user.email_confirmed_at && (
                            <p className="text-xs text-yellow-600 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Pending email confirmation
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {user.role}
                            </span>
                            {user.email_confirmed_at ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{getDepartmentName(user.department_id)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {!user.email_confirmed_at && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resendConfirmationEmail(user.email, user.name)}
                            className="text-xs"
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Resend
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {users.length > 5 && (
                <div className="text-center pt-4">
                  <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/users")}>
                    View All {users.length} Users
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Registered Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Registered Users</CardTitle>
          <CardDescription>Complete list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fetchingUsers ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2"></div>
                        Loading users...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{user.email}</span>
                          {user.email_confirmed_at ? (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Email confirmed
                            </span>
                          ) : (
                            <span className="text-xs text-yellow-600 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Pending confirmation
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{getDepartmentName(user.department_id)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {user.email_confirmed_at ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <div className="flex flex-col">
                                <span className="text-green-700 text-sm">Active</span>
                                {user.last_sign_in_at && (
                                  <span className="text-xs text-muted-foreground">
                                    Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-yellow-700">Pending Email Confirmation</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{user.created_at ? new Date(user.created_at).toLocaleDateString() : ""}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
