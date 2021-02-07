const http = require("http");
const url = require("url");

var CustomRouter = function () {
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
};

CustomRouter.prototype.on = function (method, url, callback) {
  this.listeners[method].push({ url, callback });
};

CustomRouter.prototype.route = function (req, res) {
  const pathname = url.parse(req.url, true).pathname;
  const callback = this.getListener(pathname, req.method.toUpperCase());

  if (callback === undefined) {
    this.errorListener(req, res);
  } else {
    callback(req, res);
  }
};

CustomRouter.prototype.getListener = function (url, method) {
  for (let i = 0; i < this.listeners[method].length; i++) {
    if (this.listeners[method][i].url === url) {
      return this.listeners[method][i].callback;
    }
  }
};

module.exports = { CustomRouter };
