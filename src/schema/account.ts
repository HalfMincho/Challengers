import { Schema } from "./schema";

export const RegisterEmailSchema: Schema = {
  fields: {
    email: "string",
  },
  required: ["email"],
};
