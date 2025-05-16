"use client"

import { useEffect, useState } from "react"
import { AlertCircle, ArrowUpRight, Clock, CheckCircle, XCircle, User, ChevronRight } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TruncatedText = ({ text, maxLength = 50 }: { text: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!text) return null
  
  if (text.length <= maxLength) {
    return <span>{text}</span>
  }

  return (
    <div className="relative">
      <span>{isExpanded ? text : `${text.slice(0, maxLength)}...`}</span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-sm text-blue-500 hover:text-blue-600"
      >
        {isExpanded ? "Show less" : "See more"}
      </button>
    </div>
  )
}

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [feedback, setFeedback] = useState<any[]>([])
  const [anonymousComplaints, setAnonymousComplaints] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [timeframe, setTimeframe] = useState("7d")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClientComponentClient()
    
    const fetchData = async () => {
      try {
        const [
          { data: complaintsData },
          { data: feedbackData },
          { data: anonymousData },
          { data: departmentsData },
          { data: usersData }
        ] = await Promise.all([
          supabase.from('complaints').select('*'),
          supabase.from('feedback').select('*'),
          supabase.from('anonymous_complaints').select('*'),
          supabase.from('departments').select('*'),
          supabase.from('users').select('*')
        ])

        setComplaints(complaintsData || [])
        setFeedback(feedbackData || [])
        setAnonymousComplaints(anonymousData || [])
        setDepartments(departmentsData || [])
        setUsers(usersData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Stats for the dashboard
  const stats = {
    totalComplaints: complaints.length,
    pendingComplaints: complaints.filter((c) => c.status === "pending").length,
    inProgressComplaints: complaints.filter((c) => c.status === "in_progress").length,
    resolvedComplaints: complaints.filter((c) => c.status === "resolved").length,
    rejectedComplaints: complaints.filter((c) => c.status === "rejected").length,
    totalFeedback: feedback.length,
    totalAnonymous: anonymousComplaints.length,
    totalDepartments: departments.length,
    totalUsers: users.length
  }

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingComplaints} pending, {stats.resolvedComplaints} resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFeedback}</div>
            <p className="text-xs text-muted-foreground">From users and services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anonymous Complaints</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnonymous}</div>
            <p className="text-xs text-muted-foreground">Total anonymous submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest registered users</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.slice(0, 8).map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      <Badge className="mt-1" variant="secondary">{user.role}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across all sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...complaints, ...feedback, ...anonymousComplaints]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.type || 'Complaint'}</TableCell>
                        <TableCell>{item.details || item.description || item.complaint_details}</TableCell>
                        <TableCell>
                          <Badge>{item.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>Complaints</CardTitle>
              <CardDescription>All complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead className="w-[200px]">Email</TableHead>
                      <TableHead className="w-[150px]">Service</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.name}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{complaint.email}</TableCell>
                        <TableCell className="truncate max-w-[150px]">{complaint.service}</TableCell>
                        <TableCell>
                          <Badge>{complaint.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>All feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Email</TableHead>
                      <TableHead className="w-[150px]">Service</TableHead>
                      <TableHead className="w-[100px]">Rating</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="truncate max-w-[200px]">{item.email}</TableCell>
                        <TableCell className="truncate max-w-[150px]">{item.service}</TableCell>
                        <TableCell>{item.rating}</TableCell>
                        <TableCell className="max-w-[300px]">
                          <TruncatedText text={item.feedback_details} maxLength={50} />
                        </TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anonymous">
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Complaints</CardTitle>
              <CardDescription>All anonymous complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[150px]">Location</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {anonymousComplaints.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.complaint_type}</TableCell>
                        <TableCell className="max-w-[300px]">
                          <TruncatedText text={item.description} maxLength={50} />
                        </TableCell>
                        <TableCell className="truncate max-w-[150px]">{item.location}</TableCell>
                        <TableCell>
                          <Badge>{item.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>All departments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell>{dept.name}</TableCell>
                      <TableCell>{dept.description}</TableCell>
                      <TableCell>{dept.code}</TableCell>
                      <TableCell>{new Date(dept.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>All users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.department_id}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
