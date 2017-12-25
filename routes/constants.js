function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enurmerable: true
  });
}

define("SUCCESS", 200);
define("BAD_DATA", 400);
define("NOT_FOUND", 404);
define("ERROR", 500);