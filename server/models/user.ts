import mongoose from "mongoose";
/* import bcrypt from "mongoose-bcrypt"; */

const schema = new mongoose.Schema(
  {
    /* email: { type: String, unique: true }, */
    temp_password: { type: String },
    session_id: { type: String, unique: true },
    /* password: { type: String, optional: true }, */
    /* password: { type: String, bcrypt: true }, */
    username: { type: String, unique: true },
  },
  { timestamps: true, strict: true, strictQuery: true }
);
/* schema.plugin(bcrypt); */
export default mongoose.model("User", schema);
