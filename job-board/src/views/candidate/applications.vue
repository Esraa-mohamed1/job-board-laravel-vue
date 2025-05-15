<template>
  <div class="job-alerts-container">
    <div class="header">
      <div class="title-badge">
        <h1># Job Applications</h1>
     
      </div>
   
    </div>

    <div class="divider"></div>

    <div class="job-category">
      <div class="category-header">
        <h2>Technical Support Specialist</h2>
        <span class="job-tag">Full Time</span>
      </div>
      
      <div class="job-listing">
        <div class="job-meta">
          <h3 class="job-title">UUIX Designer</h3>
          <span class="job-type">Remote</span>
        </div>
        <div class="job-details">
          <span class="salary">$100-$15K</span>
          <span class="time-remaining">
            <i class="far fa-clock"></i>
            <span>1 day left</span>
          </span>
        </div>
      </div>
      
      <div class="job-listing">
        <div class="job-meta">
          <h3 class="job-title">Annotator, USA</h3>
          <span class="job-type">On-site</span>
        </div>
        <div class="job-details">
          <span class="salary">$100-$15K</span>
          <span class="time-remaining">
            <i class="far fa-clock"></i>
            <span>1 day left</span>
          </span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="job-category">
      <div class="category-header">
        <h2>Front End Developer</h2>
        <span class="job-tag">Interactive</span>
      </div>
      
      <div class="job-listing">
        <div class="job-meta">
          <h3 class="job-title">Mymoonlight, Bangladesh</h3>
          <span class="job-type">Remote</span>
        </div>
        <div class="job-details">
          <span class="salary">$100-$15K</span>
          <span class="time-remaining">
            <i class="far fa-clock"></i>
            <span>1 day left</span>
          </span>
        </div>
      </div>
    </div>

 
  </div>
</template>

<script>
export default {
  name: 'JobAlerts'
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.job-alerts-container {
  font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 25px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.title-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}

h1 {
  color: #0d6efd;
  font-size: 26px;
  margin: 0;
  font-weight: 700;
}

.new-badge {
  background-color: #ff6b6b;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
  outline: none;
  width: 180px;
  transition: all 0.2s ease;
}

.search-bar input:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
}

.search-bar button {
  padding: 10px 15px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.search-bar button:hover {
  background-color: #0b5ed7;
}

.divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 20px 0;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

h2 {
  color: #212529;
  font-size: 18px;
  margin: 0;
  font-weight: 600;
}

.job-tag {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.job-listing {
  background-color: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  cursor: pointer;
}

.job-listing:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(13, 110, 253, 0.1);
  border-color: #0d6efd;
}

.job-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.job-title {
  font-weight: 600;
  font-size: 16px;
  color: #212529;
}

.job-type {
  color: #6c757d;
  font-size: 13px;
  background-color: #f8f9fa;
  padding: 2px 8px;
  border-radius: 4px;
}

.job-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary {
  color: #0d6efd;
  font-weight: 600;
  font-size: 15px;
}

.time-remaining {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6c757d;
  font-size: 13px;
}

.time-remaining i {
  color: #6c757d;
  font-size: 12px;
}

.apply-now-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;
}

.apply-now-btn:hover {
  background-color: #0b5ed7;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
}

.apply-now-btn i {
  font-size: 14px;
}
</style>