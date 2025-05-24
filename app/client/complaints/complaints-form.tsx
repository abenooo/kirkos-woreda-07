"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Star, ThumbsUp, Send, AlertTriangle, CheckCircle2, Paperclip } from "lucide-react"
import { submitComplaint, submitFeedback } from "@/app/actions/feedback-actions"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Define department type
type Department = {
  id: number
  name: string
  code: string
  description: string | null
}

export default function ComplaintsForm() {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [submittedForm, setSubmittedForm] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string | null>(null)
  const [complaintFile, setComplaintFile] = useState<File | null>(null)
  const [feedbackFile, setFeedbackFile] = useState<File | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedFeedbackDepartment, setSelectedFeedbackDepartment] = useState<Department | null>(null)

  const complaintFileRef = useRef<HTMLInputElement>(null)
  const feedbackFileRef = useRef<HTMLInputElement>(null)

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

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      // Ensure department_id is properly set
      if (selectedDepartment) {
        formData.set("department_id", selectedDepartment.id.toString())
        formData.set("service", selectedDepartment.name) // Keep service name for display
      }

      // Add file if selected
      if (complaintFile) {
        formData.append("file", complaintFile)
      }

      console.log("Submitting complaint with department_id:", selectedDepartment?.id)

      const response = await submitComplaint(formData)

      if (response.success) {
        setSubmittedForm("complaint")
        setResponseMessage(response.message)
        form.reset()
        setComplaintFile(null)
        setSelectedDepartment(null)

        setTimeout(() => {
          setSubmittedForm(null)
          setResponseMessage(null)
          // Refresh the page to show the new complaint in the list
          window.location.reload()
        }, 3000)
      } else {
        setResponseMessage(response.message)
        setTimeout(() => {
          setResponseMessage(null)
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting complaint:", error)
      setResponseMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      // Add rating to form data
      formData.append("rating", rating.toString())

      // Ensure department_id is properly set for feedback
      if (selectedFeedbackDepartment) {
        formData.set("department_id", selectedFeedbackDepartment.id.toString())
        formData.set("feedback_service", selectedFeedbackDepartment.name) // Keep service name for display
      }

      // Add file if selected
      if (feedbackFile) {
        formData.append("file", feedbackFile)
      }

      console.log("Submitting feedback with department_id:", selectedFeedbackDepartment?.id)

      const response = await submitFeedback(formData)

      if (response.success) {
        setSubmittedForm("feedback")
        setResponseMessage(response.message)
        form.reset()
        setRating(0)
        setFeedbackFile(null)
        setSelectedFeedbackDepartment(null)

        setTimeout(() => {
          setSubmittedForm(null)
          setResponseMessage(null)
          // Refresh the page to show the new feedback in the list
          window.location.reload()
        }, 3000)
      } else {
        setResponseMessage(response.message)
        setTimeout(() => {
          setResponseMessage(null)
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setResponseMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleComplaintFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComplaintFile(e.target.files[0])
    }
  }

  const handleFeedbackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeedbackFile(e.target.files[0])
    }
  }

  const handleDepartmentChange = (departmentId: string) => {
    const dept = departments.find((d) => d.id.toString() === departmentId)
    setSelectedDepartment(dept || null)
  }

  const handleFeedbackDepartmentChange = (departmentId: string) => {
    const dept = departments.find((d) => d.id.toString() === departmentId)
    setSelectedFeedbackDepartment(dept || null)
  }

  const primaryButtonClasses =
    "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 text-base px-6 py-3"
  const inputClasses =
    "bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm placeholder:text-slate-400"
  const labelClasses = "text-slate-700 font-medium text-sm"

  return (
    <Tabs defaultValue="complaint" className="w-full">
      <TabsList className="bg-slate-100 p-1 rounded-lg shadow-sm grid grid-cols-2 md:inline-grid md:grid-cols-2 h-auto md:h-12">
        <TabsTrigger
          value="complaint"
          className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2.5 text-slate-700"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Submit Complaint
        </TabsTrigger>
        <TabsTrigger
          value="feedback"
          className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2.5 text-slate-700"
        >
          <ThumbsUp className="h-5 w-5 mr-2" />
          Service Feedback
        </TabsTrigger>
      </TabsList>

      {/* Complaint Form Tab */}
      <TabsContent value="complaint" className="mt-6">
        <Card className="bg-white text-black rounded-xl shadow-xl border border-slate-200">
          <CardHeader className="border-b border-slate-200 pb-4">
            <CardTitle className="text-2xl text-slate-800">Submit a Complaint</CardTitle>
            <CardDescription className="text-slate-500 pt-1">
              Please provide details about your complaint. We aim to review and respond within 3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleComplaintSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className={labelClasses}>
                    Full Name
                  </Label>
                  <Input id="name" name="name" placeholder="Enter your full name" required className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className={labelClasses}>
                    Phone Number
                  </Label>
                  <Input id="phone" name="phone" placeholder="e.g., 0912345678" required className={inputClasses} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className={labelClasses}>
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="department" className={labelClasses}>
                    Department Related To *
                  </Label>
                  <Select onValueChange={handleDepartmentChange} required>
                    <SelectTrigger id="department" className={inputClasses}>
                      <SelectValue
                        placeholder={isLoadingDepartments ? "Loading departments..." : "Select department"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                      {departments.length === 0 && !isLoadingDepartments && <SelectItem value="1">Other</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hidden fields to store department information */}
              <input type="hidden" name="department_id" value={selectedDepartment?.id || ""} />
              <input type="hidden" name="service" value={selectedDepartment?.name || ""} />

              <div className="space-y-3">
                <Label className={labelClasses}>Complaint Type</Label>
                <RadioGroup name="complaint_type" defaultValue="service-delay" className="space-y-2 pt-1">
                  {["Service Delay", "Staff Behavior", "Process Issue", "Other"].map((type) => {
                    const id = type.toLowerCase().replace(" ", "-")
                    return (
                      <div key={id} className="flex items-center space-x-2">
                        <RadioGroupItem value={id} id={`complaint-${id}`} />
                        <Label htmlFor={`complaint-${id}`} className="font-normal text-slate-600">
                          {type}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="complaint-details" className={labelClasses}>
                  Complaint Details
                </Label>
                <Textarea
                  name="complaint_details"
                  id="complaint-details"
                  placeholder="Please provide detailed information..."
                  rows={5}
                  required
                  className={`${inputClasses} min-h-[120px]`}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reference" className={labelClasses}>
                  Reference Number (if applicable)
                </Label>
                <Input name="reference" id="reference" placeholder="Enter reference number" className={inputClasses} />
              </div>

              {/* File Upload */}
              <div className="space-y-1.5">
                <Label htmlFor="complaint-file" className={labelClasses}>
                  Attach Supporting Document (optional)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    ref={complaintFileRef}
                    id="complaint-file"
                    type="file"
                    onChange={handleComplaintFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => complaintFileRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Paperclip className="h-4 w-4" />
                    Choose File
                  </Button>
                  <span className="text-sm text-slate-500">
                    {complaintFile ? complaintFile.name : "No file chosen"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
              </div>

              <Button
                type="submit"
                className={`w-full md:w-auto ${primaryButtonClasses}`}
                disabled={isSubmitting || !selectedDepartment}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Complaint
                  </>
                )}
              </Button>

              {submittedForm === "complaint" && responseMessage && (
                <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md flex items-center shadow-sm mt-4">
                  <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold">Complaint Submitted Successfully!</p>
                    <p className="text-sm">{responseMessage}</p>
                  </div>
                </div>
              )}

              {responseMessage && !submittedForm && (
                <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md flex items-center shadow-sm mt-4">
                  <AlertTriangle className="h-6 w-6 mr-3 text-red-600" />
                  <div>
                    <p className="font-semibold">Submission Error</p>
                    <p className="text-sm">{responseMessage}</p>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Feedback Form Tab */}
      <TabsContent value="feedback" className="mt-6">
        <Card className="bg-white rounded-xl shadow-xl border border-slate-200">
          <CardHeader className="border-b border-slate-200 pb-4">
            <CardTitle className="text-2xl text-slate-800">Service Feedback</CardTitle>
            <CardDescription className="text-slate-500 pt-1">
              Rate our services and provide feedback to help us improve. Your input is valuable.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-name" className={labelClasses}>
                    Full Name (Optional)
                  </Label>
                  <Input
                    name="feedback_name"
                    id="feedback-name"
                    placeholder="Enter your full name"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-email" className={labelClasses}>
                    Email Address (Optional)
                  </Label>
                  <Input
                    name="feedback_email"
                    id="feedback-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="feedback-department" className={labelClasses}>
                  Department *
                </Label>
                <Select onValueChange={handleFeedbackDepartmentChange} required>
                  <SelectTrigger id="feedback-department" className={inputClasses}>
                    <SelectValue placeholder={isLoadingDepartments ? "Loading departments..." : "Select department"} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </SelectItem>
                    ))}
                    {departments.length === 0 && !isLoadingDepartments && <SelectItem value="1">Other</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              {/* Hidden fields to store department information for feedback */}
              <input type="hidden" name="department_id" value={selectedFeedbackDepartment?.id || ""} />
              <input type="hidden" name="feedback_service" value={selectedFeedbackDepartment?.name || ""} />

              <div className="space-y-2">
                <Label className={`${labelClasses} mb-1 block`}>Rate Your Experience</Label>
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none rounded-full focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      onClick={() => {
                        setRating(star)
                        setHoverRating(star)
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        className={`h-9 w-9 transition-colors duration-150 ${
                          (hoverRating || rating) >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <input type="hidden" name="rating" value={rating} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="feedback-details" className={labelClasses}>
                  Your Feedback
                </Label>
                <Textarea
                  name="feedback_details"
                  id="feedback-details"
                  placeholder="Please share your experience and suggestions..."
                  rows={5}
                  required
                  className={`${inputClasses} min-h-[120px]`}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-1.5">
                <Label htmlFor="feedback-file" className={labelClasses}>
                  Attach Screenshot or Document (optional)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    ref={feedbackFileRef}
                    id="feedback-file"
                    type="file"
                    onChange={handleFeedbackFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => feedbackFileRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Paperclip className="h-4 w-4" />
                    Choose File
                  </Button>
                  <span className="text-sm text-slate-500">{feedbackFile ? feedbackFile.name : "No file chosen"}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
              </div>

              <Button
                type="submit"
                className={`w-full md:w-auto ${primaryButtonClasses}`}
                disabled={isSubmitting || rating === 0 || !selectedFeedbackDepartment}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Feedback
                  </>
                )}
              </Button>

              {submittedForm === "feedback" && responseMessage && (
                <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md flex items-center shadow-sm mt-4">
                  <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold">Feedback Submitted Successfully!</p>
                    <p className="text-sm">{responseMessage}</p>
                  </div>
                </div>
              )}

              {responseMessage && !submittedForm && (
                <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md flex items-center shadow-sm mt-4">
                  <AlertTriangle className="h-6 w-6 mr-3 text-red-600" />
                  <div>
                    <p className="font-semibold">Submission Error</p>
                    <p className="text-sm">{responseMessage}</p>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
