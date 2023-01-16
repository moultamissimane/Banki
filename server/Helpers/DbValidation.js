const mongoose = require("mongoose");

const dbConfigConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Database is not connected");
  }
};

module.exports = dbConfigConnection;
