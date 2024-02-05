import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  grades: string[];
  grade: string;
  localStorageKey: string;
  setGrade: (grade: string) => void;
}

export const GradeTabs = ({
  grades,
  grade,
  localStorageKey,
  setGrade,
}: Props) => {
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
          {grades.map((grade) => (
            <TabsTrigger key={grade} value={grade}>
              {grade}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
