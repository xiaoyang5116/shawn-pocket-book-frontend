import { create } from "zustand";
import { persist } from "zustand/middleware";

type Offset = { x: number; y: number };

type BubbleStoreType = {
  billBubbleOffset: Offset;
  setBillBubbleOffset: (offset: Offset) => void;
};

const useBubbleStore = create<BubbleStoreType>()(
  persist(
    (set) => ({
      billBubbleOffset: { x: 0, y: 0 },
      setBillBubbleOffset: (offset) => set({ billBubbleOffset: offset }),
    }),
    {
      name: "bubble-store",
    }
  )
);

export const useBillBubbleOffset = () =>
  useBubbleStore((state) => state.billBubbleOffset);

export const useSetBillBubbleOffset = () =>
  useBubbleStore((state) => state.setBillBubbleOffset);
