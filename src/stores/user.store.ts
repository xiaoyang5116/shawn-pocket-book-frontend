import { create } from "zustand";
import { persist } from "zustand/middleware";
import { request } from "../utils/axios.utils";

type User = {
  id: number;
  username: string;
  signature: string;
  avatar: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type ResetPasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type UserStoreType = {
  user: User | null;
  login: (data: LoginType) => Promise<{ token: string }>;
  getUserInfo: () => Promise<User>;
  uploadImage: (formDate: FormData) => Promise<string>;
  updateUserInfo: (user: Partial<User>) => Promise<void>;
  resetPassword: (data: ResetPasswordType) => Promise<void>;
};

const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      login: async (data) => {
        return await request.post("/user/login", data);
      },
      getUserInfo: async () => {
        const result: User = await request.get("/user/userInfo");
        set({ user: result });
        return result;
      },
      uploadImage: async (formData: FormData) => {
        const result: string = await request.post(
          "/user/upload_avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return result;
      },
      updateUserInfo: async (user) => {
        const result: User = await request.patch("/user/edit_userinfo", user);
        set({ user: result });
      },
      resetPassword: async (data) => {
        return await request.patch("/user/reset_password", data);
      },
    }),
    { name: "user-store" }
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useLogin = () => useUserStore((state) => state.login);
export const useGetUserInfo = () => useUserStore((state) => state.getUserInfo);
export const useUploadImage = () => useUserStore((state) => state.uploadImage);
export const useUpdateUserInfo = () =>
  useUserStore((state) => state.updateUserInfo);
export const useResetPassword = () =>
  useUserStore((state) => state.resetPassword);
