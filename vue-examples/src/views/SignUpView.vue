<script setup lang="ts">
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
  type FormFields,
  type FormFieldErrors,
  type FormTouchedFields,
} from '@/schemas/signupForm';
import { ref, reactive, toRaw } from 'vue';

const formSubmitted = ref(false);
const formErrors = reactive<FormFieldErrors>({});
const touchedFields = reactive<FormTouchedFields>({});
const formState = reactive({
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
  newsletter: false,
});

const onSubmit = async () => {
  formSubmitted.value = true;
  const { error, data } = ConfirmSchema.safeParse(formState);
  if (error) {
    Object.entries(getErrors(error)).forEach(([key, value]) => {
      formErrors[key as FormFields] = value;
    });
    console.log(toRaw(formErrors));
  }
  console.log(toRaw(data));
};

const onBlur = (property: FormFields) => {
  const message = getFieldError(property, formState[property]);
  formErrors[property] = message;
  touchedFields[property] = true;
};

const isInvalid = (property: FormFields) => {
  if (formSubmitted.value || touchedFields[property]) {
    return !!formErrors[property];
  }
  return undefined; // Do not add aria-invalid attribute if not touched
};
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate>
    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      v-model="formState.email"
      @blur="onBlur('email')"
      :aria-invalid="isInvalid('email')"
      required
    />
    <small v-if="formErrors.email">{{ formErrors.email }}</small>

    <label for="firstName">First Name:</label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      v-model="formState.firstName"
      @blur="onBlur('firstName')"
      :aria-invalid="isInvalid('firstName')"
      required
    />
    <small v-if="formErrors.firstName">{{ formErrors.firstName }}</small>

    <label for="lastName">Last Name:</label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      v-model="formState.lastName"
      @blur="onBlur('lastName')"
      :aria-invalid="isInvalid('lastName')"
      required
    />
    <small v-if="formErrors.lastName">{{ formErrors.lastName }}</small>

    <label for="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      v-model="formState.username"
      @blur="onBlur('username')"
      :aria-invalid="isInvalid('username')"
      required
    />
    <small v-if="formErrors.username">{{ formErrors.username }}</small>

    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      v-model="formState.password"
      @blur="onBlur('password')"
      :aria-invalid="isInvalid('password')"
      required
    />
    <small v-if="formErrors.password">{{ formErrors.password }}</small>

    <label for="confirm-password">Confirm Password:</label>
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      v-model="formState.confirmPassword"
      @blur="onBlur('confirmPassword')"
      :aria-invalid="isInvalid('confirmPassword')"
      required
    />
    <small v-if="formErrors.confirmPassword">{{
      formErrors.confirmPassword
    }}</small>

    <label for="newsletter">
      <input
        type="checkbox"
        id="newsletter"
        name="newsletter"
        v-model="formState.newsletter"
      />
      Subscribe to newsletter
    </label>
    <br />
    <input type="submit" value="Sign Up" />
  </form>
</template>
