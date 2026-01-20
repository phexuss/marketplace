import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { sendEmail } from '@/lib/email';
import prisma from '@/lib/prisma';
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link below to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email',
        text: `Click the link below to verify your email address: \n ${url}`,
      });
    },
  },
  plugins: [admin()],
});
