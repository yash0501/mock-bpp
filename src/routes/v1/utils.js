"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUseCase =
  exports.getAllUseCases =
  exports.sendResults =
  exports.getAckResponse =
  exports.getMockResponse =
  exports.wait =
    void 0;
var promises_1 = __importDefault(require("fs/promises"));
var config_1 = __importDefault(require("./../../config/config"));
var axios_1 = __importDefault(require("axios"));
var logger_1 = __importDefault(require("../../logger"));
var delay = function (ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};
var wait = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var delay_ms;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          delay_ms = config_1.default.get("delay");
          if (!(delay_ms !== 0)) return [3 /*break*/, 2];
          logger_1.default.info(
            config_1.default.get("bpp_id") + ": Delaying for " + delay_ms
          );
          return [4 /*yield*/, delay(delay_ms)];
        case 1:
          _a.sent();
          _a.label = 2;
        case 2:
          return [2 /*return*/];
      }
    });
  });
};
exports.wait = wait;
var getMockResponse = function (req, use_case) {
  return __awaiter(void 0, void 0, void 0, function () {
    var domain, req_data, req_obj;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          domain = req.body.context.domain;
          return [
            4 /*yield*/,
            promises_1.default.readFile(
              "./mock_json_files/" + domain + "/" + use_case + ".json",
              "utf-8"
            ),
          ];
        case 1:
          req_data = _a.sent();
          //console.log(req_data);
          req_obj = JSON.parse(req_data);
          req_obj.context = req.body.context;
          req_obj.context.bpp_uri = config_1.default.get("bpp_uri");
          req_obj.context.bpp_id = config_1.default.get("bpp_id");
          req_obj.context.timestamp = new Date().toISOString();
          return [2 /*return*/, req_obj];
      }
    });
  });
};
exports.getMockResponse = getMockResponse;
var getAckResponse = function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var res_data, ack;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            promises_1.default.readFile("./mock_json_files/ack.json", "utf-8"),
          ];
        case 1:
          res_data = _a.sent();
          ack = JSON.parse(res_data);
          if (req.body.context) {
            ack.context = req.body.context;
          }
          ack.context.timestamp = new Date().toISOString();
          return [2 /*return*/, ack];
      }
    });
  });
};
exports.getAckResponse = getAckResponse;
var sendResults = function (req, uri, api) {
  return __awaiter(void 0, void 0, void 0, function () {
    var use_case, use_case_api, response, res, error_1;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 6, , 7]);
          return [4 /*yield*/, exports.wait()];
        case 1:
          _b.sent();
          use_case =
            ((_a = req.headers.use_case) === null || _a === void 0
              ? void 0
              : _a.toString()) || "";
          use_case_api = use_case.split("/")[0];
          if (!(use_case_api === "on_" + api)) return [3 /*break*/, 4];
          return [4 /*yield*/, exports.getMockResponse(req, use_case)];
        case 2:
          response = _b.sent();
          logger_1.default.info(
            config_1.default.get("bpp_id") +
              " : " +
              response.context.transaction_id +
              " Sending " +
              api +
              " results to BAP " +
              response.context.bap_id +
              ":" +
              response.context.bap_uri +
              " via " +
              uri
          );
          return [
            4 /*yield*/,
            axios_1.default.post(combineURLs(uri, "/on_" + api), response),
          ];
        case 3:
          res = _b.sent();
          return [3 /*break*/, 5];
        case 4:
          logger_1.default.info(
            config_1.default.get("bpp_id") +
              " : " +
              req.body.context.transaction_id +
              " Ignoring as use case is not valid for Mock BPP"
          );
          _b.label = 5;
        case 5:
          return [3 /*break*/, 7];
        case 6:
          error_1 = _b.sent();
          logger_1.default.error(error_1);
          return [3 /*break*/, 7];
        case 7:
          return [2 /*return*/];
      }
    });
  });
};
exports.sendResults = sendResults;
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
}
var getAllUseCases = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var dir, domains, use_cases, index, domain, dir_1, apis, _loop_1, index_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            promises_1.default.readdir("./mock_json_files", {
              withFileTypes: true,
            }),
          ];
        case 1:
          dir = _a.sent();
          domains = dir
            .filter(function (d) {
              return d.isDirectory() && d.name !== "generic_jsons";
            })
            .map(function (d) {
              return d.name;
            });
          use_cases = {};
          index = 0;
          _a.label = 2;
        case 2:
          if (!(index < domains.length)) return [3 /*break*/, 8];
          domain = domains[index];
          return [
            4 /*yield*/,
            promises_1.default.readdir("./mock_json_files/" + domain, {
              withFileTypes: true,
            }),
          ];
        case 3:
          dir_1 = _a.sent();
          apis = dir_1
            .filter(function (d) {
              return d.isDirectory();
            })
            .map(function (d) {
              return d.name;
            });
          use_cases[domain] = [];
          _loop_1 = function (index_1) {
            var api, dir_2, use_case;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  api = apis[index_1];
                  return [
                    4 /*yield*/,
                    promises_1.default.readdir(
                      "./mock_json_files/" + domain + "/" + api
                    ),
                  ];
                case 1:
                  dir_2 = _b.sent();
                  use_case = dir_2
                    .filter(function (s) {
                      return s.endsWith(".json");
                    })
                    .map(function (s) {
                      return api + "/" + s.slice(0, -5);
                    });
                  use_cases[domain] = use_cases[domain].concat(use_case);
                  return [2 /*return*/];
              }
            });
          };
          index_1 = 0;
          _a.label = 4;
        case 4:
          if (!(index_1 < apis.length)) return [3 /*break*/, 7];
          return [5 /*yield**/, _loop_1(index_1)];
        case 5:
          _a.sent();
          _a.label = 6;
        case 6:
          index_1++;
          return [3 /*break*/, 4];
        case 7:
          index++;
          return [3 /*break*/, 2];
        case 8:
          return [2 /*return*/, use_cases];
      }
    });
  });
};
exports.getAllUseCases = getAllUseCases;
var isValidUseCase = function (domain, use_case) {
  return __awaiter(void 0, void 0, void 0, function () {
    var all_use_cases;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, exports.getAllUseCases()];
        case 1:
          all_use_cases = _a.sent();
          if (Object.keys(all_use_cases).includes(domain)) {
            return [2 /*return*/, all_use_cases[domain].includes(use_case)];
          } else {
            return [2 /*return*/, false];
          }
          return [2 /*return*/];
      }
    });
  });
};
exports.isValidUseCase = isValidUseCase;
