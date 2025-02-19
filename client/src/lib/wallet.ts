import { z } from "zod";

export const sendFormSchema = z.object({
  recipientUsername: z.string().min(1),
  amount: z.number().positive(),
});

export type SendFormData = z.infer<typeof sendFormSchema>;

export const loginFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
