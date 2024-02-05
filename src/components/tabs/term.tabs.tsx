import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  term: string;
  localStorageKey: string;
  setTerm: (term: string) => void;
}

export const TermTabs = ({ term, localStorageKey, setTerm }: Props) => {
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
