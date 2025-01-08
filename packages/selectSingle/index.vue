<template>
  <div class="test-my-select-single">
    <el-select v-model="selectValue" placeholder="请选择" filterable clearable default-first-option no-data-text="暂无数据"
      :reserve-keyword="false"  @change="change" v-bind="$attrs">
      <!-- <template #prefix>
          <span class="prefix-title">{{ props.title }}</span>
        </template> -->
      <el-option v-for="item in props.options" :key="item[props.valueAttr]"
        :label="item[props.labelAttr[0]] + ')' + item[props.labelAttr[1]]" :value="item[props.valueAttr]">
        <!-- <div>
            <el-checkbox v-model="item[checkBoxVal]" size="small" />
            <span  style="margin-left:10px;color: rgb(29, 33, 41);
                  font-size: 14px;font-weight: 400!important">{{ item[props.labelAttr[0]] + ')' +
                    item[props.labelAttr[1]] }}</span>
          </div> -->
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue'

const checkBoxVal = 'val'

interface Option {
  [key: string]: string // 字符串索引签名
  label: string
  value: string
}
const props = defineProps({
  title: String,
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },
  labelAttr: {
    type: Array as PropType<string[]>,
    default: () => ['label', 'value']
  },
  valueAttr: {
    type: String,
    default: 'value'
  },
  modelValue: {
    type: [String, Number],
  },
});

const emit = defineEmits(['update:modelValue', 'change'])
const selectValue = ref([])
watch(selectValue, (val) => {
  emit('update:modelValue', val)
})
watch(() => props.modelValue, (val) => {
  selectValue.value = val
  if (val?.length === 0) {
    props.options.forEach((item) => {
      item.val = false
    })
  }
})


const change = (val: any) => {
  const checkBoxStateUiChange = (value: string, state: boolean) => {
    if (!value) {
      props.options.forEach((item) => {
        item.val = false
      })
      return
    }
    props.options.forEach((item) => {
      if (item[props.valueAttr] === value) {
        item.val = state
      } else {
        item.val = !state
      }
    })
  }
  if (val) {
    checkBoxStateUiChange(val, true)

  } else {
    checkBoxStateUiChange(val, false)
  }
  setTimeout(() => {
    emit('change', val)
  })
}


</script>

<style lang="scss" scoped>
.test-my-select-single {
  width: 100%;

  * {
    box-sizing: border-box;
  }

  .prefix-title {
    color: rgb(115, 116, 128);
    font-size: 14px;
  }

  :deep(.report-select__caret) {
    color: rgb(115, 116, 128);
  }

  :deep(.report-select-dropdown.is-multiple .report-select-dropdown__item.is-selected::after) {
    display: none
  }


  :deep(.report-select__wrapper) {
    min-height: 44px;
    background-color: #f5f5f5;
    border-radius: 0px;
    position: relative;

    box-shadow: none;

    &.is-hovering {
      box-shadow: 0 0 0 1px var(--report-color-primary);
    }

    &.is-focused {
      box-shadow: 0 0 0 1px var(--report-color-primary);
    }
  }

  :deep(.report-tag--info) {
    background-color: rgba(228, 226, 224, 0.5);
    height: 32px
  }

  // placeholder 文字
  :deep(.report-select__placeholder.is-transparent) {
    font-size: 15px;
    // color: rgb(121, 110, 101);

  }

  // tag 样式
  :deep(.report-select__selected-item) {
    .report-tag {
      border-radius: 0px;
      color: rgb(29, 29, 29);
      background-color: rgba(228, 226, 224, 0.5);
      font-size: 15px;
      // width: 100px;
    }
  }

}

.report-select-dropdown.is-multiple .report-select-dropdown__item.is-selected::after {
  display: none;
  color: blue
}

.test-my-select-option-text {
  display: inline-block;
  padding-left: 30px;
  transform: translateX(-30px);
  position: relative;
  z-index: 99999;

  margin-left: 10px;
  color: rgb(29, 33, 41);
  font-size: 14px;
  font-weight: 400 !important;
}
</style>