'use client';

import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { addEntry } from 'app/lib/actions';
import { FormDataSchema } from 'app/lib/schema';

type Inputs = z.infer<typeof FormDataSchema>;

export default function ExampleForm() {
  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (formData: Inputs) => {
    const result = await addEntry(formData);

    if (!result) {
      console.log('Something went wrong');
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    reset();
    setData(result.data);
  };

  return (
    <section className="flex w-full flex-col gap-6 lg:flex-row">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 text-black sm:w-1/2"
      >
        <input
          placeholder="name"
          className="h-10 rounded-lg p-4"
          {...register('name')}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}

        <input
          placeholder="message"
          className="h-10 rounded-lg p-4"
          {...register('message')}
        />
        {errors.message?.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}

        <button type="button" className="rounded-lg bg-black py-2 text-white">
          Submit
        </button>
      </form>

      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
