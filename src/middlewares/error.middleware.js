module.exports = (err, req, res, next) => {
  const httpStatus = err.status || 500;
  let message = '';

  switch (httpStatus) {
    case 500:
      message = 'Algo ha ocurrido en el servidor!';
      break;
    case 400:
      message = 'No se pudo procesar la solicitud!';
    case 422:
      message = err.message;
    default:
      //message = err.message;
      break;
  }
  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.message,
  });
};
