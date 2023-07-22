import { create } from "zustand";
import { persist } from "zustand/middleware";
import { request } from "../utils/axios.utils";

type User = {
  id: number;
  username: string;
  signature: string;
  avatar: string;
};

type UserStoreType = {
  user: User | null;
  getUserInfo: () => Promise<User>;
  uploadImage: (formDate: FormData) => Promise<string>;
  updateUserInfo: (user: Partial<User>) => Promise<void>;
};

const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
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
    }),
    { name: "user-store" }
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useGetUserInfo = () => useUserStore((state) => state.getUserInfo);
export const useUploadImage = () => useUserStore((state) => state.uploadImage);
export const useUpdateUserInfo = () =>
  useUserStore((state) => state.updateUserInfo);
