import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import router from "../../router";
import { sendLoginForm } from "../loginForm/loginForm";

type TokenData = {
  id: number;
  login: string;
  expires: number;
};

export interface UserState {
  tokenData: TokenData | null;
}

const getTokenData = () => {
  const item = localStorage.getItem("at");
  if (!item) return null;
  const [payload] = item.split(".");
  return JSON.parse(atob(payload)) as TokenData;
};

const initialState: UserState = {
  tokenData: getTokenData(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("at");
      state.tokenData = null;
      router.navigate("/login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendLoginForm.fulfilled, (state, action) => {
      localStorage.setItem("at", action.payload);
      state.tokenData = getTokenData();
    });
  },
});

export const selectTokenData = (state: RootState) => state.user.tokenData;

export const { logout } = userSlice.actions;

export default userSlice.reducer;
