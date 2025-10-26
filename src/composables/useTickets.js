import { ref, computed } from 'vue'

// Mock initial tickets data
const initialTickets = [
  {
    id: 1,
    title: 'Login issue on mobile',
    description: 'Users are unable to login from mobile devices',
    status: 'open',
    priority: 'high',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    title: 'Dashboard loading slow',
    description: 'Dashboard takes more than 10 seconds to load data',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 3,
    title: 'Update user profile picture',
    description: 'Allow users to upload and crop profile pictures',
    status: 'closed',
    priority: 'low',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString(),
  }
]

export function useTickets() {
  const tickets = ref([])
  const loading = ref(true)

  // Load tickets from localStorage
  const loadTickets = () => {
    const savedTickets = localStorage.getItem('ticketapp_tickets')
    if (savedTickets) {
      tickets.value = JSON.parse(savedTickets)
    } else {
      tickets.value = initialTickets
      localStorage.setItem('ticketapp_tickets', JSON.stringify(initialTickets))
    }
    loading.value = false
  }

  // Initialize
  loadTickets()

  const createTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    const updatedTickets = [...tickets.value, newTicket]
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    return newTicket
  }

  const updateTicket = (id, updates) => {
    const updatedTickets = tickets.value.map(ticket =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    )
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
  }

  const deleteTicket = (id) => {
    const updatedTickets = tickets.value.filter(ticket => ticket.id !== id)
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
  }

  const getTicket = (id) => {
    return tickets.value.find(ticket => ticket.id === id)
  }

  // Computed properties for statistics
  const totalTickets = computed(() => tickets.value.length)
  const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
  const inProgressTickets = computed(() => tickets.value.filter(t => t.status === 'in_progress').length)
  const closedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length)

  return {
    tickets,
    loading,
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicket,
  }
}