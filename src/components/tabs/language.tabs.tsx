import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  language: string;
  localStorageKey: string;
  setLanguage: (language: string) => void;
}

export const LanguageTabs = ({
  language,
  localStorageKey,
  setLanguage,
}: Props) => {
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
