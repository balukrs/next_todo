import { Schema, model, models, Model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof userSchema>;

const User: Model<UserType> =
  models.User || model<UserType>("User", userSchema);

export default User;
