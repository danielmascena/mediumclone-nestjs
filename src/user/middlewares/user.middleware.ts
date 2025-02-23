import { JWT_SECRET } from "@app/config";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { verify} from "jsonwebtoken";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(req: ExpressRequest, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null;
            return next();
        }
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = verify(token, JWT_SECRET);
            console.log('decode', decode);
            const user = await this.userService.findById(decode.id)
            req.user = user;
            next();
        } catch (err) {
            req.user = null;
            next();
        }
    }
}