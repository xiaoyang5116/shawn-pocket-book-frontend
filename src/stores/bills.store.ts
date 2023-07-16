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

const useBillsStore = create((set) => ({
  bills: [],
  getBills: async (query: { date: string; tagId: number }) => {
    const result = await request.get("/bill/list", {
      params: query,
    });
    set({ bills: result });
  },
}));
