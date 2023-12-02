'use server';

import type { z } from 'zod';
import { FormDataSchema } from './schema';

type Inputs = z.infer<typeof FormDataSchema>;

export async function addEntry(data: Inputs) {
  const result = FormDataSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error.format() };
}
