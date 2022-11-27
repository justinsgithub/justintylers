import mongoose from "mongoose";
/* import bcrypt from "mongoose-bcrypt"; */

const schema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
  },
  { timestamps: true, strict: true, strictQuery: true }
);
/* schema.plugin(bcrypt); */
export default mongoose.model("Writing", schema, "writing");

