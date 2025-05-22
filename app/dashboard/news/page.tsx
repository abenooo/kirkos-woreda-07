"use client"

import { useState, useEffect } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentNews, setCurrentNews] = useState<any>(null)
  const [newNews, setNewNews] = useState({
    title: "",
    summary: "",
    content: "",
    status: "published",
    publish_date: new Date().toISOString().split('T')[0],
  })

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const { data } = await supabase
          .from("news")
          .select("*")
          .order("publish_date", { ascending: false })
        setNews(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Filter news based on search query
  const filteredNews = news.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedNews = filteredNews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Handle adding a new news item
  const handleAddNews = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("news")
        .insert([newNews])
        .select()
      if (error) throw error
      setNews((prev) => [...prev, ...(data || [])])
      setIsAddDialogOpen(false)
      setNewNews({
        title: "",
        summary: "",
        content: "",
        status: "published",
        publish_date: new Date().toISOString().split('T')[0],
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle editing a news item
  const handleEditNews = async () => {
    if (!currentNews) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("news")
        .update({
          title: currentNews.title,
          summary: currentNews.summary,
          content: currentNews.content,
          status: currentNews.status,
          publish_date: currentNews.publish_date,
        })
        .eq("id", currentNews.id)
        .select()
      if (error) throw error
      setNews((prev) =>
        prev.map((item) => (item.id === currentNews.id ? (data ? data[0] : currentNews) : item))
      )
      setIsEditDialogOpen(false)
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting a news item
  const handleDeleteNews = async () => {
    if (!currentNews) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", currentNews.id)
      if (error) throw error
      setNews((prev) => prev.filter((item) => item.id !== currentNews.id))
      setIsDeleteDialogOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
            <DialogHeader>
              <DialogTitle>Add New News</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new news item or announcement to the portal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-slate-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="summary" className="text-slate-300">
                  Summary
                </Label>
                <Textarea
                  id="summary"
                  value={newNews.summary}
                  onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content" className="text-slate-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 h-32"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="publish_date" className="text-slate-300">
                  Publish Date
                </Label>
                <Input
                  id="publish_date"
                  type="date"
                  value={newNews.publish_date}
                  onChange={(e) => setNewNews({ ...newNews, publish_date: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-slate-300">
                  Status
                </Label>
                <Select
                  value={newNews.status}
                  onValueChange={(value) => setNewNews({ ...newNews, status: value })}
                >
                  <SelectTrigger id="status" className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNews}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Add News
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All News</CardTitle>
          <CardDescription className="text-slate-400">
            Manage news items and announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="pl-8 bg-slate-800/50 border-slate-700 text-slate-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5}>Loading...</TableCell>
                    </TableRow>
                  ) : paginatedNews.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>No news items found.</TableCell>
                    </TableRow>
                  ) : (
                    paginatedNews.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.summary}</TableCell>
                        <TableCell>{new Date(item.publish_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "published"
                                ? "default"
                                : item.status === "draft"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentNews(item)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentNews(item)
                                  setIsDeleteDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm px-2">
                Page {page} of {Math.ceil(filteredNews.length / PAGE_SIZE) || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page * PAGE_SIZE >= filteredNews.length}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit News Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Edit News</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the news item details.
            </DialogDescription>
          </DialogHeader>
          {currentNews && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title" className="text-slate-300">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={currentNews.title}
                  onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-summary" className="text-slate-300">
                  Summary
                </Label>
                <Textarea
                  id="edit-summary"
                  value={currentNews.summary}
                  onChange={(e) => setCurrentNews({ ...currentNews, summary: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content" className="text-slate-300">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={currentNews.content}
                  onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 h-32"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-publish_date" className="text-slate-300">
                  Publish Date
                </Label>
                <Input
                  id="edit-publish_date"
                  type="date"
                  value={currentNews.publish_date}
                  onChange={(e) => setCurrentNews({ ...currentNews, publish_date: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status" className="text-slate-300">
                  Status
                </Label>
                <Select
                  value={currentNews.status}
                  onValueChange={(value) => setCurrentNews({ ...currentNews, status: value })}
                >
                  <SelectTrigger id="edit-status" className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditNews}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete News Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Delete News</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this news item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentNews && (
            <div className="py-4">
              <p className="font-medium text-slate-100">{currentNews.title}</p>
              <p className="text-sm text-slate-400">{currentNews.summary}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteNews}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 