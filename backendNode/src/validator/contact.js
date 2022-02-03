const Joi = require("joi");

exports.createValidator = async (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    phone: Joi.string().regex(/^[789]\d{9}$/),
    tokenData: Joi.any(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.json({
      status: false,
      error: error.details.map((err) => {
        return {
          key: err.context.key,
          message: err.message,
        };
      }),
      data: value,
    });
  } else {
    next();
  }
};

exports.updateValidator = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    phone: Joi.string().regex(/^[789]\d{9}$/),
    id: Joi.number(),
    tokenData: Joi.any(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.json({
      status: false,
      error: error.details.map((err) => {
        return {
          key: err.context.key,
          message: err.message,
        };
      }),
      data: value,
    });
  } else {
    next();
  }
};
