import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText } from "lucide-react"
import PrerequisitesList from "@/components/PrerequisitesList" // Declare the variable before using it

export default function ServicesPrerequisites() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">የአገልግሎት ቅድመ ሁኔታዎች</h1>
      <p className="text-center mb-8 text-muted-foreground">ከተገልጋይ የሚጠበቅ ቅድመ ሁኔታዎች</p>

      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 mb-8">
          <TabsTrigger value="1">ፑብሊክ</TabsTrigger>
          <TabsTrigger value="2">ከተማ ውበት</TabsTrigger>
          <TabsTrigger value="3">ባህል</TabsTrigger>
          <TabsTrigger value="4">ሴ/ህ/ማ/ጉ</TabsTrigger>
          <TabsTrigger value="5">አርሶ አደር</TabsTrigger>
          <TabsTrigger value="6">ቤቶች</TabsTrigger>
          <TabsTrigger value="7">ሰው ኃይል</TabsTrigger>
          <TabsTrigger value="8">ህብረት ስራ</TabsTrigger>
          <TabsTrigger value="9">ወጣቶች</TabsTrigger>
          <TabsTrigger value="10">ሌሎች</TabsTrigger>
        </TabsList>

        {/* Tab 1: Public Services */}
        <TabsContent value="1">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ፑብሊክ አገልግሎቶች</CardTitle>
                <CardDescription>የወረዳ አጠቃላይ አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ሀብት ማሰባሰብ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የተሟላ መረጃ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ለመሰረተ ልማት ልማት ፍላጎት ሀብት ማሰባሰብ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "የብሎክ ነዋሪ ያላቸዉን የልማት ፍላጎት መሰረት ያደረገ በህጋዊ የልማት ደረሰኝ ክፍያ መፈፀም",
                          "የህብረተሰቡን ለልማት ስራ ላይ ተገቢዉን መዋጮ ማድረግ",
                          "ከነዋሪዉ ተሰበሰበዉ የሀብት በተገቢዉ መንገድ በተገቢዉ መንገድ በ24 ሰዓት ዉስጥ ባንክ ገቢ ማድረጉን መረጃ መዉሰድ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ለበጎፍቃድ አገልግሎት ሀብት ማሰባሰብ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የበጎ ፍቃድ አገልግሎት ለመስጠት ፍላጎት ማሳየት እና ፍቃደኛ መሆን", "የሀብት ስርጭቱ ላይ ተገቢዉን እገዛ ማድረግ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>በህብረተሰብ ተሳትፎ የአካባቢ ሰላም መጠበቅ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "ህብረተሰቡ የአካባቢዉን ሰላም ለማስጠበቅ የሚያደርገዉን ተሳትፎ ከሌሎች ተመሳሳይ የዘርፍ ባለድርሻ አካላት ጋር በመሆን በቅንጅት ዕለቱ በተራ አካባቢዉን እየጠበቀ መሆኑን መረጃ መስጠት",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የብሎክ አደረጃጀትን በመጠቀም ሰላም ፀጥታን በተመለከተ ወቅታዊ መረጃ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የ24 ሰዓት መረጃ ልዉዉጥ ማድረግ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የብሎክ አደረጃጀቶችን በመጠቀም ህገወጥ ተግባራትን መከላከል</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "የደንብ ጥሰት እና አዋኪ ድርጊቶችን የሚፈፅሙ በመለየጥ በአካል በመገኘት ጥቆማ እና መረጃ በመስጠት ህገወጥ ነትን መከላከል",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የበጎፍቃድ አገልግሎት ማስተባበር</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የበጎ ፍቃድ አገልግሎት ለመስጠት ፍላጎት ማሳየት እና ፍቃደኛ መሆን"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የመረጃ አገልግሎት ማቅረብ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የመረጃ ጥያቄ ማቅረብ", "መረጃውን ለምን እንደሚፈልጉ ማብራራት", "አስፈላጊ ከሆነ የመታወቂያ ቅጂ ማቅረብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የሰነድ ማረጋገጫ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["ዋናውን ሰነድ ማቅረብ", "የሰነድ ባለቤትነት ማረጋገጫ ማቅረብ", "የመታወቂያ ቅጂ ማቅረብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የክስተት ፈቃድ ማመቻቸት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "የፕሮግራም ዝርዝር ማቅረብ",
                          "የተሳታፊዎች ዝርዝር ማቅረብ",
                          "የቦታና ጊዜ ማቅረብ",
                          "አስፈላጊ የደህንነት ዋስትና ማቅረብ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የህብረተሰብ ግንኙነት አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["ግንኙነት ለማድረግ የሚፈልጉበትን ምክንያት ማቅረብ", "የተሟላ ማመልከቻ ማቅረብ", "የመደበኛ መግለጫ ሰነድ ማቅረብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የማህበረሰብ ምክክር አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የምክክር ጥያቄ ማቅረብ", "የሚመለከታቸውን አካላት ማለት", "የምክክር አጀንዳ ማቅረብ", "የተሳታፊዎች ዝርዝር ማቅረብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Urban Beauty */}
        <TabsContent value="2">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>የከተማ ውበትና አረንጓዴ ልማት</CardTitle>
                <CardDescription>የከተማ ውበትና አረንጓዴ ልማት ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የተፋሰስ፤የአረንጓዴ አካባቢዎች ወንዝ ዳርቻዎች የማልማት የመንከባከብ የመጠበቅ ፈቃድ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["N/A"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ለበጎ ፈቃድ አልሚዎች የአረንጓዴ ቁርጥራጭ ቦታዎችና 20/50 ሬዲየሰ በውል የልማትና እንክብካቤ ፈቃድ መስጠት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ማመልከቻ ደብዳቤ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>በውሉ መሠረት ስራውን ማከናወኑን አረጋግጦ ለኢንትርፕራይዝ የክፍያ ሰነድ ማዘጋጅት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የስራ ውልና የክፍያ ጥያቄ ማቅርብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የመፀዳጃ ቤት አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የአገልግሎት ክፍያ መክፍልና በቅደም ተከተል መጠቀም"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የሻወር አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የአገልግሎት ክፍያ መክፍልና በቅደም ተከተል መጠቀም"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የአረንጓዴ ቦታዎች እንክብካቤ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የእንክብካቤ ጥያቄ ማቅረብ", "የአካባቢውን ነዋሪዎች ድጋፍ ማረጋገጫ", "አካባቢውን ለማሳመር ያለ ዕቅድ ማቅረብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የከተማ ውበት ማስጠበቂያ ፈቃድ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ማመልከቻ ደብዳቤ", "የስራ ዕቅድ ማቅረብ", "የቴክኒክ ብቃት ማረጋገጫ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የአካባቢያዊ አረንጓዴ ልማት ስልጠና</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["ለስልጠና ማመልከት", "በአካባቢው ውበት ላይ ለመስራት ፍላጎት ማሳየት", "እንክብካቤ ለማድረግ ቁርጠኝነት ማሳየት"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የኮምፖስት ዝግጅት ስልጠና</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["ለስልጠና ማመልከት", "በአካባቢው ለመተግበር ፍላጎት ማሳየት", "ቢያንስ 5 ተሳታፊዎችን ማሰባሰብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የውሃ ማጠራቀሚያ ስርዓት ምክር አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የአገልግሎት ጥያቄ ማቅረብ", "የንብረት ባለቤትነት ማረጋገጫ ማቅረብ", "የግቢ ሁኔታ ማቅረብ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የአካባቢ ውበት ግምገማ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የግምገማ ጥያቄ ማቅረብ", "አካባቢውን ለማሳየት ፈቃደኝነት ማሳየት", "የተፈለገውን ግምገማ ዓላማ ማብራራት"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የአካባቢ ማሻሻያ የቴክኒክ ድጋፍ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የድጋፍ ጥያቄ ማቅረብ", "የሚሻሻለውን ቦታ ዝርዝር ማቅረብ", "ከማሻሻያው በኋላ ለመንከባከብ ቁርጠኝነት ማሳየት"]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Culture */}
        <TabsContent value="3">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ባህል፣ ኪነ-ጥበብና ቱሪዝም</CardTitle>
                <CardDescription>ባህል፣ ኪነ-ጥበብና ቱሪዝም ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የእደ ጥበብ ማህበራት እንዲደራጁ የተለያዩ ሙያዊ ድጋፍችን መስጠት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "በአካል ቀርቦ ማመልከት የሚችል",
                          "የተሰማራበትን የእደ ጥበብ ዘርፍ የሚሠራውን የሥራ ለማሳየት/ለማስጐብኘት ፈቃደኛ የሆነ",
                          "በማህበር ለመደራጀት ሙያዊ ድጋፍ ፍላጐት ያለው",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>አዲስ የብቃት ማረጋገጫ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "የተቋሙ ባለቤት የታደሰ የነዋሪነት መታወቂያ ወይም ፓስፖርት ወይም መንጃ ፈቃድ ከዋናው ጋር የተገናዘበ ፎቶ ኮፒ",
                          "ሁለት /3X3/ መጠን ያላቸው በ6 ወር ጊዜ ውስጥ የተነሳው የባለቤቱ ጉርድ ፎቶግራፍ",
                          "በዘርፉ የተቀመጠውን የአገልግሎት ክፍያ የሚፈጽም",
                          "ተቋሙ ቋሚ አድራሻ ያለው",
                          "በባህል ዘርፍ ሙያዊ ድጋፍ ለሚፈልጉ እና ለተቋማቸው የሱፐርቪዠን አገልግሎት ለሚፈልጉ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>እድሳት የብቃት ማረጋገጫ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ነባር ብቃት ማረጋገጫ ሰርተፊኬት", "በፋይሉ ከነበሩት መረጃ የጎደሉትን ማሟላት"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>በጠቃሚ የባህል እሴቶችን በማኅበረሰቡ ዘንድ የማስረፅና የብዛ ባህል አካታች ስራዎች አገልግልሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "አገልግሎት ፈላጊው ህጋዊ የአገልግሎት ፍላጐት ደብዳቤ ማቅረብ የሚችል",
                          "የሥልጠና ዳሰሣ/የባህል አካታች ስራዎች ቅድመ ጥናት ላይ ፍላጐትን ማስፈር",
                          "የሥልጠና ቦታ፣ የሥልጠና ጊዜ እና ሠልጣኞችን የሚያመቻች",
                          "ሥልጠናው መውሰድ",
                          "በወሰዱት ስልጠና ላይ የታዩትን ጠንካራና ደካማ ጐኖች ላይ በቃል ወይም በአስተያየት መስጫ ቅፆች ላይ ለማስፈር ፈቃደኛ የሆነ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የአሉታዊ መጤ ባህሎች እና መከላከከል ስልጠናና የግንዛቤ ማስጨበጫ አገልግልሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "አገልግሎት ፈላጊው ህጋዊ የአገልግሎት ፍላጐት ደብዳቤ ማቅረብ የሚችል",
                          "የሥልጠና ዳሰሣ ቅድመ ጥናት ላይ ፍላጐትን ማስፈር",
                          "የሥልጠና ቦታ፣ የሥልጠና ጊዜ እና ሠልጣኞችን የሚያመቻች",
                          "ሥልጠናው መውሰድ",
                          "በወሰዱት ስልጠና ላይ የታዩትን ጠንካራና ደካማ ጐኖች ላይ በቃል ወይም በአስተያየት መስጫ ቅፆች ላይ ለማስፈር ፈቃደኛ የሆነ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ህዝባዊና መንግስታዊ ከተማ አቀፍ የባህል ቀናትና ሁነቶች ከበራ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "ፕሮፖዛል ማዘጋጀት ስልጣንና ተግባራቸው የሚያሳይ ሰነድ ማቅረብ",
                          "ለኩነት ወይም ለመድረክ ዝግጅት የሚገልፅ ህጋዊ ደብዳቤ/ሰነድ ከቢሮ ጋር የተፈራረሙት የስምምነት ሰነድ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የንባብ/የሪፈረንስ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የንባብ አግልግሎት ለማግኘት መታወቂያ ብቻ ማሳየት", "ህፃናት ምንም አይጠየቁም"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የውሰት፤አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "የአገልግሎት ጥያቄ በደብዳቤ ማቅረብ",
                          "የመንግስት ሰራተኛ ከሆኑ ከቢሮ ድጋፍ ደብዳቤ",
                          "የተዋስቱን መጻህፍትና ፖኬት በጥንቃቄ መያዝና በወቅቱ መመለስ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የስነጹሁፍ ምሽት አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ከሚመለከተው አካል የሙያ ማህበራት የድጋፍ ደብዳቤ ማቅረብ የሚችል፣ ጥያቄ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የኪነጥበብ ውድድር ማዛጋጀት አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በመስፈርቱ መሰረት በአካል በመቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 4: Women & Children */}
        <TabsContent value="4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ሴቶች፣ ህፃናት እና ማህበራዊ ጉዳዮች</CardTitle>
                <CardDescription>የወረዳ 07 ሴ/ህ/ማ/ጉ/ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ከፍለው መማር ለማይችሉ ሴቶች የትምህር እድልና ድጋ ማመቻቸት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ማስረጃ/ደብዳቤ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>በጎልማሶች ተግባ ተኮር ትምህርት ማሳተፍ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ማስረጃ/ደብዳቤ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የነፃ ህክምና ድጋፍ እንዲያገኙ ማቻት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ማስረጃ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ሴቶችን በንግድ ስራ ማሰማራት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ማስረጃ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ህፃናት ማቆያ ማጠናከርና ማስፋፋት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ጥያቄ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ለህፃናት የምገባ ድጋፍ ማድረግ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ጥያቄ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የቀጥታ ድጋፍ ማድረግ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ጥያቄ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የነፃ ህክምና አገልግሎት ተጠቃሚ ማድረግ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በተገልጋይ ጥያቄ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የማህበረሰብ አቀፍ ጤና መድህን አባል ምዝገባ ማከናወን</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የታደሰ የቀበሌ መታወቂያ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የአባልነት መታወቂያ መስጠት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የታደሰ የቀበሌ መታወቂያ"]} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 5: Farmers */}
        <TabsContent value="5">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>አርሶ አደር ከተማ ግብርና ልማት</CardTitle>
                <CardDescription>አርሶ አደር ከተማ ግብርና ልማት ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የስልጠና አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የፍላጎት ጥያቄ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የሙያ ምክር አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ድጋፍ የሚፈልጉበትን ለይቶ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የቴክኒክ ምክር አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ድጋፍ የሚፈልጉበትን ለይቶ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1.4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የገበያ መረጃ እና ትስስር አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["ድጋፍ የሚፈልጉበትን ለይቶ ማቅረብ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የማህበራት ምዝገባ እና ህጋዊ ሰውነት ማረጋገጫ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የመተዳደሪያ ደንብ", "የመመስረቻ ቃለ ጉባኤ", "የአባላት ዝርዝር", "መታወቂያ", "የልማት ተነሺነት ማረጋገጫ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የቦታ ካሳ ክፍያ አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የይዞታ ማረጋገጫ ካርታ", "የባንክ ደብተር", "የልማት ተነሺነት ማረጋገጫ", "የቀበሌ መታወቂያ", "የውክልና ማሰረጃ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የመኖሪያ ቤት አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["የልማት ተነሺ አርሶ አደር ስለመሆን", "መታወቂያ", "የውክልና ማሰረጃ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ለአርሶ አደርሮች የሥራ ዕድል ማመቻቸትና በማህበር የማደራጀት አገልግሎት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የንግድ ሥራ ዕቅድ", "ስልጠና ወስደው በሥራ ዕድል መደራጀት", "ልማት ተነሺ አርሶ አደር ስለመሆን", "መታወቂያ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2.5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የፋይናንስ፣ የማሽነሪ እና ቁሳቁስ ግብዓቶች ድጋፍ እንዲያገኙ በማድረግ ወደ ስራ ማስገባት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["የንግድ ሥራ ዕቅድ", "ስልጠና ወስደው በሥራ ዕድል መደራጀት", "ልማት ተነሺ አርሶ አደር ስለመሆን", "መታወቂያ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 6: Housing */}
        <TabsContent value="6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ቤቶች</CardTitle>
                <CardDescription>የቤቶች አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የመንግስት ቤቶችን የኪራይ ውል ማዋዋል</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "ቤት እንዲሰጣቸው የተወሰነበት ደብዳቤ",
                          "ኢትዮጲያዊ ዜግነት ያለው እና የታደሰ መታወቂያ ያለው",
                          "በስማቸው ወይም በትዳር አጋራቸው ስም በከተማው አስተዳደር ስር የመንግስት ወይንም የግል ቤት መስሪያ ቦታ መሆኑን ከ6ወር ወር በኃላየተሰጠ ህጋዊ ማስረጃ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የመንግስት ቤቶች ኪራይ ውል ማደስ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["ቀደም ሲል የነበረ ውል", "ወቅታዊ ኪራይ የተከፈለበት ደረሰኝ", "የታደሰ ህጋዊ የነዋሪነት መታወቂያ"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የኪራይ ዋጋ መተመን</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={["ቤቱ የኪራይ ተመን ያልወጣለት መሆኑን ማረጋገጥ", "ቤቱ የሚገኝበት የአጎራባች የግራና ቀኝ የኪራይ ተመን"]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>የተለየ ጥገና ፈቃድ መስጠት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList
                        prerequisites={[
                          "የጥገና አይነት የተገለጸበት ማመልከቻ",
                          "ቀደም ሲል የነበረ ውል",
                          "ወቅታዊ ኪራይ የተከፈለበት ደረሰኝ",
                          "የቅርጽ እና የይዘት ለውጥ ለውጥ የገባበት ፎርም",
                          "የጥገና ስራዎ በራሱ ወጪ የሚገነባ እና ወጭውን የማይጠይቅ መሆኑ",
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>ህገወጦች ራሳቸው ቤቱን እንዲለቁ የጽሁፍ ማስጠንቀቂያ ደብዳቤ መስጠት</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በህገወጦች የተያዙ ቤቶች ዝርዝር መረጃ"]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span>በህገወጥ የተያዙ የመንግስት ቤቶችን ማስለቀቅ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PrerequisitesList prerequisites={["በህገወጥ የተያዙ የመንግስት ቤቶችን ማስለቀቅ"]} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 7: Social Services */}
        <TabsContent value="7">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ሰው ኃይል</CardTitle>
                <CardDescription>ሰው ኃይል ከተማ ግብርና ልማት ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Accordion items for Social Services */}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 8: Community Services */}
        <TabsContent value="8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ህብረት ስራ</CardTitle>
                <CardDescription>ህብረት ስራ ከተማ ግብርና ልማት ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Accordion items for Community Services */}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 9: Transport */}
        <TabsContent value="9">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ወጣቶች</CardTitle>
                <CardDescription>ወጣቶች ከተማ ግብርና ልማት ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Accordion items for Transport */}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 10: Miscellaneous */}
        <TabsContent value="10">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ሌሎች</CardTitle>
                <CardDescription>ሌሎች ከተማ ግብርና ልማት ጽ/ቤት አገልግሎቶች ቅድመ ሁኔታዎች</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Accordion items for Miscellaneous */}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
