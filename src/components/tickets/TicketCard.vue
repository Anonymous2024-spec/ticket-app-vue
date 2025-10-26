<template>
  <div class="card">
    <div class="card-header">
      <div class="title-section">
        <h3 class="title">{{ ticket.title }}</h3>
        <span class="priority">
          {{ getPriorityIcon(ticket.priority) }} {{ ticket.priority }}
        </span>
      </div>
      <span :class="['status', ticket.status]">
        {{ ticket.status.replace("_", " ") }}
      </span>
    </div>

    <div class="card-body">
      <p class="description">
        {{ ticket.description || "No description provided" }}
      </p>
    </div>

    <div class="card-footer">
      <div class="dates">
        <span class="date">Created: {{ formatDate(ticket.createdAt) }}</span>
        <span v-if="ticket.updatedAt !== ticket.createdAt" class="date">
          Updated: {{ formatDate(ticket.updatedAt) }}
        </span>
      </div>

      <div class="actions">
        <button
          class="edit-button"
          @click="$emit('edit', ticket)"
          title="Edit ticket"
        >
          ✏️
        </button>
        <button
          class="delete-button"
          @click="$emit('delete', ticket.id)"
          title="Delete ticket"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit", "delete"]);

const getPriorityIcon = (priority) => {
  switch (priority) {
    case "high":
      return "🔴";
    case "medium":
      return "🟡";
    case "low":
      return "🟢";
    default:
      return "⚪";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: fit-content;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.title-section {
  flex: 1;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.priority {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  color: white;
  white-space: nowrap;
}

.status.open {
  background: var(--status-open);
}

.status.in_progress {
  background: var(--status-in-progress);
}

.status.closed {
  background: var(--status-closed);
}

.card-body {
  flex: 1;
  margin-bottom: 1.5rem;
}

.description {
  color: #64748b;
  line-height: 1.5;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.dates {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-button,
.delete-button {
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: transparent;
}

.edit-button:hover {
  background: #dbeafe;
  transform: scale(1.1);
}

.delete-button:hover {
  background: #fee2e2;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .status {
    align-self: flex-start;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .actions {
    align-self: flex-end;
  }
}
</style>
