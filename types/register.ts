export type basicType = {
  password: string;
  email: string;
  name: string;
};

export type FormTypes = {
  confirmPassword: string;
} & basicType;
