import { createClient } from "@supabase/supabase-js"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp, Paperclip, ExternalLink, Shield } from "lucide-react"
import Link from "next/link"

type Complaint = {
  id: string
  name: string
  service: string
  complaint_type: string
  complaint_details: string
  created_at: string
  has_attachment: boolean
}

type Feedback = {
  id: string
  name: string | null
  service: string
  rating: number
  feedback_details: string
  created_at: string
  has_attachment: boolean
}

type AnonymousComplaint = {
  id: string
  complaint_type: string
  description: string
  location: string
  created_at: string
  has_attachment: boolean
  reference_number: string
}

// Create a server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

async function getComplaints() {
  try {
    // First, get the complaints
    const { data: complaints, error } = await supabase
      .from("complaints")
      .select("id, name, service, complaint_type, complaint_details, created_at")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching complaints:", error)
      return []
    }

    if (!complaints || complaints.length === 0) {
      return []
    }

    // For each complaint, check if it has attachments
    const complaintsWithAttachments = await Promise.all(
      complaints.map(async (complaint) => {
        const { count, error: attachmentError } = await supabase
          .from("attachments")
          .select("*", { count: "exact", head: true })
          .eq("complaint_id", complaint.id)

        if (attachmentError) {
          console.error(`Error checking attachments for complaint ${complaint.id}:`, attachmentError)
          return { ...complaint, has_attachment: false }
        }

        return {
          ...complaint,
          has_attachment: count ? count > 0 : false,
        }
      }),
    )

    return complaintsWithAttachments
  } catch (error) {
    console.error("Error in getComplaints:", error)
    return []
  }
}

async function getFeedback() {
  try {
    // First, get the feedback
    const { data: feedback, error } = await supabase
      .from("feedback")
      .select("id, name, service, rating, feedback_details, created_at")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching feedback:", error)
      return []
    }

    if (!feedback || feedback.length === 0) {
      return []
    }

    // For each feedback, check if it has attachments
    const feedbackWithAttachments = await Promise.all(
      feedback.map(async (item) => {
        const { count, error: attachmentError } = await supabase
          .from("attachments")
          .select("*", { count: "exact", head: true })
          .eq("feedback_id", item.id)

        if (attachmentError) {
          console.error(`Error checking attachments for feedback ${item.id}:`, attachmentError)
          return { ...item, has_attachment: false }
        }

        return {
          ...item,
          has_attachment: count ? count > 0 : false,
        }
      }),
    )

    return feedbackWithAttachments
  } catch (error) {
    console.error("Error in getFeedback:", error)
    return []
  }
}

async function getAnonymousComplaints() {
  try {
    // First, get the anonymous complaints
    const { data: anonymousComplaints, error } = await supabase
      .from("anonymous_complaints")
      .select("id, complaint_type, description, location, created_at, reference_number")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching anonymous complaints:", error)
      return []
    }

    if (!anonymousComplaints || anonymousComplaints.length === 0) {
      return []
    }

    // For each anonymous complaint, check if it has attachments
    const anonymousComplaintsWithAttachments = await Promise.all(
      anonymousComplaints.map(async (complaint) => {
        const { count, error: attachmentError } = await supabase
          .from("attachments")
          .select("*", { count: "exact", head: true })
          .eq("anonymous_complaint_id", complaint.id)

        if (attachmentError) {
          console.error(`Error checking attachments for anonymous complaint ${complaint.id}:`, attachmentError)
          return { ...complaint, has_attachment: false }
        }

        return {
          ...complaint,
          has_attachment: count ? count > 0 : false,
        }
      }),
    )

    return anonymousComplaintsWithAttachments
  } catch (error) {
    console.error("Error in getAnonymousComplaints:", error)
    return []
  }
}

export default async function ComplaintsList() {
  try {
    const [complaints, feedback, anonymousComplaints] = await Promise.all([
      getComplaints(),
      getFeedback(),
      getAnonymousComplaints(),
    ])

    return (
      <div className="space-y-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Complaints List */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center">
              <MessageSquare className="h-5 w-5 text-sky-600 mr-2" />
              <h2 className="font-semibold text-slate-800">Recent Complaints</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {complaints.length === 0 ? (
                <div className="p-4 text-center text-slate-500">No complaints submitted yet</div>
              ) : (
                complaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-slate-800">{complaint.name}</h3>
                      <span className="text-xs text-slate-500">
                        {formatDistanceToNow(new Date(complaint.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {complaint.service}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {complaint.complaint_type}
                      </span>
                      {complaint.has_attachment && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Paperclip className="h-3 w-3 mr-1" />
                          Attachment
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{complaint.complaint_details}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center">
              <ThumbsUp className="h-5 w-5 text-sky-600 mr-2" />
              <h2 className="font-semibold text-slate-800">Recent Feedback</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {feedback.length === 0 ? (
                <div className="p-4 text-center text-slate-500">No feedback submitted yet</div>
              ) : (
                feedback.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-slate-800">{item.name || "Anonymous"}</h3>
                      <span className="text-xs text-slate-500">
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {item.service}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Rating: {item.rating}/5
                      </span>
                      {item.has_attachment && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Paperclip className="h-3 w-3 mr-1" />
                          Attachment
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.feedback_details}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Anonymous Complaints List */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center">
              <Shield className="h-5 w-5 text-sky-600 mr-2" />
              <h2 className="font-semibold text-slate-800">Anonymous Complaints</h2>
            </div>

            <div className="divide-y divide-slate-200">
              {anonymousComplaints.length === 0 ? (
                <div className="p-4 text-center text-slate-500">No anonymous complaints submitted yet</div>
              ) : (
                anonymousComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-slate-800">Ref: {complaint.reference_number}</h3>
                      <span className="text-xs text-slate-500">
                        {formatDistanceToNow(new Date(complaint.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {complaint.complaint_type}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {complaint.location}
                      </span>
                      {complaint.has_attachment && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Paperclip className="h-3 w-3 mr-1" />
                          Attachment
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{complaint.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {(complaints.length > 0 || feedback.length > 0 || anonymousComplaints.length > 0) && (
          <div className="flex justify-end">
            <Link href="/client/dashboard" className="inline-flex items-center text-sm text-sky-600 hover:text-sky-800">
              View all submissions
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error rendering ComplaintsList:", error)
    return (
      <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
        <h3 className="font-semibold mb-2">Error loading complaints and feedback</h3>
        <p>There was a problem loading the data. Please try again later.</p>
      </div>
    )
  }
}
