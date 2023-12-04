import { type Language, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const works = [
  {
    title: "Аяз би ертегісі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/0259ad7f-57e2-479a-8263-20146a3ff583.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Абдул-Хамид Мархабаев. Шортан планетасы, сен кінәлісің",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/bf0e90ee-8569-457f-b257-4792cf374281.pdf",
    grade: "7",
    language: "T1",
    term: "4",
  },
  {
    title: "Шешендік сөздер, кезеңі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/f247b4ec-a53b-451b-9cf1-6c3aced4163a.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Үйсін Төле би мен Әнет баба",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/4cd7a997-bdfd-4258-a90f-a60d03c7a531.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Әйтеке бидің сыншылдығы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/eac3b86d-e17d-4139-afa7-9a7ca1effad4.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Қазыбек би. Кім жақын, не қымбат, не қиын",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/a61c27eb-2290-48c2-93ef-2b69a102cc3b.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Асан қайғының жерге айтқан сыны",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/2025029a-6157-442f-9f1e-7c8664767ccc.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Қазыбек бидің елшілігі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/4e29411a-1ccc-4504-8639-82fcc97aa164.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Мұхтар Әуезов «Көксерек»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/57cfb8bc-243d-45f7-86a8-0676d4bbc18e.pdf",
    grade: "7",
    language: "T1",
    term: "3",
  },
  {
    title: "Бердібек Соқпақбаев.  Он алты жасар чемпион",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/5c8666c7-30e4-464e-8e03-74fd57949887.pdf",
    grade: "7",
    language: "T2",
    term: "2",
  },
  {
    title: "Ақұштап Бақтыгереева. Қасқыр өлеңі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ced2ea55-bf56-4cc6-ad1f-f42940b6569b.pdf",
    grade: "7",
    language: "T2",
    term: "4",
  },
  {
    title: "Зейнеп Ахметова Шуақты күндер",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/47970d36-82bb-4634-8e34-5ee2ae266a06.pdf",
    grade: "7",
    language: "T2",
    term: "3",
  },
  {
    title: "Мира Сембайқызы. Компьютер",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/3c861f27-d005-44a8-a487-f95062bbc265.pdf",
    grade: "7",
    language: "T2",
    term: "3",
  },
  {
    title: "Күләш Ахметова. Пәк табиғат",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/debe695e-79d6-41f7-a88a-32a6de9c6163.pdf",
    grade: "7",
    language: "T2",
    term: "4",
  },
  {
    title: "Айбатыр Сейтақ «Қазақстан таулары»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/a88991f9-4ee3-422c-92f5-1a0354da2afe.pdf",
    grade: "7",
    language: "T2",
    term: "1",
  },
  {
    title: "Бейімбет Майлин «Қара шелек» әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/b8da7073-13f5-460d-8e70-ae203b996b2a.pdf",
    grade: "8",
    language: "T1",
    term: "1",
  },
  {
    title: "Төлеген Айбергенов  «Аруана – бауыр дүние»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/887f34ec-faac-4a1d-a952-850dbc80c8a9.pdf",
    grade: "8",
    language: "T1",
    term: "3",
  },
  {
    title: "Ыбырай Алтынсарин әңгімелері, ертегілері",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/53055857-60a9-4c80-a308-0a7c37f81aa7.pdf",
    grade: "8",
    language: "T1",
    term: "2",
  },
  {
    title: "Төлеген Айбергенов  «Ана»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/c6c38e34-bacd-4a79-a808-60d250848a15.pdf",
    grade: "8",
    language: "T1",
    term: "3",
  },
  {
    title: "Шәкәрім Құдайбердіұлы «Қалқаман-Мамыр» поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/96d7f83c-8d46-42b4-8ec8-d6f7b384208c.pdf",
    grade: "8",
    language: "T1",
    term: "1",
  },
  {
    title: "Мағжан Жұмабаев «Батыр Баян» поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/6664d7b6-1299-43eb-982b-1f4cd5e752f2.pdf",
    grade: "8",
    language: "T1",
    term: "1",
  },
  {
    title: "Расул Ғамзатов Менің дағыстаным",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/624e164f-4542-4c9b-b160-e04d80daea5b.pdf",
    grade: "8",
    language: "T1",
    term: "4",
  },
  {
    title: "Ілияс Есенберлин. Қаһар",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/a3a95bc4-f8b8-44d3-ac84-96c5b33498d7.pdf",
    grade: "9",
    language: "T1",
    term: "3",
  },
  {
    title: "Абай Құнанбаев. Мен жазбаймын өлеңді ермек үшін",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/6e6e5d33-bc92-4a6d-b47d-dde8e08f7d08.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Шортанбай Қанайұлы шығармалары_kairan_khalkym",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/1c8d45b5-259f-49df-97af-b346f58b1a31.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Абай Құнанбаев. Сегіз аяқ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/16c79e27-888d-4583-89ee-6f2c0ade127a.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Мұхтар Әуезов.  Хан Кене",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ae5066cf-cd9d-40ae-ae8a-c24d894182dd.pdf",
    grade: "9",
    language: "T1",
    term: "3",
  },
  {
    title: "Шортанбай Қанайұлы. Зар заман",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/fb0ec11d-4696-4509-a134-7ebd3919f8bb.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Әбділхамит Марқабаев. Ғарыштағы қымыз",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/f9ff034a-e005-4d01-8e92-7a83c0aad9d8.pdf",
    grade: "9",
    language: "T2",
    term: "4",
  },
  {
    title: "Дүкенбай Досжан. Төрт патшаны көрген кейуана",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/004b03b8-1c38-4be3-a4e9-753395562fa5.pdf",
    grade: "9",
    language: "T2",
    term: "2",
  },
  {
    title: "Абай Құнанбаев. Жастықтың оты қайдасың",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/b7518282-e709-4426-9a1e-72d3c72702d2.pdf",
    grade: "9",
    language: "T2",
    term: "4",
  },
  {
    title: "Мұхтар  Әуезов «Көксерек»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/e77dd80f-8091-47dc-9e13-82bb420b565c.pdf",
    grade: "9",
    language: "T2",
    term: "3",
  },
  {
    title: "Тәкен Әлімқұлов. Көкпар әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/19c4aff0-d623-4c18-ad06-9cfbc5c8e91f.pdf",
    grade: "9",
    language: "T2",
    term: "1",
  },
  {
    title: "Шыңғыс Айтматов. Кассандра танбасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/1a97100c-fd25-4218-909b-8f0e3bf929e1.pdf",
    grade: "9",
    language: "T2",
    term: "3",
  },
  {
    title: "Тәкен Әбдіков. Қонақтар",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/66cc3e4e-d870-4832-92ee-3e76288933ac.pdf",
    grade: "9",
    language: "T2",
    term: "3",
  },
  {
    title: "Әзілхан  Нұршайықов «Ақиқат пен аңыз»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/bcb5de12-fd91-4726-a87f-621869eb6945.pdf",
    grade: "9",
    language: "T2",
    term: "2",
  },
  {
    title: "Дулат Исабеков Қара шаңырақ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/dc7f738c-07f2-4bdb-8b6b-d5d73f4e84d1.pdf",
    grade: "10",
    language: "T1",
    term: "2",
  },
  {
    title: "Сәкен Сейфуллин Тар жол, тайғақ кешу. ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/b638c101-fcc3-4126-a480-0e031c7c084e.pdf",
    grade: "10",
    language: "T1",
    term: "4",
  },
  {
    title: "Ахмет Байтұрсынұлы ШЫҒАРМАЛАР ЖИНАҒЫ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/815b6e06-f046-4fb3-aad1-be0494701fa7.pdf",
    grade: "10",
    language: "T1",
    term: "3",
  },
  {
    title: "Шоқан Уәлиханов Жоңғария очерктері (үзінді)",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/42ed5656-221a-4a3d-a95e-3780ea4f412f.pdf",
    grade: "10",
    language: "T1",
    term: "3",
  },
  {
    title: "БАЛУАН ШОЛАҚ, ҒАЛИЯ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/a34a3e21-1e1b-4d54-94c5-5e434d983a2e.pdf",
    grade: "10",
    language: "T1",
    term: "1",
  },
  {
    title: "Ерболат Әбікенұлы Пәтер іздеп жүр едік",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/77a1321a-4ec2-4dfc-b416-811be5c36a92.pdf",
    grade: "10",
    language: "T2",
    term: "3",
  },
  {
    title: "Абай Құнанбаев Ескендір поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/d80786bf-c040-4c13-a91d-669834da02e5.pdf",
    grade: "10",
    language: "T2",
    term: "1",
  },
  {
    title: "Жүсіпбек Аймауытов. Ақбілек романы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/c2d6e0c5-f00d-41a1-bb58-ca35a73a8bb8.pdf",
    grade: "10",
    language: "T2",
    term: "2",
  },
  {
    title: "Ыбырай  Алтынсарин Дүние қалай етсең табылады",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/62855549-5492-424c-be68-b5fc4cc5dc22.pdf",
    grade: "10",
    language: "T2",
    term: "2",
  },
  {
    title: "Қабдеш Жұмаділов Қаздар қайтып барады",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/89c18b42-895c-4d3d-8446-e41f90fda602.pdf",
    grade: "10",
    language: "T2",
    term: "3",
  },
  {
    title: "Думан рамазан Соңғы дем толық",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/de072a4c-0dba-4195-892a-349b4a80bb09.pdf",
    grade: "10",
    language: "T2",
    term: "3",
  },
  {
    title: "Ермек Өтетілеуұлы  Ата заң",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/260d6b58-de67-4536-89aa-8136b65d935d.pdf",
    grade: "10",
    language: "T2",
    term: "4",
  },
  {
    title: "ЖҮНІС САХИЕВ «Уақыт қайтарымы»",
    fileUrl: "",
    grade: "10",
    language: "T2",
    term: "4",
  },
  {
    title: "Қозы Көрпеш Баян сұлу жыры Жанақ нұсқасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/3e73c1c6-e36a-4988-ac26-b2495c137774.pdf",
    grade: "7",
    language: "T1",
    term: "2",
  },
  {
    title: "Түгел сөздің түбі бір, түп атасы – Майқы би. Кімнен кім туады",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/52bd12d0-1d99-4d1f-9cf3-8de12504d89e.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "ЛИРА ҚОНЫСБАЙДЫҢ «Ғайып ұл» новелласы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/e1c8807a-e115-4d4e-a72b-b04965b9f4be.pdf",
    grade: "7",
    language: "T1",
    term: "4",
  },
  {
    title: "Шерхан Мұртаза «Жүз жылдық жара» әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/537847a8-49c6-4c2a-8de8-de6a96f0a579.pdf",
    grade: "7",
    language: "T1",
    term: "3",
  },
  {
    title: "Өтірік пен шынның арасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/53c0406e-6238-46e7-aa57-b3ad1e579578.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Ханс Кристиан Андерсон. Сандық самолет",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/bb632056-74a7-405e-9740-ac3154f7d93c.pdf",
    grade: "7",
    language: "T2",
    term: "1",
  },
  {
    title: "Ыбырай Алтынсарин. Бай баласы мен жарлы баласы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/743793b8-2763-4947-990c-c74cd63aa7fb.pdf",
    grade: "7",
    language: "T2",
    term: "2",
  },
  {
    title: "Мира Сембайқызы. Ұялы телефон",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/be9cb8a9-d622-4f97-852e-b895b4e2540a.pdf",
    grade: "7",
    language: "T2",
    term: "3",
  },
  {
    title: "Қасым Қайсенов. Жау тылындағы бала",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/84d64ef9-5317-40f7-a143-66f2014f0d5e.pdf",
    grade: "7",
    language: "T2",
    term: "4",
  },
  {
    title: "Еркінбай Әкімқұлов Шәмші Қалдаяқов - ән патшасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/647e4ae7-8e8b-475e-a249-2312d9167de1.pdf",
    grade: "7",
    language: "T2",
    term: "3",
  },
  {
    title: "«Ақсақ құлан» аңызы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/0152996b-4e8c-45bb-b7d5-5f54ed8a087c.pdf",
    grade: "7",
    language: "T2",
    term: "3",
  },
  {
    title: "Жюль Верн. Әлемді 80 күн ішінде шарлау",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/8485b350-29e7-4920-8ea4-fdbfcc8799f9.pdf",
    grade: "7",
    language: "T2",
    term: "1",
  },
  {
    title: "Айзат Рақыш. Жас маманның басынан кешкендері",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/8d76171c-18df-4c83-ac76-379663193552.pdf",
    grade: "11",
    language: "T2",
    term: "3",
  },
  {
    title: "Мұхтар Әуезов. Абай жолы 1-кітап",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/7cc59198-7979-4436-98e6-e4e89583ff05.pdf",
    grade: "11",
    language: "T2",
    term: "4",
  },
  {
    title: "Гауһар Сейітжан «Қара алтыны халқымның ...» өлеңі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/e5536e50-804a-4865-a35d-cb0bb220759e.pdf",
    grade: "11",
    language: "T2",
    term: "3",
  },
  {
    title: "Қадыр Мырзалиев «Аралым»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/02d05b93-ad1c-4c94-86a7-285f4f87cc62.pdf",
    grade: "11",
    language: "T2",
    term: "2",
  },
  {
    title: "Дүкенбай Досжан. Ар соты",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/2aac8da7-fbc9-4a11-9b05-7cb9551d0112.pdf",
    grade: "11",
    language: "T2",
    term: "4",
  },
  {
    title: "Балғабек Қыдырбекұлы «Қырық құрақ» фельетоны",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/fae8e8b3-d92f-4b53-8d4b-65d26786c7b1.pdf",
    grade: "11",
    language: "T2",
    term: "3",
  },
  {
    title: "Мұхтар Әуезов. Абай жолы 3-кітап",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/55be97af-7b33-4b0f-a6e5-2dc4be4804b8.pdf",
    grade: "11",
    language: "T2",
    term: "4",
  },
  {
    title: "Мұхтар Әуезов. Абай жолы 2-кітап",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/1f20e7f1-0633-4c18-9d5c-2d2bdd0c662b.pdf",
    grade: "11",
    language: "T2",
    term: "4",
  },
  {
    title: "Шоқан Уәлиханов Жоңғария очерктері (үзінді)",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/42ed5656-221a-4a3d-a95e-3780ea4f412f.pdf",
    grade: "11",
    language: "T2",
    term: "2",
  },
  {
    title: "Роза Мұқанова «Мәңгілік бала бейне» әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/75ade5c7-b8cc-4e82-ad0f-bb256e988196.pdf",
    grade: "11",
    language: "T2",
    term: "1",
  },
  {
    title: "Джек Лондон. Мартин Иден ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/dc00336d-9574-4435-b0ba-fc93b421a13d.pdf",
    grade: "12",
    language: "T1",
    term: "2",
  },
  {
    title: "Мұхтар Әуезов. Қарагөз ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/71295c3a-1b0b-417c-94ed-f942a3657995.pdf",
    grade: "12",
    language: "T1",
    term: "1",
  },
  {
    title: "Жүсіпбек Аймауытов. Ақбілек романы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/15b0c5f4-49ee-4952-9cc0-e3fbb9c93209.pdf",
    grade: "12",
    language: "T1",
    term: "1",
  },
  {
    title: "Роза Мұқанова «Мәңгілік бала бейне» әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/75ade5c7-b8cc-4e82-ad0f-bb256e988196.pdf",
    grade: "8",
    language: "T1",
    term: "4",
  },
  {
    title: "Шыңғыс Айтматов. Найман ана",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/520c41c2-edbf-4cb3-94be-7b2c4e501921.pdf",
    grade: "8",
    language: "T1",
    term: "2",
  },
  {
    title: "Қадыр Мырза-Әлі «Бабамыздың шоқ басқан табанымен»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/702dc82f-a6c7-4555-94e1-333e7f5e6820.pdf",
    grade: "8",
    language: "T1",
    term: "4",
  },
  {
    title: "Қабдеш Жұмаділов Қаздар қайтып барады",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/45e07c89-3a2b-40a9-b9f1-05bc536d1aeb.pdf",
    grade: "8",
    language: "T1",
    term: "3",
  },
  {
    title: "Қадыр Мырза-Әлі «Кәрі қыран»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/2994ed82-2098-4a0f-99fb-dd50167d0cc3.pdf",
    grade: "8",
    language: "T1",
    term: "4",
  },
  {
    title: "Мұқағали Мақатаев «Аққулар ұйықтағанда» поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/4b7d51b4-bd6e-4c0a-8308-fcb2e427f604.pdf",
    grade: "8",
    language: "T1",
    term: "3",
  },
  {
    title: "Қадыр Мырзалиев. Қызыл кітап",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/34c0639e-e507-4fcb-bbee-ca227cf8a57e.pdf",
    grade: "8",
    language: "T2",
    term: "3",
  },
  {
    title: "Мұхтар Шаханов «Отырар» поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/6463b65a-f094-4a37-81ef-92c349ed5f0a.pdf",
    grade: "8",
    language: "T2",
    term: "4",
  },
  {
    title: "«Кісі басы бір уыс тұз» тұрмыс-салт ертегісі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/c2033e70-5c26-4539-a801-fb8a5829e88d.pdf",
    grade: "8",
    language: "T2",
    term: "1",
  },
  {
    title: "Шерхан Мұртаза.  Дәрігердің үш қаруы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/d5848f4c-5970-4ec4-a535-762aa9a5d536.pdf",
    grade: "8",
    language: "T2",
    term: "2",
  },
  {
    title: "Марат Қабанбаев. Бауыр әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/8663b07e-59a0-4c79-83c0-03cde45d9859.pdf",
    grade: "8",
    language: "T2",
    term: "1",
  },
  {
    title: "Әбділдә Тәжібаев «Сырдария» өлеңі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ba265daf-1908-4519-9d8f-82caca65de7b.pdf",
    grade: "8",
    language: "T2",
    term: "3",
  },
  {
    title: "Жюль Верн. Су астындағы 80000 км сапар",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/cc88a8f4-4beb-4233-b03d-f9be05d2e9ee.pdf",
    grade: "8",
    language: "T2",
    term: "3",
  },
  {
    title: "Әзес Несин. «Дүниеде жоқ машина» әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/1d44e5a9-fc12-48f9-82fe-3098087a3752.pdf",
    grade: "8",
    language: "T2",
    term: "4",
  },
  {
    title: "Талап Сұлтанбеков.  Ғажайып планета",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/957e0159-5770-4f2b-8754-36c675380f98.pdf",
    grade: "8",
    language: "T2",
    term: "4",
  },
  {
    title: "Ғалым Әріп. Жел новелла",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/c65270f1-7b86-421d-b5b2-051d7804c40d.pdf",
    grade: "8",
    language: "T2",
    term: "2",
  },
  {
    title: "«Біржан мен Сара» айтысы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/eed47ada-8deb-49b9-b384-875a953a8910.pdf",
    grade: "9",
    language: "T1",
    term: "1",
  },
  {
    title: "Шортанбай Қанайұды шығармалары",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ce7bf08e-5887-4c47-a8c7-dccc42eed2ba.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Абай Құнанбаев. Ескендір поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/f5c1a12d-105b-465a-bd2a-73f1f71866c6.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Қыз Жібек операсы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/6cfbca93-a4e2-4920-97e3-8291dd13a675.pdf",
    grade: "9",
    language: "T1",
    term: "1",
  },
  {
    title: "Ғабит Мүсірепов. Ұлпан",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/2ce5517f-db13-4e46-937c-458b7abeb1ce.pdf",
    grade: "9",
    language: "T1",
    term: "4",
  },
  {
    title: "Абай Құнанбаев. Малға достың мұңы жоқ малдан басқа",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/4a83d641-caa2-4604-9674-b17f5c43c262.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Джек Лондон. Әйел қырық жанды",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/f2d9bb1a-6500-43f5-b985-12fe9118d302.pdf",
    grade: "9",
    language: "T1",
    term: "4",
  },
  {
    title: "Абай Құнанбаев «Сабырсыз, арсыз, еріншек»,",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/abe2108b-f260-473d-87ae-bf40b6b7c47b.pdf",
    grade: "9",
    language: "T1",
    term: "2",
  },
  {
    title: "Дулат Исабеков Тіршілік",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/52cc2555-0449-4455-9cda-dbdbfd41eda6.pdf",
    grade: "10",
    language: "T1",
    term: "2",
  },
  {
    title: "Ахмет Байтұрсынұлы Қазақтың бас ақыны мақаласы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/14ea666e-92f4-425d-9cb1-7de3290a2540.pdf",
    grade: "10",
    language: "T1",
    term: "3",
  },
  {
    title: "Ақан Сері (Ақжігіт) Қорамсаұлы «Құлагер» өлеңі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/9aeb306d-047a-4ba2-9f3d-9e30cfa478de.pdf",
    grade: "10",
    language: "T1",
    term: "1",
  },
  {
    title: "Ілияс Жансүгіров «Құлагер» поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/cd42c379-87e6-43a7-b4ff-04c61125a153.pdf",
    grade: "10",
    language: "T1",
    term: "1",
  },
  {
    title: "Үкілі Ыбырыай, Гәкку",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/f6da420c-9e95-44e7-9a7b-ba18a2c74411.pdf",
    grade: "10",
    language: "T1",
    term: "1",
  },
  {
    title: "Балуан Шолақ Баймырзаұлы «Қыркүйек»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/3c1c3062-5f0f-483d-8df3-06ce0a46eb29.pdf",
    grade: "10",
    language: "T1",
    term: "1",
  },
  {
    title: "Ақселеу Сейдімбеков Аққыз хикаяты",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/e61c4578-8cf1-4265-8ef7-cab03c20bf2d.pdf",
    grade: "10",
    language: "T1",
    term: "2",
  },
  {
    title: "Ғабит МҮСІРЕПОВ. ЖАПОН БАЛЛАДАСЫ",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/4f7fa60d-f3d3-431b-a75e-a0f80417e6e2.pdf",
    grade: "11",
    language: "T1",
    term: "2",
  },
  {
    title:
      "Мұхтар Шаханов. «Құрметсіз, шыншыл тұлғалар немесе Түрік қағанатының құлауы»",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ca538984-0c51-4332-acd4-21ee6b4d0c40.pdf",
    grade: "11",
    language: "T1",
    term: "1",
  },
  {
    title: "Шешендік сөздің түрлері",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/0c806408-f614-4871-9f1a-25c99ff6b147.pdf",
    grade: "7",
    language: "T1",
    term: "1",
  },
  {
    title: "Ерлан Жүніс. Менің атым – тәуелсіздік! өлеңі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/bdabd738-164e-499b-8885-0e7d2a21ee4d.pdf",
    grade: "11",
    language: "T1",
    term: "1",
  },
  {
    title: "Әшірбек Сығайдың «Сахна Саңлақтары»  еңбегінен үзінді",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/f6f4c7b5-d7e2-4e9e-9932-c4e182496b07.pdf",
    grade: "11",
    language: "T1",
    term: "4",
  },
  {
    title: "Асқар Алтай. Кентавр әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/7c9ad588-0bc4-45c6-bd96-06e112c4d80d.pdf",
    grade: "11",
    language: "T1",
    term: "2",
  },
  {
    title: "Сәкен Жүнісов. Заманай мен Аманай",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/a691b8e6-efbe-4a3f-8e1d-ed58d0860786.pdf",
    grade: "11",
    language: "T1",
    term: "4",
  },
  {
    title: "МЕДЕУ СӘРСЕКЕ «Қаныш Сәтпаев» роман-эссе",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ceb72d37-ccca-494a-b2d1-51adfdce388f.pdf",
    grade: "11",
    language: "T1",
    term: "1",
  },
  {
    title: "Абай жолы 1",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/717c1da7-5a69-4640-9c5f-805b721640b2.pdf",
    grade: "11",
    language: "T1",
    term: "3",
  },
  {
    title: "Абай жолы 2",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/a92c6267-b630-4d45-b1fa-fad6cfb5ecbb.pdf",
    grade: "11",
    language: "T1",
    term: "3",
  },
  {
    title: "Абай жолы 3",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/9f51f2d9-7fcd-49f3-a009-53f7312d07f7.pdf",
    grade: "11",
    language: "T1",
    term: "3",
  },
  {
    title: "Қыз-Жібек",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/9097cfe2-191f-4e8f-9883-35ddd4eea314.pdf",
    grade: "11",
    language: "T2",
    term: "1",
  },
  {
    title: "Ілияс Жансүгіров «Күйші» поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/60e5300c-df8a-435a-97ab-1dd43291bb35.pdf",
    grade: "12",
    language: "T1",
    term: "2",
  },
  {
    title: "Бауыржан Момышұлы. Қанмен жазылған кітап",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/caddbc74-ce66-4493-a633-9c2e53760fa9.pdf",
    grade: "12",
    language: "T1",
    term: "3",
  },
  {
    title: "Мұхтар Шаханов. ТАНАКӨЗ поэмасы",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/73aa21b8-aa0f-4553-b9f3-c138e991ec24.pdf",
    grade: "12",
    language: "T1",
    term: "3",
  },
  {
    title: "Константин Паустовский. Әлемді көру өнері  әңгімесі",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/25697b4e-2bca-4841-a304-5bb14bf9aca1.pdf",
    grade: "12",
    language: "T1",
    term: "2",
  },
  {
    title: "Жүніс Сахиев. Марстан шыққан жаңғырық",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/1374abb0-0104-4108-8f71-2734ecfdab0d.pdf",
    grade: "12",
    language: "T1",
    term: "4",
  },
  {
    title: "Эрнест Хемингуэй. Шал мен теңіз",
    fileUrl:
      "https://files.edgestore.dev/cjlvjw1a92y5dilc/publicFiles/_public/ffb30a4d-9fd0-44f3-97ca-17eff2d253db.pdf",
    grade: "11",
    language: "T1",
    term: "4",
  },
];

async function main() {
  const books = await prisma.book.createMany({
    data: works.map((work) => ({
      title: work.title,
      fileUrl: work.fileUrl,
      grade: work.grade,
      language: work.language as Language,
      term: work.term,
    })),
  });

  console.log("generated books", books);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
