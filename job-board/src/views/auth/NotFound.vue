<template>
  <div class="error-page">
    <div class="error-content">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p>The page you're looking for doesn't exist or has been moved.</p>
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
  color: #dc3545;
}

.error-content h3 {
  font-size: 2rem;
  margin-top: 0;
}

.error-content p {
  margin-bottom: 2rem;
}
</style>