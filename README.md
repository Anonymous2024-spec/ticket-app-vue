# Ticket Management System - Vue.js Implementation


A modern, full-featured ticket management web application built with Vue.js 3, featuring secure authentication, CRUD operations, and a beautiful responsive design.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Known Issues](#known-issues)
- [Contributing](#contributing)

---

## 🎯 Overview

This is the **Vue.js implementation** of a multi-framework ticket management system. The application provides a complete solution for managing support tickets with a focus on user experience, security, and design consistency.

### Key Highlights

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete tickets
- 🔐 **Secure Authentication** - Session-based auth with protected routes
- 🎨 **Modern Design** - Wavy hero sections, decorative circles, and card-based layouts
- 📱 **Fully Responsive** - Mobile-first design that adapts to all screen sizes
- ♿ **Accessible** - WCAG compliant with semantic HTML and ARIA labels
- ⚡ **Real-time Validation** - Instant feedback on form inputs
- 🎭 **Toast Notifications** - Beautiful success/error messages
- 🔄 **Composition API** - Modern Vue 3 features with reactivity

---

## ✨ Features

### 1. Landing Page
- Eye-catching hero section with SVG wavy background
- Decorative circular elements for visual appeal
- Clear call-to-action buttons (Login & Get Started)
- Feature showcase with card-style sections
- Responsive footer across all pages
- Centered layout with max-width of 1440px

### 2. Authentication System
- **Login Page** - Secure user login with validation
- **Signup Page** - New user registration
- **Form Validation** - Real-time error checking
- **Toast Notifications** - Success/error feedback
- **Session Management** - LocalStorage-based tokens
- **Protected Routes** - Automatic redirection for unauthorized access

### 3. Dashboard
- **Statistics Overview**
  - Total Tickets count
  - Open Tickets count
  - Resolved Tickets count
- Quick navigation to Ticket Management
- Prominent Logout functionality
- Welcome message with user context

### 4. Ticket Management (CRUD)
- **Create Tickets** - Form with validation for new tickets
- **View Tickets** - Card-style display with status badges
- **Edit Tickets** - Update existing ticket details
- **Delete Tickets** - Remove with confirmation modal
- **Status Management** - Visual indicators (Open, In Progress, Closed)
- **Real-time Feedback** - Toast notifications for all actions

---

## 🛠 Tech Stack

### Core Technologies
- **Vue.js** 3.x - Progressive JavaScript framework
- **Vue Router** 4.x - Official router for Vue.js
- **Vite** - Next-generation frontend build tool

### State Management & Composition
- **Composition API** - Modern Vue 3 reactivity system
- **Composables**
  - `useAuth.js` - Authentication state and logic
  - `useTickets.js` - Ticket CRUD operations and state

### Styling
- **Scoped Styles** - Component-level CSS encapsulation
- **Custom CSS** - Design system implementation
- No external CSS frameworks (pure custom styling)

### Development Tools
- **Vite Config** - Optimized build configuration
- **jsconfig.json** - Path aliases and IntelliSense support

---

## 📁 Project Structure

```
ticket-app-vue/
├── .vscode/                         # VS Code configuration
├── node_modules/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images, SVGs, icons
│   ├── components/
│   │   ├── tickets/
│   │   │   ├── TicketCard.vue       # Individual ticket display
│   │   │   └── TicketForm.vue       # Create/Edit ticket form
│   │   └── ui/
│   │       └── Toast.vue            # Toast notification component
│   ├── composables/
│   │   ├── useAuth.js               # Authentication composable
│   │   └── useTickets.js            # Ticket management composable
│   ├── router/
│   │   └── index.js                 # Vue Router configuration
│   ├── stores/                      # State management (if using Pinia)
│   ├── views/
│   │   ├── Dashboard.vue            # Dashboard page
│   │   ├── Landing.vue              # Landing/Home page
│   │   ├── Login.vue                # Login page
│   │   └── Tickets.vue              # Ticket management page
│   ├── App.vue                      # Root component
│   └── main.js                      # Application entry point
├── .gitignore
├── index.html
├── jsconfig.json                    # JavaScript configuration
├── package-lock.json
├── package.json
├── README.md                        # This file
└── vite.config.js
```

### Architecture Overview

#### Composables (Composition API)
- **`useAuth.js`** - Manages authentication state, login/signup/logout operations using Vue's reactive system
- **`useTickets.js`** - Handles ticket CRUD operations, form state, and validation with computed properties

#### UI Components
- **`Toast.vue`** - Reusable notification component with transitions
- **`TicketCard.vue`** - Individual ticket display with status badges and emit events
- **`TicketForm.vue`** - Unified form for creating/editing tickets with v-model bindings

#### Views (Pages)
- **`Landing.vue`** - Homepage with hero and features
- **`Login.vue`** - Authentication page (login/signup tabs)
- **`Dashboard.vue`** - Statistics and quick navigation
- **`Tickets.vue`** - Full ticket management interface

#### Router
- **Navigation Guards** - Protect routes requiring authentication
- **Route Meta** - Define which routes need auth
- **Lazy Loading** - Component-level code splitting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket-app-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to: http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🔐 Authentication

### How It Works

The application uses **localStorage-based authentication** to simulate a real authentication system with Vue Router navigation guards.

#### Session Management
- **Session Key**: `ticketapp_session`
- **Storage**: Browser localStorage
- **Token Format**: JSON object with user details
- **Composable**: `useAuth()` provides reactive auth state

#### Test Credentials

For **Login**:
```
Email: test@example.com
Password: password123
```

Or **Sign Up** with any email/password combination.

#### Protected Routes

The following routes require authentication:
- `/dashboard` - Dashboard page
- `/tickets` - Ticket management page

**Route Protection** is implemented using Vue Router's `beforeEach` navigation guard:

```javascript
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const session = localStorage.getItem('ticketapp_session');
  
  if (requiresAuth && !session) {
    next('/login');
  } else {
    next();
  }
});
```

**Unauthorized access** automatically redirects to `/login`.

#### Logout Process

1. Click the "Logout" button in the navigation
2. Session token is cleared from localStorage
3. User is redirected to the landing page using `router.push('/')`

---

## 🎨 Design System

### Layout Specifications

- **Max Width**: 1440px (centered on large screens)
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Visual Elements

#### Hero Section
- **Wavy Background**: SVG path with smooth curves
- **Decorative Circles**: Positioned absolutely with gradient fills
- **Call-to-Action**: Prominent buttons with hover effects

#### Card Components
- **Box Shadow**: `0 2px 8px rgba(0,0,0,0.1)`
- **Border Radius**: 12px
- **Padding**: 24px
- **Hover Effect**: Slight elevation increase
- **Transition**: Smooth animations using Vue transitions

### Color Palette

#### Status Colors
| Status | Color | Hex Code | Usage |
|--------|-------|----------|-------|
| Open | Green | `#10b981` | New tickets |
| In Progress | Amber | `#f59e0b` | Active tickets |
| Closed | Gray | `#6b7280` | Resolved tickets |

#### Primary Colors
- **Primary**: `#3b82f6` (Blue)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)

### Typography
- **Font Family**: System fonts stack
- **Headings**: 700 weight
- **Body**: 400 weight
- **Line Height**: 1.6

---

## 🎭 Components Deep Dive

### TicketCard Component
Displays individual ticket information in a card format using Vue 3 SFC syntax.

**Props**:
```javascript
props: {
  ticket: {
    type: Object,
    required: true
  }
}
```

**Emits**:
- `edit` - Triggered when edit button is clicked
- `delete` - Triggered when delete button is clicked

**Features**:
- Status badge with dynamic color binding
- Priority indicator
- Action buttons with event emitters
- Scoped styles for encapsulation
- Hover effects with CSS transitions

**Usage**:
```vue
<TicketCard 
  :ticket="ticket" 
  @edit="handleEdit" 
  @delete="handleDelete" 
/>
```

### TicketForm Component
Unified form for creating and editing tickets with Vue's v-model.

**Props**:
```javascript
props: {
  initialData: {
    type: Object,
    default: () => ({})
  },
  isEdit: {
    type: Boolean,
    default: false
  }
}
```

**Emits**:
- `submit` - Form submission with validated data

**Validation Rules**:
- **Title**: Required, min 3 characters
- **Status**: Required, must be "open", "in_progress", or "closed"
- **Description**: Optional, max 500 characters
- **Priority**: Optional, must be "low", "medium", or "high"

**Features**:
- Reactive form state with `ref()`
- Real-time validation with `computed()`
- Two-way binding with v-model
- Error message display
- Submit prevention for invalid forms

### Toast Component
Notification system for user feedback with Vue transitions.

**Props**:
```javascript
props: {
  message: String,
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
}
```

**Features**:
- Automatic dismiss with `onMounted()` lifecycle
- Slide-in/fade-out transitions
- Dynamic styling based on type
- Composable for global toast management

**Types**:
- `success` - Green background
- `error` - Red background
- `info` - Blue background
- `warning` - Amber background

---

## 🔄 Vue Router Configuration

### Route Structure

```javascript
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  }
]
```

### Navigation Guards

**Global Before Guard**:
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const session = localStorage.getItem('ticketapp_session');
    if (!session) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
```

### Programmatic Navigation

```javascript
// In components
import { useRouter } from 'vue-router';

const router = useRouter();
router.push('/dashboard');
router.replace('/login');
```

---

## 🧩 Composables Deep Dive

### useAuth Composable

**State**:
- `isAuthenticated` - Computed reactive boolean
- `currentUser` - Ref containing user data

**Methods**:
- `login(email, password)` - Authenticate user
- `signup(email, password, name)` - Register new user
- `logout()` - Clear session and redirect
- `checkAuth()` - Validate current session

**Usage**:
```javascript
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated, currentUser, login, logout } = useAuth();

const handleLogin = async () => {
  const success = await login(email.value, password.value);
  if (success) {
    router.push('/dashboard');
  }
};
```

### useTickets Composable

**State**:
- `tickets` - Ref array of all tickets
- `filteredTickets` - Computed filtered/sorted tickets
- `statistics` - Computed ticket counts by status

**Methods**:
- `createTicket(ticketData)` - Add new ticket
- `updateTicket(id, ticketData)` - Update existing ticket
- `deleteTicket(id)` - Remove ticket
- `getTicketById(id)` - Retrieve single ticket

**Usage**:
```javascript
import { useTickets } from '@/composables/useTickets';

const { tickets, statistics, createTicket, deleteTicket } = useTickets();

const handleCreate = async (data) => {
  await createTicket(data);
  showToast('Ticket created successfully', 'success');
};
```

---

## ♿ Accessibility

### Compliance
- **WCAG 2.1 Level AA** compliant
- **Semantic HTML5** elements throughout
- **ARIA labels** on interactive elements
- **Keyboard navigation** fully supported
- **Vue Focus Management** for modals and forms

### Features
- **Focus Indicators**: Visible on all interactive elements
- **Alt Text**: All images have descriptive alt attributes
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Screen Reader**: Proper heading hierarchy and ARIA landmarks
- **Form Labels**: All inputs properly labeled with `<label>` tags
- **Vue Transitions**: Accessible with proper ARIA live regions

### Keyboard Shortcuts
- `Tab` - Navigate forward through interactive elements
- `Shift + Tab` - Navigate backward
- `Enter` - Submit forms / Activate buttons
- `Esc` - Close modals and dialogs
- `Space` - Toggle checkboxes and radio buttons

### Vue-Specific Accessibility
- `v-if` directives properly remove elements from DOM
- Focus management after route changes
- ARIA attributes bound dynamically with `:aria-*`

---

## 📊 Data Validation

### Form Validation with Vue

#### Ticket Creation/Update
```javascript
const validateTicket = (ticket) => {
  const errors = {};
  
  if (!ticket.title || ticket.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }
  
  if (!ticket.status || !['open', 'in_progress', 'closed'].includes(ticket.status)) {
    errors.status = 'Status must be open, in_progress, or closed';
  }
  
  if (ticket.description && ticket.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }
  
  return errors;
};
```

#### Real-time Validation
Using Vue's `watch` and `computed`:

```javascript
const formErrors = computed(() => {
  return validateTicket(formData.value);
});

const isValid = computed(() => {
  return Object.keys(formErrors.value).length === 0;
});
```

#### Authentication Validation
- **Email**: Valid email format required (regex validation)
- **Password**: Minimum 6 characters
- **Name**: Required for signup, min 2 characters

### Error Messages

Error messages are user-friendly and specific:
- ❌ "Title is required"
- ❌ "Invalid status value. Must be: open, in_progress, or closed"
- ❌ "Your session has expired - please log in again"
- ❌ "Failed to load tickets. Please retry"
- ❌ "Email format is invalid"

---

## ⚠️ Known Issues & Limitations

### Current Limitations
1. **Mock Authentication** - Uses localStorage instead of real backend API
2. **No Data Persistence** - Data stored in memory/localStorage only
3. **Single User** - No multi-user support or concurrent sessions
4. **No Image Upload** - Ticket attachments not supported
5. **Limited Search** - No advanced filtering or search functionality
6. **No Vuex/Pinia** - State managed in composables (can be migrated)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: Requires ES6+ support for Vue 3

### Future Enhancements
- [ ] Integrate Pinia for centralized state management
- [ ] Real backend API integration (REST/GraphQL)
- [ ] Advanced search and filtering with Vue computed properties
- [ ] Ticket assignment to users
- [ ] Real-time updates with WebSockets
- [ ] Email notifications
- [ ] File attachments support
- [ ] Ticket comments/history timeline
- [ ] Dark mode support with Vue provide/inject
- [ ] Export tickets to CSV/PDF
- [ ] Internationalization (i18n)
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Port 5173 already in use
```bash
# Solution: Use a different port
npm run dev -- --port 3000
```

**Issue**: Module not found errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Can't access protected routes
```bash
# Solution: Clear localStorage and login again
# Open browser console and run:
localStorage.clear()
# Then refresh the page
```

**Issue**: Component not updating after data change
```bash
# Solution: Ensure you're using reactive refs/reactive objects
# Correct: const data = ref([])
# Incorrect: let data = []
```

**Issue**: Router not working after build
```bash
# Solution: Configure your server for SPA mode
# For history mode, ensure server redirects all routes to index.html
```

**Issue**: Vite server not starting
```bash
# Solution: Check for conflicting dependencies
npm list vue
# Ensure only one version of Vue is installed
```

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked navigation menu (hamburger with Vue transitions)
- Full-width cards
- Touch-optimized buttons (larger touch targets)
- Collapsible ticket forms
- Bottom sheet style modals

### Tablet (768px - 1024px)
- Two-column grid for tickets using CSS Grid
- Expanded navigation with icons
- Optimized spacing and padding
- Side drawer navigation with Vue transitions

### Desktop (> 1024px)
- Three-column grid for tickets
- Full navigation bar
- Maximum width constraint (1440px)
- Hover effects enabled
- Keyboard shortcuts active
- Advanced filtering sidebar

### Vue Responsive Patterns
```javascript
// Composable for responsive breakpoints
const useBreakpoint = () => {
  const width = ref(window.innerWidth);
  
  const isMobile = computed(() => width.value < 768);
  const isTablet = computed(() => width.value >= 768 && width.value < 1024);
  const isDesktop = computed(() => width.value >= 1024);
  
  onMounted(() => {
    window.addEventListener('resize', () => {
      width.value = window.innerWidth;
    });
  });
  
  return { isMobile, isTablet, isDesktop };
};
```

---

## 🔒 Security Considerations

### Current Implementation
- Session tokens stored in localStorage
- Basic input sanitization in form validation
- Protected routes with Vue Router guards
- Form validation on client-side
- XSS prevention through Vue's built-in escaping

### Vue Security Best Practices
- **v-html avoided** - Prevents XSS attacks
- **Prop validation** - Type checking and required props
- **Input sanitization** - All user inputs validated
- **Route guards** - Authentication checks

### Production Recommendations
- Implement JWT authentication with refresh tokens
- Add CSRF protection
- Use HTTPS only
- Add rate limiting on API calls
- Implement server-side validation
- Use secure HTTP-only cookies
- Add Content Security Policy (CSP) headers
- Implement proper CORS configuration
- Use environment variables for sensitive data
- Add request/response interceptors for API calls

---

## 🧪 Testing Recommendations

### Unit Testing with Vitest
```bash
npm install -D vitest @vue/test-utils
```

**Example test structure**:
```javascript
import { mount } from '@vue/test-utils';
import TicketCard from '@/components/tickets/TicketCard.vue';

describe('TicketCard', () => {
  it('displays ticket title', () => {
    const wrapper = mount(TicketCard, {
      props: {
        ticket: { title: 'Test Ticket', status: 'open' }
      }
    });
    expect(wrapper.text()).toContain('Test Ticket');
  });
});
```

### E2E Testing with Playwright
```bash
npm install -D @playwright/test
```

### Manual Testing Checklist

- [ ] Landing page loads correctly with all sections
- [ ] Navigation between pages works smoothly
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials shows error toast
- [ ] Signup creates new account and logs in
- [ ] Dashboard displays correct statistics
- [ ] Dashboard statistics update after ticket changes
- [ ] Create ticket form validates all fields
- [ ] Created ticket appears immediately in list
- [ ] Edit ticket updates correctly with validation
- [ ] Delete ticket shows confirmation and removes from list
- [ ] Logout clears session and redirects to landing
- [ ] Protected routes redirect when not authenticated
- [ ] Browser back/forward buttons work correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Keyboard navigation works throughout app
- [ ] Form submission prevented when offline
- [ ] Error messages display for network failures
- [ ] Vue DevTools show correct component hierarchy

---

## 🎯 Performance Optimization

### Vue 3 Optimizations
- **Composition API** - Better tree-shaking and smaller bundle
- **Lazy Loading** - Route-based code splitting
```javascript
const Dashboard = () => import('./views/Dashboard.vue');
```

- **Computed Caching** - Expensive calculations cached
- **v-once** - Static content rendered once
- **v-memo** - Conditional memoization for lists

### Vite Optimizations
- **Fast HMR** - Hot module replacement without full reload
- **Pre-bundling** - Dependencies pre-bundled with esbuild
- **Tree Shaking** - Unused code eliminated
- **Code Splitting** - Automatic chunk splitting

### Recommended Improvements
- [ ] Implement virtual scrolling for large ticket lists
- [ ] Add debouncing for search/filter inputs
- [ ] Lazy load images and assets
- [ ] Implement pagination for ticket list
- [ ] Cache API responses
- [ ] Use web workers for heavy computations
- [ ] Optimize bundle size with analyzer
- [ ] Implement service worker for offline support

---

## 📄 License

This project is part of a technical assessment and is for demonstration purposes only.

---

## 👥 Contributing

This is a showcase project for a technical assessment. For other framework implementations, please refer to their respective repositories:

- **React Implementation**: [Link to React repo]
- **Twig Implementation**: [Link to Twig repo]

---

## 🌟 Vue.js Advantages

### Why Vue.js for This Project?

1. **Progressive Framework** - Easy to integrate and scale
2. **Composition API** - Better code organization and reusability
3. **Reactivity System** - Efficient updates with Proxy-based reactivity
4. **Single File Components** - HTML, CSS, JS in one file
5. **Small Bundle Size** - ~33KB runtime (gzipped)
6. **Excellent Documentation** - Official guide and style guide
7. **Vue Router** - First-class routing integration
8. **Developer Experience** - Vue DevTools and helpful error messages

---

## 📞 Support

For questions or issues with this Vue.js implementation, please:
1. Check the [Known Issues](#known-issues) section
2. Review the [Troubleshooting](#troubleshooting) guide
3. Consult the official [Vue.js documentation](https://vuejs.org/)
4. Contact the development team

### Useful Resources
- [Vue.js Official Guide](https://vuejs.org/guide/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Vite Documentation](https://vitejs.dev/)

---

<div align="center">

**Built with 💚 using Vue.js**

[Back to Top](#ticket-management-system---vuejs-implementation)

</div>