import { existsSync, readFileSync } from "fs";
import { exit } from "process";
import { createServer } from "http";
import { validateHeaders, getGroupEndpoints, printBanner } from "./utils.js";
import minimist from "minimist";
import CustomRouter from "./CustomRouter.js";
import { load } from "js-yaml";

const router = new CustomRouter();
const argv = minimist(process.argv.slice(2));

const fileName = argv["config"] || "example.json";
const configType = argv["configType"] || "json";
if (!existsSync(fileName)) {
  console.log("GIVEN CONFIG FILE DOESN'T EXISTS");
  exit(0);
}
const rawData = readFileSync(fileName);
if (rawData.length === 0) {
  console.error("CONFIG FILE IS EMPTY");
  exit(0);
}

let data = undefined;

try {
  const type = configType?.toLocaleLowerCase();
  if (type === "json") {
    data = JSON.parse(rawData);
  } else if (type === "yaml") {
    data = load(rawData);
  } else {
    throw new Error("\nInvalid configType Provided \nMust be JSON or YAML\n");
  }
} catch (error) {
  console.error(error?.message);
  exit(0);
}

if (data === undefined) {
  console.error("Unable to Load Configuration from file");
  exit(0);
}

const globalheaders = data["globalHeaders"];
const groupEndpoints = getGroupEndpoints(data["groups"]);
const independentEndpoints = data["endpoint"];

let endpoints = [];

printBanner();

if (groupEndpoints !== undefined) {
  endpoints = endpoints.concat(groupEndpoints);
}
if (independentEndpoints !== undefined) {
  endpoints = endpoints.concat(independentEndpoints);
}
if (endpoints.length === 0) {
  console.error("NO ENDPOINTS DEFINED");
  exit(0);
}

endpoints.forEach((e) => {
  const endpoint = e["endpoint"];
  const localHeaders = e["localHeaders"];
  const finalHeaders =
    localHeaders === undefined
      ? globalheaders
      : { ...globalheaders, ...localHeaders };
  const response = e["response"];
  const response_code = e["status_code"] || 200;
  const method = e["method"] || "GET";
  validateHeaders(finalHeaders);
  const callback = (req, res) => {
    res.writeHead(response_code, finalHeaders);
    switch (typeof response) {
      case "number":
      case "string":
      case "boolean":
        res.end(response);
        break;
      case undefined:
        res.end();
        break;
      default:
        res.end(JSON.stringify(response));
        break;
    }
  };
  router.on(method.toUpperCase(), endpoint, callback);
});

const portno = argv["port"] || 8080;

createServer(function (req, res) {
  router.route(req, res, Date.now());
}).listen(portno);

console.log(`\nListening at port ${portno}\n`);
