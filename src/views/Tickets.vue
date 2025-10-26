<template>
  <div class="tickets">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div>
            <h1 class="title">Ticket Management</h1>
            <p class="subtitle">Create, view, and manage support tickets</p>
          </div>
          <div class="header-actions">
            <button
              class="btn btn-primary"
              @click="showForm = true"
              :disabled="showForm || editingTicket"
            >
              + Create Ticket
            </button>
            <button class="btn btn-secondary" @click="navigateToDashboard">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="content">
        <!-- Sidebar - Form -->
        <div v-if="showForm || editingTicket" class="sidebar">
          <div class="form-section">
            <h2 class="form-title">
              {{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}
            </h2>
            <TicketForm
              :ticket="editingTicket"
              :onSubmit="
                editingTicket ? handleUpdateTicket : handleCreateTicket
              "
              :onCancel="handleCancelForm"
            />
          </div>
        </div>

        <!-- Main Area - Ticket List -->
        <div class="main">
          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab.key"
              :class="['filter-tab', { active: filter === tab.key }]"
              @click="filter = tab.key"
            >
              <span class="tab-label">{{ tab.label }}</span>
              <span class="tab-count">({{ tab.count }})</span>
            </button>
          </div>

          <!-- Tickets Grid -->
          <div v-if="filteredTickets.length === 0" class="empty-state">
            <div class="empty-icon">🎫</div>
            <h3>No tickets found</h3>
            <p>
              {{
                filter === "all"
                  ? "You haven't created any tickets yet."
                  : `No ${filter.replace("_", " ")} tickets found.`
              }}
            </p>
            <button
              v-if="filter === 'all'"
              class="btn btn-primary"
              @click="showForm = true"
            >
              Create Your First Ticket
            </button>
          </div>

          <div v-else class="tickets-grid">
            <TicketCard
              v-for="ticket in filteredTickets"
              :key="ticket.id"
              :ticket="ticket"
              @edit="handleEditTicket"
              @delete="handleDeleteTicket"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Toast
      v-if="toast.message"
      :message="toast.message"
      :type="toast.type"
      @close="toast.message = ''"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useTickets } from "../composables/useTickets";
import TicketForm from "../components/tickets/TicketForm.vue";
import TicketCard from "../components/tickets/TicketCard.vue";
import Toast from "../components/ui/Toast.vue";

const router = useRouter();
const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();

const showForm = ref(false);
const editingTicket = ref(null);
const filter = ref("all");
const toast = reactive({ message: "", type: "success" });

// Filter tabs with counts
const filterTabs = computed(() => {
  const ticketCounts = {
    all: tickets.value.length,
    open: tickets.value.filter((t) => t.status === "open").length,
    in_progress: tickets.value.filter((t) => t.status === "in_progress").length,
    closed: tickets.value.filter((t) => t.status === "closed").length,
  };

  return [
    { key: "all", label: "All Tickets", count: ticketCounts.all },
    { key: "open", label: "Open", count: ticketCounts.open },
    {
      key: "in_progress",
      label: "In Progress",
      count: ticketCounts.in_progress,
    },
    { key: "closed", label: "Resolved", count: ticketCounts.closed },
  ];
});

// Filtered tickets based on current filter
const filteredTickets = computed(() => {
  if (filter.value === "all") return tickets.value;
  return tickets.value.filter((ticket) => ticket.status === filter.value);
});

const showToast = (message, type = "success") => {
  toast.message = message;
  toast.type = type;
};

const handleCreateTicket = async (ticketData) => {
  try {
    createTicket(ticketData);
    showForm.value = false;
    showToast("Ticket created successfully!");
  } catch (error) {
    showToast("Failed to create ticket", "error");
  }
};

const handleUpdateTicket = async (ticketData) => {
  try {
    updateTicket(editingTicket.value.id, ticketData);
    editingTicket.value = null;
    showToast("Ticket updated successfully!");
  } catch (error) {
    showToast("Failed to update ticket", "error");
  }
};

const handleDeleteTicket = async (ticketId) => {
  if (window.confirm("Are you sure you want to delete this ticket?")) {
    try {
      deleteTicket(ticketId);
      showToast("Ticket deleted successfully!");
    } catch (error) {
      showToast("Failed to delete ticket", "error");
    }
  }
};

const handleEditTicket = (ticket) => {
  editingTicket.value = ticket;
  showForm.value = false;
};

const handleCancelForm = () => {
  showForm.value = false;
  editingTicket.value = null;
};

const navigateToDashboard = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
.tickets {
  min-height: 100vh;
  background: #f8fafc;
}

/* Header */
.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 2rem 0;
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.title {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.header-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* Main Content Layout */
.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .content {
    grid-template-columns: 400px 1fr;
  }
}

/* Sidebar Form */
.sidebar {
  order: 2;
}

@media (min-width: 1024px) {
  .sidebar {
    order: 1;
  }
}

.form-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 2rem;
}

.form-title {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

/* Main Content Area */
.main {
  order: 1;
}

@media (min-width: 1024px) {
  .main {
    order: 2;
  }
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tab {
  flex: 1;
  min-width: 120px;
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #64748b;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.filter-tab:hover {
  background: #f8fafc;
  color: #374151;
}

.filter-tab.active {
  background: var(--primary-color);
  color: white;
}

.tab-label {
  font-size: 0.875rem;
  font-weight: 600;
}

.tab-count {
  font-size: 0.75rem;
  opacity: 0.8;
}

/* Tickets Grid */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

/* Empty State */
.empty-state {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-actions {
    justify-content: center;
  }

  .filter-tabs {
    flex-direction: column;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
  }

  .form-section {
    position: static;
    margin-bottom: 2rem;
  }
}
</style>
