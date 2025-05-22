"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Search, Calendar, Clock } from "lucide-react"
import Image from "next/image"

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// News item interface
interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  status: string
  publish_date: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  // Fetch news items from Supabase
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('status', 'published')
          .order('publish_date', { ascending: false })

        if (error) {
          console.error('Error fetching news:', error)
          return
        }

        setNewsItems(data || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Filter news items based on search query
  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Paginate news items
  const paginatedNews = filteredNews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">News & Announcements</h1>
          <p className="text-blue-100 max-w-2xl">
            Stay updated with the latest news and announcements from Kirkos Sub City Woreda 07
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden border-gray-200">
                <div className="aspect-video bg-gray-100 animate-pulse" />
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No news found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or check back later for updates.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNews.map((item) => (
                <Card key={item.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
                  {item.image_url && (
                    <div className="relative aspect-video">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        // TODO: Implement news detail view
                        console.log('View news item:', item.id)
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 