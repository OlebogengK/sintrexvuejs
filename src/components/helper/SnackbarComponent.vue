<template>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color" location="top">
      {{ text }}
      <v-btn dark flat @click="visible = false">Close</v-btn>
    </v-snackbar>
  </template>
  
<script setup>
    import { ref, watch } from 'vue';
  
    const props = defineProps({
        modelValue: Boolean,
        timeout: {
            type: Number,
            default: 6000,
        },
        color: {
            type: String,
            default: 'info',
        },
        text: {
            type: String,
            default: '',
        },
    });
  
    const visible = ref(props.modelValue);
  
    watch(() => props.modelValue, (newVal) => {
        visible.value = newVal;
    });
  </script>
  