"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function submitComplaint(formData: FormData) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Extract form data
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const departmentId = formData.get("department_id") as string
    const service = formData.get("service") as string
    const complaintType = formData.get("complaint_type") as string
    const complaintDetails = formData.get("complaint_details") as string
    const reference = formData.get("reference") as string

    console.log("Server action received department_id:", departmentId)
    console.log("Server action received service:", service)

    // Validate required fields
    if (!name || !phone || !email || !departmentId || !complaintType || !complaintDetails) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Convert department_id to integer
    const departmentIdInt = Number.parseInt(departmentId)
    if (isNaN(departmentIdInt)) {
      return {
        success: false,
        message: "Invalid department selection.",
      }
    }

    // Insert complaint into database
    const { data, error } = await supabase
      .from("complaints")
      .insert({
        name,
        phone,
        email,
        department_id: departmentIdInt, // Store as integer foreign key
        service, // Keep service name for display purposes
        complaint_type: complaintType,
        complaint_details: complaintDetails,
        reference: reference || null,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to submit complaint. Please try again.",
      }
    }

    console.log("Complaint inserted successfully:", data)

    return {
      success: true,
      message: "Your complaint has been submitted successfully. We will review it within 3 business days.",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function submitFeedback(formData: FormData) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Extract form data
    const feedbackName = formData.get("feedback_name") as string
    const feedbackEmail = formData.get("feedback_email") as string
    const departmentId = formData.get("department_id") as string
    const feedbackService = formData.get("feedback_service") as string
    const rating = formData.get("rating") as string
    const feedbackDetails = formData.get("feedback_details") as string

    console.log("Feedback server action received department_id:", departmentId)
    console.log("Feedback server action received service:", feedbackService)

    // Validate required fields
    if (!departmentId || !rating || !feedbackDetails) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Convert department_id to integer
    const departmentIdInt = Number.parseInt(departmentId)
    if (isNaN(departmentIdInt)) {
      return {
        success: false,
        message: "Invalid department selection.",
      }
    }

    // Convert rating to integer
    const ratingInt = Number.parseInt(rating)
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      return {
        success: false,
        message: "Please provide a valid rating.",
      }
    }

    // Insert feedback into database
    const { data, error } = await supabase
      .from("feedback")
      .insert({
        name: feedbackName || null,
        email: feedbackEmail || null,
        department_id: departmentIdInt, // Store as integer foreign key
        service: feedbackService, // Keep service name for display purposes
        rating: ratingInt,
        feedback_details: feedbackDetails,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to submit feedback. Please try again.",
      }
    }

    console.log("Feedback inserted successfully:", data)

    return {
      success: true,
      message: "Thank you for your feedback! Your input helps us improve our services.",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
