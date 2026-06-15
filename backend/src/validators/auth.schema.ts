import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(254, "Email is too long"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export const VerifyEmailSchema = z.object({
  token: z
    .string()
    .trim()
    .min(1, "Verification token is required"),
});

export const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const UpdateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    )
    .optional(),

  currentPassword: z
    .string()
    .min(8)
    .optional(),

  newPassword: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must include uppercase, lowercase, number and special character"
    )
    .optional(),
})
.refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }

    return true;
  },
  {
    message:
      "Current password is required to set a new password",
    path: ["currentPassword"],
  }
);