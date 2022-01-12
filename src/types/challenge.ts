import { category } from "./const";

export type Challenge = {
  id: number;
  submitter: string;
  category: Category;
  name: string;
  auth_way: string;
  auth_day: string;
  auth_count_in_day: number;
  start_at: Date;
  end_at: Date;
  cost: number;
  description: string;
  reg_date: Date;
  views: number;
};

export type ChallengeFromRequest = {
  id: number;
  submitter: string;
  category: Category;
  name: string;
  auth_way: string;
  auth_day: string;
  auth_count_in_day: number;
  start_at: string;
  end_at: string;
  cost: number;
  description: string;
  reg_date: string;
  views: number;
};

export type ChallengeFromDB = {
  id: number;
  submitter: Buffer;
  category: Buffer;
  name: string;
  auth_way: string;
  auth_day: string;
  auth_count_in_day: number;
  start_at: string;
  end_at: string;
  cost: number;
  description: string;
  reg_date: string;
  views: number;
};

export type Category = typeof category[number];

export type CategoryFromDB = { name: Category };
