<template>
  <div class="applied-jobs-container">
    <div class="header">
      <h1>Applied Jobs (589)</h1>
    </div>

    <div class="jobs-table">
      <table>
        <thead>
          <tr>
            <th>JOB</th>
            <th>DATE APPLIED</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(job, index) in appliedJobs" :key="index">
            <td>
              <div class="job-info">
                <strong>{{ job.title }}</strong>
                <div class="job-details">
                  <span>{{ job.location }}</span>
                  <span>{{ job.salary }}</span>
                </div>
              </div>
            </td>
            <td>{{ job.dateApplied }}</td>
            <td>
              <span class="status-badge">
                <i class="fas fa-check"></i> {{ job.status }}
              </span>
            </td>
            <td>
              <button class="view-details-btn">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppliedJobs',
  data() {
    return {
      appliedJobs: [
        {
          title: 'Networking Engineer | Remote',
          location: 'Washington',
          salary: '$50k-80k/month',
          dateApplied: 'Feb 2, 2019 19:28',
          status: 'Active'
        },
        {
          title: 'Product Designer | Full Time',
          location: 'Dhaka',
          salary: '$50k-80k/month',
          dateApplied: 'Dec 7, 2019 23:26',
          status: 'Active'
        },
        {
          title: 'Junior Graphic Designer | Temporary',
          location: 'Brazil',
          salary: '$50k-80k/month',
          dateApplied: 'Feb 2, 2019 19:28',
          status: 'Active'
        },
        {
          title: 'Visual Designer | Contract Base',
          location: 'Wisconsin',
          salary: '$50k-80k/month',
          dateApplied: 'Dec 7, 2019 23:26',
          status: 'Active'
        },
        {
          title: 'Marketing Officer | Full Time',
          location: 'United States',
          salary: '$50k-80k/month',
          dateApplied: 'Dec 4, 2019 21:42',
          status: 'Active'
        },
        {
          title: 'UI/UX Designer | Full Time',
          location: 'North Dakota',
          salary: '$50k-80k/month',
          dateApplied: 'Dec 30, 2019 07:52',
          status: 'Active'
        },
        {
          title: 'Software Engineer | Full Time',
          location: 'New York',
          salary: '$50k-80k/month',
          dateApplied: 'Dec 30, 2019 05:18',
          status: 'Active'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.applied-jobs-container {
  font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.jobs-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom: 1px solid #eee;
}

td {
  padding: 16px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}

.job-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.job-info strong {
  font-weight: 600;
  color: #333;
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: #666;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.status-badge i {
  font-size: 10px;
}

.view-details-btn {
  background-color: transparent;
  color: #0d6efd;
  border: 1px solid #0d6efd;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-details-btn:hover {
  background-color: #0d6efd;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .applied-jobs-container {
    padding: 15px;
  }
  
  th, td {
    padding: 10px 8px;
    font-size: 13px;
  }
  
  .job-info strong {
    font-size: 14px;
  }
  
  .job-details {
    font-size: 12px;
  }
}
</style>