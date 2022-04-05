"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var dev_logger_1 = __importDefault(require("./dev-logger"));
var prod_logger_1 = __importDefault(require("./prod-logger"));
var logger =
  process.env.NODE_ENV === "development"
    ? dev_logger_1.default()
    : prod_logger_1.default();
exports.default = logger;
