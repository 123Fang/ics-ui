<template>
    <div class="my-date-picker" @click="click" :class="focus ? 'my-date-pickerfocus' : 'my-date-picker-no-focus'">
        <div class="title">{{ title }}</div>
        <div class="left-date">
            <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: auto;" v-model="preValue"
                type="date" prefix-icon="a" placeholder="开始时间" :size="size" @focus="handlerFocus" @blur="handlerBlur" />
        </div>
        <!-- <div class="sp">-</div> -->
        <div class="right-date">
            <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: auto;" v-model="postValue"
                type="date" prefix-icon="a" placeholder="结束时间" :size="size" @focus="handlerFocus" @blur="handlerBlur" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default() {
            ''
        }
    },
    modelValue: {
        type: [Array, String],
    },
})
const preValue = defineModel('preValue')
const postValue = defineModel('postValue')

function compareDates(dateStr1, dateStr2) {
    // 将字符串转换为 Date 对象
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    if (date1 <= date2) {
        return true
    }
}

// 开始时间要小于结束时间，如果大于就取消赋值
watch(() => preValue.value, (val) => {
    if (postValue.value && !compareDates(preValue.value, postValue.value)) {
        preValue.value = ''
    }

})
watch(() => postValue.value, (val) => {
    if (preValue.value && !compareDates(preValue.value, postValue.value)) {
        postValue.value = ''
    }
})


const emit = defineEmits(['update:modelValue'])




const size = ref<'default' | 'large' | 'small'>('default')

const startTime = ref('')
const endTime = ref('')
const focus = ref(false)

// const click = () => {
//     focus.value = true
// }
const handlerFocus = () => {
    focus.value = true
}
const handlerBlur = () => {
    focus.value = false
}

</script>

<style lang="scss" scoped>
.my-date-picker {
    display: flex;
    align-items: center;
    height: 32px !important;
    border: 1px solid var(--report-border-color);
    border-radius: 4px;
    overflow: hidden !important;
    box-sizing: border-box;
    padding-top: 2px;

    .title {
        padding-left: 12px;
        flex-grow: 0;
        white-space: nowrap;
        color: #737480;
        font-size: 14px;

    }

    .left-date {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        height: 32px;

        max-width: 110px;
    }

    .sp {

        // width: 6px;
        height: 32px;
        flex-grow: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--report-border-color);
        transform: translateY(2px);
        // background-color: blue ;
        // font-size: 14px;
        // font-weight: 600;
    }

    .right-date {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        height: 32px;

        max-width: 110px;
    }

    :deep(.report-input__wrapper) {
        box-shadow: none;
    }

    :deep(.report-input__prefix) {
        width: 4px;
    }

    &:hover {
        // border: 1px solid var(--report-color-primary);
        // --report-input-hover-border-color
        border: 1px solid var(--report-border-color-hover);

    }

    :deep(.report-input__inner) {
        transform: translateY(1px);
        width: 100% !important;
    }

    :deep(.report-input--default) {
        height: 32px !important;
    }

    :deep(.report-input__suffix) {
        background-color: transparent !important;
        width: 4px;
        // transform: translate(10px 2px);
        position: absolute;
        // left: 86px;
        right: 20px;
        top: 1px !important;
        z-index: 999;
    }

    :deep(.report-input__wrapper) {
        position: relative;
        padding-right: 0px;
        //    border: 1px solid gray;
    }
}

.my-date-pickerfocus {
    border: 1px solid var(--report-color-primary) !important;

}

// .my-date-picker-no-focus {
//     border: 1px solid var(--report-border-color);
// }</style>
