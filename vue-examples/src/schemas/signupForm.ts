import z, { ZodError } from 'zod';

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
  'Password must contain at least one uppercase letter, one lowercase letter, and one number.';

export const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError),
  confirmPassword: z.string().min(8).regex(passwordRegex, passwordError),
  newsletter: z.boolean().default(false),
});

export const ConfirmSchema = FormSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export type FormSchema = z.infer<typeof FormSchema>;
export type FormFields = keyof FormSchema;
export type FormFieldErrors = {
  [key in FormFields]?: string;
};
export type FormTouchedFields = {
  [key in FormFields]?: boolean;
};

export function getFieldError<T extends FormFields, K extends FormSchema[T]>(
  property: T,
  value: K
) {
  const { error } = FormSchema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(', ')
    : undefined;
}

export const getErrors = (error: ZodError) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join('') as keyof FormSchema;
    const message = all[path] ? all[path] + ', ' : '';
    all[path] = message + issue.message;
    return all;
  }, {} as FormFieldErrors);
