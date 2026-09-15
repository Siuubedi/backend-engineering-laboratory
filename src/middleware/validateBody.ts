import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../errors/AppError";

export const validateBody =
    (schema: z.ZodType) =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                return next(
                    new AppError(
                        400,
                        "VALIDATION_ERROR",
                        "The request body is invalid",
                        result.error.flatten().fieldErrors
                    )
                );
            }

            req.body = result.data;
            next();
        };