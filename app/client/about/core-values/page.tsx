import { Award } from "lucide-react";

export default function CoreValuesPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <Award size={48} className="h-12 w-12 text-[#1E90FF] mb-6" />
      <h1 className="text-2xl text-primary font-bold uppercase mb-4">መርሆ</h1>
      <p className="text-gray-700 max-w-2xl">
        ግልፀኝነትና: ተጠያቂነት : ቅንነት: ታማኝነት: ተነሳሽነት: የላቀ አገልግሎት : የህግ የበላይነት: የላቀ የሕዝብ
        ጥቅም : በእውቀትና በእምነት መምራት
      </p>
    </div>
  );
}
