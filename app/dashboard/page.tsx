"use client"
import { useEffect, useState } from "react"
import { AlertCircle, ArrowUpRight, Clock, CheckCircle, XCircle, User, ChevronRight, Activity, Database, Shield, Users, MessageSquare, FileText } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Complaint {
  id: string
  name: string
  email: string
  service: string
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected'
  created_at: string
}

interface Feedback {
  id: string
  email: string
  service: string
  rating: number
  feedback_details: string
  created_at: string
}

interface AnonymousComplaint {
  id: string
  complaint_type: string
  description: string
  location: string
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected'
  created_at: string
}

interface Department {
  id: string
  name: string
  description: string
  code: string
  created_at: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  department_id: string
  created_at: string
}

interface TruncatedTextProps {
  text: string
  maxLength?: number
}

interface StatCardProps {
  title: string
  value: number
  subtitle: string
  icon: React.ElementType
  gradient: string
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'pending' | 'resolved' | 'in_progress' | 'rejected'
}

interface TabButtonProps {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}

interface DataTableProps<T> {
  headers: string[]
  data: T[]
  renderRow: (item: T) => React.ReactNode
}

interface TimeframeOption {
  value: string
  label: string
  days: number
}

const TruncatedText = ({ text, maxLength = 50 }: TruncatedTextProps) => {
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
        className="ml-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        {isExpanded ? "Show less" : "See more"}
      </button>
    </div>
  )
}

const getLatestItems = <T extends { created_at: string }>(items: T[], count = 5): T[] => {
  return [...items]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, count)
}

const StatCard = ({ title, value, subtitle, icon: Icon, gradient }: StatCardProps) => (
  <div className={`relative p-6 rounded-xl border border-slate-800/50 backdrop-blur-sm ${gradient} group hover:border-cyan-500/30 transition-all duration-300`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        <Icon className="h-5 w-5 text-cyan-400" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
)

const Badge = ({ children, variant = "default" }: BadgeProps) => {
  const variants = {
    default: "bg-slate-800/50 text-slate-300 border-slate-700",
    pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    resolved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    in_progress: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    rejected: "bg-red-500/20 text-red-300 border-red-500/30"
  } as const
  
  return (
    <span className={`px-2 py-1 text-xs rounded-md border ${variants[variant]}`}>
      {children}
    </span>
  )
}

const TabButton = ({ active, children, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30' 
        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
    }`}
  >
    {children}
  </button>
)

const DataTable = <T,>({ headers, data, renderRow }: DataTableProps<T>) => (
  <div className="overflow-hidden rounded-xl border border-slate-800/50 backdrop-blur-sm">
    <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50">
      <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-slate-300">
        {headers.map((header, i) => (
          <div key={i}>{header}</div>
        ))}
      </div>
    </div>
    <div className="divide-y divide-slate-800/50">
      {data.map((item, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 p-4 text-sm text-slate-300 hover:bg-slate-800/30 transition-colors">
          {renderRow(item)}
        </div>
      ))}
    </div>
  </div>
)

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [anonymousComplaints, setAnonymousComplaints] = useState<AnonymousComplaint[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<any>(null)
  const [timeframe, setTimeframe] = useState("7d")
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      const loggedInUser = session?.user
      setUser(loggedInUser)

      if (!loggedInUser) {
        setLoading(false)
        return
      }

      const userRole = loggedInUser.user_metadata?.role
      const userDepartmentId = loggedInUser.user_metadata?.department_id

      try {
        let complaintsQuery = supabase.from('complaints').select('*')
        let feedbackQuery = supabase.from('feedback').select('*')
        let anonymousDataQuery = supabase.from('anonymous_complaints').select('*')
        let usersDataQuery = supabase.from('users').select('*')
        let departmentsDataQuery = supabase.from('departments').select('*')

        if (userRole !== 'administrator' && userDepartmentId) {
          complaintsQuery = complaintsQuery.eq('department_id', userDepartmentId)
          feedbackQuery = feedbackQuery.eq('department_id', userDepartmentId)
          anonymousDataQuery = anonymousDataQuery.eq('department_id', userDepartmentId)
          usersDataQuery = usersDataQuery.eq('department_id', userDepartmentId)
        }

        const [
          { data: complaintsData },
          { data: feedbackData },
          { data: anonymousData },
          { data: departmentsData },
          { data: usersData }
        ] = await Promise.all([
          complaintsQuery,
          feedbackQuery,
          anonymousDataQuery,
          departmentsDataQuery,
          usersDataQuery
        ])

        setComplaints((complaintsData as Complaint[]) || [])
        setFeedback((feedbackData as Feedback[]) || [])
        setAnonymousComplaints((anonymousData as AnonymousComplaint[]) || [])
        setDepartments((departmentsData as Department[]) || [])
        setUsers((usersData as User[]) || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

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

  const latestComplaints = getLatestItems(complaints)
  const latestFeedback = getLatestItems(feedback)
  const latestAnonymous = getLatestItems(anonymousComplaints)
  const latestDepartments = getLatestItems(departments)
  const latestUsers = getLatestItems(users)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      <div className="relative z-10 p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              System Overview 123
            </h1>
            <p className="text-slate-400 mt-2">Real-time monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-4">
           
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 focus:border-cyan-500 focus:outline-none backdrop-blur-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Complaints"
            value={stats.totalComplaints}
            subtitle={`${stats.pendingComplaints} pending, ${stats.resolvedComplaints} resolved`}
            icon={AlertCircle}
            gradient="bg-gradient-to-br from-slate-900/90 to-slate-800/90"
          />
          <StatCard
            title="Total Feedback"
            value={stats.totalFeedback}
            subtitle="From users and services"
            icon={MessageSquare}
            gradient="bg-gradient-to-br from-slate-900/90 to-slate-800/90"
          />
          <StatCard
            title="Anonymous Reports"
            value={stats.totalAnonymous}
            subtitle="Total anonymous submissions"
            icon={Shield}
            gradient="bg-gradient-to-br from-slate-900/90 to-slate-800/90"
          />
          <StatCard
            title="Active Departments"
            value={stats.totalDepartments}
            subtitle="System departments"
            icon={Database}
            gradient="bg-gradient-to-br from-slate-900/90 to-slate-800/90"
          />
        </div>

        {/* Users Grid */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent Users</h2>
              <p className="text-slate-400">Latest registered users</p>
            </div>
            <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestUsers.map((user) => (
              <div key={user.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{user.name}</p>
                    <p className="text-sm text-slate-400 truncate">{user.email}</p>
                    <Badge variant="default">{user.role}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50">
            {["overview", "complaints", "feedback", "anonymous", "departments", "users"].map((tab) => (
              <TabButton
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabButton>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Latest Complaints */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Latest Complaints</h2>
                    <p className="text-slate-400">Most recent complaints</p>
                  </div>
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <DataTable<Complaint>
                  headers={["Name", "Email", "Service", "Status", "Created"]}
                  data={latestComplaints}
                  renderRow={(complaint) => (
                    <>
                      <div className="font-medium text-white">{complaint.name}</div>
                      <div className="truncate">{complaint.email}</div>
                      <div className="truncate">{complaint.service}</div>
                      <div><Badge variant={complaint.status}>{complaint.status}</Badge></div>
                      <div>{new Date(complaint.created_at).toLocaleDateString()}</div>
                    </>
                  )}
                />
              </div>

              {/* Latest Feedback */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Latest Feedback</h2>
                    <p className="text-slate-400">Most recent feedback</p>
                  </div>
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <DataTable<Feedback>
                  headers={["Email", "Service", "Rating", "Details", "Created"]}
                  data={latestFeedback}
                  renderRow={(item) => (
                    <>
                      <div className="truncate">{item.email}</div>
                      <div className="truncate">{item.service}</div>
                      <div className="text-yellow-400">★ {item.rating}</div>
                      <div><TruncatedText text={item.feedback_details} maxLength={50} /></div>
                      <div>{new Date(item.created_at).toLocaleDateString()}</div>
                    </>
                  )}
                />
              </div>

              {/* Latest Anonymous Complaints */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Latest Anonymous Complaints</h2>
                    <p className="text-slate-400">Most recent anonymous complaints</p>
                  </div>
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <DataTable<AnonymousComplaint>
                  headers={["Type", "Description", "Location", "Status", "Created"]}
                  data={latestAnonymous}
                  renderRow={(item) => (
                    <>
                      <div>{item.complaint_type}</div>
                      <div><TruncatedText text={item.description} maxLength={50} /></div>
                      <div className="truncate">{item.location}</div>
                      <div><Badge variant={item.status}>{item.status}</Badge></div>
                      <div>{new Date(item.created_at).toLocaleDateString()}</div>
                    </>
                  )}
                />
              </div>
            </div>
          )}

          {activeTab === "complaints" && (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">All Complaints</h2>
                <p className="text-slate-400">Complete complaints overview</p>
              </div>
              <DataTable<Complaint>
                headers={["Name", "Email", "Service", "Status", "Created"]}
                data={complaints}
                renderRow={(complaint) => (
                  <>
                    <div className="font-medium text-white">{complaint.name}</div>
                    <div className="truncate">{complaint.email}</div>
                    <div className="truncate">{complaint.service}</div>
                    <div><Badge variant={complaint.status}>{complaint.status}</Badge></div>
                    <div>{new Date(complaint.created_at).toLocaleDateString()}</div>
                  </>
                )}
              />
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">All Feedback</h2>
                <p className="text-slate-400">Complete feedback overview</p>
              </div>
              <DataTable<Feedback>
                headers={["Email", "Service", "Rating", "Details", "Created"]}
                data={feedback}
                renderRow={(item) => (
                  <>
                    <div className="truncate">{item.email}</div>
                    <div className="truncate">{item.service}</div>
                    <div className="text-yellow-400">★ {item.rating}</div>
                    <div><TruncatedText text={item.feedback_details} maxLength={50} /></div>
                    <div>{new Date(item.created_at).toLocaleDateString()}</div>
                  </>
                )}
              />
            </div>
          )}

          {activeTab === "anonymous" && (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Anonymous Complaints</h2>
                <p className="text-slate-400">All anonymous complaints</p>
              </div>
              <DataTable<AnonymousComplaint>
                headers={["Type", "Description", "Location", "Status", "Created"]}
                data={anonymousComplaints}
                renderRow={(item) => (
                  <>
                    <div>{item.complaint_type}</div>
                    <div><TruncatedText text={item.description} maxLength={50} /></div>
                    <div className="truncate">{item.location}</div>
                    <div><Badge variant={item.status}>{item.status}</Badge></div>
                    <div>{new Date(item.created_at).toLocaleDateString()}</div>
                  </>
                )}
              />
            </div>
          )}

          {activeTab === "departments" && (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Departments</h2>
                <p className="text-slate-400">All system departments</p>
              </div>
              <DataTable<Department>
                headers={["Name", "Description", "Code", "Created", ""]}
                data={departments}
                renderRow={(dept) => (
                  <>
                    <div className="font-medium text-white">{dept.name}</div>
                    <div><TruncatedText text={dept.description} maxLength={50} /></div>
                    <div className="font-mono text-cyan-400">{dept.code}</div>
                    <div>{new Date(dept.created_at).toLocaleDateString()}</div>
                    <div></div>
                  </>
                )}
              />
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">System Users</h2>
                <p className="text-slate-400">All registered users</p>
              </div>
              <DataTable<User>
                headers={["Name", "Email", "Role", "Department", "Created"]}
                data={users}
                renderRow={(user) => (
                  <>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="truncate">{user.email}</div>
                    <div><Badge variant="default">{user.role}</Badge></div>
                    <div>{user.department_id}</div>
                    <div>{new Date(user.created_at).toLocaleDateString()}</div>
                  </>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}