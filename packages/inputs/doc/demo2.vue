<!-- html -->
<template>
  <fx-inputs v-model="value1" disabled placeholder="禁用状态"></fx-inputs>
</template>

<!-- js -->
<script setup>
  import {ref} from 'vue'
  const value1 = ref('')
</script>
