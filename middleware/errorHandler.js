const { contants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.status ? res.status : 500;
  switch (statusCode) {
    case contants.VALIDATION_ERROR:
      res.json({
        title: "Validation falid",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    //contants.NOT_FOUND
    case 404:
      res.json({
        title: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case contants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case contants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case contants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("no Error all good");
  }
};

module.exports = errorHandler;
