"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var timestamp = winston_1.format.timestamp,
  combine = winston_1.format.combine,
  errors = winston_1.format.errors,
  json = winston_1.format.json;
function buildProdLogger() {
  return winston_1.createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [new winston_1.transports.Console()],
  });
}
exports.default = buildProdLogger;
