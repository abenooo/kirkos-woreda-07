"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Download,
} from "lucide-react"

// Mock data for services
const services = [
  {
    id: "1",
    title: "ID Card Issuance",
    description: "Apply for a new ID card or renew an existing one",
    category: "personal",
    processingTime: "3-5 days",
    fee: "100 Birr",
    icon: FileText,
    longDescription:
      "The ID Card Issuance service allows citizens to apply for a new identification card or renew an existing one. This official document is required for various government services and legal transactions.",
    requirements: [
      "Completed application form",
      "Birth certificate (original and copy)",
      "2 recent passport-sized photographs (3x4cm, white background)",
      "Residence certificate from kebele",
      "Proof of address (utility bill or lease agreement)",
    ],
    process: [
      "Submit application with required documents",
      "Pay the application fee",
      "Get photographed at the office",
      "Receive a collection slip",
      "Collect your ID card on the specified date",
    ],
  },
  {
    id: "2",
    title: "Birth Certificate",
    description: "Request a birth certificate for a newborn or replacement",
    category: "personal",
    processingTime: "1-2 days",
    fee: "50 Birr",
    icon: FileText,
    longDescription:
      "The Birth Certificate service provides official documentation of a child's birth. This is an essential document for school enrollment, passport applications, and other official purposes.",
    requirements: [
      "Completed application form",
      "Hospital birth record or midwife statement",
      "Parents' ID cards (original and copy)",
      "Marriage certificate of parents (if applicable)",
      "Residence certificate from kebele",
    ],
    process: [
      "Submit application with required documents",
      "Pay the application fee",
      "Verification of documents",
      "Receive birth certificate",
    ],
  },
  {
    id: "3",
    title: "Marriage Certificate",
    description: "Apply for a marriage certificate",
    category: "personal",
    processingTime: "2-3 days",
    fee: "200 Birr",
    icon: Users,
    longDescription:
      "The Marriage Certificate service provides official documentation of a legal marriage. This document is required for various legal purposes including property ownership, name changes, and immigration.",
    requirements: [
      "Completed application form",
      "ID cards of both parties (original and copy)",
      "Birth certificates of both parties",
      "Witness statements (minimum 2 witnesses)",
      "Photographs of both parties",
    ],
    process: [
      "Submit application with required documents",
      "Pay the application fee",
      "Schedule marriage registration appointment",
      "Attend with witnesses for official registration",
      "Receive marriage certificate",
    ],
  },
  {
    id: "4",
    title: "Business License",
    description: "Apply for a new business license or renew an existing one",
    category: "business",
    processingTime: "7-10 days",
    fee: "500-2000 Birr",
    icon: Briefcase,
    longDescription:
      "The Business License service allows entrepreneurs and companies to legally operate their business within the jurisdiction. Different types of businesses require specific licenses based on their activities.",
    requirements: [
      "Completed application form",
      "Business registration certificate",
      "TIN certificate",
      "Lease agreement or ownership document for business premises",
      "ID card of business owner/manager",
      "Professional qualification certificates (for specialized businesses)",
    ],
    process: [
      "Submit application with required documents",
      "Pay the application fee",
      "Premises inspection (if applicable)",
      "Application review",
      "License issuance",
    ],
  },
  {
    id: "5",
    title: "Building Permit",
    description: "Apply for a permit to construct or renovate a building",
    category: "property",
    processingTime: "14-21 days",
    fee: "Based on project size",
    icon: Building2,
    longDescription:
      "The Building Permit service ensures that construction projects comply with local building codes, zoning regulations, and safety standards. This permit is required before starting any construction or major renovation work.",
    requirements: [
      "Completed application form",
      "Land ownership document/title deed",
      "Architectural plans signed by licensed architect",
      "Structural designs signed by licensed engineer",
      "Environmental impact assessment (for larger projects)",
      "Soil test report",
    ],
    process: [
      "Submit application with required documents",
      "Pay the application fee",
      "Plan review by various departments",
      "Site inspection",
      "Permit issuance",
    ],
  },
  {
    id: "6",
    title: "Land Title Transfer",
    description: "Transfer land ownership from one person to another",
    category: "property",
    processingTime: "30 days",
    fee: "Based on property value",
    icon: Home,
    longDescription:
      "The Land Title Transfer service facilitates the legal transfer of land ownership from one party to another. This process ensures proper documentation and registration of property ownership changes.",
    requirements: [
      "Completed transfer application form",
      "Original title deed",
      "Sale agreement or inheritance documents",
      "ID cards of both parties",
      "Tax clearance certificate",
      "Property valuation report",
    ],
    process: [
      "Submit application with required documents",
      "Pay transfer fees and taxes",
      "Property verification",
      "Title deed preparation",
      "Registration of new title",
    ],
  },
  {
    id: "7",
    title: "Vehicle Registration",
    description: "Register a new vehicle or transfer ownership",
    category: "transport",
    processingTime: "3-5 days",
    fee: "300-1000 Birr",
    icon: Car,
    longDescription:
      "The Vehicle Registration service provides official documentation and license plates for vehicles operating within the jurisdiction. This is required for all motorized vehicles using public roads.",
    requirements: [
      "Completed registration form",
      "Vehicle purchase document",
      "Import declaration (for imported vehicles)",
      "Technical inspection certificate",
      "ID card of owner",
      "Tax payment receipt",
    ],
    process: [
      "Submit application with required documents",
      "Pay registration fees",
      "Vehicle inspection",
      "Registration approval",
      "License plate issuance",
    ],
  },
  {
    id: "8",
    title: "Tax Clearance Certificate",
    description: "Obtain a tax clearance certificate",
    category: "business",
    processingTime: "1-2 days",
    fee: "100 Birr",
    icon: Landmark,
    longDescription:
      "The Tax Clearance Certificate service provides official confirmation that an individual or business has paid all required taxes. This document is often required for business licenses, property transfers, and travel purposes.",
    requirements: [
      "Completed application form",
      "Tax identification number (TIN)",
      "Proof of tax payments",
      "Business registration (for businesses)",
      "ID card of applicant",
    ],
    process: [
      "Submit application with required documents",
      "Pay application fee",
      "Tax payment verification",
      "Certificate issuance",
    ],
  },
  {
    id: "9",
    title: "Environmental Permit",
    description: "Apply for environmental clearance for projects",
    category: "property",
    processingTime: "14-21 days",
    fee: "Based on project type",
    icon: Leaf,
    longDescription:
      "The Environmental Permit service ensures that development projects comply with environmental regulations and minimize negative impacts on the environment. This is required for construction, industrial, and other projects that may affect the environment.",
    requirements: [
      "Completed application form",
      "Project description",
      "Environmental impact assessment",
      "Site plan",
      "Waste management plan",
      "Mitigation measures",
    ],
    process: [
      "Submit application with required documents",
      "Pay application fee",
      "Environmental assessment review",
      "Site inspection",
      "Public consultation (for larger projects)",
      "Permit decision",
    ],
  },
  {
    id: "10",
    title: "School Registration",
    description: "Register a child for public school",
    category: "education",
    processingTime: "1-3 days",
    fee: "Free",
    icon: School,
    longDescription:
      "The School Registration service allows parents to enroll their children in public schools within the jurisdiction. This service ensures that all children have access to education as required by law.",
    requirements: [
      "Completed registration form",
      "Child's birth certificate",
      "Immunization records",
      "Previous school records (for transfers)",
      "Proof of residence in the school district",
      "Parents' ID cards",
    ],
    process: [
      "Submit application with required documents",
      "Verification of documents",
      "School placement based on residence and availability",
      "Registration confirmation",
    ],
  },
  {
    id: "11",
    title: "Police Clearance",
    description: "Obtain a police clearance certificate",
    category: "personal",
    processingTime: "7-10 days",
    fee: "150 Birr",
    icon: ShieldCheck,
    longDescription:
      "The Police Clearance Certificate service provides official confirmation that an individual has no criminal record or pending criminal cases. This document is often required for employment, visa applications, and other official purposes.",
    requirements: [
      "Completed application form",
      "ID card (original and copy)",
      "Passport-sized photographs",
      "Fingerprint records",
      "Letter stating purpose of clearance (if applicable)",
    ],
    process: [
      "Submit application with required documents",
      "Pay application fee",
      "Fingerprinting",
      "Background check",
      "Certificate issuance",
    ],
  },
]


export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params.id as string

  const service = services.find((s) => s.id === serviceId)

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 rounded-full p-4 mb-4">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
        <p className="text-gray-600 mb-6 text-center">
          The service you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/client/services">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>
    )
  }

  const ServiceIcon = service.icon

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/client/services"
          className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">{service.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-emerald-50/80 text-emerald-700 border-emerald-200 backdrop-blur-sm">
            {service.category}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Processing time: {service.processingTime}
          </div>
        </div>
        <p className="text-gray-600 max-w-3xl">{service.longDescription}</p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="bg-white/80 backdrop-blur-sm border border-emerald-100/50">
          <TabsTrigger 
            value="details" 
            className="data-[state=active]:bg-emerald-600/90 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className="data-[state=active]:bg-emerald-600/90 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Requirements
          </TabsTrigger>
          <TabsTrigger 
            value="process" 
            className="data-[state=active]:bg-emerald-600/90 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Process
          </TabsTrigger>
          <TabsTrigger 
            value="apply" 
            className="data-[state=active]:bg-emerald-600/90 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Apply
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ServiceIcon className="h-5 w-5 mr-2 text-emerald-600" />
                Service Details
              </CardTitle>
              <CardDescription>Complete information about this service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Service Category</h3>
                  <p className="font-medium capitalize">{service.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Processing Time</h3>
                  <p className="font-medium">{service.processingTime}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Service Fee</h3>
                  <p className="font-medium">{service.fee}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Department</h3>
                  <p className="font-medium">
                    {service.category === "personal"
                      ? "Personal Documents"
                      : service.category === "business"
                        ? "Business Licensing"
                        : service.category === "property"
                          ? "Land & Construction"
                          : service.category === "transport"
                            ? "Transportation"
                            : "Education"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p>{service.longDescription}</p>
              </div>

              <Alert className="bg-blue-50/80 border-blue-100/50 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-800">
                  For more information about this service, please visit our office or call us at +251-111-234567.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
                Required Documents
              </CardTitle>
              <CardDescription>Documents you need to prepare for this service</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-400">
                {service.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  className="border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 backdrop-blur-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Requirements Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-emerald-600" />
                Application Process
              </CardTitle>
              <CardDescription>Step-by-step guide to applying for this service</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                {service.process.map((step, index) => (
                  <li key={index} className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-emerald-100/80 rounded-full -left-4 ring-4 ring-white/80 text-emerald-800 font-medium">
                      {index + 1}
                    </span>
                    <h3 className="font-medium mb-1">Step {index + 1}</h3>
                    <p className="text-gray-600">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 p-4 bg-yellow-50/80 rounded-lg border border-yellow-100/50 backdrop-blur-sm">
                <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                  Important Notes
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-yellow-800">
                  <li>All documents must be original with photocopies</li>
                  <li>Applications with incomplete documents will not be processed</li>
                  <li>Processing times are estimates and may vary based on workload</li>
                  <li>You will receive a tracking number to check your application status</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply" className="mt-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                Apply for {service.title}
              </CardTitle>
              <CardDescription>Choose how you want to apply for this service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200/50 rounded-lg p-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors backdrop-blur-sm">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                    Apply in Person
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Visit our office with all required documents to apply for this service in person.
                  </p>
                  <Button className="w-full bg-emerald-600/90 hover:bg-emerald-700/90 backdrop-blur-sm">
                    Book Appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="border border-gray-200/50 rounded-lg p-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors backdrop-blur-sm">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                    Apply Online
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete the application process online by uploading all required documents.
                  </p>
                  <Button className="w-full bg-emerald-600/90 hover:bg-emerald-700/90 backdrop-blur-sm">
                    Start Online Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200/50 pt-6">
                <h3 className="font-medium mb-4">Office Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                    <p>Kirkos Sub City Wereda 07 Administrative Office</p>
                    <p>Addis Ababa, Ethiopia</p>
                    <p className="text-sm text-gray-500 mt-1">GPS: Lat 9.013789 / Lon 38.751536</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Office Hours</h4>
                    <p>Monday - Friday: 8:30 AM - 5:00 PM</p>
                    <p>Saturday: 8:30 AM - 12:30 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200/50 pt-6 flex flex-col items-start">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have questions about this service or need assistance with your application, please contact us.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 backdrop-blur-sm"
                >
                  Call Us: +251-111-234567
                </Button>
                <Button 
                  variant="outline" 
                  className="border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 backdrop-blur-sm"
                >
                  Email: support@kirkoswereda07.gov.et
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}