import winston from "winston";
import "winston-daily-rotate-file";

const console = new winston.transports.Console();
// 把日志按天分割存储在本地
const file = new winston.transports.DailyRotateFile({
  level: "info",
  dirname: "logs",
  filename: "info-%DATE%.log",
  datePattern: "YYYY-MM-DD",
});
// 把日志传输到远程服务器
const http = new winston.transports.Http({
  host: "localhost",
  port: 3000,
  path: "/log",
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [console],
  exceptionHandlers: [
    new winston.transports.File({
      dirname: "logs",
      filename: "error.log",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      dirname: "logs",
      filename: "rejection.log",
    }),
  ],
});

// 动态加载
logger.add(file);
logger.add(http);

logger.info("哈哈哈哈哈");
logger.error("嘻嘻嘻嘻嘻");
logger.debug("呵呵呵呵呵");

(async function () {
  throw new Error("好的哈世界等级");
})();
// throw new Error("嘿嘿嘿嘿嘿1");
