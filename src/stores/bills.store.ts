import { create } from "zustand";
import { request } from "../utils/axios.utils";

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

export type BillsListType = BillsType[];

export type BillsStoreType = {
  bills: {
    list: BillsListType;
    totalExpense: number;
    totalIncome: number;
    totalPage: number;
  };
  getDefaultBills: (date: string) => void;
};

const initBills: BillsStoreType["bills"] = {
  list: [],
  totalExpense: 0,
  totalIncome: 0,
  totalPage: 1,
};

export const useBillsStore = create<BillsStoreType>((set) => ({
  bills: initBills,
  getDefaultBills: async (date) => {
    const result: BillsStoreType["bills"] = await request.get("/bill/list", {
      params: { date: date },
    });
    set({ bills: result });
  },
}));

export const useBills = () => useBillsStore((state) => state.bills);
export const useGetDefaultBills = () =>
  useBillsStore((state) => state.getDefaultBills);
