export type Payment = {
  id: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
};

export const data: Payment[] = [
  {
    id: "m5gr84i9",
    name: "Dastan Ozgeldi",
    email: "ken99@yahoo.com",
    role: "ADMIN",
  },
  {
    id: "3u1reuv4",
    name: "Venera Kaliyeva",
    email: "Abe45@gmail.com",
    role: "ADMIN",
  },
  {
    id: "derv1ws0",
    name: "Dulat Bekbolat",
    email: "Monserrat44@gmail.com",
    role: "USER",
  },
  {
    id: "5kma53ae",
    name: "Pow Pow",
    email: "Silas22@gmail.com",
    role: "USER",
  },
  {
    id: "bhqecj4p",
    name: "Test User",
    email: "carmella@hotmail.com",
    role: "USER",
  },
];
