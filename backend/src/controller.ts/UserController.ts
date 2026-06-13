import type { Request, Response } from "express";
import { SignInSchema, SignUpSchema, UpdateUserSchema, VerifyEmailSchema } from "../validatons/auth.schema.js";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/email.service.js";
import { generateToken } from "../lib/jwt.js";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "../config/cookie.js";
import { GoogleAuthSchema } from "../validatons/google.schema.js";
import { googleClient } from "../lib/google.js";
import ENV_SECRETS from "../lib/ENV.js";
import { LoginTicket } from "google-auth-library";

const SALT_ROUNDS = 12;

export async function UserSignUp(req: Request, res: Response) {

    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid Input",
            error: parsedData.error.flatten()
        });
    };

    const { username, email, password } = parsedData.data;

    try {

        const checkuser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (checkuser) {

            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        };

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                emailVerified: false
            }
        });

        const token = crypto.randomUUID();

        await prisma.verificationToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),

            },
        });

        await sendVerificationEmail(user.email, token);

        return res.status(201).json({
            success: true,
            message: "Verification email sent. Please verify your email.",
            data: {
                name: user.username,
                email: user.email
            },

        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
};

export async function verifyEmail(req: Request, res: Response) {

    const parsedData = VerifyEmailSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedData.error.flatten(),
        });
    };

    const { token } = parsedData.data;

    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token
            }
        });

        if (!verificationToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification token",
            });
        };

        if (verificationToken.expiresAt < new Date()) {

            await prisma.verificationToken.delete({
                where: {
                    id: verificationToken.id,
                },
            });

            return res.status(410).json({
                success: false,
                message: "Verification token has expired",
            });
        };

        await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: verificationToken.userId,
                },
                data: {
                    emailVerified: true,
                },
            }),

            prisma.verificationToken.delete({
                where: {
                    id: verificationToken.id,
                },
            }),
        ]);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    };
};

export async function UserSignIn(req: Request, res: Response) {

    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            errors: parsedData.error.flatten(),
        });
    };

    const { email, password } = parsedData.data;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Google account trying password login
        if (user.provider === "GOOGLE") {
            return res.status(400).json({
                success: false,
                message:
                    "This account uses Google Sign-In",
            });
        }

        if (!user.emailVerified) {
            return res.status(403).json({
                success: false,
                message:
                    "Please verify your email before signing in",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password ?? "");

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        };

        const token = generateToken(user.id);

        res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Signed in successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    };

};

export function UserSignOut(req: Request, res: Response) {

    try {
        res.clearCookie(
            AUTH_COOKIE_NAME,
            AUTH_COOKIE_OPTIONS
        );

        return res.status(200).json({
            success: true,
            message: "Signed out successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    };

};

export async function GetUserDetail(req: Request, res: Response) {

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    };

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        };

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("GetUserDetails Error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    };

};

export async function updateUserDetails(req: Request, res: Response) {

    const parsedData = UpdateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            errors: parsedData.error.flatten(),
        });
    };

    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    };

    const { username, currentPassword, newPassword, } = parsedData.data;

    try {
        const user =
            await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Username uniqueness check
        if (username && username !== user.username) {
            const usernameExists = await prisma.user.findFirst({
                where: {
                    username,
                    NOT: {
                        id: userId,
                    },
                },
            });

            if (usernameExists) {
                return res.status(409).json({
                    success: false,
                    message:
                        "Username already taken",
                });
            }
        }

        let hashedPassword:
            | string
            | undefined;

        // Password update flow
        if (newPassword) {
            const passwordMatches = await bcrypt.compare(
                currentPassword!,
                user.password ?? ""
            );

            if (!passwordMatches) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Current password is incorrect",
                });
            }

            hashedPassword =
                await bcrypt.hash(
                    newPassword,
                    SALT_ROUNDS
                );
        }

        const updatedUser =
            await prisma.user.update({
                where: {
                    id: userId,
                },

                data: {
                    ...(username !== undefined && {
                        username,
                    }),

                    ...(hashedPassword && {
                        password: hashedPassword,
                    }),
                },

                select: {
                    id: true,
                    username: true,
                    email: true,
                    updatedAt: true,
                },
            });

        // Password changed -> force logout
        if (newPassword) {
            res.clearCookie(
                AUTH_COOKIE_NAME,
                AUTH_COOKIE_OPTIONS
            );

            return res.status(200).json({
                success: true,
                message:
                    "Password updated successfully. Please sign in again.",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Internal server error",
        });
    }
};

export async function GoogleAuth(req: Request, res: Response) {
  try {
    const parsedData = GoogleAuthSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
        error: parsedData.error.flatten(),
      });
    }

    const { credential } = parsedData.data;

 const ticket: LoginTicket = await googleClient.verifyIdToken({
  idToken: credential,
  audience: ENV_SECRETS.GOOGLE_KEY as string,
});

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(400).json({
        success: false,
        message: "Google email missing",
      });
    }

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          username: payload.name ?? null,
          googleId: payload.sub,
          avatar: payload.picture ?? null,
          provider: "GOOGLE",
          emailVerified: true,
        },
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: payload.sub,
          provider: "GOOGLE",
        },
      });
    }

    const token = generateToken(user.id);

    res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "Google sign in successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}