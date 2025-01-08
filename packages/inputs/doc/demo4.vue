<!-- html -->
<template>
  <fx-space>
    <fx-inputs v-model="value1" leftIcon="fx-icon-search"></fx-inputs>
    <fx-inputs v-model="value2" rightIcon="fx-icon-calendar"></fx-inputs>
  </fx-space>
</template>

<!-- js -->
<script setup>
  import { ref } from "vue";
  const value1 = ref('')
  const value2 = ref('')
</script>
