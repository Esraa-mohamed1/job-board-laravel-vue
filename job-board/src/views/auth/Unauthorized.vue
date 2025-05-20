<template>
  <div class="notfound-container">
    <div class="notfound-left">
      <h1>Unauthorized</h1>
      <p class="desc">
        You do not have permission to access this page.<br />
        Please login or return to the homepage.
      </p>
      <div class="notfound-actions">
       
      </div>
    </div>
    <div class="notfound-right">
      <img src="../../assets/401 Error Unauthorized-rafiki.svg" alt="Unauthorized Illustration" />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Reuse styles from NotFound.vue for consistency */
.notfound-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background: #fff;
  padding: 0 2vw;
}
.notfound-left {
  max-width: 480px;
  margin-right: 2vw;
}
.notfound-left h1 {
  font-size: 2.6rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1.5rem;
}
.notfound-left .desc {
  font-size: 1.18rem;
  color: #6c757d;
  margin-bottom: 2.2rem;
  line-height: 1.7;
}
.notfound-actions {
  display: flex;
  gap: 1rem;
}
.btn {
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: background 0.18s, color 0.18s, border 0.18s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-primary {
  background: #1163f6;
  color: #fff;
}
.btn-primary:hover {
  background: #0d51c6;
}
.btn-outline {
  background: #fff;
  color: #1163f6;
  border: 1.5px solid #e1e7ef;
}
.btn-outline:hover {
  background: #f3f7fc;
  border-color: #bcd0ee;
}
.arrow {
  margin-left: 10px;
  font-size: 1.1em;
}
.notfound-right img {
  width: 440px;
  max-width: 38vw;
  height: auto;
}
@media (max-width: 900px) {
  .notfound-container {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px 8vw;
  }
  .notfound-right img {
    width: 90vw;
    max-width: 98vw;
    margin-top: 32px;
  }
}
</style>