<!-- html -->
<template>
  <fx-inputs v-model="password" type="password" showPassword placeholder="请输入密码"></fx-inputs>
</template>

<!-- js -->
<script setup>
  import {ref} from 'vue'
  const password = ref('')
</script>
