const Joi = require("joi");

const homeValidation = (req, res, next) => {
  const phoneregex = /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;
  const schema = Joi.object({
    address: Joi.string().required(),
    description: Joi.string().max(400).required(),
    status: Joi.string().valid("yangi", "remont", "eski").required(),
    typeofHome: Joi.string().valid("dom", "hovli").required(),
    price: Joi.number().required(),
    countofRoom: Joi.number().required(),
    kv: Joi.number().required(),
    currency: Joi.string().valid("usd","evro","uzs").required(),
    phone: Joi.string().regex(phoneregex).required(),
    city: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = homeValidation;
