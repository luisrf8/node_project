import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import Ajv from "ajv";

const DTOP_PROPERY_NAMES = ["email", "password"];
// const LoginDTOSchema = {
//     type:'object',
//     properties : {
//         email: {type: 'string', format:'email'},
//         password: {type: 'string'}
//     },
//     required: ["email", "password"],
//     additionalProperties: false,
// }
const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El tipo de email debe ser un string",
        format: "Email debe ser un debe ser un correo valido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El tipo de password debe ser un String",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "El formato del objeto no es valido",
    },
  }
);
const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier");
addErrors(ajv);
const validate = ajv.compile(LoginDTOSchema);
const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);
  if (!isDTOValid)
    res.status(400).send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
  //   const loginDto = req.body;

  // if(typeof loginDto !== 'object') res.status(400).send("el body debe venir en formato Objeto")
  // const bodyPropertyNames = Object.keys(loginDto);

  // const checkProperties = bodyPropertyNames.length === DTOP_PROPERY_NAMES.length &&
  // bodyPropertyNames.every(bodyPropertyNames => DTOP_PROPERY_NAMES.includes(bodyPropertyNames));

  // if(!checkProperties) res.status(400)
  // .send("el body debe contener unicamente email y password")
};
export default validateLoginDTO;
