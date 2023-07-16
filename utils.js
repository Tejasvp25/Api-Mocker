import { validateHeaderName, validateHeaderValue } from "http";

export const validateHeaders = (headers) => {
  const headerEntries = Object.entries(headers);
  for (const i of headerEntries) {
    try {
      validateHeaderName(i[0]);
      validateHeaderValue(i[0], i[1]);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getGroupEndpoints = (jsonData) => {
  const endpoints = [];
  jsonData.map((e) => {
    let name = e["name"].startsWith("/") ? e["name"] : `/${e["name"]}`;
    if (name.endsWith("/")) {
      name = name.substring(0, name.length - 1);
    }

    e["endpoints"].forEach((obj) => {
      let endpoint = obj["endpoint"];
      if (!endpoint.startsWith("/")) {
        endpoint = `/${endpoint}`;
      }
      obj["endpoint"] = name + endpoint;
      endpoints.push(obj);
    });
  });
  return endpoints;
};

export const printBanner = () => {
  console.log(
    "\x1b[34m##     ##  #######   ######  ##    ## ######## ########  "
  );
  console.log("###   ### ##     ## ##    ## ##   ##  ##       ##     ## ");
  console.log("#### #### ##     ## ##       ##  ##   ##       ##     ## ");
  console.log("## ### ## ##     ## ##       #####    ######   ########  ");
  console.log("##     ## ##     ## ##       ##  ##   ##       ##   ##   ");
  console.log("##     ## ##     ## ##    ## ##   ##  ##       ##    ##  ");
  console.log("##     ##  #######   ######  ##    ## ######## ##     ## ");

  console.log("\n\x1b[31m By Tejasvp25\x1b[0m\n");
};
