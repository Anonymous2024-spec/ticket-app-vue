<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-group">
      <label for="title" class="label">Title *</label>
      <input
        type="text"
        id="title"
        v-model="formData.title"
        :class="['input', { 'input-error': errors.title }]"
        placeholder="Enter ticket title"
        :disabled="loading"
      />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="description" class="label">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        :class="['textarea', { 'input-error': errors.description }]"
        placeholder="Describe the issue or request..."
        rows="4"
        :disabled="loading"
      ></textarea>
      <span v-if="errors.description" class="error">{{ errors.description }}</span>
      <div class="char-count">{{ formData.description.length }}/500 characters</div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="status" class="label">Status *</label>
        <select
          id="status"
          v-model="formData.status"
          :class="['select', { 'input-error': errors.status }]"
          :disabled="loading"
        >
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>

      <div class="form-group">
        <label for="priority" class="label">Priority</label>
        <select
          id="priority"
          v-model="formData.priority"
          class="select"
          :disabled="loading"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <button
        type="button"
        @click="onCancel"
        class="cancel-button"
        :disabled="loading"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="submit-button"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : props.ticket ? 'Update Ticket' : 'Create Ticket' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  ticket: Object,
  onSubmit: Function,
  onCancel: Function
})

const formData = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const errors = reactive({})
const loading = ref(false)

// Watch for ticket prop changes (when editing)
watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    formData.title = newTicket.title || ''
    formData.description = newTicket.description || ''
    formData.status = newTicket.status || 'open'
    formData.priority = newTicket.priority || 'medium'
  }
}, { immediate: true })

const validateForm = () => {
  const newErrors = {}

  if (!formData.title.trim()) {
    newErrors.title = 'Title is required'
  } else if (formData.title.length < 3) {
    newErrors.title = 'Title must be at least 3 characters'
  }

  if (!formData.status) {
    newErrors.status = 'Status is required'
  } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
    newErrors.status = 'Invalid status value'
  }

  if (formData.description && formData.description.length > 500) {
    newErrors.description = 'Description must be less than 500 characters'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await props.onSubmit(formData)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input,
.textarea,
.select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: var(--error-color) !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: right;
  margin-top: 4px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.error {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 4px;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-button {
  flex: 1;
  padding: 12px 24px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  background: transparent;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.submit-button {
  flex: 2;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: translateY(-1px);
}

.submit-button:disabled,
.cancel-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
</style>