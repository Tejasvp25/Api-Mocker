"use strict";
const fs = require("fs");
const { exit } = require("process");
const { CustomRouter } = require("./CustomRouter");
const router = new CustomRouter();
const http = require("http");
const { validateHeaders, getGroupEndpoints, printBanner } = require("./utils");
const argv = require("minimist")(process.argv.slice(2));

const fileName = argv["config"] || "example.json";
if (!fs.existsSync(fileName)) {
  console.log("GIVEN CONFIG FILE DOESN'T EXISTS");
  exit(0);
}
const data = fs.readFileSync(fileName);
if (data.length === 0) {
  console.error("CONFIG FILE IS EMPTY");
  exit(0);
}
const jsonData = JSON.parse(data);
const globalheaders = jsonData["globalHeaders"];
const groupEndpoints = getGroupEndpoints(jsonData["groups"]);
const independentEndpoints = jsonData["endpoint"];

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

http
  .createServer(function (req, res) {
    router.route(req, res, Date.now());
  })
  .listen(portno);

console.log(`Listening at port ${portno}\n`);
