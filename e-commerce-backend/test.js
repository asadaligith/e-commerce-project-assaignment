const dns = require("dns");

dns.promises
  .resolveSrv("_mongodb._tcp.cluster0.h65ipdn.mongodb.net")
  .then(console.log)
  .catch(console.error);