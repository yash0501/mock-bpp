"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("./config/config"));
var logger_1 = __importDefault(require("./logger"));
var app = express_1.default();
var PORT = process.env.PORT || config_1.default.port;
app.use(express_1.default.json());
app.use(cors_1.default());
app.get("/", (req, res) => {
  res.send("BPP Running");
});
app.use("/search", require("./routes/v1/search"));
app.use("/select", require("./routes/v1/select"));
app.use("/init", require("./routes/v1/init"));
app.use("/confirm", require("./routes/v1/confirm"));
app.use("/status", require("./routes/v1/status"));
app.use("/track", require("./routes/v1/track"));
app.use("/cancel", require("./routes/v1/cancel"));
app.use("/update", require("./routes/v1/update"));
app.use("/rating", require("./routes/v1/rating"));
app.use("/support", require("./routes/v1/support"));
app.use("/admin", require("./routes/v1/admin"));
app.listen(PORT, function () {
  logger_1.default.info(
    config_1.default.get("bpp_id") + " listening on port " + PORT
  );
});
