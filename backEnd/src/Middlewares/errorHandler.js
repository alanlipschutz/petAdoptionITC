import StatusCodes from "http-status-codes";

function handleError(err, req, res, next) {
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err ? err.message : "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((err) => err.message)
      .join(".");
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(
      err.keyValue
    )} already exists. Please, try with another one`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
}

export default handleError;
