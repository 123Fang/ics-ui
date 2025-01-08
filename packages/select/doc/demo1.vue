<!-- html -->
<template>
  <fx-select
    v-model="selVal"
    placeholder="请选择"
    :options="selOptions"
    @change="selchange"
  ></fx-select>
</template>

<!-- js -->
<script setup>
import { reactive, ref } from "vue";
const selVal = ref([]);
const state = reactive({
  selOptions: [
    { label: "中国", value: "A" },
    { label: "俄罗斯", value: "B" },
    { label: "美国", value: "C" },
    { label: "澳大利亚", value: "D" },
    { label: "巴基斯坦", value: "E" },
  ],
});
const selchange = (item) => {
  // 当前选中的值及index
  console.log(item);
};
const { selOptions } = state;
</script>
