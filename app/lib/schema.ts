import { z } from 'zod';

export const FormDataSchema = z.object({
  name: z.string().min(6, { message: 'Name is required.' }),
  message: z
    .string()
    .min(6, { message: 'Message must be at least 6 characters.' }),
});
