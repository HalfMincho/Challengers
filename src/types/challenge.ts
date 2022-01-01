export type Challenge = {
  id: number;
  submitter: string;
  category: string;
  name: string;
  auth_way: number;
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
  category: string;
  name: string;
  auth_way: number;
  auth_day: string;
  auth_count_in_day: number;
  start_at: string;
  end_at: string;
  cost: number;
  description: string;
  reg_date: string;
  views: number;
};
