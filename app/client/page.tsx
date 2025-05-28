"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import logo from "../../public/image.png"
import logo1 from "../../public/image1.png"
import logo3 from "../../public/logo3.png"
import {
  FileText,
  MessageSquare,
  AlertTriangle,
  FileQuestion,
  Building2,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Search,
  ChevronRight,
  Briefcase,
  Car,
  School,
  Bell,
  ExternalLink,
} from "lucide-react"
import { createClient } from "@supabase/supabase-js"

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
  created_at: string
  updated_at: string
}

export default function ClientHomePage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    { src: logo, alt: "Kirkos Sub City Administration building" },
    { src: logo1, alt: "Kirkos Sub City Administration building - View 2" },
    { src: logo3, alt: "Kirkos Sub City Administration building - View 3" }
  ]

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Fetch news items from Supabas
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('status', 'published')
          .order('publish_date', { ascending: false })
          .limit(3)

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

  // Updated Service categories with more vibrant and distinct gradients
  const categoryGradients = {
    personal: "from-sky-500 to-sky-600",
    business: "from-orange-500 to-orange-600",
    property: "from-green-500 to-green-600",
    transport: "from-violet-500 to-violet-600",
    education: "from-pink-500 to-pink-600",
  }

  // Service categories
  const serviceCategories = [
    {
      title: "Personal Documents",
      description: "ID cards, birth certificates, and more",
      icon: FileText,
      category: "personal",
      href: "/client/services?category=personal",
    },
    {
      title: "Business Services",
      description: "Licenses, permits, and registrations",
      icon: Briefcase,
      category: "business",
      href: "/client/services?category=business",
    },
    {
      title: "Property & Construction",
      description: "Building permits and land services",
      icon: Building2,
      category: "property",
      href: "/client/services?category=property",
    },
    {
      title: "Transportation",
      description: "Vehicle registration and licensing",
      icon: Car,
      category: "transport",
      href: "/client/services?category=transport",
    },
    {
      title: "Education",
      description: "School registration and services",
      icon: School,
      category: "education",
      href: "/client/services?category=education",
    },
    {
      title: "All Services",
      description: "Browse all available services",
      icon: Search,
      category: "all",
      href: "/client/services",
    },
  ]

  const primaryButtonClasses = "bg-sky-600 hover:bg-sky-700 text-white"
  const headingTextClasses = "text-slate-800"
  const bodyTextClasses = "text-slate-600"
  const linkClasses = "text-sky-600 hover:text-sky-700 hover:underline"

  return (
    <div className="space-y-8 sm:space-y-10 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronRight className="h-6 w-6 rotate-180" />
        </button>
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute inset-0 flex flex-col justify-center px-3 sm:px-8">
          <div className="w-full max-w-5xl mx-auto">
            <div className="max-w-full sm:max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                Kirkos Sub City Woreda 07 Public Service Portal
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold mb-4 sm:mb-8">
                Access government services, submit applications, and get information about requirements and procedures
                online.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="relative w-full max-w-full sm:max-w-md">
                  <Input
                    type="search"
                    placeholder="Search for services..."
                    className="pl-10 pr-16 py-2 sm:py-3 w-full bg-white/90 border-0 focus:ring-2 focus:ring-sky-500 rounded-md text-sm sm:text-base"
                  />
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Button
                    className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm ${primaryButtonClasses}`}
                  >
                    Search
                  </Button>
                </div>
                <Button
                  asChild
                  size="sm"
                  className={`${primaryButtonClasses} sm:size-lg text-sm sm:text-base whitespace-nowrap`}
                >
                  <Link href="/client/services">
                    <div className="w-full flex flex-row items-center justify-center">
                      Browse All Services <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-8 sm:py-12 w-full">
        <div className="w-full sm:container sm:mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${headingTextClasses}`}>Service Categories </h2>
            <Link href="/client/services" className={`${linkClasses} flex items-center text-xs sm:text-sm font-medium`}>
              View All Services
              <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {serviceCategories.map((category, index) => {
              const categoryGradient =
                categoryGradients[category.category as keyof typeof categoryGradients] || "from-slate-500 to-slate-600"

              return (
                <Link key={index} href={category.href} className="group block">
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-slate-200 hover:shadow-xl hover:scale-[1.02] transition-all h-full flex flex-col">
                    <div className="flex items-start mb-2 sm:mb-3">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-md`}
                      >
                        <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3
                          className={`font-semibold text-base sm:text-lg ${headingTextClasses} group-hover:text-sky-600 transition-colors`}
                        >
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <p className={`${bodyTextClasses} text-xs sm:text-sm flex-grow`}>{category.description}</p>
                    <div className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-sky-600 group-hover:text-sky-700 flex items-center">
                      Explore Category{" "}
                      <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="w-full">
        <div className="w-full sm:container sm:mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* News & Announcements */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className={`text-xl sm:text-2xl font-bold ${headingTextClasses}`}>News & Announcements</h2>
                <Link href="/client/news" className={`${linkClasses} flex items-center text-xs sm:text-sm font-medium`}>
                  View All
                  <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {loading ? (
                  <Card className="hover:shadow-lg transition-all duration-300 border border-slate-200 rounded-lg bg-white">
                    <CardContent className="p-3 sm:p-5">
                      <div className="flex items-start">
                        <div className="bg-sky-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-sky-600 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/4 animate-pulse"></div>
                          <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : newsItems.length === 0 ? (
                  <Card className="hover:shadow-lg transition-all duration-300 border border-slate-200 rounded-lg bg-white">
                    <CardContent className="p-3 sm:p-5">
                      <div className="flex items-start">
                        <div className="bg-sky-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-slate-500">No news items available at the moment.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  newsItems.map((item) => (
                    <Card
                      key={item.id}
                      className="hover:shadow-lg transition-all duration-300 border border-slate-200 rounded-lg bg-white"
                    >
                      <CardContent className="p-3 sm:p-5">
                        <div className="flex items-start">
                          <div className="bg-sky-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-sky-600" />
                          </div>
                          <div>
                            <h3 className={`font-semibold text-slate-700 text-sm sm:text-base`}>{item.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-500 mb-1">
                              {new Date(item.publish_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            <p className={`text-xs sm:text-sm ${bodyTextClasses}`}>{item.summary}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Office Information */}
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold ${headingTextClasses} mb-4 sm:mb-6`}>Office Information</h2>
              <Card className="bg-white rounded-xl shadow-lg border border-slate-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-5">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-sky-600 mt-1" />
                      <div>
                        <h3 className={`font-semibold text-base sm:text-lg ${headingTextClasses}`}>Location</h3>
                        <p className={`${bodyTextClasses} text-sm`}>Kirkos Sub City Wereda 07</p>
                        <p className={`${bodyTextClasses} text-sm`}>Addis Ababa, Ethiopia</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">GPS: Lat 9.013789 / Lon 38.751536</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-sky-600 mt-1" />
                      <div>
                        <h3 className={`font-semibold text-base sm:text-lg ${headingTextClasses}`}>Office Hours</h3>
                        <p className={`${bodyTextClasses} text-sm`}>Monday - Friday: 8:30 AM - 5:30 PM</p>
                        <p className={`${bodyTextClasses} text-sm`}>Saturday: 9:00 AM - 2:00 PM</p>
                        <p className={`${bodyTextClasses} text-sm`}>Sunday: Closed</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-sky-600 mt-1" />
                      <div>
                        <h3 className={`font-semibold text-base sm:text-lg ${headingTextClasses}`}>Contact</h3>
                        <p className={`${bodyTextClasses} text-sm`}>Phone: +251 11 234 5678</p>
                        <p className={`${bodyTextClasses} text-sm`}>Email: info@kirkoswereda07.gov.et</p>
                      </div>
                    </div>

                    <Button asChild className={`w-full mt-2 sm:mt-3 text-sm sm:text-base ${primaryButtonClasses}`}>
                      <Link href="/client/contact">
                        <span>Contact Us</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-myBlue text-white py-8 sm:py-12 w-full">
        <div className="w-full sm:container sm:mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Quick Links </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { href: "/client/anonymous", icon: MessageSquare, label: "Anonymous Report" },
              { href: "/client/requirements", icon: FileQuestion, label: "Requirements Guide" },
              { href: "/client/services", icon: Building2, label: "List of Services" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-sky-500/10 hover:bg-sky-500/20 p-3 sm:p-4 md:p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 group h-full"
              >
                <link.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 mb-2 sm:mb-3 text-sky-300 group-hover:text-sky-200 transition-colors" />
                <span className="font-medium text-sky-100 group-hover:text-white transition-colors text-xs sm:text-sm md:text-base">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="pb-6 sm:pb-8 w-full">
        <div className="w-full sm:container sm:mx-auto px-3 sm:px-4">
          <h2 className={`text-xl sm:text-2xl font-bold ${headingTextClasses} mb-4 sm:mb-6`}>
            Related Government Portals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Ethiopian eServices Portal", url: "https://www.eservices.gov.et" },
              { title: "Addis Ababa City Administration", url: "https://www.addisababa.gov.et" },
              { title: "Federal Document Authentication", url: "https://www.dara.gov.et" },
            ].map((portal) => (
              <Card
                key={portal.title}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                <CardContent className="p-3 sm:p-5 flex items-center">
                  <div className="bg-sky-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${headingTextClasses} text-sm sm:text-base`}>{portal.title}</h3>
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs sm:text-sm ${linkClasses}`}
                    >
                      {portal.url.replace("https://www.", "")}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
