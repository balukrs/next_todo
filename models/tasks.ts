import { Schema, model, models, Model, InferSchemaType } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    archive: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

type ToDoType = InferSchemaType<typeof todoSchema>;

const Todo: Model<ToDoType> =
  models.ToDo || model<ToDoType>("ToDo", todoSchema);

export default Todo;
