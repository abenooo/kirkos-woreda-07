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
import { AlertTriangle, CheckCircle2, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Form schema for misconduct report
const misconductFormSchema = z.object({
  misconductType: z.string().min(1, { message: "Please select a misconduct type" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  officialName: z.string().optional(),
  officialPosition: z.string().optional(),
  department: z.string().min(1, { message: "Please select a department" }),
  location: z.string().min(1, { message: "Please provide the location" }),
  date: z.string().min(1, { message: "Please provide the date" }),
  name: z.string().min(1, { message: "Please provide your name" }),
  email: z.string().email({ message: "Please provide a valid email" }),
  phone: z.string().min(1, { message: "Please provide your phone number" }),
  anonymous: z.boolean().default(false),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export default function MisconductPage() {
  const [submitted, setSubmitted] = useState(false)

  // Misconduct report form
  const form = useForm<z.infer<typeof misconductFormSchema>>({
    resolver: zodResolver(misconductFormSchema),
    defaultValues: {
      misconductType: "",
      description: "",
      officialName: "",
      officialPosition: "",
      department: "",
      location: "",
      date: "",
      name: "",
      email: "",
      phone: "",
      anonymous: false,
      agreeToTerms: false,
    },
  })

  // Watch for anonymous checkbox changes
  const isAnonymous = form.watch("anonymous")

  // Handle misconduct report submission
  function onSubmit(values: z.infer<typeof misconductFormSchema>) {
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
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Your misconduct report has been submitted successfully. We take all reports seriously and will investigate
          this matter.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6 max-w-md">
          <p className="text-sm text-blue-800">
            Your report reference number: <strong>MIS-{Math.floor(Math.random() * 10000)}</strong>
          </p>
          <p className="text-sm text-blue-800 mt-2">Please keep this reference number for future inquiries.</p>
        </div>
        <Button onClick={() => setSubmitted(false)}>Submit Another Report</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Report Misconduct</h1>
        <p className="text-gray-600">
          Report public servant misconduct, including bribery, disrespect, or other inappropriate behavior.
        </p>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Filing a false report is a serious offense and may result in legal consequences. Please ensure all information
          provided is accurate and truthful.
        </AlertDescription>
      </Alert>

      <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
        <CardHeader className="text-[hsl(var(--form-foreground))]">
          <CardTitle>Misconduct Report Form</CardTitle>
          <CardDescription>
            Provide details about the misconduct incident. Your information will be kept confidential.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Incident Details</h3>

                <FormField
                  control={form.control}
                  name="misconductType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Misconduct</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]">
                            <SelectValue placeholder="Select misconduct type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bribery">Bribery/Corruption</SelectItem>
                          <SelectItem value="disrespect">Disrespectful Behavior</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="discrimination">Discrimination</SelectItem>
                          <SelectItem value="negligence">Negligence of Duty</SelectItem>
                          <SelectItem value="abuse">Abuse of Power</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="land">Land Management</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="id">ID & Documentation</SelectItem>
                            <SelectItem value="business">Business Licensing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                            placeholder="Where did this occur?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="officialName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of Official (if known)</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                            placeholder="Name of the person involved"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="officialPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position of Official (if known)</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                            placeholder="Position or title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Incident</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                          type="date"
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
                    <FormItem>
                      <FormLabel>Description of Incident</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe what happened in detail. Include names, times, and any other relevant information."
                          className="min-h-[150px] bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Evidence Upload
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    If you have any evidence (photos, documents, audio recordings), please upload them here. Supported
                    formats: JPG, PNG, PDF, MP3, MP4 (max 10MB each).
                  </p>
                  <Input type="file" multiple className="bg-white" />
                </div>
              </div>

              <div className="border-t pt-6 space-y-6">
                <h3 className="text-lg font-medium">Your Information</h3>

                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Submit Anonymously</FormLabel>
                        <FormDescription>
                          Check this box if you wish to remain anonymous. Note that this may limit our ability to follow
                          up.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {!isAnonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                              placeholder="Your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                              placeholder="Your email address"
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
                          <FormLabel>Your Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                              placeholder="Your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I confirm that all information provided is accurate and truthful</FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our terms and conditions and privacy policy.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Upload className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
