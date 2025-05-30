import { Telescope } from "lucide-react";
export default function VisionPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <Telescope size={48} className="h-12 w-12 text-[#FF7F50] mb-6" />
      <h1 className="text-2xl text-primary font-bold uppercase mb-4">
        Our Vision
      </h1>
      <p className="text-gray-700 max-w-2xl">
        በአፍሪካ ካሉ ከተሞች መካከል መልካም አስተዳደር የሰፈነባት፣ ጽዱ እና ውብ ለነዋሪዎቿ ምቹ ከተማ ሆና ማየት፤{" "}
      </p>
    </div>
  );
}
