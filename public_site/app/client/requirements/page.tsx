import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, AlertCircle, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RequirementsPage() {
  const primaryButtonClasses = "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 text-base px-6 py-3";
  const secondaryButtonClasses = "border-sky-200 hover:bg-sky-50 hover:text-sky-700 rounded-md shadow-sm";

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 -mx-4 px-4 py-10 text-white shadow-lg mb-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-white">Service Requirements</h1>
          <p className="text-sky-100/90 max-w-3xl">
            Find out what documents and requirements you need for different services.
          </p>
        </div>
      </div>

      <div className="container mx-auto space-y-8 px-4 pb-12">
        <Alert className="bg-sky-50 border-sky-200 text-sky-700">
          <AlertCircle className="h-4 w-4 text-sky-600" />
          <AlertDescription>
            Make sure to bring original documents along with photocopies. All documents must be valid and up-to-date.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded-lg shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-1">
            <TabsTrigger 
              value="personal" 
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2 text-slate-700"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger 
              value="business" 
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2 text-slate-700"
            >
              Business
            </TabsTrigger>
            <TabsTrigger 
              value="construction" 
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2 text-slate-700"
            >
              Construction
            </TabsTrigger>
            <TabsTrigger 
              value="property" 
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2 text-slate-700"
            >
              Property
            </TabsTrigger>
            <TabsTrigger 
              value="transport" 
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2 text-slate-700"
            >
              Transport
            </TabsTrigger>
            <TabsTrigger 
              value="other" 
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2 text-slate-700"
            >
              Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6 space-y-6">
            <Card className="bg-white rounded-xl shadow-md border border-slate-200">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <FileText className="h-5 w-5 mr-2 text-sky-600" />
                  ID Card Requirements
                </CardTitle>
                <CardDescription className="text-slate-500 pt-1">
                  Documents needed for ID card issuance or renewal
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="new-id">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">New ID Card</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed application form</li>
                          <li>Birth certificate (original and copy)</li>
                          <li>2 recent passport-sized photographs (3x4cm, white background)</li>
                          <li>Residence certificate from kebele</li>
                          <li>Proof of address (utility bill or lease agreement)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">100 Birr for standard processing (5 working days)</p>
                        <p className="text-slate-600">200 Birr for expedited processing (2 working days)</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/1" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="renew-id">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">ID Card Renewal</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed renewal form</li>
                          <li>Existing ID card (original and copy)</li>
                          <li>2 recent passport-sized photographs (3x4cm, white background)</li>
                          <li>Proof of address (utility bill or lease agreement)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">50 Birr for standard processing (3 working days)</p>
                        <p className="text-slate-600">100 Birr for expedited processing (1 working day)</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/1" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="lost-id">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">Lost ID Card Replacement</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed replacement form</li>
                          <li>Police report for lost ID</li>
                          <li>2 recent passport-sized photographs (3x4cm, white background)</li>
                          <li>Proof of address (utility bill or lease agreement)</li>
                          <li>Affidavit of loss</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">150 Birr for standard processing (5 working days)</p>
                        <p className="text-slate-600">250 Birr for expedited processing (2 working days)</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/1" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-md border border-slate-200">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <FileText className="h-5 w-5 mr-2 text-sky-600" />
                  Birth Certificate Requirements
                </CardTitle>
                <CardDescription className="text-slate-500 pt-1">
                  Documents needed for birth certificate issuance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="new-birth">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">New Birth Certificate</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed application form</li>
                          <li>Hospital birth record or midwife statement</li>
                          <li>Parents' ID cards (original and copy)</li>
                          <li>Marriage certificate of parents (if applicable)</li>
                          <li>Residence certificate from kebele</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">50 Birr for standard processing (2 working days)</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/7" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="copy-birth">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">Certified Copy of Birth Certificate</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed application form</li>
                          <li>ID card of applicant (original and copy)</li>
                          <li>Proof of relationship to certificate holder (if not self)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">30 Birr for standard processing (1 working day)</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/7" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="construction" className="mt-6 space-y-6">
            <Card className="bg-white rounded-xl shadow-md border border-slate-200">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <FileText className="h-5 w-5 mr-2 text-sky-600" />
                  Building Permit Requirements
                </CardTitle>
                <CardDescription className="text-slate-500 pt-1">
                  Documents needed for building permit applications
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="new-construction">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">New Construction Permit</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed application form</li>
                          <li>Land ownership document/title deed (original and copy)</li>
                          <li>Architectural plans (3 copies) signed by licensed architect</li>
                          <li>Structural designs (3 copies) signed by licensed engineer</li>
                          <li>Soil test report</li>
                          <li>Environmental impact assessment (for buildings over 3 floors)</li>
                          <li>Tax clearance certificate</li>
                          <li>ID card of applicant (original and copy)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">Based on construction size and type:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Residential: 15 Birr per square meter</li>
                          <li>Commercial: 25 Birr per square meter</li>
                          <li>Industrial: 20 Birr per square meter</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/licenses" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="renovation">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">Renovation/Modification Permit</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed application form</li>
                          <li>Land ownership document/title deed (original and copy)</li>
                          <li>Original building permit</li>
                          <li>Architectural plans showing existing and proposed changes (3 copies)</li>
                          <li>Structural assessment report (for major renovations)</li>
                          <li>Tax clearance certificate</li>
                          <li>ID card of applicant (original and copy)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">Based on renovation scope:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Minor renovations: 500-1,000 Birr</li>
                          <li>Major renovations: 10 Birr per square meter affected</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/licenses" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="mt-6 space-y-6">
            <Card className="bg-white rounded-xl shadow-md border border-slate-200">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <FileText className="h-5 w-5 mr-2 text-sky-600" />
                  Business License Requirements
                </CardTitle>
                <CardDescription className="text-slate-500 pt-1">
                  Documents needed for business license applications
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="new-business">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">New Business License</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed application form</li>
                          <li>Business registration certificate</li>
                          <li>TIN certificate</li>
                          <li>Lease agreement or ownership document for business premises</li>
                          <li>ID card of business owner/manager (original and copy)</li>
                          <li>Professional qualification certificates (for specialized businesses)</li>
                          <li>Bank statement showing minimum capital requirement</li>
                          <li>Tax clearance certificate</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">Based on business type and size:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Small businesses: 500-1,000 Birr</li>
                          <li>Medium businesses: 1,000-1,500 Birr</li>
                          <li>Large businesses: 1,500-2,000 Birr</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/3" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="renew-business">
                    <AccordionTrigger className="text-slate-700 hover:text-sky-600">Business License Renewal</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Required Documents:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Completed renewal form</li>
                          <li>Original business license</li>
                          <li>Tax clearance certificate</li>
                          <li>Annual financial statement</li>
                          <li>Proof of payment of all taxes and fees</li>
                          <li>ID card of business owner/manager (original and copy)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-700">Fees:</h4>
                        <p className="text-slate-600">Based on business type and size:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Small businesses: 300-600 Birr</li>
                          <li>Medium businesses: 600-900 Birr</li>
                          <li>Large businesses: 900-1,200 Birr</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={secondaryButtonClasses}
                        >
                          <Link href="#" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download Form
                          </Link>
                        </Button>

                        <Button size="sm" asChild className={primaryButtonClasses}>
                          <Link href="/client/services/3" className="flex items-center">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property" className="mt-0">
            {/* Property-related requirements */}
          </TabsContent>

          <TabsContent value="transport" className="mt-0">
            {/* Transport-related requirements */}
          </TabsContent>

          <TabsContent value="other" className="mt-0">
            {/* Other requirements */}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}