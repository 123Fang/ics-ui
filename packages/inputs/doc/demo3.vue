<!-- html -->
<template>
  <fx-inputs v-model="value1" clearable @clear="clear" placeholder="可清空"></fx-inputs>
</template>

<!-- js -->
<script setup>
  import {ref} from 'vue'
  const value1 = ref('')
  const clear = () =>{
    console.log("清空")
  }
</script>
