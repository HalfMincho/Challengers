export type RegisterEmail = {
  email: string;
};

export type RegisterTokenVerificationRequest = {
  email: string;
  token: string;
};

export type RegisterInfo = {
  name: "string";
  email: "string";
  password: "string";
  token: "string";
};
