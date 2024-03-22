import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Since in our DB the passwords are not stored in plaintext, so here we are checking the password and
// comparing it with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the plain text password before saving to the Db. The method pre() is used when we want to do something
// before saving to the DB
userSchema.pre("save", async function (next) {
  // If password is not modified, move to the next middleware
  // This can happen if we are updating the user profile and not changing the password
  if (!this.isModified("password")) {
    next();
  }
  // If password is modified, hash it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
