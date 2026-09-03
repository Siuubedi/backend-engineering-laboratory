import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(
        new AppError(
            404,
            "ROUTE_NOT_FOUND",
            `Route ${req.method} ${req.originalUrl} not found`
        )
    )
}