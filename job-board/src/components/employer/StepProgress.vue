<template>
    <div class="step-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: progressPercentage }"
        ></div>
      </div>
      
      <div class="step-indicators">
        <div
          v-for="(step, index) in steps"
          :key="index"
          :class="[
            'step-indicator',
            { 'active': index === currentStep },
            { 'completed': index < currentStep }
          ]"
          @click="() => $emit('step-change', index)"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-label">{{ step.name }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    steps: {
      type: Array,
      required: true
    },
    currentStep: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['step-change'])
  
  const progressPercentage = computed(() => {
    return `${((props.currentStep + 1) / props.steps.length) * 100}%`
  })
  </script>
  
  <style scoped>
  .step-progress {
    margin-bottom: 2rem;
  }
  
  .progress-bar {
    height: 6px;
    background: #e9ecef;
    border-radius: 3px;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: #0A65CC;
    transition: width 0.3s ease;
  }
  
  .step-indicators {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  
  .step-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    flex: 1;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #6c757d;
  }
  
  .step-indicator.active .step-number {
    background: #0A65CC;
    color: white;
  }
  
  .step-indicator.completed .step-number {
    background: #468ad6;
    color: white;
  }
  
  .step-label {
    font-size: 0.875rem;
    color: #6c757d;
    text-align: center;
  }
  
  .step-indicator.active .step-label,
  .step-indicator.completed .step-label {
    color: #0A65CC;
    font-weight: 500;
  }
  </style>