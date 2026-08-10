import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { createContactSchema } from "../schemas/contactSchema";

export const validateCreateContact = (req: Request, res: Response, next: NextFunction) => {
    const result = createContactSchema.safeParse(req.body);

    if (!result.success) {
        next(
            new AppError(400, "VALIDATION_ERROR", "The request body is invalid", result.error.flatten().fieldErrors)
        );
        return;
    }

    req.body = result.data;
    next();
}