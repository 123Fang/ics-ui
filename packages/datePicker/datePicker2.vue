<template>
  <div class="my-date-picker" @click="click" :class="focus ? 'my-date-pickerfocus' : 'my-date-picker-no-focus'">
    <div class="left-date">
      <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: 100%;" v-model="preValue" type="date"
        prefix-icon="a" placeholder="开始时间" :size="size" @focus="handlerFocus" @blur="handlerBlur" />
    </div>
    <div class="sp"></div>
    <div class="right-date">
      <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: 100%;" v-model="postValue" type="date"
        prefix-icon="a" placeholder="结束时间" :size="size" @focus="handlerFocus" @blur="handlerBlur" />
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




const emit = defineEmits(['update:modelValue'])
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
  width: 100%;
  // height: 44px;
  display: flex;
  background-color: rgb(245, 245, 245);


  .left-date {
    flex-grow: 1;
    background-color: rgb(245, 245, 245);
  }

  .sp {
    flex-grow: 0;
    // background-color: green;
    &::before {
      content: '';
      display: inline-block;
      height: 2px;
      width: 10px;
      background-color: rgba(121, 110, 101, .6);
      transform: translateY(2px);
      // margin-top: 14px;
    }
  }

  .right-date {
    flex-grow: 1;

  }

  :deep(.report-input__wrapper) {
    box-shadow: none;
  }

  :deep(.report-input__prefix) {
    width: 4px;
  }


  :deep(.report-input__inner) {
    text-align: center;
    background-color: rgb(245, 245, 245);
    color: rgb(121, 110, 101);
    color: rgb(29, 29, 29);
    font-size: 15px;
  }

  :deep(.report-input--default) {
    height: 44px !important;
  }

  :deep(.report-input__suffix) {
    width: 0px;
    background-color: rgb(245, 245, 245);
    position: absolute;
    right: 24px;

  }

  :deep(.report-input__wrapper) {
    background-color: rgb(245, 245, 245);
  }
  :deep(.report-input__inner) {
    // min-width: 96px;
  }
  

}

.my-date-pickerfocus {
  box-shadow: 0 0 0 1px var(--report-color-primary);
}
</style>
