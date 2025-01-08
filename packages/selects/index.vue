<template>
    <div :class="['my-date-picker',isFocus ? 'my-selects-focus-border-style': '']" @click="click" >
        <!-- <div class="title">{{ title }}</div> -->
        <div class="left-date">
            <selectSingle  v-model="preValue" :valueAttr="valueAttr[0]" :labelAttr="labelAttr[0]" suffix-icon="" :options="options1" clearable @focus="handlerFocus" @blur="handlerBlur"></selectSingle>
            <!-- <el-input v-model="preValue" style="width: 100%" placeholder="请输入" clearable @focus="handlerFocus"  @blur="handlerBlur"/> -->
        </div>
        <div class="sp"></div>
        <div class="right-date">
            <selectSingle  v-model="postValue" :valueAttr="valueAttr[1]" :labelAttr="labelAttr[1]" suffix-icon="" :options="options2" clearable @focus="handlerFocus" @blur="handlerBlur"></selectSingle>
            <!-- <el-input v-model="postValue"  style="width: 100%" placeholder="请输入" clearable  @focus="handlerFocus"  @blur="handlerBlur"/> -->
        </div>
    </div>

</template>

<script lang="ts" setup>
import selectSingle from '../selectSingle/index.vue'
import { ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: ''
        
    },
    options1: {
        type: Array,
        default() {
            return []
        }

    },
    options2: {
        type: Array,
        default() {
            return []
        }
    },
    valueAttr: {
      type: Array,
      default: () => ['value','value2']
    },
    labelAttr: {
      type: Array,
      default: () => [['label', 'value'], ['label2', 'value2']]
    },
})
const preValue = defineModel('preValue')
const postValue = defineModel('postValue')

console.log('props.options2', props.options2)

const isFocus = ref(false)
const handlerFocus = () => {
  isFocus.value = true
}
const handlerBlur = () => {
  isFocus.value = false
}


</script>

<style lang="scss" scoped>
.my-date-picker {
    width: 100%;
    display: flex;
    align-items: center;
    // height: 30px;
    height: 44px;
    // border: 1px solid var(--report-border-color);
    border: 1px solid transparent;

    background-color: #f5f5f5;
    border-radius: 0px;
    // overflow: hidden !important;

    .title {
        padding-left: 12px;
        flex-grow: 0;
        white-space: nowrap;
        color: #737480;
        font-size: 14px;

    }

    .left-date {
        // display: flex;
        justify-content: center;
        flex-grow: 1
    }

    // .sp {
    //     width: 12px;
    //     flex-grow: 0;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     color: var(--report-border-color);
       
    // }

    
  .sp {
    flex-grow: 0;
    // background-color: green;
    &::before {
      content: '';
      display: inline-block;
      height: 2px;
      width: 10px;
      background-color: rgba(121, 110, 101, .6);
      transform: translateY(-2px);
      // margin-top: 14px;
    }
  }





    .right-date {
        flex-grow: 1
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
        // border: 1px solid var(--report-border-color-hover);

    }

    :deep(.report-input__inner) {
        // transform: translateY(2px);
        box-shadow: none;
    }

 
    :deep(.report-select__wrapper) {
        min-height: 44px;
        background-color: #f5f5f5;
        border-radius: 0px;
        position: relative;
        box-shadow: none;
        &.is-hovering {
            // box-shadow: 0 0 0 1px var(--report-color-primary);
            box-shadow: none;
        }
        &.is-focused {
            // box-shadow: 0 0 0 1px var(--report-color-primary);
            box-shadow: none;
        }
        &:hover {
            .report-select__suffix {
                display: inline-block;
                transform: translateY(3px);
                position: absolute;
                right: 8px;
           }
        }
    }
    :deep(.report-select__selected-item.report-select__placeholder.is-transparent) {
        text-align: center;
    }

  
    :deep(.report-select__suffix) {
        display: none;
    }
    :deep(.report-select__placeholder) {
        text-align: center;
    }
}

.my-date-pickerfocus {
    border: 1px solid var(--report-color-primary)!important;

}
.my-selects-focus-border-style {
  box-shadow: 0 0 0 1px var(--report-color-primary);


}
// .my-date-picker-no-focus {
//     border: 1px solid var(--report-border-color);
// }
</style>
