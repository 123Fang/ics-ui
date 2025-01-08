<!-- html -->
<template>
  <fx-inputs v-model="value1" clearable>
    <template #btn>
      <fx-button type="primary" leftIcon="fx-icon-search">搜索</fx-button>
    </template>
  </fx-inputs>
</template>

<!-- js -->
<script setup>
  import {ref} from 'vue'
  const value1 = ref('')
</script>
