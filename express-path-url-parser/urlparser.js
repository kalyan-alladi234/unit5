const url = require("url");

function parseURL(fullURL) {
  const parsed = new url.URL(fullURL);

  let queryObj = {};
  parsed.searchParams.forEach((value, key) => {
    queryObj[key] = value;
  });

  return {
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    query: queryObj,
  };
}

module.exports = parseURL;
