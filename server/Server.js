// const express = require("express");
// const cors = require("cors");
// const dbConfigConnection = require("./Config/Config");

// class Server {
//   constructor() {
//     this.app = express();
//     this.port = process.env.PORT;

//     this.apiPaths = {
//       users: "/api/users",
//       login: "/api/login",
//       transactions: "/api/transactions",
//       session: "/api/session",
//     };

//     this.middlewares();
//     this.routes();
//     this.dbConnection();
//   }

//   async dbConnection() {
//     await dbConfigConnection();
//   }

//   middlewares() {
//     this.app.use(express.json());
//     this.app.use(cors());
//   }

//   routes() {
//     this.app.use(this.apiPaths.users, require("./Routes/UserRoutes.js"));
//     this.app.use(this.apiPaths.login, require("./Routes/LoginRoutes.js"));
//     this.app.use(
//       this.apiPaths.transactions,
//       require("./Routes/TransactionRoutes.js")
//     );
//     this.app.use(this.apiPaths.session, require("./Routes/SessionRoutes.js"));
//   }

//   listen() {
//     this.app.listen(this.port, () => {
//       console.log(`Server running on port ${this.port}`);
//     });
//   }
// }

// module.exports = Server;

// create server from express without using class method
const express = require("express");
const cors = require("cors");
const dbConfigConnection = require("./Config/Config");
const app = express();
const port = process.env.PORT;

const apiPaths = {
  users: "/api/users",
  login: "/api/login",
  transactions: "/api/transactions",
  session: "/api/session",
};

const middlewares = () => {
  app.use(express.json());
  app.use(cors());
};

const routes = () => {
  app.use(apiPaths.users, require("./Routes/UserRoutes.js"));
  app.use(apiPaths.login, require("./Routes/LoginRoutes.js"));
  app.use(apiPaths.transactions, require("./Routes/TransactionRoutes.js"));
  app.use(apiPaths.session, require("./Routes/SessionRoutes.js"));
};

const dbConnection = async () => {
  await dbConfigConnection();
};

const listen = () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

module.exports = {
  middlewares,
  routes,
  dbConnection,
  listen,
};
