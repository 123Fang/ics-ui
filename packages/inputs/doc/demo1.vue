<!-- html -->
<template>
  <fx-inputs v-model:preValue="value1" v-model:postValue="value2" placeholder="基本使用"></fx-inputs>
</template>

<!-- js -->
<script setup>
  import {ref} from 'vue'
  const value1 = ref('')
  const value2 = ref('')
</script>
