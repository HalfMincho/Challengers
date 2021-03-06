import { Schema } from "./schema";

export const ChallengeSchema: Schema = {
  fields: {
    id: "number",
    submitter: "string",
    category: "string",
    name: "string",
    auth_way: "string",
    auth_day: "string",
    auth_count_in_day: "number",
    auth_start_time: "string",
    auth_end_time: "string",
    can_auth_all_time: "boolean",
    start_at: "string",
    end_at: "string",
    cost: "number",
    description: "string",
    title_image: "string",
    reg_date: "string",
    views: "number",
    email: "string",
  },
  required: [
    "category",
    "name",
    "auth_way",
    "auth_day",
    "auth_count_in_day",
    "auth_start_time",
    "auth_end_time",
    "can_auth_all_time",
    "start_at",
    "end_at",
    "cost",
    "description",
  ],
};

export const CertificationPostSchema: Schema = {
  fields: { email: "string", description: "string" },
  required: ["description"],
};
