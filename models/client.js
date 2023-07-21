const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const clientSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

clientSchema.post("save", handleMongooseError);

const Client = model("client", clientSchema);

module.exports = Client;
