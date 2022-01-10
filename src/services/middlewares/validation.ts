import { Schema } from "../../schema";

const Required = (obj: any, required: string[]) => {
  for (let key of required) {
    if (obj[key] === undefined) return false;
  }
  return true;
};

export const Validate = async (obj: any, model: Schema) => {
  if (model.required) {
    const status = Required(obj, model.required);
    if (!status) return false;
  }

  for (let key of Object.keys(obj)) {
    if (model.fields[key] === undefined) {
      return false;
    } else if (typeof obj[key] !== model.fields[key]) {
      return false;
    }
  }
  return true;
};
