"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, CheckCircle2, FileText, Upload } from "lucide-react"
import Link from "next/link"

// Form schema for building permit
const buildingPermitSchema = z.object({
  applicantName: z.string().min(1, { message: "Applicant name is required" }),
  applicantType: z.string().min(1, { message: "Please select applicant type" }),
  email: z.string().email({ message: "Please provide a valid email" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  projectType: z.string().min(1, { message: "Please select project type" }),
  projectPurpose: z.string().min(1, { message: "Please select project purpose" }),
  projectLocation: z.string().min(1, { message: "Project location is required" }),
  plotArea: z.string().min(1, { message: "Plot area is required" }),
  buildingArea: z.string().min(1, { message: "Building area is required" }),
  floors: z.string().min(1, { message: "Number of floors is required" }),
  estimatedCost: z.string().min(1, { message: "Estimated cost is required" }),
  description: z.string().min(10, { message: "Project description must be at least 10 characters" }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export default function LicensesPage() {
  const [submitted, setSubmitted] = useState(false)

  // Building permit form
  const form = useForm<z.infer<typeof buildingPermitSchema>>({
    resolver: zodResolver(buildingPermitSchema),
    defaultValues: {
      applicantName: "",
      applicantType: "",
      email: "",
      phone: "",
      address: "",
      projectType: "",
      projectPurpose: "",
      projectLocation: "",
      plotArea: "",
      buildingArea: "",
      floors: "",
      estimatedCost: "",
      description: "",
      agreeToTerms: false,
    },
  })

  // Handle building permit submission
  function onSubmit(values: z.infer<typeof buildingPermitSchema>) {
    console.log(values)
    setSubmitted(true)
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setSubmitted(false)
      form.reset()
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-green-50 rounded-full p-4 mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Your building permit application has been submitted successfully. We will review your application and contact
          you within 5-7 business days.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6 max-w-md">
          <p className="text-sm text-blue-800">
            Your application reference number: <strong>BLD-{Math.floor(Math.random() * 10000)}</strong>
          </p>
          <p className="text-sm text-blue-800 mt-2">Please keep this reference number for future inquiries.</p>
        </div>
        <Button onClick={() => setSubmitted(false)}>Submit Another Application</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Building & Construction Licenses</h1>
        <p className="text-gray-600">Apply for building permits, construction licenses, and other related permits.</p>
      </div>

      <Tabs defaultValue="building" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="building" className="flex items-center">
            <Building2 className="h-4 w-4 mr-2" />
            Building Permit
          </TabsTrigger>
          <TabsTrigger value="renovation" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Renovation Permit
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Check Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="building" className="mt-0">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle>Building Permit Application</CardTitle>
              <CardDescription>Apply for a permit to construct a new building.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Applicant Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="applicantName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Applicant Name</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="applicantType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Applicant Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]">
                                  <SelectValue placeholder="Select applicant type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="owner">Property Owner</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="architect">Architect</SelectItem>
                                <SelectItem value="contractor">Contractor</SelectItem>
                                <SelectItem value="agent">Authorized Agent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Current address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-medium">Project Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]">
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="residential">Residential Building</SelectItem>
                                <SelectItem value="commercial">Commercial Building</SelectItem>
                                <SelectItem value="industrial">Industrial Building</SelectItem>
                                <SelectItem value="institutional">Institutional Building</SelectItem>
                                <SelectItem value="mixed">Mixed-Use Building</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectPurpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Purpose</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]">
                                  <SelectValue placeholder="Select project purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="new">New Construction</SelectItem>
                                <SelectItem value="addition">Addition to Existing Building</SelectItem>
                                <SelectItem value="alteration">Alteration of Existing Building</SelectItem>
                                <SelectItem value="demolition">Demolition and Reconstruction</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectLocation"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Project Location</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Full address of the project site"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="plotArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plot Area (m²)</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Total plot area in square meters"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="buildingArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Building Area (m²)</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Total building area in square meters"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="floors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Floors</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Total number of floors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="estimatedCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Cost (Birr)</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                                placeholder="Estimated project cost in Birr"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief description of the project"
                                className="min-h-[120px] bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-medium">Required Documents</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Please upload the following required documents. All documents must be in PDF format.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Land Ownership Document/Title Deed</h4>
                        <Input
                          type="file"
                          accept=".pdf"
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Architectural Plans (signed by licensed architect)</h4>
                        <Input
                          type="file"
                          accept=".pdf"
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Structural Designs (signed by licensed engineer)</h4>
                        <Input
                          type="file"
                          accept=".pdf"
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Soil Test Report</h4>
                        <Input
                          type="file"
                          accept=".pdf"
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Tax Clearance Certificate</h4>
                        <Input
                          type="file"
                          accept=".pdf"
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                        />
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 border-t pt-6">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I confirm that all information provided is accurate and truthful</FormLabel>
                          <FormDescription>
                            By submitting this form, you agree to our{" "}
                            <Link href="#" className="text-blue-600 hover:underline">
                              terms and conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-blue-600 hover:underline">
                              privacy policy
                            </Link>
                            .
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Application
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renovation" className="mt-0">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle>Renovation Permit Application</CardTitle>
              <CardDescription>Apply for a permit to renovate or modify an existing building.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-gray-500">
                Renovation permit application form is similar to the building permit form. Please use the Building
                Permit tab and select "Alteration of Existing Building" as the project purpose.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="mt-0">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader className="text-[hsl(var(--form-foreground))]">
              <CardTitle>Check Application Status</CardTitle>
              <CardDescription>Check the status of your building or renovation permit application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reference" className="block text-sm font-medium mb-1">
                      Application Reference Number
                    </label>
                    <Input
                      id="reference"
                      placeholder="e.g., BLD-1234"
                      className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      placeholder="Phone number used in application"
                      className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                    />
                  </div>
                </div>
                <Button className="w-full">Check Status</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
