import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { config } from "../../config/config.js";

type AuthTokenPayload = JwtPayload & {
  sub: string;
  email: string;
};

function unauthorized(res: Response) {
  return res.status(401).json({
    error: {
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    },
  });
}

function isAuthTokenPayload(
  payload: string | JwtPayload
): payload is AuthTokenPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof payload.sub === "string" &&
    typeof payload.email === "string"
  );
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return unauthorized(res);
  }

  const token = authorization.replace("Bearer ", "").trim();

  if (!token) {
    return unauthorized(res);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (!isAuthTokenPayload(decoded)) {
      return unauthorized(res);
    }

    const userId = Number(decoded.sub);

    if (Number.isNaN(userId)) {
      return unauthorized(res);
    }

    (req as any).user = {
      id: userId,
      email: decoded.email,
    };

    return next();
  } catch {
    return unauthorized(res);
  }
};