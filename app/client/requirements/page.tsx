import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, AlertCircle, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RequirementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Service Requirements</h1>
        <p className="text-gray-600">Find out what documents and requirements you need for different services.</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Make sure to bring original documents along with photocopies. All documents must be valid and up-to-date.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-0 space-y-6">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                ID Card Requirements
              </CardTitle>
              <CardDescription>Documents needed for ID card issuance or renewal</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="new-id">
                  <AccordionTrigger>New ID Card</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Completed application form</li>
                        <li>Birth certificate (original and copy)</li>
                        <li>2 recent passport-sized photographs (3x4cm, white background)</li>
                        <li>Residence certificate from kebele</li>
                        <li>Proof of address (utility bill or lease agreement)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>100 Birr for standard processing (5 working days)</p>
                      <p>200 Birr for expedited processing (2 working days)</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href="/client/services/1" className="flex items-center">
                          Apply Now
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="renew-id">
                  <AccordionTrigger>ID Card Renewal</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Completed renewal form</li>
                        <li>Existing ID card (original and copy)</li>
                        <li>2 recent passport-sized photographs (3x4cm, white background)</li>
                        <li>Proof of address (utility bill or lease agreement)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>50 Birr for standard processing (3 working days)</p>
                      <p>100 Birr for expedited processing (1 working day)</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href="/client/services/1" className="flex items-center">
                          Apply Now
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lost-id">
                  <AccordionTrigger>Lost ID Card Replacement</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Completed replacement form</li>
                        <li>Police report for lost ID</li>
                        <li>2 recent passport-sized photographs (3x4cm, white background)</li>
                        <li>Proof of address (utility bill or lease agreement)</li>
                        <li>Affidavit of loss</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>150 Birr for standard processing (5 working days)</p>
                      <p>250 Birr for expedited processing (2 working days)</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
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

          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Birth Certificate Requirements
              </CardTitle>
              <CardDescription>Documents needed for birth certificate issuance</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="new-birth">
                  <AccordionTrigger>New Birth Certificate</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Completed application form</li>
                        <li>Hospital birth record or midwife statement</li>
                        <li>Parents' ID cards (original and copy)</li>
                        <li>Marriage certificate of parents (if applicable)</li>
                        <li>Residence certificate from kebele</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>50 Birr for standard processing (2 working days)</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href="/client/services/7" className="flex items-center">
                          Apply Now
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="copy-birth">
                  <AccordionTrigger>Certified Copy of Birth Certificate</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Completed application form</li>
                        <li>ID card of applicant (original and copy)</li>
                        <li>Proof of relationship to certificate holder (if not self)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>30 Birr for standard processing (1 working day)</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
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

        <TabsContent value="construction" className="mt-0 space-y-6">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Building Permit Requirements
              </CardTitle>
              <CardDescription>Documents needed for building permit applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="new-construction">
                  <AccordionTrigger>New Construction Permit</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
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
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>Based on construction size and type:</p>
                      <ul className="list-disc pl-5 space-y-1">
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
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href="/client/licenses" className="flex items-center">
                          Apply Now
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="renovation">
                  <AccordionTrigger>Renovation/Modification Permit</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
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
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>Based on renovation scope:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Minor renovations: 500-1,000 Birr</li>
                        <li>Major renovations: 10 Birr per square meter affected</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
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

        <TabsContent value="business" className="mt-0 space-y-6">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Business License Requirements
              </CardTitle>
              <CardDescription>Documents needed for business license applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="new-business">
                  <AccordionTrigger>New Business License</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
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
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>Based on business type and size:</p>
                      <ul className="list-disc pl-5 space-y-1">
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
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href="/client/services/3" className="flex items-center">
                          Apply Now
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="renew-business">
                  <AccordionTrigger>Business License Renewal</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Completed renewal form</li>
                        <li>Original business license</li>
                        <li>Tax clearance certificate</li>
                        <li>Annual financial statement</li>
                        <li>Proof of payment of all taxes and fees</li>
                        <li>ID card of business owner/manager (original and copy)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Fees:</h4>
                      <p>Based on business type and size:</p>
                      <ul className="list-disc pl-5 space-y-1">
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
                        className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Link href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download Form
                        </Link>
                      </Button>

                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
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
  )
}
