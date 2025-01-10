import { createSlice } from "@reduxjs/toolkit";



export type TUser = {
    _id: string;
    name: string;
    email?: string;
    mobile: string;
    profileImg: string;
    password: string;
    passwordChangedAt?: Date;
    role: 'superAdmin' | 'admin' | 'user' | 'dealer';
    status: 'active' | 'inactive';
    isDeleted: boolean;
    address?: {
      address: string;
      city: string;
      thana: string;
      postal: number;
      country: 'Bangladesh';
    };
    isMobileVerify?: boolean;
    isEmailVerify?: boolean;
    kyc?: boolean;
  }


type TAuthState = {
    user: TUser | null;
    accessToken: null | string;
   
};
const initialState: TAuthState = {
    user: null,
    accessToken: null,
  
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;