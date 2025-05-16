"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { z } from "zod"

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
  departmentId: z.string().optional(),
})

// Create a server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function submitAnonymousComplaint(formData: FormData) {
  try {
    // Extract and validate form data
    const complaintType = formData.get("complaintType") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const date = formData.get("date") as string
    const verificationCode = formData.get("verificationCode") as string
    const departmentId = formData.get("departmentId") as string
    const file = formData.get("file") as File | null

    // Validate the data
    const validatedData = anonymousFormSchema.parse({
      complaintType,
      description,
      location,
      date,
      verificationCode,
      departmentId,
    })

    // Generate a reference number
    const refNumber = `ANO-${Math.floor(1000 + Math.random() * 9000)}-${verificationCode.slice(0, 2).toUpperCase()}`

    // Insert anonymous complaint into database
    const { data: complaintData, error: complaintError } = await supabase
      .from("anonymous_complaints")
      .insert({
        complaint_type: validatedData.complaintType,
        description: validatedData.description,
        location: validatedData.location,
        incident_date: validatedData.date,
        verification_code_hash: await hashVerificationCode(validatedData.verificationCode),
        reference_number: refNumber,
        status: "pending",
        department_id: validatedData.departmentId ? Number.parseInt(validatedData.departmentId) : null,
      })
      .select("id")
      .single()

    if (complaintError) {
      console.error("Error submitting anonymous complaint:", complaintError)
      return { success: false, message: "Failed to submit complaint. Please try again." }
    }

    // If there's a file, upload it
    if (file && file.size > 0) {
      const complaintId = complaintData.id
      const fileExt = file.name.split(".").pop()
      const fileName = `${complaintId}-${Date.now()}.${fileExt}`
      const filePath = `anonymous/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("attachments").upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        return {
          success: true,
          message: "Complaint submitted but file upload failed. Your complaint has been recorded.",
          referenceNumber: refNumber,
        }
      }

      // Save attachment record
      await supabase.from("attachments").insert({
        anonymous_complaint_id: complaintId,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      })
    }

    revalidatePath("/client/anonymous")
    return {
      success: true,
      message: "Anonymous complaint submitted successfully.",
      referenceNumber: refNumber,
    }
  } catch (error) {
    console.error("Error in submitAnonymousComplaint:", error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error. Please check your inputs.",
        errors: error.errors,
      }
    }
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

// Simple function to hash the verification code
// In a real app, you'd use a proper hashing algorithm with salt
async function hashVerificationCode(code: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(code)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
