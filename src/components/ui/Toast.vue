<template>
  <div :class="['toast', type]">
    <div class="content">
      <span class="message">{{ message }}</span>
      <button class="close-button" @click="$emit('close')">×</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
    validator: (value) => ["success", "error", "warning"].includes(value),
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  color: white;
}

.message {
  flex: 1;
  font-weight: 500;
  line-height: 1.4;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Toast Types */
.success {
  background: var(--success-color);
}

.error {
  background: var(--error-color);
}

.warning {
  background: var(--warning-color);
}

/* Responsive */
@media (max-width: 768px) {
  .toast {
    left: 20px;
    right: 20px;
    min-width: auto;
    max-width: none;
  }
}
</style>
