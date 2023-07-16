const url = require("url");

const CustomRouter = function () {
  this.listeners = {
    ACL: [],
    BIND: [],
    CHECKOUT: [],
    CONNECT: [],
    COPY: [],
    DELETE: [],
    GET: [],
    HEAD: [],
    LINK: [],
    LOCK: [],
    MERGE: [],
    MKACTIVITY: [],
    MKCALENDAR: [],
    MKCOL: [],
    MOVE: [],
    NOTIFY: [],
    OPTIONS: [],
    PATCH: [],
    POST: [],
    PRI: [],
    PROPFIND: [],
    PROPPATCH: [],
    PURGE: [],
    PUT: [],
    REBIND: [],
    REPORT: [],
    SEARCH: [],
    SOURCE: [],
    SUBSCRIBE: [],
    TRACE: [],
    UNBIND: [],
    UNLINK: [],
    UNLOCK: [],
    UNSUBSCRIBE: [],
  };

  this.errorListener = function (req, res) {
    res.writeHead(404);
    res.end();
  };

  this.mapping = new Map();
};

CustomRouter.prototype.on = function (method, url, callback) {
  this.listeners[method].push({ url, callback });
  this.mapping.set(url, this.listeners[method].length - 1);
};

CustomRouter.prototype.route = function (req, res, time = Date.now()) {
  const pathname = url.parse(req.url, true).pathname;
  const callback = this.getListener(pathname, req.method.toUpperCase());

  if (callback === undefined) {
    this.errorListener(req, res);
  } else {
    callback(req, res);
  }

  console.log(`${req.url}: Request took ${Date.now() - time}ms`);
};

CustomRouter.prototype.getListener = function (url, method) {
  if (this.mapping.has(url)) {
    const index = this.mapping.get(url);
    if (this.listeners[method][index].url === url) {
      return this.listeners[method][index].callback;
    }
  }
  return undefined;
};

module.exports = { CustomRouter };
