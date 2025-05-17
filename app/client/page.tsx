import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import logo from "../../public/image.png"
import {
  Building2,
  FileText,
  MessageSquare,
  AlertTriangle,
  FileQuestion,
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

export default function ClientHomePage() {
  // Featured services
  const featuredServices = [
    {
      id: "1",
      title: "ID Card Issuance",
      description: "Apply for a new ID card or renew an existing one",
      icon: FileText,
      category: "personal",
    },
    {
      id: "4",
      title: "Business License",
      description: "Apply for a new business license or renew an existing one",
      icon: Briefcase,
      category: "business",
    },
    {
      id: "5",
      title: "Building Permit",
      description: "Apply for a permit to construct or renovate a building",
      icon: Building2,
      category: "property",
    },
    {
      id: "7",
      title: "Vehicle Registration",
      description: "Register a new vehicle or transfer ownership",
      icon: Car,
      category: "transport",
    },
  ]

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

  const newsItems = [
    {
      title: "New Online Service Available",
      date: "May 7, 2025", // Updated date
      summary: "You can now apply for business licenses completely online.",
    },
    {
      title: "Office Hours Update", // Updated title
      date: "April 28, 2025", // Updated date
      summary: "Our office hours have been updated. We are now open on Saturdays from 9:00 AM to 2:00 PM.", // Updated summary
    },
    {
      title: "System Maintenance Notice",
      date: "April 22, 2025", // Updated date
      summary: "The eServices portal will be undergoing maintenance on April 25th from 10 PM to 2 AM.", // Updated summary
    },
  ]

  const primaryButtonClasses = "bg-sky-600 hover:bg-sky-700 text-white";
  const headingTextClasses = "text-slate-800";
  const bodyTextClasses = "text-slate-600";
  const linkClasses = "text-sky-600 hover:text-sky-700 hover:underline";

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-6 h-[500px] overflow-hidden">
        <Image
          src={logo}
          alt="Kirkos Sub City Administration building"
          width={1600}
          height={800}
          className="object-fit w-full h-full mt-2 rounded-lg"
          priority
        />
        <div className="absolute inset-0  flex flex-col justify-center px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Kirkos Sub City Wereda 07 eServices Portal
              </h1>
              <p className="text-xl text-white/90 font-bold max-w-2xl mb-8">
                Access government services, submit applications, and get information about requirements and procedures
                online.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="relative w-full max-w-md">
                  <Input
                    type="search"
                    placeholder="Search for services..."
                    className="pl-10 pr-4 py-3 w-full bg-white/90 border-0 focus:ring-2 focus:ring-sky-500 rounded-md"
                  />
                  <Search className="h-5 w-5 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Button className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 ${primaryButtonClasses}`}>
                    Search
                  </Button>
                </div>
                <Button asChild size="lg" className={`${primaryButtonClasses}`}>
                  <Link href="/client/services">
                    <span> 
                      Browse All Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services - MODIFIED FOR SIZE INCREASE */}
      <section>
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-3xl font-bold ${headingTextClasses}`}>Featured Services</h2>
            <Link
              href="/client/services"
              className={`${linkClasses} flex items-center text-sm font-medium`}
            >
              View All Services
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => {
              const categoryGradient = categoryGradients[service.category as keyof typeof categoryGradients] || "from-slate-600 to-slate-700";
              
              return (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden rounded-xl group bg-white flex flex-col"> {/* Added flex flex-col for content growth */}
                  {/* Card Header - Increased padding, icon size, and wrapper padding */}
                  <div className={`bg-gradient-to-br ${categoryGradient} px-6 py-5 flex items-center text-white`}>
                    <div className="bg-white/20 p-3 rounded-lg mr-4 shadow-md backdrop-blur-sm"> {/* Increased padding to p-3, margin to mr-4 */}
                      <service.icon className="h-6 w-6 text-white" /> {/* Increased icon size */}
                    </div>
                    <CardTitle className="text-base font-bold">{service.title}</CardTitle>
                  </div>
                  {/* Card Content - Increased padding and description min-height */}
                  <CardContent className="p-6 flex flex-col flex-grow"> {/* Increased padding to p-6, added flex-grow for button alignment */}
                    <p className={`${bodyTextClasses} mb-4 text-sm min-h-[56px] flex-grow`}>{service.description}</p> {/* Increased min-h, added flex-grow to push button down */}
                    <Button
                      asChild
                      className={`w-full mt-auto ${primaryButtonClasses}`} /* Added mt-auto to stick button to bottom */
                    >
                      <Link href={`/client/services/${service.id}`}>
                        <span> 
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-slate-50 py-12 -mx-4 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold ${headingTextClasses} mb-8`}>Service Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => {
              const categoryGradient = categoryGradients[category.category as keyof typeof categoryGradients] || "from-slate-500 to-slate-600";
              
              return (
                <Link key={index} href={category.href} className="group block">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl hover:scale-[1.02] transition-all h-full flex flex-col">
                    <div className="flex items-start mb-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-md`}
                      >
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className={`font-semibold text-lg ${headingTextClasses} group-hover:text-sky-600 transition-colors`}>
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <p className={`${bodyTextClasses} text-sm flex-grow`}>{category.description}</p>
                    <div className="mt-4 text-sm font-medium text-sky-600 group-hover:text-sky-700 flex items-center">
                        Explore Category <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News & Announcements */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${headingTextClasses}`}>News & Announcements</h2>
                <Link
                  href="/client/news"
                  className={`${linkClasses} flex items-center text-sm font-medium`}
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {newsItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-slate-200 rounded-lg bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-start">
                        <div className="bg-sky-100 p-3 rounded-lg mr-4">
                          <Bell className="h-5 w-5 text-sky-600" />
                        </div>
                        <div>
                          <h3 className={`font-semibold text-slate-700`}>{item.title}</h3>
                          <p className="text-sm text-slate-500 mb-1">{item.date}</p>
                          <p className={`text-sm ${bodyTextClasses}`}>{item.summary}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Office Information */}
            <div>
              <h2 className={`text-2xl font-bold ${headingTextClasses} mb-6`}>Office Information</h2>
              <Card className="bg-white rounded-xl shadow-lg border border-slate-200">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 mr-3 text-sky-600 mt-1" />
                      <div>
                        <h3 className={`font-semibold text-lg ${headingTextClasses}`}>Location</h3>
                        <p className={bodyTextClasses}>Kirkos Sub City Wereda 07</p>
                        <p className={bodyTextClasses}>Addis Ababa, Ethiopia</p>
                        <p className="text-sm text-slate-500 mt-1">GPS: Lat 9.013789 / Lon 38.751536</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 mr-3 text-sky-600 mt-1" />
                      <div>
                        <h3 className={`font-semibold text-lg ${headingTextClasses}`}>Office Hours</h3>
                        <p className={bodyTextClasses}>Monday - Friday: 8:30 AM - 5:30 PM</p>
                        <p className={bodyTextClasses}>Saturday: 9:00 AM - 2:00 PM</p> {/* Updated based on news item */}
                        <p className={bodyTextClasses}>Sunday: Closed</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 mr-3 text-sky-600 mt-1" />
                      <div>
                        <h3 className={`font-semibold text-lg ${headingTextClasses}`}>Contact</h3>
                        <p className={bodyTextClasses}>Phone: +251 11 234 5678</p>
                        <p className={bodyTextClasses}>Email: info@kirkoswereda07.gov.et</p>
                      </div>
                    </div>

                    <Button
                      asChild
                      className={`w-full mt-3 ${primaryButtonClasses}`}
                    >
                      <Link href="/client/contact">
                        <span>Contact Us</span> {/* Wrapped for consistency as per previous fix */}
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
      <section className="bg-slate-800 text-white py-12 -mx-4 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { href: "/client/anonymous", icon: MessageSquare, label: "Anonymous Report" },
              { href: "/client/misconduct", icon: AlertTriangle, label: "Report Misconduct" },
              { href: "/client/requirements", icon: FileQuestion, label: "Requirements Guide" },
              // { href: "/client/licenses", icon: Building2, label: "Building Licenses" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-sky-500/10 hover:bg-sky-500/20 p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 group"
              >
                <link.icon className="h-10 w-10 mb-3 text-sky-300 group-hover:text-sky-200 transition-colors" />
                <span className="font-medium text-sky-100 group-hover:text-white transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="pb-8">
        <div className="container mx-auto">
          <h2 className={`text-2xl font-bold ${headingTextClasses} mb-6`}>Related Government Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "Ethiopian eServices Portal", url: "https://www.eservices.gov.et" },
                { title: "Addis Ababa City Administration", url: "https://www.addisababa.gov.et" },
                { title: "Federal Document Authentication", url: "https://www.dara.gov.et" },
            ].map(portal => (
            <Card key={portal.title} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200">
              <CardContent className="p-5 flex items-center">
                <div className="bg-sky-100 p-3 rounded-lg mr-4">
                  <ExternalLink className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${headingTextClasses} text-base`}>{portal.title}</h3>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${linkClasses}`}
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