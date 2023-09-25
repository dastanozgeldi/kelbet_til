import { GradeSelector } from "./grade-selector";

const WorkItem = () => {
  return (
    <div className="rounded bg-[#F8F8F8] p-8 min-w-[300px]">
      <h2 className="text-2xl font-bold">
        Биліктің баспалдақтары немесе құдіретті болу...
      </h2>
      <p>Роберт Грин</p>
    </div>
  );
};

export const Works = () => {
  return (
    <div>
      <div className="">
        <div className="mb-6">
          <h1 className="text-3xl my-2 md:text-4xl font-bold">Шығармалар</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <GradeSelector />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <WorkItem />
          <WorkItem />
          <WorkItem />
          <WorkItem />
          <WorkItem />
          <WorkItem />
        </div>
      </div>
    </div>
  );
};
