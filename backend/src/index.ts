// const http2 = require("node:http2");
// import http2 from "node:http2";
// import cluster from "node:cluster";
// import * as _ from "node:os";
import process from "node:process";
// import fs from "node:fs";

import http from "http";
import app from "./app";
import { sequelize } from "./models";
import logger from "./utils/logger";

// const numCPUs = _.cpus();

// if (cluster.isPrimary) {
//   logger.info(`Primary ${process.pid} is running`);

//   // Fork workers.
//   numCPUs.forEach(() => cluster.fork());

//   cluster.on("exit", (worker, code, signal) => {
//     cluster.fork();
//     logger.info(`worker ${worker.process.pid} died`);
//     if (signal) {
//       logger.info(`worker was killed by signal: ${signal}`);
//     } else if (code !== 0) {
//       logger.info(`worker exited with error code: ${code}`);
//     } else {
//       logger.info("worker success!");
//     }
//   });
// } else {
//   // Workers can share any TCP connection
//   const port = process.env.PORT || 8081;

//   (async () => {
//     try {
//       const server = http.createServer(app);
//       await sequelize.sync({ alter: true });

//       server.listen(port, () => {
//         logger.info(`Listening: http://localhost:${port}`);
//       });
//     } catch (error) {
//       console.log(error);
//       logger.error("Unable to connect to the database:", error);
//     }
//   })();

//   logger.info(`Worker ${process.pid} started`);

//   cluster.on("listening", (worker) => {
//     logger.info(`Worker ${worker.process.pid} killed`);
//   });
// }

const port = process.env.PORT || 8081;

(async () => {
  try {
    const server = http.createServer(app);
    await sequelize.sync({ alter: true });
    server.listen(port, () => {
      logger.info(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    logger.error("Unable to connect to the database:", error);
  }
})();
