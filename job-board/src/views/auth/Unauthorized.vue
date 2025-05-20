<template>
  <div class="error-page">
    <div class="error-content">
      <h1>403</h1>
      <h3>Unauthorized Access</h3>
      <p>You don't have permission to view this page.</p>
   
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
}

.error-content h1 {
  font-size: 8rem;
  margin: 0;
  line-height: 1;
  color: #ffc107;
}

.actions {
  margin-top: 2rem;
}
</style>