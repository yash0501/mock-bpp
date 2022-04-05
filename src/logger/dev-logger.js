"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var timestamp = winston_1.format.timestamp,
  combine = winston_1.format.combine,
  printf = winston_1.format.printf,
  errors = winston_1.format.errors;
function buildDevLogger() {
  var logFormat = printf(function (_a) {
    var level = _a.level,
      message = _a.message,
      timestamp = _a.timestamp,
      stack = _a.stack;
    return timestamp + " " + level + ": " + (stack || message);
  });
  return winston_1.createLogger({
    format: combine(
      winston_1.format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new winston_1.transports.Console()],
  });
}
exports.default = buildDevLogger;
