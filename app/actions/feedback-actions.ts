"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Submit complaint with optional file attachments
export async function submitComplaint(formData: FormData): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const supabase = await createServerSupabaseClient()

    // Extract form data
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const service = formData.get("service") as string
    const complaint_type = formData.get("complaint_type") as string
    const complaint_details = formData.get("complaint_details") as string
    const reference = (formData.get("reference") as string) || null
    const file = formData.get("file") as File | null

    // Insert complaint data
    const { data: complaintData, error: complaintError } = await supabase
      .from("complaints")
      .insert({
        name,
        phone,
        email,
        service,
        complaint_type,
        complaint_details,
        reference,
      })
      .select("id")
      .single()

    if (complaintError) {
      console.error("Error submitting complaint:", complaintError)
      return { success: false, message: "Failed to submit complaint. Please try again." }
    }

    // If there's a file, upload it
    if (file && file.size > 0) {
      const complaintId = complaintData.id
      const fileExt = file.name.split(".").pop()
      const fileName = `${complaintId}-${Date.now()}.${fileExt}`
      const filePath = `complaints/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("attachments").upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        return {
          success: true,
          message: "Complaint submitted but file upload failed. Your complaint has been recorded.",
          id: complaintData.id,
        }
      }

      // Save attachment record
      await supabase.from("attachments").insert({
        complaint_id: complaintId,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      })
    }

    revalidatePath("/client/complaints")
    return {
      success: true,
      message: "Complaint submitted successfully!",
      id: complaintData.id,
    }
  } catch (error) {
    console.error("Error in submitComplaint:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

// Submit feedback with optional file attachments
export async function submitFeedback(formData: FormData): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const supabase = await createServerSupabaseClient()

    // Extract form data
    const name = (formData.get("feedback_name") as string) || null
    const email = (formData.get("feedback_email") as string) || null
    const service = formData.get("feedback_service") as string
    const rating = Number.parseInt(formData.get("rating") as string)
    const feedback_details = formData.get("feedback_details") as string
    const file = formData.get("file") as File | null

    // Insert feedback data
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .insert({
        name,
        email,
        service,
        rating,
        feedback_details,
      })
      .select("id")
      .single()

    if (feedbackError) {
      console.error("Error submitting feedback:", feedbackError)
      return { success: false, message: "Failed to submit feedback. Please try again." }
    }

    // If there's a file, upload it
    if (file && file.size > 0) {
      const feedbackId = feedbackData.id
      const fileExt = file.name.split(".").pop()
      const fileName = `${feedbackId}-${Date.now()}.${fileExt}`
      const filePath = `feedback/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("attachments").upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        return {
          success: true,
          message: "Feedback submitted but file upload failed. Your feedback has been recorded.",
          id: feedbackData.id,
        }
      }

      // Save attachment record
      await supabase.from("attachments").insert({
        feedback_id: feedbackId,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      })
    }

    revalidatePath("/client/complaints")
    return {
      success: true,
      message: "Feedback submitted successfully!",
      id: feedbackData.id,
    }
  } catch (error) {
    console.error("Error in submitFeedback:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}
