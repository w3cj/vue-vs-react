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

  const onBlur = (property: FormFields) => {
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

  const setField = <T extends FormFields, K extends FormSchema[T]>(
    property: T,
    value: K
  ) => {
    setFormState((prev) => ({ ...prev, [property]: value }));
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formState.email}
        onChange={(e) => setField('email', e.target.value)}
        onBlur={() => onBlur('email')}
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
        onChange={(e) => setField('firstName', e.target.value)}
        onBlur={() => onBlur('firstName')}
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
        onChange={(e) => setField('lastName', e.target.value)}
        onBlur={() => onBlur('lastName')}
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
        onChange={(e) => setField('username', e.target.value)}
        onBlur={() => onBlur('username')}
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
        onChange={(e) => setField('password', e.target.value)}
        onBlur={() => onBlur('password')}
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
        onChange={(e) => setField('confirmPassword', e.target.value)}
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
          onChange={(e) => {
            setField('newsletter', e.target.checked);
          }}
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
