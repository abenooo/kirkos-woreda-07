// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import {
//   Building2,
//   FileText,
//   Users,
//   Briefcase,
//   Car,
//   Home,
//   Landmark,
//   Leaf,
//   School,
//   ShieldCheck,
//   Clock,
//   ArrowRight,
//   Search,
//   Filter,
// } from "lucide-react"

// // Mock data for services
// const services = [
//   {
//     id: "1",
//     title: "ID Card Issuance",
//     description: "Apply for a new ID card or renew an existing one",
//     category: "personal",
//     processingTime: "3-5 days",
//     fee: "100 Birr",
//     icon: FileText,
//   },
//   {
//     id: "2",
//     title: "Birth Certificate",
//     description: "Request a birth certificate for a newborn or replacement",
//     category: "personal",
//     processingTime: "1-2 days",
//     fee: "50 Birr",
//     icon: FileText,
//   },
//   {
//     id: "3",
//     title: "Marriage Certificate",
//     description: "Apply for a marriage certificate",
//     category: "personal",
//     processingTime: "2-3 days",
//     fee: "200 Birr",
//     icon: Users,
//   },
//   {
//     id: "4",
//     title: "Business License",
//     description: "Apply for a new business license or renew an existing one",
//     category: "business",
//     processingTime: "7-10 days",
//     fee: "500-2000 Birr",
//     icon: Briefcase,
//   },
//   {
//     id: "5",
//     title: "Building Permit",
//     description: "Apply for a permit to construct or renovate a building",
//     category: "property",
//     processingTime: "14-21 days",
//     fee: "Based on project size",
//     icon: Building2,
//   },
//   {
//     id: "6",
//     title: "Land Title Transfer",
//     description: "Transfer land ownership from one person to another",
//     category: "property",
//     processingTime: "30 days",
//     fee: "Based on property value",
//     icon: Home,
//   },
//   {
//     id: "7",
//     title: "Vehicle Registration",
//     description: "Register a new vehicle or transfer ownership",
//     category: "transport",
//     processingTime: "3-5 days",
//     fee: "300-1000 Birr",
//     icon: Car,
//   },
//   {
//     id: "8",
//     title: "Tax Clearance Certificate",
//     description: "Obtain a tax clearance certificate",
//     category: "business",
//     processingTime: "1-2 days",
//     fee: "100 Birr",
//     icon: Landmark,
//   },
//   {
//     id: "9",
//     title: "Environmental Permit",
//     description: "Apply for environmental clearance for projects",
//     category: "property",
//     processingTime: "14-21 days",
//     fee: "Based on project type",
//     icon: Leaf,
//   },
//   {
//     id: "10",
//     title: "School Registration",
//     description: "Register a child for public school",
//     category: "education",
//     processingTime: "1-3 days",
//     fee: "Free",
//     icon: School,
//   },
//   {
//     id: "11",
//     title: "Police Clearance",
//     description: "Obtain a police clearance certificate",
//     category: "personal",
//     processingTime: "7-10 days",
//     fee: "150 Birr",
//     icon: ShieldCheck,
//   },
// ]

// // Category colors for badges only
// const categoryColors = {
//   personal: "bg-blue-100 text-blue-700 border-blue-200",
//   business: "bg-amber-100 text-amber-700 border-amber-200",
//   property: "bg-emerald-100 text-emerald-700 border-emerald-200",
//   transport: "bg-purple-100 text-purple-700 border-purple-200",
//   education: "bg-pink-100 text-pink-700 border-pink-200",
// }

// // Category gradient backgrounds for card headers
// const categoryGradients = {
//   personal: "from-blue-600 to-blue-700",
//   business: "from-amber-600 to-amber-700",
//   property: "from-emerald-600 to-emerald-700",
//   transport: "from-purple-600 to-purple-700",
//   education: "from-pink-600 to-pink-700",
// }

// export default function ServicesPage() {
//   // Group services by category
//   const categories = {
//     all: services,
//     personal: services.filter((service) => service.category === "personal"),
//     business: services.filter((service) => service.category === "business"),
//     property: services.filter((service) => service.category === "property"),
//     transport: services.filter((service) => service.category === "transport"),
//     education: services.filter((service) => service.category === "education"),
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#0F2557] to-[#1a3672] -mx-4 px-4 py-8 text-white shadow-lg">
//         <div className="container mx-auto">
//           <h1 className="text-4xl font-bold mb-4">Government Services</h1>
//           <p className="max-w-3xl mb-6 text-white/90">
//             Browse all services offered by Kirkos Sub City Wereda 07 Administrative Office. You can filter services by
//             category or use the search function to find what you need.
//           </p>

//           {/* Search Bar */}
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-1">
//               <Input
//                 type="search"
//                 placeholder="Search for services..."
//                 className="pl-10 pr-4 py-2 w-full bg-white/90 border-0 focus:ring-2 focus:ring-[#FFC621] text-gray-900"
//               />
//               <Search className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             </div>
//             <Button className="bg-[#078C43] hover:bg-[#056a32] shadow-md">
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto">
//         <Tabs defaultValue="all" className="w-full">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <TabsList className="bg-gray-100 p-1 rounded-lg shadow-sm">
//               <TabsTrigger value="all" className="data-[state=active]:bg-[#0F2557] data-[state=active]:text-white">
//                 All Services
//               </TabsTrigger>
//               <TabsTrigger value="personal" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
//                 Personal
//               </TabsTrigger>
//               <TabsTrigger value="business" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
//                 Business
//               </TabsTrigger>
//               <TabsTrigger value="property" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
//                 Property
//               </TabsTrigger>
//               <TabsTrigger
//                 value="transport"
//                 className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
//               >
//                 Transport
//               </TabsTrigger>
//               <TabsTrigger
//                 value="education"
//                 className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
//               >
//                 Education
//               </TabsTrigger>
//             </TabsList>

//             <Button variant="outline" className="flex items-center gap-2 shadow-sm">
//               <Filter className="h-4 w-4" />
//               Advanced Filters
//             </Button>
//           </div>

//           {Object.entries(categories).map(([category, services]) => (
//             <TabsContent key={category} value={category} className="mt-0">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {services.map((service) => {
//                   const ServiceIcon = service.icon
//                   const categoryColor = categoryColors[service.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700 border-gray-200"
//                   const categoryGradient = categoryGradients[service.category as keyof typeof categoryGradients] || "from-gray-500 to-gray-600"

//                   return (
//                     <Card
//                       key={service.id}
//                       className="hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden rounded-xl group"
//                     >
//                       <div className={`bg-gradient-to-r ${categoryGradient} px-6 py-5 flex items-center text-white`}>
//                         <div className="bg-white p-3 rounded-full mr-4 shadow-md">
//                           <ServiceIcon className="h-6 w-6 text-gray-800" />
//                         </div>
//                         <div>
//                           <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
//                           <Badge variant="outline" className="bg-white/20 text-white border-white/30 mt-1">
//                             {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
//                           </Badge>
//                         </div>
//                       </div>
//                       <CardContent className="pt-5 pb-2">
//                         <p className="text-gray-600 mb-4">{service.description}</p>
//                         <div className="space-y-3 text-sm">
//                           <div className="flex items-center p-2 bg-gray-50 rounded-lg">
//                             <Clock className="h-5 w-5 mr-3 text-gray-600" />
//                             <span className="text-gray-700">Processing Time: {service.processingTime}</span>
//                           </div>
//                           <div className="flex items-center p-2 bg-gray-50 rounded-lg">
//                             <Landmark className="h-5 w-5 mr-3 text-gray-600" />
//                             <span className="text-gray-700">Fee: {service.fee}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                       <CardFooter className="border-t px-6 py-4">
//                         <Button asChild className="w-full bg-gray-800 hover:bg-gray-700 hover:shadow-lg transition-all duration-300 text-white group-hover:scale-[1.02]">
//                           <Link href={`/client/services/${service.id}`}>
//                             Apply Now
//                             <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                           </Link>
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   )
//                 })}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>

//       {/* Requirements Section */}
//       <section className="bg-gradient-to-r from-[#0F2557]/10 to-[#1a3672]/10 p-8 rounded-lg border border-[#0F2557]/10 mt-8 shadow-sm">
//         <h2 className="text-2xl font-bold mb-4 text-[#0F2557]">Service Requirements</h2>
//         <p className="mb-4">
//           Each service has specific document requirements. Please check the requirements page or the specific service
//           page for detailed information.
//         </p>
//         <Button
//           asChild
//           className="bg-[#0F2557] hover:bg-[#1a3672] text-white hover:shadow-md transition-all duration-300"
//         >
//           <Link href="/client/requirements">View Requirements Guide</Link>
//         </Button>
//       </section>
//     </div>
//   )
// }
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge" // Badge is imported but not explicitly used with categoryColors in the cards in the original; kept for completeness
import { Input } from "@/components/ui/input"
import {
  Building2,
  FileText,
  Users,
  Briefcase,
  Car,
  Home,
  Landmark,
  Leaf,
  School,
  ShieldCheck,
  Clock,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react"

// Mock data for services (assuming this data remains the same)
const services = [
  { id: "1", title: "የህዝብ አገልግሎት ", description: "Apply for a new ID card or renew an existing one", category: "personal", processingTime: "3-5 days", fee: "100 Birr", icon: FileText },
  { id: "2", title: "የወረዳ_07_ህብረት_ሥራ_ጽ/ቤት", description: "Request a birth certificate for a newborn or replacement", category: "personal", processingTime: "1-2 days", fee: "50 Birr", icon: FileText },
  { id: "3", title: "የአርሶ_አደርና_ከተማ_ግብርና_ልማት_ጽ/ቤት", description: "Apply for a marriage certificate", category: "personal", processingTime: "2-3 days", fee: "200 Birr", icon: Users },
  { id: "4", title: "የሰው ኃይል ስታንዳርድ የወጣላቸው", description: "Apply for a new business license or renew an existing one", category: "business", processingTime: "7-10 days", fee: "500-2000 Birr", icon: Briefcase },
  { id: "5", title: "አዲስ የዜጎች ቻርተር", description: "Apply for a permit to construct or renovate a building", category: "property", processingTime: "14-21 days", fee: "Based on project size", icon: Building2 },
  { id: "6", title: "ንግድ ጽ/ቤት", description: "Transfer land ownership from one person to another", category: "property", processingTime: "30 days", fee: "Based on property value", icon: Home },
  { id: "7", title: "የከተማ ውበት", description: "Register a new vehicle or transfer ownership", category: "transport", processingTime: "3-5 days", fee: "300-1000 Birr", icon: Car },
  // { id: "8", title: "2017_በጀት_አመት_የዜጎች_የስምምነት_ሰነድ", description: "Obtain a tax clearance certificate", category: "business", processingTime: "1-2 days", fee: "100 Birr", icon: Landmark },
  { id: "9", title: "የወጣቶችና ስፖርት አዲስ መስፈርት", description: "Apply for environmental clearance for projects", category: "property", processingTime: "14-21 days", fee: "Based on project type", icon: Leaf },
  { id: "10", title: "School Registration", description: "Register a child for public school", category: "education", processingTime: "1-3 days", fee: "Free", icon: School },
  { id: "11", title: "Police Clearance", description: "Obtain a police clearance certificate", category: "personal", processingTime: "7-10 days", fee: "150 Birr", icon: ShieldCheck },
];

// Updated category gradient backgrounds for card headers
const categoryGradients = {
  personal: "from-sky-500 to-sky-600",
  business: "from-orange-500 to-orange-600",
  property: "from-green-500 to-green-600",
  transport: "from-violet-500 to-violet-600",
  education: "from-pink-500 to-pink-600",
  default: "from-slate-500 to-slate-600", // Default gradient
};

// Colors for active TabsTrigger based on new categoryGradients
const activeTabColors = {
  all: "data-[state=active]:bg-sky-600", // Primary color for "All"
  personal: "data-[state=active]:bg-sky-600",
  business: "data-[state=active]:bg-orange-600",
  property: "data-[state=active]:bg-green-600",
  transport: "data-[state=active]:bg-violet-600",
  education: "data-[state=active]:bg-pink-600",
};

export default function ServicesPage() {
  const categories = {
    all: services,
    personal: services.filter((service) => service.category === "personal"),
    business: services.filter((service) => service.category === "business"),
    property: services.filter((service) => service.category === "property"),
    transport: services.filter((service) => service.category === "transport"),
    education: services.filter((service) => service.category === "education"),
  };

  const primaryButtonClasses = "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-300";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 -mx-4 px-4 py-10 text-white shadow-lg"> {/* Updated background and padding */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Government Services</h1>
          <p className="max-w-3xl mb-6 text-sky-100/90"> {/* Slightly lighter text for description */}
            Browse all services offered by Kirkos Sub City Wereda 07 Administrative Office. You can filter services by
            category or use the search function to find what you need.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search for services..."
                className="pl-10 pr-4 py-3 w-full bg-white/95 border-0 focus:ring-2 focus:ring-sky-400 text-slate-900 rounded-md shadow-sm" /* Updated styling */
              />
              <Search className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" /> {/* Adjusted icon color and position slightly */}
            </div>
            <Button className={`${primaryButtonClasses} px-5 py-3`}> {/* Updated styling, added padding */}
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList className="bg-slate-100 p-1 rounded-lg shadow-sm text-slate-700 flex-wrap h-auto md:h-10"> {/* Ensure text color for inactive, allow wrapping */}
              {Object.keys(categories).map((catKey) => (
                <TabsTrigger
                  key={catKey}
                  value={catKey}
                  className={`${activeTabColors[catKey as keyof typeof activeTabColors] || 'data-[state=active]:bg-slate-600'} data-[state=active]:text-white px-3 py-1.5 text-sm`}
                >
                  {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button variant="outline" className="flex items-center gap-2 shadow-sm border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>

          {Object.entries(categories).map(([categoryKey, serviceList]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="mt-0">
              {serviceList.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  No services found in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceList.map((service) => {
                    const ServiceIcon = service.icon;
                    const categoryGradient = categoryGradients[service.category as keyof typeof categoryGradients] || categoryGradients.default;

                    return (
                      <Card
                        key={service.id}
                        className="bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden rounded-xl group flex flex-col" // Added flex flex-col
                      >
                        <div className={`bg-gradient-to-br ${categoryGradient} px-6 py-5 flex items-center text-white`}> {/* Changed to to-br */}
                          <div className="bg-white/25 p-3 rounded-full mr-4 shadow-md backdrop-blur-sm"> {/* Updated icon wrapper */}
                            <ServiceIcon className="h-6 w-6 text-white" /> {/* Icon white on semi-transparent wrapper */}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                            <Badge variant="outline" className="bg-white/20 text-white border-white/30 mt-1.5 backdrop-blur-sm text-xs px-2 py-0.5"> {/* Smaller badge */}
                              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="pt-5 pb-4 flex-grow"> {/* Added flex-grow */}
                          <p className="text-slate-600 mb-4 text-sm min-h-[60px]">{service.description}</p> {/* min-h for description */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                              <Clock className="h-5 w-5 mr-3 text-slate-500" />
                              <span className="text-slate-700 font-medium">Processing:</span>
                              <span className="text-slate-600 ml-1">{service.processingTime}</span>
                            </div>
                            <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                              <Landmark className="h-5 w-5 mr-3 text-slate-500" />
                              <span className="text-slate-700 font-medium">Fee:</span>
                              <span className="text-slate-600 ml-1">{service.fee}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-slate-200 px-6 py-4 mt-auto"> {/* Added mt-auto */}
                          <Button asChild className={`w-full ${primaryButtonClasses} group-hover:scale-[1.02]`}>
                            <Link href={`/client/services/${service.id}`}>
                              <span> {/* Wrapper for asChild */}
                                View Details & Apply
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                              </span>
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Requirements Section */}
      <section className="bg-sky-50 p-8 rounded-xl border border-sky-100 mt-10 shadow-sm"> {/* Updated styling */}
        <div className="container mx-auto text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3 text-sky-700">Service Requirements</h2>
            <p className="mb-5 text-slate-700 max-w-2xl mx-auto md:mx-0">
            Each service has specific document requirements. Please check the requirements page or the specific service
            page for detailed information before applying.
            </p>
            <Button
            asChild
            className={`${primaryButtonClasses} px-6 py-3`} // Added padding
            >
            <Link href="/client/requirements">
                <span>View Requirements Guide</span> {/* Wrapper for asChild */}
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}