const pathChecker = require("./lib/rules/path-checker.js");
const publicApiImports = require("./lib/rules/public-api-imports.js");
const layerImports = require("./lib/rules/layer-imports.js");

module.exports = {
  rules: {
    "path-checker": pathChecker,
    "public-api-imports": publicApiImports,
    "layer-imports": layerImports
  }
};