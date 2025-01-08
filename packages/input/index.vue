<template>
    <el-config-provider namespace="report">
        <div class="ics-input-container">
            <el-input v-model="inputValue" clearable placeholder="请输入" style="height: 44px;" v-bind="$attrs">
            </el-input>
        </div>
    </el-config-provider>
</template>

<script lang="ts">
export default {
    name: "fx-input"
}
</script>

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue'


const props = defineProps({
    title: String,
});
const inputValue = ref('')
const emit = defineEmits(['update:modelValue', 'change'])
watch(inputValue, (val) => {
    emit('update:modelValue', val)
})

</script>
<style lang="scss" scoped>

.ics-input-container {
    width: 100%;
    background-color: rgb(245, 245, 245);

    * {
        box-sizing: border-box;
    }

    .prefix-title {
        color: rgb(115, 116, 128);
        font-size: 14px;

    }

    :deep(.report-input__wrapper) {
        height: 44px;
        box-sizing: border-box;
        background-color: rgb(245, 245, 245);
        border: 1px solid transparent;
        border-radius: 0px;
        box-shadow: none;
        padding: 0px 11px;

        &.is-focus {
            box-shadow: 0 0 0 1px var(--report-color-primary);
        }
    }

    :deep(.report-input__inner) {
        background-color: rgb(245, 245, 245);
    }
}
</style>
