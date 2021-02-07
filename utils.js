const { validateHeaderName, validateHeaderValue } = require("http");

function validateHeaders(headers) {
  headerEntries = Object.entries(headers);
  for (i of headerEntries) {
    try {
      validateHeaderName(i[0]);
      validateHeaderValue(i[0], i[1]);
    } catch (error) {
      console.log(error);
    }
  }
}

function getGroupEndpoints(jsonData) {
  const endpoints = [];
  jsonData.map((e) => {
    var name = e["name"].startsWith("/") ? e["name"] : `/${e["name"]}`;
    if (name.endsWith("/")) {
      name = name.substring(0, name.length - 1);
    }

    e["endpoints"].forEach((obj) => {
      var endpoint = obj["endpoint"];
      if (!endpoint.startsWith("/")) {
        endpoint = `/${endpoint}`;
      }
      obj["endpoint"] = name + endpoint;
      endpoints.push(obj);
    });
  });
  return endpoints;
}

function printBanner() {
  console.log(
    "\033[34m##     ##  #######   ######  ##    ## ######## ########  "
  );
  console.log("###   ### ##     ## ##    ## ##   ##  ##       ##     ## ");
  console.log("#### #### ##     ## ##       ##  ##   ##       ##     ## ");
  console.log("## ### ## ##     ## ##       #####    ######   ########  ");
  console.log("##     ## ##     ## ##       ##  ##   ##       ##   ##   ");
  console.log("##     ## ##     ## ##    ## ##   ##  ##       ##    ##  ");
  console.log("##     ##  #######   ######  ##    ## ######## ##     ## ");

  console.log("\n\x1b[31m By Tejasvp25\x1b[0m");
}

module.exports = {
  validateHeaders,
  getGroupEndpoints,
  printBanner,
};
