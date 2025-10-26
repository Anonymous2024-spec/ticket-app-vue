<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Main app component - uses Composition API
</script>

<style>
/* Global styles will go here */
:root {
  --max-width: 1440px;
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --gray-color: #6b7280;

  /* Status Colors */
  --status-open: #10b981;
  --status-in-progress: #f59e0b;
  --status-closed: #6b7280;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--secondary-color);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}
</style>
