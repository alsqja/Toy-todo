export interface ITodos {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}

export const dummyTodos: ITodos[] = [
  {
    id: 0,
    contents: "dummy1",
    expiration_date: new Date().getTime().toString(),
    is_done: false,
    createdAt: new Date().getTime().toString(),
  },
  {
    id: 2,
    contents: "dummy2",
    expiration_date: new Date().getTime().toString(),
    is_done: false,
    createdAt: new Date().getTime().toString(),
  },
  {
    id: 3,
    contents: "dummy3",
    expiration_date: new Date().getTime().toString(),
    is_done: true,
    createdAt: new Date().getTime().toString(),
  },
  {
    id: 4,
    contents: "dummy4",
    expiration_date: new Date().getTime().toString(),
    is_done: false,
    createdAt: new Date().getTime().toString(),
  },
];
