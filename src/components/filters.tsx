import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filters } from "@/config";

export const GradeFilter = ({
  grade,
  localStorageKey,
  setGrade,
}: {
  grade: string;
  localStorageKey: string;
  setGrade: (grade: string) => void;
}) => {
  return (
    <div>
      <h2>Сынып</h2>
      <Tabs
        value={grade}
        onValueChange={(value) => {
          setGrade(value);
          localStorage.setItem(localStorageKey, value);
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
  localStorageKey,
  setLanguage,
}: {
  language: string;
  localStorageKey: string;
  setLanguage: (language: string) => void;
}) => {
  return (
    <div>
      <h2>Оқыту тілі</h2>
      <Tabs
        value={language}
        onValueChange={(value) => {
          setLanguage(value);
          localStorage.setItem(localStorageKey, value);
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
  localStorageKey,
  setTerm,
}: {
  term: string;
  localStorageKey: string;
  setTerm: (term: string) => void;
}) => {
  return (
    <div>
      <h2>Тоқсан</h2>
      <Tabs
        value={term}
        onValueChange={(value) => {
          setTerm(value);
          localStorage.setItem(localStorageKey, value);
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
