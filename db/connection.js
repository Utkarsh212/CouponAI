const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

main()
  .then((res) => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_URL);
}
