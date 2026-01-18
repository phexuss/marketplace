import { z } from 'zod';

export const PASSWORD_RULES = {
  min: 8,
  uppercase: { regex: /[A-Z]/, message: 'At least 1 uppercase letter' },
  lowercase: { regex: /[a-z]/, message: 'At least 1 lowercase letter' },
  number: { regex: /[0-9]/, message: 'At least 1 number' },
  special: {
    regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    message: 'At least 1 special character',
  },
};

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name too short').max(50).trim(),
  email: z.email('Invalid email').toLowerCase().trim(),
  password: z
    .string()
    .min(PASSWORD_RULES.min, `Min ${PASSWORD_RULES.min} characters`)
    .regex(PASSWORD_RULES.uppercase.regex, PASSWORD_RULES.uppercase.message)
    .regex(PASSWORD_RULES.lowercase.regex, PASSWORD_RULES.lowercase.message)
    .regex(PASSWORD_RULES.number.regex, PASSWORD_RULES.number.message)
    .regex(PASSWORD_RULES.special.regex, PASSWORD_RULES.special.message),
});

export const signInSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Enter a password'),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
