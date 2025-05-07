"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertTriangle, CheckCircle2, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Form schema for anonymous complaint
const anonymousFormSchema = z.object({
  complaintType: z.string().min(1, { message: "Please select a complaint type" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().min(1, { message: "Please provide the location" }),
  date: z.string().min(1, { message: "Please provide the date" }),
  verificationCode: z.string().min(4, { message: "Please provide a verification code" }),
})

export default function AnonymousComplaintPage() {
  const [submitted, setSubmitted] = useState(false)

  // Anonymous complaint form
  const form = useForm<z.infer<typeof anonymousFormSchema>>({
    resolver: zodResolver(anonymousFormSchema),
    defaultValues: {
      complaintType: "",
      description: "",
      location: "",
      date: "",
      verificationCode: "",
    },
  })

  // Handle anonymous complaint submission
  function onSubmit(values: z.infer<typeof anonymousFormSchema>) {
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
          Your anonymous complaint has been submitted successfully. We take all complaints seriously and will
          investigate this matter.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6 max-w-md">
          <p className="text-sm text-blue-800">
            Your complaint reference number: <strong>ANO-{Math.floor(Math.random() * 10000)}</strong>
          </p>
          <p className="text-sm text-blue-800 mt-2">
            You can use this reference number along with your verification code to check the status of your complaint.
          </p>
        </div>
        <Button onClick={() => setSubmitted(false)}>Submit Another Complaint</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Anonymous Complaint</h1>
        <p className="text-gray-600">Submit a complaint without revealing your identity. Your privacy is protected.</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Your identity is protected</AlertTitle>
        <AlertDescription>
          We do not collect any personal information when you submit an anonymous complaint. Your IP address and browser
          information are not stored.
        </AlertDescription>
      </Alert>

      <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
        <CardHeader className="text-[hsl(var(--form-foreground))]">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Submit Anonymous Complaint
          </CardTitle>
          <CardDescription>
            Report issues with services, staff behavior, or other concerns without revealing your identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="complaintType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]">
                          <SelectValue placeholder="Select complaint type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corruption">Corruption/Bribery</SelectItem>
                        <SelectItem value="misconduct">Staff Misconduct</SelectItem>
                        <SelectItem value="harassment">Harassment</SelectItem>
                        <SelectItem value="discrimination">Discrimination</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your complaint in detail. Include names of individuals involved if applicable."
                        className="min-h-[150px] bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Where did this occur?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Incident</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Verification</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Create a verification code that you can use to check the status of your complaint later. Do not use
                  personal information in your code.
                </p>

                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[hsl(var(--form-input))] border-[hsl(var(--form-border))] focus-visible:ring-[hsl(var(--form-ring))]"
                          placeholder="Create a code (at least 4 characters)"
                          maxLength={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Submit Anonymous Complaint
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
