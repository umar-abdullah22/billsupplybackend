import { createRequire } from "module";
const require = createRequire(import.meta.url);
const httpRequest = require('request') 
const axios = require('axios');

import {
  CreateUserHandler,
  LoginUser
} from '../controller/user.controller';
import {
  registerUserValidators,
  loginValidators
} from "../validators/validators";
import { ValidateRequestBody } from "../utils/validation";

  
// routes
export default function (app) {
  app.post("/api/signup", ...registerUserValidators, CreateUserHandler);
  app.post("/api/login", ...loginValidators, ValidateRequestBody, LoginUser);
}