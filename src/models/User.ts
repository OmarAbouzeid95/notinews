import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  phoneNumber: string;
  categories: any[];
}

const userSchema = new mongoose.Schema<User>({
  name: {
    required: [true, "Please provide a name for this user."],
    type: String,
  },
  email: {
    required: [true, "Please provide an email for this user."],
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  categories: {
    type: [Object],
    default: ["home"],
  },
});

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
