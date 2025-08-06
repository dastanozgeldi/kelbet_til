import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filters } from "@/config";
import { Label } from "./ui/label";

export const ProgramFilter = ({
  program,
  setProgram,
}: {
  program: string;
  setProgram: (program: string) => void;
}) => {
  return (
    <div>
      <Label>Бағдарлама</Label>
      <Tabs
        value={program}
        onValueChange={(value) => {
          setProgram(value);
          localStorage.setItem("program", value);
        }}
      >
        <TabsList>
          {filters.programs.map((program) => (
            <TabsTrigger key={program} value={program}>
              {program === "JBBM" ? "ЖББМ" : "НЗМ"}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export const GradeFilter = ({
  grade,
  setGrade,
}: {
  grade: string;
  setGrade: (grade: string) => void;
}) => {
  return (
    <div>
      <Label>Сынып</Label>
      <Tabs
        value={grade}
        onValueChange={(value) => {
          setGrade(value);
          localStorage.setItem("grade", value);
        }}
      >
        <TabsList>
          {filters.grades.map((grade) => (
            <TabsTrigger key={grade} value={grade}>
              {grade}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export const LanguageFilter = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (language: string) => void;
}) => {
  return (
    <div>
      <Label>Оқыту тілі</Label>
      <Tabs
        value={language}
        onValueChange={(value) => {
          setLanguage(value);
          localStorage.setItem("language", value);
        }}
      >
        <TabsList>
          <TabsTrigger value="T1">Қазақша</TabsTrigger>
          <TabsTrigger value="T2">Орысша</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export const TermFilter = ({
  term,
  setTerm,
}: {
  term: string;
  setTerm: (term: string) => void;
}) => {
  return (
    <div>
      <Label>Тоқсан</Label>
      <Tabs
        value={term}
        onValueChange={(value) => {
          setTerm(value);
          localStorage.setItem("term", value);
        }}
      >
        <TabsList>
          <TabsTrigger value="1">1</TabsTrigger>
          <TabsTrigger value="2">2</TabsTrigger>
          <TabsTrigger value="3">3</TabsTrigger>
          <TabsTrigger value="4">4</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
