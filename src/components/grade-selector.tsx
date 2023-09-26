"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const GradeSelector = ({ data }: { data: any }) => {
  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["Қазақша", "Орысша"];
  const [grade, setGrade] = useState(grades[0]);
  const [language, setLanguage] = useState(languages[0]);

  console.log(grade, language)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      <div>
        <h2>Сынып</h2>
        <Tabs value={grade} onValueChange={setGrade}>
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
        <Tabs value={language} onValueChange={setLanguage}>
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
