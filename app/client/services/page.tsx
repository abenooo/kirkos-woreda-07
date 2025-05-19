// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   FileText,
//   Users,
//   Briefcase,
//   Home,
//   Landmark,
//   Leaf,
//   School,
//   Clock,
//   ArrowRight,
//   Search,
//   Filter,
// } from "lucide-react";

// // Updated services array based on the 10 processed files/offices
// const services = [
//   {
//     id: "1",
//     title: "ፑብሊክ አገልግሎቶች", // General Woreda Office Services
//     description:
//       "General public services, community participation, resource mobilization, and local peace initiatives.",
//     category: "personal",
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Landmark,
//   },
//   {
//     id: "2",
//     title: "የከተማ ውበትና አረንጓዴ ልማት", // Urban Beauty & Green Development
//     description:
//       "Urban beautification, green space development, watershed management, and public sanitation facilities.",
//     category: "property",
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Leaf,
//   },
//   {
//     id: "3",
//     title: "ባህል፣ ኪነ-ጥበብና ቱሪዝም", // Culture, Arts & Tourism
//     description:
//       "Cultural heritage preservation, arts and crafts development, tourism promotion, and library services.",
//     category: "education", // Categorized as education due to libraries & cultural learning
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: School, // Using School icon for educational/cultural aspect
//   },
//   {
//     id: "4",
//     title: "ሴቶች፣ ህፃናትና ማህበራዊ ጉዳይ", // Women, Children & Social Affairs
//     description:
//       "Social support for women, children, elderly, disabled persons, and community health insurance.",
//     category: "personal",
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Users,
//   },
//   {
//     id: "5",
//     title: "አርሶ አደርና ከተማ ግብርና", // Farmers & Urban Agriculture Development
//     description:
//       "Support for farmers, urban agriculture development, training, and market linkage services.",
//     category: "business",
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Leaf, // Leaf for agriculture
//   },
//   {
//     id: "6",
//     title: "የቤቶች ልማትና አስተዳደር", // Housing Development & Administration
//     description:
//       "Government housing administration, rental agreements, property information, and related services.",
//     category: "property",
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Home,
//   },
//   {
//     id: "7",
//     title: "የሰው ሃብት አስተዳደር", // Human Resource Management
//     description:
//       "Public sector human resource management, including recruitment, staff development, and administration.",
//     category: "business", // As it's an administrative/organizational function
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Briefcase,
//   },
//   {
//     id: "8",
//     title: "የህብረት ስራ ማህበራት", // Cooperative Societies
//     description:
//       "Establishment, support, and regulation of cooperative societies for economic and social development.",
//     category: "business",
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Users, // Users for groups/cooperatives
//   },
//   {
//     id: "9",
//     title: "የወጣቶችና ስፖርት ጉዳይ", // Youth and Sports Affairs
//     description:
//       "Youth empowerment programs, sports development, training, competitions, and recreational facilities.",
//     category: "education", // Categorized as education due to training and development aspects
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Users, // Users for youth activities; Activity or Dribbble could be alternatives if imported
//   },
//   {
//     id: "10",
//     title: "የደረቅ ቆሻሻ አስተዳደር", // Solid Waste Management
//     description:
//       "Solid waste management, street cleaning, and promoting public sanitation and hygiene.",
//     category: "property", // Relates to environmental cleanliness of property/area
//     processingTime: "Varies",
//     fee: "Varies",
//     icon: Leaf, // Leaf as general environmental icon; Trash2 could be an alternative if imported
//   },
// ];

// const categoryGradients = {
//   personal: "from-sky-500 to-sky-600",
//   business: "from-orange-500 to-orange-600",
//   property: "from-green-500 to-green-600",
//   transport: "from-violet-500 to-violet-600", // Kept for UI consistency, though no services map to it currently
//   education: "from-pink-500 to-pink-600",
//   default: "from-slate-500 to-slate-600",
// };

// const activeTabColors = {
//   all: "data-[state=active]:bg-sky-600",
//   personal: "data-[state=active]:bg-sky-600",
//   business: "data-[state=active]:bg-orange-600",
//   property: "data-[state=active]:bg-green-600",
//   transport: "data-[state=active]:bg-violet-600", // Kept for UI consistency
//   education: "data-[state=active]:bg-pink-600",
// };

// export default function ServicesPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   // Initialize filteredServices with all services
//   const [filteredServices, setFilteredServices] = useState(services);

//   // Correctly define categories for filtering logic
//   const categoriesFilterMap = {
//     all: () => services, // Function to get all services
//     personal: () =>
//       services.filter((service) => service.category === "personal"),
//     business: () =>
//       services.filter((service) => service.category === "business"),
//     property: () =>
//       services.filter((service) => service.category === "property"),
//     transport: () =>
//       services.filter((service) => service.category === "transport"),
//     education: () =>
//       services.filter((service) => service.category === "education"),
//   };

//   // Keys for Tabs UI
//   const categoryTabKeys = [
//     "all",
//     "personal",
//     "business",
//     "property",
//     "transport",
//     "education",
//   ];

//   const handleSearch = () => {
//     const query = searchQuery.toLowerCase().trim();
//     if (!query) {
//       // If search is cleared, show services based on the active tab
//       setFilteredServices(
//         categoriesFilterMap[activeTab as keyof typeof categoriesFilterMap]()
//       );
//       return;
//     }

//     // Filter all services by search query
//     const results = services.filter(
//       (service) =>
//         service.title.toLowerCase().includes(query) ||
//         service.description.toLowerCase().includes(query) ||
//         service.category.toLowerCase().includes(query)
//     );

//     // Then, further filter these search results by the active tab (unless it's 'all')
//     if (activeTab === "all") {
//       setFilteredServices(results);
//     } else {
//       setFilteredServices(
//         results.filter((service) => service.category === activeTab)
//       );
//     }
//   };

//   const handleTabChange = (value: string) => {
//     setActiveTab(value);
//     const query = searchQuery.toLowerCase().trim();
//     if (!query) {
//       // No active search, just filter by category tab
//       setFilteredServices(
//         categoriesFilterMap[value as keyof typeof categoriesFilterMap]()
//       );
//     } else {
//       // Active search, so re-apply search to the new category tab
//       const searchResults = services.filter(
//         (service) =>
//           service.title.toLowerCase().includes(query) ||
//           service.description.toLowerCase().includes(query) ||
//           service.category.toLowerCase().includes(query)
//       );
//       if (value === "all") {
//         setFilteredServices(searchResults);
//       } else {
//         setFilteredServices(
//           searchResults.filter((service) => service.category === value)
//         );
//       }
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const primaryButtonClasses =
//     "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-300";

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-sky-700 to-sky-900 -mx-4 px-4 py-10 text-white shadow-lg">
//         <div className="container mx-auto">
//           <h1 className="text-4xl font-bold mb-4">Government Services</h1>
//           <p className="max-w-3xl mb-6 text-sky-100/90">
//             Browse all services offered by Kirkos Sub City Wereda 07
//             Administrative Office. You can filter services by category or use
//             the search function to find what you need.
//           </p>

//           {/* Search Bar */}
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-1">
//               <Input
//                 type="search"
//                 placeholder="Search for services..."
//                 className="pl-10 pr-4 py-3 w-full bg-white/95 border-0 focus:ring-2 focus:ring-sky-400 text-slate-900 rounded-md shadow-sm"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={handleKeyPress}
//               />
//               <Search className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
//             </div>
//             <Button
//               className={`${primaryButtonClasses} px-5 py-3`}
//               onClick={handleSearch}
//             >
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto">
//         <Tabs
//           defaultValue="all"
//           className="w-full"
//           onValueChange={handleTabChange}
//           value={activeTab}
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <TabsList className="bg-slate-100 p-1 rounded-lg shadow-sm text-slate-700 flex-wrap h-auto md:h-10">
//               {categoryTabKeys.map((catKey) => (
//                 <TabsTrigger
//                   key={catKey}
//                   value={catKey}
//                   className={`${
//                     activeTabColors[catKey as keyof typeof activeTabColors] ||
//                     "data-[state=active]:bg-slate-600"
//                   } data-[state=active]:text-white px-3 py-1.5 text-sm`}
//                 >
//                   {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
//                 </TabsTrigger>
//               ))}
//             </TabsList>

//             <Button
//               variant="outline"
//               className="flex items-center gap-2 shadow-sm border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md"
//             >
//               <Filter className="h-4 w-4" />
//               Advanced Filters
//             </Button>
//           </div>

//           {/* Content for Tabs - Renders based on filteredServices state */}
//           <TabsContent value={activeTab} className="mt-0">
//             {" "}
//             {/* Use TabsContent for each tab, but the filtering logic drives what's shown */}
//             {filteredServices.length === 0 ? (
//               <div className="col-span-full text-center py-10 text-slate-500">
//                 <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
//                 No services found matching your criteria.
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredServices.map((service) => {
//                   const ServiceIcon = service.icon;
//                   const categoryGradient =
//                     categoryGradients[
//                       service.category as keyof typeof categoryGradients
//                     ] || categoryGradients.default;

//                   return (
//                     <Card
//                       key={service.id}
//                       className="bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden rounded-xl group flex flex-col"
//                     >
//                       <div
//                         className={`bg-gradient-to-br ${categoryGradient} px-6 py-5 flex items-center text-white`}
//                       >
//                         <div className="bg-white/25 p-3 rounded-full mr-4 shadow-md backdrop-blur-sm">
//                           <ServiceIcon className="h-6 w-6 text-white" />
//                         </div>
//                         <div>
//                           <CardTitle className="text-lg font-bold text-white">
//                             {service.title}
//                           </CardTitle>
//                           <Badge
//                             variant="outline"
//                             className="bg-white/20 text-white border-white/30 mt-1.5 backdrop-blur-sm text-xs px-2 py-0.5"
//                           >
//                             {service.category.charAt(0).toUpperCase() +
//                               service.category.slice(1)}
//                           </Badge>
//                         </div>
//                       </div>
//                       <CardContent className="pt-5 pb-4 flex-grow">
//                         <p className="text-slate-600 mb-4 text-sm min-h-[60px]">
//                           {service.description}
//                         </p>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
//                             <Clock className="h-5 w-5 mr-3 text-slate-500" />
//                             <span className="text-slate-700 font-medium">
//                               Processing:
//                             </span>
//                             <span className="text-slate-600 ml-1">
//                               {service.processingTime}
//                             </span>
//                           </div>
//                           <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
//                             <Landmark className="h-5 w-5 mr-3 text-slate-500" />{" "}
//                             {/* Using Landmark as generic for Fee, or specific like DollarSign */}
//                             <span className="text-slate-700 font-medium">
//                               Fee:
//                             </span>
//                             <span className="text-slate-600 ml-1">
//                               {service.fee}
//                             </span>
//                           </div>
//                         </div>
//                       </CardContent>
//                       <CardFooter className="border-t border-slate-200 px-6 py-4 mt-auto">
//                         <Button
//                           asChild
//                           className={`w-full ${primaryButtonClasses} group-hover:scale-[1.02]`}
//                         >
//                           <Link href={`/client/services/${service.id}`}>
//                             <div className="flex items-center justify-center">
//                               <span>View Details</span>
//                               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
//                             </div>
//                           </Link>
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   );
//                 })}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Requirements Section */}
//       <section className="bg-sky-50 p-8 rounded-xl border border-sky-100 mt-10 shadow-sm">
//         <div className="container mx-auto text-center md:text-left">
//           <h2 className="text-3xl font-bold mb-3 text-sky-700">
//             Service Requirements
//           </h2>
//           <p className="mb-5 text-slate-700 max-w-2xl mx-auto md:mx-0">
//             Each service has specific document requirements. Please check the
//             requirements page or the specific service page for detailed
//             information before applying.
//           </p>
//           <Button asChild className={`${primaryButtonClasses} px-6 py-3`}>
//             <Link href="/client/requirements">
//               <span>View Requirements Guide</span>
//             </Link>
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Users,
  Briefcase,
  Home,
  Landmark,
  Leaf,
  School,
  Clock,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";

// Updated services array with Amharic descriptions
const services = [
  {
    id: "1",
    title: "ፑብሊክ አገልግሎቶች ጽ/ቤት", // General Woreda Office Services
    description:
      "ቀልጣፋና ተደራሽ የሆኑ የህዝብ አገልግሎቶችን በመስጠት የዜጎችን እርካታ ማረጋገጥና የልማት ተሳትፎአቸውን ማሳደግ።",
    category: "personal",
    processingTime: "Varies", // Value kept in English, label translated below
    fee: "Varies", // Value kept in English, label translated below
    icon: Landmark,
  },
  {
    id: "2",
    title: "የከተማ ውበትና አረንጓዴ ልማት ጽ/ቤት", // Urban Beauty & Green Development
    description:
      "የወረዳችንን ከተሞች ውበት መጠበቅ፣ አረንጓዴ ቦታዎችን ማስፋፋትና በአካባቢ ጥበቃ ዘላቂ ልማትን ማረጋገጥ።",
    category: "property",
    processingTime: "Varies",
    fee: "Varies",
    icon: Leaf,
  },
  {
    id: "3",
    title: "ባህል፣ ኪነ-ጥበብና ቱሪዝም ጽ/ቤት", // Culture, Arts & Tourism
    description:
      "የወረዳውን የባህልና የኪነ-ጥበብ እሴቶች ማልማት፣ የቱሪዝም መስህቦችን ማስተዋወቅና የህዝቡን የፈጠራ ተሳትፎ ማበረታታት።",
    category: "education",
    processingTime: "Varies",
    fee: "Varies",
    icon: School,
  },
  {
    id: "4",
    title: "ሴቶች፣ ህፃናትና ማህበራዊ ጉዳይ ጽ/ቤት", // Women, Children & Social Affairs
    description:
      "የሴቶችን፣ ህፃናትንና ተጋላጭ የህብረተሰብ ክፍሎችን መብትና ደህንነት ማስጠበቅ፣ ማህበራዊ ተሳትፏቸውንና ተጠቃሚነታቸውን ማረጋገጥ።",
    category: "personal",
    processingTime: "Varies",
    fee: "Varies",
    icon: Users,
  },
  {
    id: "5",
    title: "አርሶ አደርና ከተማ ግብርና ጽ/ቤት", // Farmers & Urban Agriculture Development
    description:
      "የከተማ ግብርናን በማዘመንና የአርሶ አደሩን ምርታማነት በማሳደግ የምግብ ዋስትናን ማረጋገጥና የኑሮ ደረጃን ማሻሻል።",
    category: "business",
    processingTime: "Varies",
    fee: "Varies",
    icon: Leaf,
  },
  {
    id: "6",
    title: "የቤቶች ልማትና አስተዳደር ጽ/ቤት", // Housing Development & Administration
    description:
      "ፍትሃዊና ቀልጣፋ የቤቶች አስተዳደር ስርዓት በመዘርጋት የነዋሪዎችን የመኖሪያ ቤት ፍላጎት ለማሟላት መትጋት።",
    category: "property",
    processingTime: "Varies",
    fee: "Varies",
    icon: Home,
  },
  {
    id: "7",
    title: "የሰው ሃብት አስተዳደር ጽ/ቤት", // Human Resource Management
    description:
      "ብቃት ያለውና በውጤታማነት የሚሰራ የመንግስት የሰው ሃይል በማፍራት ቀልጣፋ አገልግሎት እንዲሰጥ ማስቻል።",
    category: "business",
    processingTime: "Varies",
    fee: "Varies",
    icon: Briefcase,
  },
  {
    id: "8",
    title: "የህብረት ስራ ማህበራት ጽ/ቤት", // Cooperative Societies
    description:
      "የህብረት ስራ ማህበራትን በማደራጀትና በመደገፍ አባላቱ በኢኮኖሚና በማህበራዊ መስኮች ተጠቃሚ እንዲሆኑ ማስቻል።",
    category: "business",
    processingTime: "Varies",
    fee: "Varies",
    icon: Users,
  },
  {
    id: "9",
    title: "የወጣቶችና ስፖርት ጉዳይ", // Youth and Sports Affairs
    description:
      "ወጣቶችን በማብቃትና የስፖርት ተሳትፎን በማስፋፋት ጤናማ፣ ሃላፊነት የሚሰማውና በልማት ተሳታፊ ትውልድ መፍጠር።",
    category: "education",
    processingTime: "Varies",
    fee: "Varies",
    icon: Users,
  },
  {
    id: "10",
    title: "Seጽዳት አስተዳደር ጽ/ቤት", // Solid Waste Management
    description:
      "ዘመናዊ የደረቅ ቆሻሻ አሰባሰብና አወጋገድ ስርዓት በመዘርጋት የወረዳችንን ንፅህናና የአካባቢ ጤና መጠበቅ።",
    category: "property",
    processingTime: "Varies",
    fee: "Varies",
    icon: Leaf,
  },
];

const categoryGradients = {
  personal: "from-sky-500 to-sky-600",
  business: "from-orange-500 to-orange-600",
  property: "from-green-500 to-green-600",
  transport: "from-violet-500 to-violet-600",
  education: "from-pink-500 to-pink-600",
  default: "from-slate-500 to-slate-600",
};

const activeTabColors = {
  all: "data-[state=active]:bg-sky-600",
  personal: "data-[state=active]:bg-sky-600",
  business: "data-[state=active]:bg-orange-600",
  property: "data-[state=active]:bg-green-600",
  transport: "data-[state=active]:bg-violet-600",
  education: "data-[state=active]:bg-pink-600",
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredServices, setFilteredServices] = useState(services);

  const categoriesFilterMap = {
    all: () => services,
    personal: () =>
      services.filter((service) => service.category === "personal"),
    business: () =>
      services.filter((service) => service.category === "business"),
    property: () =>
      services.filter((service) => service.category === "property"),
    transport: () =>
      services.filter((service) => service.category === "transport"),
    education: () =>
      services.filter((service) => service.category === "education"),
  };

  const categoryTabKeys = [
    "all",
    "personal",
    "business",
    "property",
    "transport",
    "education",
  ];

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredServices(
        categoriesFilterMap[activeTab as keyof typeof categoriesFilterMap]()
      );
      return;
    }

    const results = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) || // Also search in Amharic description
        service.category.toLowerCase().includes(query)
    );

    if (activeTab === "all") {
      setFilteredServices(results);
    } else {
      setFilteredServices(
        results.filter((service) => service.category === activeTab)
      );
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredServices(
        categoriesFilterMap[value as keyof typeof categoriesFilterMap]()
      );
    } else {
      const searchResults = services.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) || // Also search in Amharic description
          service.category.toLowerCase().includes(query)
      );
      if (value === "all") {
        setFilteredServices(searchResults);
      } else {
        setFilteredServices(
          searchResults.filter((service) => service.category === value)
        );
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const primaryButtonClasses =
    "bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-300";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 -mx-4 px-4 py-10 text-white shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">የመንግስት አገልግሎቶች</h1> {/* Translated */}
          <p className="max-w-3xl mb-6 text-sky-100/90">
            በቂርቆስ ክፍለ ከተማ የወረዳ 07 አስተዳደር ጽ/ቤት የሚሰጡ አገልግሎቶችን ያስሱ። አገልግሎቶችን በምድብ ማጣራት ወይም የፍለጋ ተግባሩን በመጠቀም የሚፈልጉትን ማግኘት ይችላሉ። {/* Translated */}
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="አገልግሎቶችን ይፈልጉ..." // Translated
                className="pl-10 pr-4 py-3 w-full bg-white/95 border-0 focus:ring-2 focus:ring-sky-400 text-slate-900 rounded-md shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Search className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            </div>
            <Button
              className={`${primaryButtonClasses} px-5 py-3`}
              onClick={handleSearch}
            >
              <Search className="h-4 w-4 mr-2" />
              ፈልግ {/* Translated */}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={handleTabChange}
          value={activeTab}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList className="bg-slate-100 p-1 rounded-lg shadow-sm text-slate-700 flex-wrap h-auto md:h-10">
              {categoryTabKeys.map((catKey) => (
                <TabsTrigger
                  key={catKey}
                  value={catKey}
                  className={`${
                    activeTabColors[catKey as keyof typeof activeTabColors] ||
                    "data-[state=active]:bg-slate-600"
                  } data-[state=active]:text-white px-3 py-1.5 text-sm`}
                >
                  {/* Simple capitalisation for English keys, consider translation if keys were Amharic */}
                  {catKey === "all" ? "ሁሉም" : catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              variant="outline"
              className="flex items-center gap-2 shadow-sm border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md"
            >
              <Filter className="h-4 w-4" />
              የላቁ ማጣሪያዎች {/* Translated */}
            </Button>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {filteredServices.length === 0 ? (
              <div className="col-span-full text-center py-10 text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                ከእርስዎ መስፈርት ጋር የሚዛመድ አገልግሎት አልተገኘም። {/* Translated */}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                  const ServiceIcon = service.icon;
                  const categoryGradient =
                    categoryGradients[
                      service.category as keyof typeof categoryGradients
                    ] || categoryGradients.default;

                  return (
                    <Card
                      key={service.id}
                      className="bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden rounded-xl group flex flex-col"
                    >
                      <div
                        className={`bg-gradient-to-br ${categoryGradient} px-6 py-5 flex items-center text-white`}
                      >
                        <div className="bg-white/25 p-3 rounded-full mr-4 shadow-md backdrop-blur-sm">
                          <ServiceIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-white">
                            {service.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-white/20 text-white border-white/30 mt-1.5 backdrop-blur-sm text-xs px-2 py-0.5"
                          >
                            {/* Capitalize English category name, consider translation if needed */}
                            {service.category.charAt(0).toUpperCase() +
                              service.category.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="pt-5 pb-4 flex-grow">
                        <p className="text-slate-600 mb-4 text-sm min-h-[60px] leading-relaxed"> {/* Added leading-relaxed for Amharic */}
                          {service.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                            <Clock className="h-5 w-5 mr-3 text-slate-500" />
                            <span className="text-slate-700 font-medium">
                              የማስኬጃ ጊዜ:
                            </span>
                            <span className="text-slate-600 ml-1">
                              {service.processingTime}
                            </span>
                          </div>
                          <div className="flex items-center p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                            <Landmark className="h-5 w-5 mr-3 text-slate-500" />
                            <span className="text-slate-700 font-medium">
                              የአገልግሎት ክፍያ:
                            </span>
                            <span className="text-slate-600 ml-1">
                              {service.fee}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-slate-200 px-6 py-4 mt-auto">
                        <Button
                          asChild
                          className={`w-full ${primaryButtonClasses} group-hover:scale-[1.02]`}
                        >
                          <Link href={`/client/services/${service.id}`}>
                            <div className="flex items-center justify-center">
                              <span>ዝርዝሮችን ይመልከቱ</span> {/* Translated */}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Requirements Section */}
      <section className="bg-sky-50 p-8 rounded-xl border border-sky-100 mt-10 shadow-sm">
        <div className="container mx-auto text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-sky-700">
            የአገልግሎት ቅድመ ሁኔታዎች {/* Translated */}
          </h2>
          <p className="mb-5 text-slate-700 max-w-2xl mx-auto md:mx-0">
            እያንዳንዱ አገልግሎት የተወሰኑ የሰነድና የቅድመ ሁኔታ መስፈርቶች አሉት። እባክዎ ከማመልከትዎ በፊት ዝርዝር መረጃ ለማግኘት የቅድመ ሁኔታዎች ገጽን ወይም የተወሰነውን የአገልግሎት ገጽ ይመልከቱ። {/* Translated */}
          </p>
          <Button asChild className={`${primaryButtonClasses} px-6 py-3`}>
            <Link href="/client/requirements">
              <span>የቅድመ ሁኔታዎች መመሪያን ይመልከቱ</span> {/* Translated */}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}