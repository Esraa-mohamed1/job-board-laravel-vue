<!-- src/components/AdminSidebar.vue -->
<template>
  <div class="sidebar col-md-3 col-lg-2">
    <div class="p-3 text-center border-bottom">
      <h5 class="fw-bold">ADMIN DASHBOARD</h5>
    </div>
    <ul class="nav flex-column mt-2">
      <li class="nav-item" v-for="link in links" :key="link.path">
        <router-link
          :to="link.path"
          class="nav-link"
          :class="{ active: $route.path === link.path }"
        >
          <i :class="link.icon + ' me-2'"></i> {{ link.label }}
        </router-link>
      </li>
    </ul>
    <div class="mt-auto p-3 border-top log-out-section">
      <a href="#" class="nav-link text-secondary" @click.prevent="logout">
        <i class="fas fa-sign-out-alt me-2"></i> Log-out
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const $route = useRoute();

const logout = () => {
  localStorage.removeItem("authToken");
  router.push("/login");
};

const links = [
  { path: "/admin", label: "Overview", icon: "fas fa-tachometer-alt" },
  { path: "/pending", label: "Pending Jobs", icon: "fas fa-clipboard-list" },
  { path: "/approved", label: "Approved Jobs", icon: "fas fa-check-circle" },
  { path: "/rejected", label: "Rejected Jobs", icon: "fas fa-times-circle" },
];
</script>

<style scoped>
.sidebar {
  background-color: white;
  height: 100vh;
  position: fixed;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.nav-link {
  padding: 12px 16px;
  color: #555;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #3498db;
  border-left-color: #3498db;
}

.nav-link.active {
  background-color: #e6f2ff;
  color: #3498db;
  border-left-color: #3498db;
  font-weight: 500;
}
</style>
