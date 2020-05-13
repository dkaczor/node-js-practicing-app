interface UserType {
  userName: string;
  password: string;
  role: string;
}

export const TEMPORARY_USER_DATA: UserType[] = [
  {
    userName: "admin",
    password: "password123admin",
    role: "admin",
  },
  {
    userName: "member",
    password: "password123member",
    role: "member",
  },
];
