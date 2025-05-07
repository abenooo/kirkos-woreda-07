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
import { MessageSquare, Star, ThumbsUp, Send, AlertTriangle } from "lucide-react"

export default function ComplaintsPage() {
  const [rating, setRating] = useState<number>(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the form data to your backend
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Complaints & Feedback</h1>
        <p className="text-gray-600 max-w-3xl">
          Share your experience with our services or submit a complaint. Your feedback helps us improve our services.
        </p>
      </div>

      <Tabs defaultValue="complaint" className="w-full">
        <TabsList className="bg-emerald-50 border border-emerald-100">
          <TabsTrigger value="complaint" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Submit Complaint
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Service Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="complaint" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Complaint</CardTitle>
              <CardDescription>
                Please provide details about your complaint. We will review and respond within 3 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Type</Label>
                    <Select>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id-card">ID Card Issuance</SelectItem>
                        <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                        <SelectItem value="business-license">Business License</SelectItem>
                        <SelectItem value="building-permit">Building Permit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complaint-type">Complaint Type</Label>
                  <RadioGroup defaultValue="service-delay" className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service-delay" id="service-delay" />
                      <Label htmlFor="service-delay">Service Delay</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="staff-behavior" id="staff-behavior" />
                      <Label htmlFor="staff-behavior">Staff Behavior</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="process-issue" id="process-issue" />
                      <Label htmlFor="process-issue">Process Issue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other-complaint" />
                      <Label htmlFor="other-complaint">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complaint-details">Complaint Details</Label>
                  <Textarea
                    id="complaint-details"
                    placeholder="Please provide detailed information about your complaint"
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number (if applicable)</Label>
                  <Input id="reference" placeholder="Enter reference number if you have one" />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Complaint
                </Button>

                {submitted && (
                  <div className="bg-emerald-100 text-emerald-800 p-3 rounded-md flex items-center">
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    Your complaint has been submitted successfully. We will contact you soon.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Feedback</CardTitle>
              <CardDescription>
                Rate our services and provide feedback to help us improve. Your input is valuable to us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-name">Full Name (Optional)</Label>
                    <Input id="feedback-name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-email">Email Address (Optional)</Label>
                    <Input id="feedback-email" type="email" placeholder="Enter your email address" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-service">Service Used</Label>
                  <Select required>
                    <SelectTrigger id="feedback-service">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id-card">ID Card Issuance</SelectItem>
                      <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                      <SelectItem value="business-license">Business License</SelectItem>
                      <SelectItem value="building-permit">Building Permit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rate Your Experience</Label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" className="focus:outline-none" onClick={() => setRating(star)}>
                        <Star
                          className={`h-8 w-8 ${rating >= star ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-details">Your Feedback</Label>
                  <Textarea
                    id="feedback-details"
                    placeholder="Please share your experience and suggestions for improvement"
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>

                {submitted && (
                  <div className="bg-emerald-100 text-emerald-800 p-3 rounded-md flex items-center">
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    Thank you for your feedback! We appreciate your input.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Anonymous Reporting Link */}
      <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 flex items-start">
        <AlertTriangle className="h-6 w-6 text-amber-600 mr-4 mt-1" />
        <div>
          <h3 className="font-semibold text-lg text-amber-800 mb-2">Need to Report Anonymously?</h3>
          <p className="text-amber-700 mb-4">
            If you wish to submit a complaint without revealing your identity, you can use our anonymous reporting
            system.
          </p>
          <Button asChild variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
            <a href="/client/anonymous">Submit Anonymous Report</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
