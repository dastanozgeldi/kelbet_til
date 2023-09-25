import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const GradeSelector = () => {
  const grades = ["7", "8", "9", "10", "11", "12"];

  return (
    <Tabs defaultValue={grades[0]} className="w-[400px]">
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
  );
};
