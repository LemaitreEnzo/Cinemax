const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Films" }], //Pour crée une clé étrangère
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Films" }],
});

// Permet de hasher le mot de passe
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
