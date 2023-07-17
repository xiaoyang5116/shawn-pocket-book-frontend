import { create } from "zustand";
import { persist } from "zustand/middleware";
import { request } from "../utils/axios.utils";
import { Pay_Type } from "./bills.store";

export type Tag = {
  id: number | "all";
  name: "全部类型" | string;
  pay_type?: Pay_Type;
  tag_type?: number;
};

export type TagRequestType = {
  pay_type: Pay_Type;
  tags: Tag[];
};

export type TagStoreType = {
  tags: TagRequestType[];
  tag: Tag;
  getTags: () => void;
  setTag: (tag: Tag) => void;
};

const useTagStore = create<TagStoreType>()(
  persist(
    (set) => ({
      tags: [],
      tag: { id: "all", name: "全部类型" },
      getTags: async () => {
        const tagsData: TagRequestType[] = await request.get("/tag");
        set({ tags: tagsData });
      },
      setTag: (tag: Tag) => set({ tag: tag }),
    }),
    {
      name: "tag-store",
    }
  )
);

export const useTags = () => useTagStore((state) => state.tags);
export const useGetTags = () => useTagStore((state) => state.getTags);
export const useCurrentTag = () => useTagStore((state) => state.tag);
export const useSetTag = () => useTagStore((state) => state.setTag);
