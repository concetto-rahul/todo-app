exports.successResponse = (data) => {
  return {
    status: true,
    statusCode: 200,
    error: [],
    data,
  };
};

exports.failedResponse = (error, statusCode = 401, data = []) => {
  return {
    status: false,
    statusCode,
    error,
    data,
  };
};
