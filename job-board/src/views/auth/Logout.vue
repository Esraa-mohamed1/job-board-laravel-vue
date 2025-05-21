<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 60vh;">
    <div>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Logging out...</span>
      </div>
      <p class="mt-3">Logging out...</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    // Redirect to login
    this.$router.replace('/login');
  }
}
</script> 