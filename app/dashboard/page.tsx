"use client"

import { useState } from "react"
import { AlertCircle, ArrowUpRight, Clock, CheckCircle, XCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { mockComplaints, mockServices } from "@/lib/mock-data"

export default function DashboardPage() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [timeframe, setTimeframe] = useState("7d")

  // Stats for the dashboard
  const stats = {
    totalComplaints: complaints.length,
    pendingComplaints: complaints.filter((c) => c.status === "pending").length,
    inProgressComplaints: complaints.filter((c) => c.status === "in-progress").length,
    resolvedComplaints: complaints.filter((c) => c.status === "resolved").length,
    totalServices: mockServices.length,
    totalDepartments: [...new Set(mockServices.map((s) => s.department))].length,
  }

  // Calculate resolution rate
  const resolutionRate = Math.round((stats.resolvedComplaints / stats.totalComplaints) * 100) || 0

  // Recent complaints for the dashboard
  const recentComplaints = complaints
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-slate-100">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
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
            <CardTitle className="text-sm font-medium">New Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "new").length}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
              <div
                className="h-1 rounded-full bg-red-500"
                style={{ width: `${(complaints.filter((c) => c.status === "new").length / complaints.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "in-progress").length}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
              <div
                className="h-1 rounded-full bg-yellow-500"
                style={{
                  width: `${(complaints.filter((c) => c.status === "in-progress").length / complaints.length) * 100}%`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "resolved").length}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 15)}% from last month</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
              <div
                className="h-1 rounded-full bg-green-500"
                style={{
                  width: `${(complaints.filter((c) => c.status === "resolved").length / complaints.length) * 100}%`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "rejected").length}</div>
            <p className="text-xs text-muted-foreground">-{Math.floor(Math.random() * 10)}% from last month</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
              <div
                className="h-1 rounded-full bg-gray-500"
                style={{
                  width: `${(complaints.filter((c) => c.status === "rejected").length / complaints.length) * 100}%`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="complaints"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Complaints
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Complaint Status</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full">
                  <div className="flex h-full items-end gap-2">
                    <div className="relative flex h-full w-full flex-col justify-end">
                      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end">
                        <div className="flex w-full items-end justify-around gap-2">
                          <div className="group flex w-full flex-col items-center">
                            <div
                              className="w-full bg-primary/80 transition-all group-hover:bg-primary"
                              style={{
                                height: `${stats.totalComplaints ? (stats.pendingComplaints / stats.totalComplaints) * 100 : 0}%`,
                                minHeight: "10px",
                              }}
                            ></div>
                            <span className="mt-2 text-sm text-slate-300">Pending</span>
                            <span className="text-xs text-slate-400">{stats.pendingComplaints}</span>
                          </div>
                          <div className="group flex w-full flex-col items-center">
                            <div
                              className="w-full bg-yellow-500/80 transition-all group-hover:bg-yellow-500"
                              style={{
                                height: `${stats.totalComplaints ? (stats.inProgressComplaints / stats.totalComplaints) * 100 : 0}%`,
                                minHeight: "10px",
                              }}
                            ></div>
                            <span className="mt-2 text-sm text-slate-300">In Progress</span>
                            <span className="text-xs text-slate-400">{stats.inProgressComplaints}</span>
                          </div>
                          <div className="group flex w-full flex-col items-center">
                            <div
                              className="w-full bg-green-500/80 transition-all group-hover:bg-green-500"
                              style={{
                                height: `${stats.totalComplaints ? (stats.resolvedComplaints / stats.totalComplaints) * 100 : 0}%`,
                                minHeight: "10px",
                              }}
                            ></div>
                            <span className="mt-2 text-sm text-slate-300">Resolved</span>
                            <span className="text-xs text-slate-400">{stats.resolvedComplaints}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Recent Activity</CardTitle>
                <CardDescription className="text-slate-400">Latest complaints and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComplaints.map((complaint) => (
                    <div key={complaint.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-slate-100">{complaint.title}</p>
                        <p className="text-sm text-slate-400">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="ml-auto">
                        <Badge
                          variant={
                            complaint.status === "resolved"
                              ? "default"
                              : complaint.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            complaint.status === "resolved"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : complaint.status === "in-progress"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                          }
                        >
                          {complaint.status === "in-progress"
                            ? "In Progress"
                            : complaint.status === "resolved"
                              ? "Resolved"
                              : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Department Performance</CardTitle>
              <CardDescription className="text-slate-400">Resolution rates by department</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Department</TableHead>
                    <TableHead className="text-slate-300">Total Complaints</TableHead>
                    <TableHead className="text-slate-300">Resolved</TableHead>
                    <TableHead className="text-slate-300">Resolution Rate</TableHead>
                    <TableHead className="text-slate-300">Avg. Resolution Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-slate-100">Water & Sewage</TableCell>
                    <TableCell className="text-slate-300">24</TableCell>
                    <TableCell className="text-slate-300">18</TableCell>
                    <TableCell className="text-slate-300">75%</TableCell>
                    <TableCell className="text-slate-300">3.2 days</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-slate-100">Roads & Infrastructure</TableCell>
                    <TableCell className="text-slate-300">32</TableCell>
                    <TableCell className="text-slate-300">21</TableCell>
                    <TableCell className="text-slate-300">65%</TableCell>
                    <TableCell className="text-slate-300">4.5 days</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-slate-100">Waste Management</TableCell>
                    <TableCell className="text-slate-300">18</TableCell>
                    <TableCell className="text-slate-300">15</TableCell>
                    <TableCell className="text-slate-300">83%</TableCell>
                    <TableCell className="text-slate-300">2.1 days</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-slate-100">Public Safety</TableCell>
                    <TableCell className="text-slate-300">12</TableCell>
                    <TableCell className="text-slate-300">8</TableCell>
                    <TableCell className="text-slate-300">67%</TableCell>
                    <TableCell className="text-slate-300">3.8 days</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Recent Complaints</CardTitle>
              <CardDescription className="text-slate-400">Overview of the latest complaints submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">ID</TableHead>
                    <TableHead className="text-slate-300">Title</TableHead>
                    <TableHead className="text-slate-300">Department</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Submitted</TableHead>
                    <TableHead className="text-right text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.slice(0, 5).map((complaint) => (
                    <TableRow key={complaint.id} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium text-slate-100">#{complaint.id.slice(0, 8)}</TableCell>
                      <TableCell className="text-slate-300">{complaint.title}</TableCell>
                      <TableCell className="text-slate-300">{complaint.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            complaint.status === "resolved"
                              ? "default"
                              : complaint.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            complaint.status === "resolved"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : complaint.status === "in-progress"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                          }
                        >
                          {complaint.status === "in-progress"
                            ? "In Progress"
                            : complaint.status === "resolved"
                              ? "Resolved"
                              : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Services Overview</CardTitle>
              <CardDescription className="text-slate-400">List of services provided by the sub-city</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Service Name</TableHead>
                    <TableHead className="text-slate-300">Department</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Related Complaints</TableHead>
                    <TableHead className="text-right text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServices.slice(0, 5).map((service) => (
                    <TableRow key={service.id} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium text-slate-100">{service.name}</TableCell>
                      <TableCell className="text-slate-300">{service.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={service.status === "active" ? "default" : "secondary"}
                          className={
                            service.status === "active"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {complaints.filter((c) => c.serviceId === service.id).length}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
