import { category } from "./const";

export type ChallengeFromRequest = {
  id: number;
  submitter: string;
  category: Category;
  name: string;
  auth_way: string;
  auth_day: string;
  auth_count_in_day: number;
  auth_start_time: string;
  auth_end_time: string;
  can_auth_all_time: boolean;
  start_at: string;
  end_at: string;
  cost: number;
  description: string;
  reg_date: string;
  views: number;
  email: string;
};

export type ChallengeFromDB = {
  id: number;
  submitter: string;
  category: string;
  name: string;
  auth_way: string;
  auth_day: string;
  auth_count_in_day: number;
  auth_start_time: string;
  auth_end_time: string;
  can_auth_all_time: boolean;
  start_at: string;
  end_at: string;
  cost: number;
  description: string;
  reg_date: string;
  views: number;
};

export type Category = typeof category[number];

export type CategoryFromDB = { name: Category };
