import { useState } from 'react';
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
  type FormFields,
  type FormFieldErrors,
  type FormTouchedFields,
  FormSchema,
} from '../signupForm';

function SignUp() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormFieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<FormTouchedFields>({});
  const [formState, setFormState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    }
    console.log(data);
  };

  const onBlur = (property: FormFields) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property: FormFields) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined; // Do not add aria-invalid attribute if not touched
  };

  const setField =
    <T extends FormFields>(
      property: T,
      valueSelector?: (e: React.ChangeEvent<HTMLInputElement>) => FormSchema[T]
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [property]: valueSelector ? valueSelector(e) : e.target.value,
      }));
    };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formState.email}
        onChange={setField('email')}
        onBlur={onBlur('email')}
        aria-invalid={isInvalid('email')}
        required
      />
      {formErrors.email && <small>{formErrors.email}</small>}

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formState.firstName}
        onChange={setField('firstName')}
        onBlur={onBlur('firstName')}
        aria-invalid={isInvalid('firstName')}
        required
      />
      {formErrors.firstName && <small>{formErrors.firstName}</small>}

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formState.lastName}
        onChange={setField('lastName')}
        onBlur={onBlur('lastName')}
        aria-invalid={isInvalid('lastName')}
        required
      />
      {formErrors.lastName && <small>{formErrors.lastName}</small>}

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formState.username}
        onChange={setField('username')}
        onBlur={onBlur('username')}
        aria-invalid={isInvalid('username')}
        required
      />
      {formErrors.username && <small>{formErrors.username}</small>}

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formState.password}
        onChange={setField('password')}
        onBlur={onBlur('password')}
        aria-invalid={isInvalid('password')}
        required
      />
      {formErrors.password && <small>{formErrors.password}</small>}

      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={setField('confirmPassword')}
        onBlur={() => onBlur('confirmPassword')}
        aria-invalid={isInvalid('confirmPassword')}
        required
      />
      {formErrors.confirmPassword && (
        <small>{formErrors.confirmPassword}</small>
      )}

      <label htmlFor="newsletter">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          onChange={setField('newsletter', (e) => e.target.checked)}
          checked={formState.newsletter}
        />
        Subscribe to newsletter
      </label>
      <br />
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default SignUp;
