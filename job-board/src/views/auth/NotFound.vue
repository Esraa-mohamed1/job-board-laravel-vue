<template>
  <div class="notfound-container">
    <div class="notfound-left">
      <h1>Opps! Page not found</h1>
      <p class="desc">
        Something went wrong. It's look like the link is<br />
        broken or the&nbsp; page is removed.
      </p>
      <div class="notfound-actions">
      
        <button class="btn btn-outline" @click="goBack">Go Back</button>
      </div>
    </div>
    <div class="notfound-right">
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--not-found-page-webpage-pack-design-development-illustrations-5501655.png?f=webp" alt="404 Illustration" />
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.length > 1 ? window.history.back() : (window.location.href = "/");
};
</script>

<style scoped>
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