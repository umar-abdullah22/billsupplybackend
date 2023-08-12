import { validationResult } from 'express-validator';
export { default as userAuthMiddleware } from "./auth";
export { uploadFiles } from "./upload";

export const ValidateRequestBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({
            code: 400,
            error: errors.array()
        });
    }
    else {
        next();
    }
};

