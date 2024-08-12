export * from "./enums.js";
export * from "./frontend.js";
export * from "./models.js";

export const enum UserType {
  HUNTER = 1,
  PROVIDER = 2,
}

export const UserTypeMap = {
  [UserType.HUNTER]: {
    text: "Job Hunter",
  },
  [UserType.PROVIDER]: {
    text: "Job Provider",
  },
};

export interface UserCred {
  usercred: string;
  password: string;
}
