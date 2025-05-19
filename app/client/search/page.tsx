"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Briefcase, Building2, Home, Car, Leaf, School, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  { id: "1", title: "የህዝብ አገልግሎት", description: "Apply for a new ID card or renew an existing one", category: "personal", processingTime: "3-5 days", fee: "100 Birr", icon: FileText },
  { id: "2", title: "የወረዳ_07_ህብረት_ሥራ_ጽ/ቤት", description: "Request a birth certificate for a newborn or replacement", category: "personal", processingTime: "1-2 days", fee: "50 Birr", icon: FileText },
  { id: "3", title: "የአርሶ_አደርና_ከተማ_ግብርና_ልማት_ጽ/ቤት", description: "Apply for a marriage certificate", category: "personal", processingTime: "2-3 days", fee: "200 Birr", icon: Users },
  { id: "4", title: "የሰው ኃይል ስታንዳርድ የወጣላቸው", description: "Apply for a new business license or renew an existing one", category: "business", processingTime: "7-10 days", fee: "500-2000 Birr", icon: Briefcase },
  { id: "5", title: "አዲስ የዜጎች ቻርተር", description: "Apply for a permit to construct or renovate a building", category: "property", processingTime: "14-21 days", fee: "Based on project size", icon: Building2 },
  { id: "6", title: "ንግድ ጽ/ቤት", description: "Transfer land ownership from one person to another", category: "property", processingTime: "30 days", fee: "Based on property value", icon: Home },
  { id: "7", title: "የከተማ ውበት", description: "Register a new vehicle or transfer ownership", category: "transport", processingTime: "3-5 days", fee: "300-1000 Birr", icon: Car },
  { id: "9", title: "የወጣቶችና ስፖርት አዲስ መስፈርት", description: "Apply for environmental clearance for projects", category: "property", processingTime: "14-21 days", fee: "Based on project type", icon: Leaf },
  { id: "10", title: "School Registration", description: "Register a child for public school", category: "education", processingTime: "1-3 days", fee: "Free", icon: School },
  { id: "11", title: "Police Clearance", description: "Obtain a police clearance certificate", category: "personal", processingTime: "7-10 days", fee: "150 Birr", icon: ShieldCheck },
]

const categoryGradients = {
  personal: "from-sky-500 to-sky-600",
  business: "from-orange-500 to-orange-600",
  property: "from-green-500 to-green-600",
  transport: "from-violet-500 to-violet-600",
  education: "from-pink-500 to-pink-600",
  default: "from-slate-500 to-slate-600",
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  // Filter services based on search query
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(query.toLowerCase()) || 
    service.description.toLowerCase().includes(query.toLowerCase()) ||
    service.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      
      {filteredServices.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No services found matching your search.</p>
          <p className="text-gray-500">Try different keywords or browse our services.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const ServiceIcon = service.icon
            const categoryGradient = categoryGradients[service.category as keyof typeof categoryGradients] || categoryGradients.default

            return (
              <Card
                key={service.id}
                className="bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden rounded-xl group flex flex-col"
              >
                <div className={`bg-gradient-to-br ${categoryGradient} px-6 py-5 flex items-center text-white`}>
                  <div className="bg-white/25 p-3 rounded-full mr-4 shadow-md backdrop-blur-sm">
                    <ServiceIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                    <div className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full inline-block mt-1.5">
                      {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                    </div>
                  </div>
                </div>
                <CardContent className="pt-5 pb-4 flex-grow">
                  <p className="text-slate-600 mb-4 text-sm min-h-[60px]">{service.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <span className="text-slate-700 font-medium">Processing Time:</span>
                      <span className="text-slate-600 ml-1">{service.processingTime}</span>
                    </div>
                    <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <span className="text-slate-700 font-medium">Fee:</span>
                      <span className="text-slate-600 ml-1">{service.fee}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-200 px-6 py-4 mt-auto">
                  <Button asChild className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                    <Link href={`/client/services/${service.id}`}>
                      <span>
                        View Details & Apply
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}