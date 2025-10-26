import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true }, // Protected route
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: () => import("../views/Tickets.vue"),
    meta: { requiresAuth: true }, // Protected route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
