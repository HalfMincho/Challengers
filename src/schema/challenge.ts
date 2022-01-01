import { Schema } from "./schema";

export const ChallengeSchema: Schema = {
  fields: {
    id: "number",
    submitter: "string",
    category: "string",
    name: "string",
    auth_way: "number",
    auth_day: "string",
    auth_count_in_day: "number",
    start_at: "string",
    end_at: "string",
    cost: "number",
    description: "string",
    title_image: "string",
    reg_date: "string",
    views: "number",
  },
  required: [
    "category",
    "name",
    "auth_way",
    "auth_day",
    "auth_count_in_day",
    "start_at",
    "end_at",
    "cost",
    "description",
  ],
};
