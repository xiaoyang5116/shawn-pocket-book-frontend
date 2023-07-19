import { create } from "zustand";
import { request } from "../utils/axios.utils";
import dayjs from "dayjs";

export enum Pay_Type {
  "不计入" = 0,
  "支出" = 1,
  "收入" = 2,
}

/**
 * "id": 17
 * "amount": 20,
 * "createTime": "2023-07-12T02:48:02.557Z",
 * "remark": "吃饭",
 * "tagId": 1,
 * "tagName": "餐饮",
 * "pay_type": 1
 */
export type BillType = {
  id: number;
  amount: number;
  createTime: string;
  remark: string;
  tagId: number;
  tagName: string;
  pay_type: Pay_Type;
};

export type BillsType = {
  bills: BillType[];
  date: string;
};

type ListType = {
  list: BillsType[];
  totalExpense: number;
  totalIncome: number;
  totalPage: number;
};

export type BillsStoreType = {
  list: BillsType[];
  totalExpense: number;
  totalIncome: number;
  totalPage: number;
  time: string;
  getDefaultBills: (query: { date: string; tagId: number | "all" }) => void;
  pullUpLoading: (query: {
    date: string;
    tagId: number | "all";
    page: number;
  }) => void;
  setTime: (time: string) => void;
};

export const useBillsStore = create<BillsStoreType>((set, get) => ({
  list: [],
  totalExpense: 0,
  totalIncome: 0,
  totalPage: 1,
  time: dayjs().format("YYYY-MM"),
  getDefaultBills: async (query) => {
    const result: ListType = await request.get("/bill/list", {
      params: query,
    });
    if (result) {
      set({ ...result });
    }
  },
  pullUpLoading: async (query) => {
    const result: ListType = await request.get("/bill/list", {
      params: query,
    });
    if (result.list.length > 0) {
      set({ list: get().list.concat(result.list) });
    }
  },
  setTime: (time: string) => set({ time: time }),
}));

export const useBills = () => useBillsStore((state) => state.list);
export const useTotalPage = () => useBillsStore((state) => state.totalPage);
export const useTotalExpense = () =>
  useBillsStore((state) => state.totalExpense);
export const useTotalIncome = () => useBillsStore((state) => state.totalIncome);

export const useGetDefaultBills = () =>
  useBillsStore((state) => state.getDefaultBills);

// 上拉加载
export const usePullUpLoading = () =>
  useBillsStore((state) => state.pullUpLoading);

export const useCurrentTime = () => useBillsStore((state) => state.time);
export const useSetTime = () => useBillsStore((state) => state.setTime);
