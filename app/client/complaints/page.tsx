"use client"

import type React from "react" 
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Star, ThumbsUp, Send, AlertTriangle, CheckCircle2 } from "lucide-react" 

export default function ComplaintsPage() {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0) 
  const [submittedForm, setSubmittedForm] = useState<string | null>(null) 

  const handleSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault()
    console.log(`Submitting ${formType} form...`, Object.fromEntries(new FormData(e.target as HTMLFormElement)));
    setSubmittedForm(formType) 
    
    const form = e.target as HTMLFormElement;
    form.reset();
    setRating(0); 

    setTimeout(() => {
      setSubmittedForm(null)
    }, 5000) 
  }

  const primaryButtonClasses = "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 text-base px-6 py-3";
  // MODIFIED: Added bg-white here
  const inputClasses = "bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm placeholder:text-slate-400"; 
  const labelClasses = "text-slate-700 font-medium text-sm";

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 -mx-4 px-4 py-10 text-white shadow-lg mb-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-white">Complaints & Feedback</h1>
          <p className="text-sky-100/90 max-w-3xl">
            Share your experience with our services or submit a complaint. Your feedback helps us improve our services.
          </p>
        </div>
      </div>

      <div className="container mx-auto space-y-10 px-4 pb-12">
        <Tabs defaultValue="complaint" className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded-lg shadow-sm grid grid-cols-2 md:inline-grid md:grid-cols-2 h-auto md:h-12">
            <TabsTrigger value="complaint" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2.5 text-slate-700">
              <MessageSquare className="h-5 w-5 mr-2" />
              Submit Complaint
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md px-4 py-2.5 text-slate-700">
              <ThumbsUp className="h-5 w-5 mr-2" />
              Service Feedback
            </TabsTrigger>
          </TabsList>

          {/* Complaint Form Tab */}
          <TabsContent value="complaint" className="mt-6">
            <Card className="bg-white rounded-xl shadow-xl border border-slate-200">
              <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-2xl text-slate-800">Submit a Complaint</CardTitle>
                <CardDescription className="text-slate-500 pt-1">
                  Please provide details about your complaint. We aim to review and respond within 3 business days.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={(e) => handleSubmit(e, "complaint")} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className={labelClasses}>Full Name</Label>
                      <Input id="name" name="name" placeholder="Enter your full name" required className={inputClasses} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className={labelClasses}>Phone Number</Label>
                      <Input id="phone" name="phone" placeholder="e.g., 0912345678" required className={inputClasses} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className={labelClasses}>Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="your.email@example.com" required className={inputClasses} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="service" className={labelClasses}>Service Related To</Label>
                      <Select name="service" required>
                        <SelectTrigger id="service" className={inputClasses}><SelectValue placeholder="Select service type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id-card">ID Card Issuance</SelectItem>
                          <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                          <SelectItem value="business-license">Business License</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className={labelClasses}>Complaint Type</Label>
                    <RadioGroup name="complaint_type" defaultValue="service-delay" className="space-y-2 pt-1">
                      {["Service Delay", "Staff Behavior", "Process Issue", "Other"].map(type => {
                        const id = type.toLowerCase().replace(" ", "-");
                        return (
                          <div key={id} className="flex items-center space-x-2">
                            <RadioGroupItem value={id} id={`complaint-${id}`} />
                            <Label htmlFor={`complaint-${id}`} className="font-normal text-slate-600">{type}</Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="complaint-details" className={labelClasses}>Complaint Details</Label>
                    <Textarea name="complaint_details" id="complaint-details" placeholder="Please provide detailed information..." rows={5} required className={`${inputClasses} min-h-[120px]`} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reference" className={labelClasses}>Reference Number (if applicable)</Label>
                    <Input name="reference" id="reference" placeholder="Enter reference number" className={inputClasses} />
                  </div>

                  <Button type="submit" className={`w-full md:w-auto ${primaryButtonClasses}`}>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Complaint
                  </Button>

                  {submittedForm === "complaint" && (
                    <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md flex items-center shadow-sm mt-4">
                      <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                      <div>
                        <p className="font-semibold">Complaint Submitted Successfully!</p>
                        <p className="text-sm">We will review your complaint and contact you soon.</p>
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
                <form onSubmit={(e) => handleSubmit(e, "feedback")} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="feedback-name" className={labelClasses}>Full Name (Optional)</Label>
                      <Input name="feedback_name" id="feedback-name" placeholder="Enter your full name" className={inputClasses} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="feedback-email" className={labelClasses}>Email Address (Optional)</Label>
                      <Input name="feedback_email" id="feedback-email" type="email" placeholder="your.email@example.com" className={inputClasses} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="feedback-service" className={labelClasses}>Service Used</Label>
                    <Select name="feedback_service" required>
                      <SelectTrigger id="feedback-service" className={inputClasses}><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id-card">ID Card Issuance</SelectItem>
                        <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                        <SelectItem value="business-license">Business License</SelectItem>
                        <SelectItem value="building-permit">Building Permit</SelectItem>
                        <SelectItem value="general-experience">General Experience</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className={`${labelClasses} mb-1 block`}>Rate Your Experience</Label>
                    <div className="flex items-center space-x-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className="focus:outline-none rounded-full focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2" 
                                onClick={() => { setRating(star); setHoverRating(star); }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}>
                          <Star
                            className={`h-9 w-9 transition-colors duration-150 ${
                              (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-slate-300 hover:text-yellow-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="rating" value={rating} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="feedback-details" className={labelClasses}>Your Feedback</Label>
                    <Textarea name="feedback_details" id="feedback-details" placeholder="Please share your experience and suggestions..." rows={5} required className={`${inputClasses} min-h-[120px]`} />
                  </div>

                  <Button type="submit" className={`w-full md:w-auto ${primaryButtonClasses}`}>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Feedback
                  </Button>

                  {submittedForm === "feedback" && (
                    <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md flex items-center shadow-sm mt-4">
                      <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
                       <div>
                        <p className="font-semibold">Feedback Submitted Successfully!</p>
                        <p className="text-sm">Thank you for your valuable input.</p>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Anonymous Reporting Link Section */}
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex flex-col md:flex-row items-start shadow-sm gap-4">
          <AlertTriangle className="h-8 w-8 md:h-7 md:w-7 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="font-semibold text-xl text-yellow-700 mb-1.5">Need to Report Anonymously?</h3>
            <p className="text-yellow-600 mb-4 text-sm leading-relaxed">
              If you wish to submit a sensitive complaint without revealing your identity, please use our secure anonymous reporting system.
            </p>
            <Button asChild variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-500 rounded-md shadow-sm px-5 py-2.5 text-sm">
              <a href="/client/anonymous">
                <span>Submit Anonymous Report</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}