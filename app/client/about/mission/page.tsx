import { AlertTriangle } from "lucide-react";

export default function MissionPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <AlertTriangle className="h-12 w-12 text-[#DAA520] mb-6" /> {/* Placeholder Icon, adjust color */}
      <h1 className="text-2xl font-bold uppercase mb-4 text-primary">ተልዕኮ</h1>
      <p className="text-gray-700 max-w-2xl">ሕዝብ ግንኙነት በማጠናከር የከተማውን ገጽታ በመገንባት ውጤትን መሠረት ያደረገ የተቋማት አፈፃፀም ክትትል እና ድጋፍ በማድረግ፣ የሕዝቡን ሁለንተናዊ ተጠቃሚነት በማረጋገጥ መልካም አስተዳደርን በማስፈን፤ የአገልግሎት አሰጣጡ ፍትሃዊ፣ ግልጸኝነትና ተጠያቂነት የሰፈነበት በማድረግ የህብረተሰቡን ተሳታፊነት እና ተጠቃሚነት ማረጋገጥ ነው፡፡ </p>
      {/* Add actual mission content here, replacing the paragraph */}
    </div>
  );
} 