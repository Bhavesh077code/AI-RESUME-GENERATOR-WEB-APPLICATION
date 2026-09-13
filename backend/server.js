

/*
import cluster from "cluster";
import os from "os";
import "dotenv/config";
import app from "./app.js";
import dns from "dns";
import { connectDB } from "./config/db.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      //console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📦 Worker PID: ${process.pid}`);
    });
  } catch (error) {
   // console.error("❌ Database connection failed");
   // console.error(error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV === "production") {
  if (cluster.isPrimary) {
    //console.log(`Primary Process: ${process.pid}`);
    //console.log(`Starting ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      //console.log(
      //  `Worker ${worker.process.pid} died (code: ${code}). Restarting...`
     // );

      cluster.fork();
    });
  } else {
    startServer();
  }
} else {
  // Development mode
  startServer();
} 

*/