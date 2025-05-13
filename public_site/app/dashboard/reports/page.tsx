"use client"

import { useState } from "react"
import { BarChart3, Download, FileText, Filter, PieChart, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { mockComplaints, mockServices } from "@/lib/mock-data"

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("30d")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Get unique departments for filter
  const departments = ["all", ...new Set(mockComplaints.map((c) => c.department))]

  // Filter complaints based on department
  const filteredComplaints =
    departmentFilter === "all" ? mockComplaints : mockComplaints.filter((c) => c.department === departmentFilter)

  // Calculate statistics
  const totalComplaints = filteredComplaints.length
  const pendingComplaints = filteredComplaints.filter((c) => c.status === "pending").length
  const inProgressComplaints = filteredComplaints.filter((c) => c.status === "in-progress").length
  const resolvedComplaints = filteredComplaints.filter((c) => c.status === "resolved").length

  // Calculate resolution rate
  const resolutionRate = Math.round((resolvedComplaints / totalComplaints) * 100) || 0

  // Calculate average resolution time (mock data)
  const avgResolutionTime = "3.5 days"

  // Department performance data
  const departmentPerformance = [
    { department: "Water & Sewage", total: 24, resolved: 18, rate: 75, time: "3.2 days" },
    { department: "Roads & Infrastructure", total: 32, resolved: 21, rate: 65, time: "4.5 days" },
    { department: "Waste Management", total: 18, resolved: 15, rate: 83, time: "2.1 days" },
    { department: "Public Safety", total: 12, resolved: 8, rate: 67, time: "3.8 days" },
    { department: "Housing", total: 15, resolved: 10, rate: 67, time: "3.5 days" },
    { department: "Health Services", total: 9, resolved: 7, rate: 78, time: "2.8 days" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-1.5">
          <Label htmlFor="timeframe">Time Period</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe" className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="department">Department</Label>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger id="department" className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComplaints}</div>
            <p className="text-xs text-muted-foreground">For the selected period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {resolvedComplaints} of {totalComplaints} resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Complaints</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingComplaints}</div>
            <p className="text-xs text-muted-foreground">{inProgressComplaints} in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">For resolved complaints</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Department Performance</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Status Distribution</CardTitle>
              <CardDescription>Overview of complaint statuses for the selected period</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="flex justify-around items-center h-[250px]">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">{pendingComplaints}</div>
                      <div
                        className="w-20 bg-primary/80 mx-4"
                        style={{ height: `${(pendingComplaints / totalComplaints) * 200}px` }}
                      ></div>
                      <div className="mt-2">Pending</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">{inProgressComplaints}</div>
                      <div
                        className="w-20 bg-yellow-500/80 mx-4"
                        style={{ height: `${(inProgressComplaints / totalComplaints) * 200}px` }}
                      ></div>
                      <div className="mt-2">In Progress</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">{resolvedComplaints}</div>
                      <div
                        className="w-20 bg-green-500/80 mx-4"
                        style={{ height: `${(resolvedComplaints / totalComplaints) * 200}px` }}
                      ></div>
                      <div className="mt-2">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Complaint Categories</CardTitle>
                <CardDescription>Most common types of complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Water Supply Issues</TableCell>
                      <TableCell className="text-right">18</TableCell>
                      <TableCell className="text-right">24%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Road Maintenance</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Waste Collection</TableCell>
                      <TableCell className="text-right">12</TableCell>
                      <TableCell className="text-right">16%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Street Lighting</TableCell>
                      <TableCell className="text-right">9</TableCell>
                      <TableCell className="text-right">12%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Public Safety</TableCell>
                      <TableCell className="text-right">7</TableCell>
                      <TableCell className="text-right">9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complaint Locations</CardTitle>
                <CardDescription>Geographic distribution of complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Central District</TableCell>
                      <TableCell className="text-right">22</TableCell>
                      <TableCell className="text-right">29%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Northern Area</TableCell>
                      <TableCell className="text-right">18</TableCell>
                      <TableCell className="text-right">24%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Western Zone</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Eastern District</TableCell>
                      <TableCell className="text-right">12</TableCell>
                      <TableCell className="text-right">16%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Southern Region</TableCell>
                      <TableCell className="text-right">8</TableCell>
                      <TableCell className="text-right">11%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Complaint resolution metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Total Complaints</TableHead>
                    <TableHead>Resolved</TableHead>
                    <TableHead>Resolution Rate</TableHead>
                    <TableHead>Avg. Resolution Time</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentPerformance.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.total}</TableCell>
                      <TableCell>{dept.resolved}</TableCell>
                      <TableCell>{dept.rate}%</TableCell>
                      <TableCell>{dept.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={dept.rate >= 80 ? "default" : dept.rate >= 60 ? "secondary" : "outline"}
                          className={
                            dept.rate >= 80
                              ? "bg-green-500/20 text-green-500 border-green-500/20"
                              : dept.rate >= 60
                                ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20"
                                : "bg-red-500/20 text-red-500 border-red-500/20"
                          }
                        >
                          {dept.rate >= 80 ? "Excellent" : dept.rate >= 60 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Workload</CardTitle>
              <CardDescription>Current complaint distribution by department</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="flex justify-around items-end h-[250px]">
                    {departmentPerformance.map((dept) => (
                      <div key={dept.department} className="flex flex-col items-center">
                        <div
                          className="w-16 bg-primary/80 rounded-t-sm"
                          style={{
                            height: `${(dept.total / Math.max(...departmentPerformance.map((d) => d.total))) * 200}px`,
                          }}
                        ></div>
                        <div className="mt-2 text-xs text-center w-20 truncate" title={dept.department}>
                          {dept.department}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Complaint metrics by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Related Complaints</TableHead>
                    <TableHead>Resolved</TableHead>
                    <TableHead>Resolution Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServices.slice(0, 8).map((service) => {
                    const serviceComplaints = mockComplaints.filter((c) => c.serviceId === service.id)
                    const resolvedServiceComplaints = serviceComplaints.filter((c) => c.status === "resolved")
                    const resolutionRate = serviceComplaints.length
                      ? Math.round((resolvedServiceComplaints.length / serviceComplaints.length) * 100)
                      : 0

                    return (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.department}</TableCell>
                        <TableCell>{serviceComplaints.length}</TableCell>
                        <TableCell>{resolvedServiceComplaints.length}</TableCell>
                        <TableCell>{resolutionRate}%</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Trends</CardTitle>
              <CardDescription>Monthly complaint volume and resolution rates</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-w-2xl">
                  <div className="flex justify-around items-end h-[250px]">
                    {Array.from({ length: 6 }).map((_, i) => {
                      const month = new Date()
                      month.setMonth(month.getMonth() - 5 + i)
                      const monthName = month.toLocaleString("default", { month: "short" })

                      // Mock data for the chart
                      const total = Math.floor(Math.random() * 30) + 20
                      const resolved = Math.floor(Math.random() * total)
                      const rate = Math.round((resolved / total) * 100)

                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div className="text-xs mb-1">{rate}%</div>
                          <div className="relative w-16">
                            <div
                              className="w-16 bg-primary/30 rounded-t-sm"
                              style={{ height: `${(total / 50) * 200}px` }}
                            ></div>
                            <div
                              className="w-16 bg-primary absolute bottom-0 rounded-t-sm"
                              style={{ height: `${(resolved / 50) * 200}px` }}
                            ></div>
                          </div>
                          <div className="mt-2 text-xs">{monthName}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-center w-full gap-4 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary/30 mr-1"></div>
                  <span>Total Complaints</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary mr-1"></div>
                  <span>Resolved Complaints</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time Trends</CardTitle>
              <CardDescription>Average response and resolution times by month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Avg. Initial Response</TableHead>
                    <TableHead>Avg. Resolution Time</TableHead>
                    <TableHead>Improvement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => {
                    const month = new Date()
                    month.setMonth(month.getMonth() - 5 + i)
                    const monthName = month.toLocaleString("default", { month: "long" })

                    // Mock data for the table
                    const responseHours = Math.floor(Math.random() * 24) + 1
                    const resolutionDays = (Math.random() * 5 + 1).toFixed(1)
                    const improvement = Math.floor(Math.random() * 20) - 5

                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{monthName}</TableCell>
                        <TableCell>{responseHours} hours</TableCell>
                        <TableCell>{resolutionDays} days</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span
                              className={improvement > 0 ? "text-green-500" : improvement < 0 ? "text-red-500" : ""}
                            >
                              {improvement > 0 ? "+" : ""}
                              {improvement}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
