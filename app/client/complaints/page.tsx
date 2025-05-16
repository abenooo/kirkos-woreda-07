import ComplaintsList from "./complaints-list"
import ComplaintsForm from "./complaints-form"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ComplaintsPage() {
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
        {/* @ts-expect-error Server Component */}
        <ComplaintsList />
        <ComplaintsForm />

        {/* Anonymous Reporting Link Section */}
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex flex-col md:flex-row items-start shadow-sm gap-4">
          <AlertTriangle className="h-8 w-8 md:h-7 md:w-7 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="font-semibold text-xl text-yellow-700 mb-1.5">Need to Report Anonymously?</h3>
            <p className="text-yellow-600 mb-4 text-sm leading-relaxed">
              If you wish to submit a sensitive complaint without revealing your identity, please use our secure
              anonymous reporting system.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-yellow-400 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-500 rounded-md shadow-sm px-5 py-2.5 text-sm"
            >
              <Link href="/client/anonymous">
                <span>Submit Anonymous Report</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
