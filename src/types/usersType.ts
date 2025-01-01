export type TUsersAddress = {
  address: string;
  city: string;
  thana: string;
  postal: string;
  country: "Bangladesh";
};

export type TUserRole = "superAdmin" | "admin" | "user";
export type TUserStatus = "active" | "inactive";
export type TUser = {
  _id: string;
  name: string;
  email?: string;
  mobile: string;
  profileImg: string;
  passwordChangedAt?: Date;
  role: TUserRole;
  status: TUserStatus;
  isDeleted: boolean;
  address?: TUsersAddress;
  isMobileVerify?: boolean;
  isEmailVerify?: boolean;
  kyc?: boolean;
};
