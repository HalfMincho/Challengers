import { Schema } from "./schema";

export const RegisterEmailSchema: Schema = {
  fields: {
    email: "string",
  },
  required: ["email"],
};

export const RegisterTokenVerificationSchema: Schema = {
  fields: {
    email: "string",
    token: "string",
  },
  required: ["email", "token"],
};

export const RegisterInfoSchema: Schema = {
  fields: {
    name: "string",
    email: "string",
    password: "string",
    token: "string",
  },
  required: ["name", "email", "password", "token"],
};
