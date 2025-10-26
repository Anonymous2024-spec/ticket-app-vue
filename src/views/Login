<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your TicketFlow account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="errors.general" class="error-message">
          {{ errors.general }}
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :class="{ 'input-error': errors.email }"
            placeholder="Enter your email"
          />
          <span v-if="errors.email" class="field-error">{{
            errors.email
          }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            :class="{ 'input-error': errors.password }"
            placeholder="Enter your password"
          />
          <span v-if="errors.password" class="field-error">{{
            errors.password
          }}</span>
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? "Signing In..." : "Sign In" }}
        </button>
      </form>

      <div class="auth-footer">
        <p>Demo Credentials:</p>
        <p>Email: demo@example.com | Password: password123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({});
const loading = ref(false);

const validateForm = () => {
  const newErrors = {};

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!form.password) {
    newErrors.password = "Password is required";
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  const result = login(form.email, form.password);

  if (result.success) {
    router.push("/dashboard");
  } else {
    errors.general = result.error;
  }
  loading.value = false;
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #64748b;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.input-error {
  border-color: var(--error-color) !important;
}

.field-error {
  color: var(--error-color);
  font-size: 14px;
  margin-top: 4px;
}

.error-message {
  background: #fee2e2;
  color: var(--error-color);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.submit-button {
  background: var(--primary-color);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1rem;
}

.submit-button:hover:not(:disabled) {
  background: var(--secondary-color);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

.auth-footer p:first-child {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>
