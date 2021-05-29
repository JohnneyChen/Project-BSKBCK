const mongoose = require("mongoose");

const app = require("./app");
const keys = require("./configs/keys");

const start = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongodb");
  } catch (e) {
    console.log(e);
  }

  if (["production"].includes(process.env.NODE_ENV)) {
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("client", "build", "index.html"));
    });
  }

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
};

start();
