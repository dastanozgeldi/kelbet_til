import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const GradeSelector = ({ data }: { data: any }) => {
  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["Қазақша", "Орысша"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      <div>
        <h2>Сынып</h2>
        <Tabs defaultValue={grades[0]}>
          <TabsList>
            {grades.map((grade) => (
              <TabsTrigger key={grade} value={grade}>
                {grade}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* {grades.map((grade) => (
        <TabsContent key={grade} value={grade}>
          {grade}
        </TabsContent>
      ))} */}
        </Tabs>
      </div>

      <div>
        <h2>Оқыту тілі</h2>
        <Tabs defaultValue={languages[0]}>
          <TabsList>
            {languages.map((language) => (
              <TabsTrigger key={language} value={language}>
                {language}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* {grades.map((grade) => (
        <TabsContent key={grade} value={grade}>
          {grade}
        </TabsContent>
      ))} */}
        </Tabs>
      </div>
    </div>
  );
};
