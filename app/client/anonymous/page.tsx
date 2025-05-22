"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertTriangle, CheckCircle2, Shield, Send, Paperclip } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitAnonymousComplaint } from "@/app/actions/anonymous-actions"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Form schema for anonymous complaint
const anonymousFormSchema = z.object({
  complaintType: z.string().min(1, { message: "Please select a complaint type" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(3, { message: "Please provide a more specific location" }),
  date: z.string().min(1, { message: "Please provide the date of the incident" }),
  verificationCode: z
    .string()
    .min(4, { message: "Verification code must be at least 4 characters" })
    .max(10, { message: "Verification code must be at most 10 characters" }),
  departmentId: z.string().min(1, { message: "Please select a department" }),
})

// Define department type
type Department = {
  id: number
  name: string
  code: string
  description: string | null
}

export default function AnonymousComplaintPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submissionRef, setSubmissionRef] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true)

  const form = useForm<z.infer<typeof anonymousFormSchema>>({
    resolver: zodResolver(anonymousFormSchema),
    defaultValues: {
      complaintType: "",
      description: "",
      location: "",
      date: "",
      verificationCode: "",
      departmentId: "",
    },
  })

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.from("departments").select("*").order("name")

        if (error) {
          console.error("Error fetching departments:", error)
        } else {
          setDepartments(data || [])
        }
      } catch (error) {
        console.error("Error in fetchDepartments:", error)
      } finally {
        setIsLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  async function onSubmit(values: z.infer<typeof anonymousFormSchema>) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append("complaintType", values.complaintType)
      formData.append("description", values.description)
      formData.append("location", values.location)
      formData.append("date", values.date)
      formData.append("verificationCode", values.verificationCode)
      formData.append("departmentId", values.departmentId)

      if (file) {
        formData.append("file", file)
      }

      const response = await submitAnonymousComplaint(formData)

      if (response.success) {
        setSubmissionRef(response.referenceNumber || "")
        setSubmitted(true)
      } else {
        setErrorMessage(response.message || "Failed to submit complaint. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting anonymous complaint:", error)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const primaryButtonClasses =
    "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 text-base px-6 py-3 font-semibold"
  const inputClasses =
    "bg-white border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 rounded-md shadow-sm placeholder:text-slate-400 text-slate-800"
  const labelClasses = "text-slate-700 font-medium text-sm"

  if (submitted) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-12 px-4 min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-8 text-center">
          <div className="bg-green-100 rounded-full p-3 inline-block mb-5 ring-4 ring-green-200">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-slate-800">Thank You!</h2>
          <p className="text-slate-600 mb-6">
            Your anonymous complaint has been submitted successfully. We take all complaints seriously and will
            investigate this matter.
          </p>
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-sky-700">
              Your complaint reference number is: <strong className="block text-lg mt-1">{submissionRef}</strong>
            </p>
            <p className="text-xs text-sky-600 mt-2">
              Please keep this reference number and your verification code safe. You can use them to check the status of
              your complaint later (feature coming soon).
            </p>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false)
              form.reset()
              setSubmissionRef("")
              setFile(null)
            }}
            className={primaryButtonClasses}
          >
            Submit Another Complaint
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 -mx-4 px-4 py-10 text-white shadow-lg mb-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-white">Anonymous Complaint</h1>
          <p className="text-sky-100/90 max-w-3xl">
            Submit a complaint without revealing your identity. Your privacy is protected.
          </p>
        </div>
      </div>

      <div className="container mx-auto space-y-8 px-4 pb-12">
        <Alert variant="default" className="bg-yellow-50 border-yellow-200 text-yellow-800 rounded-xl shadow-sm p-5">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <AlertTitle className="font-semibold text-yellow-800">Your Identity is Protected</AlertTitle>
          <AlertDescription className="text-yellow-700 text-sm">
            We do not collect any personal information when you submit an anonymous complaint. Your IP address and
            browser information are not stored or logged with your submission.
          </AlertDescription>
        </Alert>

        <Card className="bg-white rounded-xl shadow-xl border border-slate-200">
          <CardHeader className="border-b border-slate-200 pb-4 pt-5 px-6">
            <CardTitle className="flex items-center text-2xl text-slate-800">
              <Shield className="h-6 w-6 mr-2.5 text-sky-600" />
              Submit Anonymous Complaint Form
            </CardTitle>
            <CardDescription className="text-slate-500 pt-1 pl-9">
              Report issues with services, staff behavior, or other concerns without revealing your identity. All fields
              marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 px-6 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="complaintType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Complaint Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select complaint type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-slate-200 shadow-lg rounded-md">
                          <SelectItem value="corruption">Corruption / Bribery</SelectItem>
                          <SelectItem value="harassment">Harassment (Any Form)</SelectItem>
                          <SelectItem value="discrimination">Discrimination (Any Form)</SelectItem>
                          <SelectItem value="fraud">Fraud / Financial Mismanagement</SelectItem>
                          <SelectItem value="safety-security">Safety or Security Concern</SelectItem>
                          <SelectItem value="service-delivery">Poor Service Delivery</SelectItem>
                          <SelectItem value="other">Other (Please specify in description)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue
                              placeholder={isLoadingDepartments ? "Loading departments..." : "Select department"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-slate-200 shadow-lg rounded-md">
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id.toString()}>
                              {dept.name}
                            </SelectItem>
                          ))}
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
                      <FormLabel className={labelClasses}>Detailed Description of Complaint *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your complaint in detail. Include names of individuals involved (if known and comfortable sharing), specific incidents, dates, times, and any evidence if possible. The more detail, the better we can investigate."
                          className={`${inputClasses} min-h-[150px]`}
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
                        <FormLabel className={labelClasses}>Location of Incident *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Wereda 07 Main Office, specific department"
                            className={inputClasses}
                            {...field}
                          />
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
                        <FormLabel className={labelClasses}>Approximate Date of Incident *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className={inputClasses}
                            {...field}
                            max={new Date().toISOString().split("T")[0]}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* File Upload - Using a div instead of FormField since it's not part of the form schema */}
                <div className="space-y-1.5">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="anonymous-file" className={labelClasses}>
                      Attach Supporting Document (optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        id="anonymous-file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Paperclip className="h-4 w-4" />
                        Choose File
                      </Button>
                      <span className="text-sm text-slate-500">{file ? file.name : "No file chosen"}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-slate-700">Create Your Verification Code</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Create a unique and memorable verification code (4-10 characters).{" "}
                    <strong className="text-slate-600">Do not use personal information.</strong> You'll use this code
                    along with your reference number (provided after submission) to check the status of your complaint
                    in the future. Keep this code safe.
                  </p>

                  <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>
                          Verification Code *{" "}
                          <span className="text-xs font-normal text-slate-400">(4-10 characters)</span>
                        </FormLabel>
                        <FormControl>
                          <Input className={inputClasses} placeholder="e.g., SunFlower24" maxLength={10} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {errorMessage && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertTitle className="text-red-700">Submission Error</AlertTitle>
                    <AlertDescription className="text-red-600">{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className={`${primaryButtonClasses} w-full md:w-auto group`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      Submit Anonymous Complaint
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
