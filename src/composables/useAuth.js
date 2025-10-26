import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Vue composable - similar to React custom hook
export function useAuth() {
  const user = ref(null);
  const loading = ref(true);
  const router = useRouter();

  // Check existing session on load
  const session = localStorage.getItem("ticketapp_session");
  if (session) {
    user.value = JSON.parse(session);
  }
  loading.value = false;

  const login = (email, password) => {
    // Same mock authentication as React
    if (email === "demo@example.com" && password === "password123") {
      const userData = {
        id: 1,
        email,
        name: "Demo User",
      };
      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
      user.value = userData;
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    user.value = null;
    router.push("/");
  };

  // Computed property - reactive derived value
  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
}
