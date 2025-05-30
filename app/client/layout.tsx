"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Home,
  Languages,
  MessageSquare,
  AlertTriangle,
  FileQuestion,
  Menu,
  X,
  MapPin,
  Search,
  ChevronDown,
  Phone,
  Mail,
  HelpCircle,
  LogIn,
} from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import logo from "../../public/kirkos-wo7.png"

// Language translations
const translations = {
  en: {
    home: "Home",
    services: "Services",
    complaints: "Complaints",
    anonymous: "Anonymous Report",
    requirements: "Requirements",
    language: "Language",
    english: "English",
    amharic: "Amharic",
    oromo: "Oromo",
    search: "Search",
    help: "Login",
    contact: "Contact Us",
    about: "About",
    news: "News & Updates",
    faq: "FAQ",
  },
  am: {
    home: "መነሻ",
    services: "አገልግሎቶች",
    complaints: "ቅሬታዎች",
    anonymous: "ስም የማይገለጽ ሪፖርት",
    requirements: "መስፈርቶች",
    language: "ቋንቋ",
    english: "እንግሊዘኛ",
    amharic: "አማርኛ",
    oromo: "ኦሮምኛ",
    search: "ፈልግ",
    help: "መግባት",
    contact: "አግኙን",
    about: "ስለ እኛ",
    news: "ዜና እና ዝማኔዎች",
    faq: "ተደጋጋሚ ጥያቄዎች",
  },
  or: {
    home: "Mana",
    services: "Tajaajila",
    complaints: "Komii",
    anonymous: "Gabaasa Maqaa Malee",
    requirements: "Ulaagaalee",
    language: "Afaan",
    english: "Ingiliffaa",
    amharic: "Amaariffaa",
    oromo: "Afaan Oromoo",
    search: "Barbaadi",
    help: "seenuu",
    contact: "Nu Quunnamaa",
    about: "Waa'ee Keenya",
    news: "Oduu fi Haaromsa",
    faq: "Gaaffii fi Deebii",
  },
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState<"en" | "am" | "or">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const t = translations[language]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      router.push(`/client/search?q=${encodeURIComponent(searchQuery)}`)
      setMobileMenuOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const mainNavItems = [
    { name: t.home, href: "/client", icon: Home },
    { name: t.services, href: "/client/services", icon: FileText },
    { name: t.complaints, href: "/client/complaints", icon: MessageSquare },
    { name: t.requirements, href: "/client/requirements", icon: FileQuestion },
  ]

  const secondaryNavItems = [
    { name: t.anonymous, href: "/client/anonymous", icon: MessageSquare },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden max-w-[100vw]">
        {/* Top Bar */}
        <div className="bg-myBlue text-white py-1.5 px-4 overflow-hidden">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/client/contact" className="text-[10px] sm:text-xs flex items-center hover:underline">
                <div className="bg-myBlue p-1 rounded-full mr-1">
                  <Phone className="h-3 w-3 text-white" />
                </div>
                <span className="truncate">+251 11 234 5678</span>
              </Link>
              <Link href="/client/contact" className="text-[10px] sm:text-xs flex items-center hover:underline">
                <div className="bg-myBlue p-1 rounded-full mr-1">
                  <Mail className="h-3 w-3 text-white" />
                </div>
                <span className="truncate">info@kirkoswereda07.gov.et</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-xs">
              <Link href="/dashboard/login" className="flex items-center hover:underline">
                <div className="bg-myBlue p-1 rounded-full mr-1">
                  <LogIn className="h-3 w-3 text-white" />
                </div>
                {t.help}
              </Link>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] sm:text-xs flex items-center text-white hover:bg-[#1a3672]"
                  >
                    <Languages className="h-3 w-3 mr-1 text-white" />
                    <span>{t.language}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem onClick={() => setLanguage("en")}>{t.english}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("am")}>{t.amharic}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("or")}>{t.oromo}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto overflow-x-hidden px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo and Site Title */}
              <Link href="/client" className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                  <Image
                    width={100}
                    height={300}
                    src={logo || "/placeholder.svg"}
                    alt="Kirkos Sub City Logo"
                    className="h-10 w-auto sm:h-12 text-[#0F2557] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg text-[#0F2557]">Kirkos Sub City 07 Administration </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">Wereda 07 Public Service Portal</div>
                </div>
              </Link>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <div className="flex">
                    <Input
                      type="search"
                      placeholder={t.search + "..."}
                      className="pl-10 pr-4 py-3 w-full text-gray-800 border border-gray-200 focus:ring-2 focus:ring-sky-500 rounded-l-md bg-gray-50 focus:bg-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      className="bg-myBlue text-white rounded-l-none rounded-r-md hover:bg-myBlue/90"
                      onClick={handleSearch}
                    >
                      {t.search}
                    </Button>
                  </div>
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden bg-myBlue"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="border-t border-gray-200 bg-white">
            <div className="container mx-auto overflow-x-hidden px-4">
              <nav className="hidden md:flex">
                <ul className="flex">
                  {mainNavItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-3 text-sm font-medium ${
                            isActive
                              ? "text-[#0F2557] border-b-2 border-[#0F2557]"
                              : "text-gray-700 hover:text-[#0F2557] hover:bg-gray-50"
                          }`}
                        >
                          <div className="bg-myBlue p-1 rounded-full mr-2">
                            <item.icon className="h-4 w-4 text-white" />
                          </div>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}

                  {/* Services Dropdown */}
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#0F2557] hover:bg-gray-50">
                          <div className="bg-myBlue p-1 rounded-full mr-2">
                            <FileText className="h-4 w-4 text-white" />
                          </div>
                          More Services
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-white">
                        {secondaryNavItems.map((item) => (
                          <DropdownMenuItem key={item.href} asChild>
                            <Link href={item.href} className="flex items-center text-gray-800">
                              <div className="bg-myBlue p-1 rounded-full mr-2">
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                              {item.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>

                  {/* About Dropdown */}
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#0F2557] hover:bg-gray-50">
                          <div className="bg-myBlue p-1 rounded-full mr-2">
                            <AlertTriangle className="h-4 w-4 text-white" />
                          </div>
                          About
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-white">
                        <DropdownMenuItem asChild>
                          <Link href="/client/about/vision" className="flex items-center text-gray-800">
                            <div className="bg-myBlue p-1 rounded-full mr-2">
                              <AlertTriangle className="h-4 w-4 text-white" />
                            </div>
                            Vision
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/client/about/mission" className="flex items-center text-gray-800">
                            <div className="bg-myBlue p-1 rounded-full mr-2">
                              <AlertTriangle className="h-4 w-4 text-white" />
                            </div>
                            Mission
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/client/about/core-values" className="flex items-center text-gray-800">
                            <div className="bg-myBlue p-1 rounded-full mr-2">
                              <AlertTriangle className="h-4 w-4 text-white" />
                            </div>
                            Core Values
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 overflow-hidden">
              {/* Mobile Search */}
              <div className="p-3 sm:p-4 border-b border-gray-200">
                <div className="relative flex">
                  <Input
                    type="search"
                    placeholder={t.search + "..."}
                    className="pl-10 pr-16 py-2 w-full border border-gray-300 rounded-l-md bg-gray-50 focus:bg-white text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    className="bg-myBlue text-white rounded-l-none rounded-r-md hover:bg-myBlue/90 text-xs whitespace-nowrap"
                    onClick={handleSearch}
                  >
                    {t.search}
                  </Button>
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Mobile Menu Items */}
              <nav className="py-2">
                <ul className="space-y-1">
                  {[...mainNavItems, ...secondaryNavItems, 
                   { name: "Vision", href: "/client/about/vision", icon: AlertTriangle },
                   { name: "Mission", href: "/client/about/mission", icon: AlertTriangle },
                   { name: "Core Values", href: "/client/about/core-values", icon: AlertTriangle },
                  ].map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-2 text-sm ${
                            isActive
                              ? "bg-gray-100 text-[#0F2557] font-medium"
                              : "text-gray-700 hover:bg-gray-50 hover:text-[#0F2557]"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="bg-myBlue p-1 rounded-full mr-3">
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 overflow-x-hidden">{children}</main>

        {/* Footer */}
        <footer className="bg-myBlue text-white">
          <div className="container mx-auto overflow-x-hidden px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Kirkos Sub City Wereda 07</h3>
                <p className="text-sm text-gray-300">Administrative Office</p>
                <p className="flex items-center mt-2 text-sm text-gray-300">
                  <div className="bg-myBlue p-1 rounded-full mr-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  Addis Ababa, Ethiopia
                </p>
                <p className="mt-2 text-sm text-gray-300">GPS: Lat 9.013789 / Lon 38.751536</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link href="/client" className="hover:text-white hover:underline">
                      {t.home}
                    </Link>
                  </li>
                  <li>
                    <Link href="/client/services" className="hover:text-white hover:underline">
                      {t.services}
                    </Link>
                  </li>
                  <li>
                    <Link href="/client/complaints" className="hover:text-white hover:underline">
                      {t.complaints}
                    </Link>
                  </li>
                  <li>
                    <Link href="/client/requirements" className="hover:text-white hover:underline">
                      {t.requirements}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <div className="bg-myBlue p-1 rounded-full mr-2">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    +251 11 234 5678
                  </li>
                  <li className="flex items-center">
                    <div className="bg-myBlue p-1 rounded-full mr-2">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    info@kirkoswereda07.gov.et
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://web.facebook.com/kirkosworedasevencom?mibextid=ZbWKwL&_rdc=1&_rdr#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4">
                <Link
                  href="/client/about"
                  className="text-xs sm:text-sm text-gray-300 hover:text-white hover:underline"
                >
                  {t.about}
                </Link>
                <Link
                  href="/client/privacy"
                  className="text-xs sm:text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/client/terms"
                  className="text-xs sm:text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/client/accessibility"
                  className="text-xs sm:text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Accessibility
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">
                &copy; {new Date().getFullYear()} Kirkos Sub City Wereda 07 Administrative Office. All rights reserved.
              </p>
              <p className="mt-3 sm:mt-5 text-xs sm:text-sm">
                Design and Developed by{" "}
                <Link href="https://codexafrica.com/" className="hover:underline">
                  Codex Africa
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
