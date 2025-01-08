<template>
    <div class="my-inputs" @click="click" :class="focus ? 'my-inputsfocus' : 'my-inputs-no-focus'">
      <!-- <div class="title">{{ title }}</div> -->
      <div class="left-input">
        <el-input v-model="preValue" style="width: 100%" placeholder="请输入" clearable @focus="handlerFocus"
          @blur="handlerBlur" />
      </div>
      <div class="sp"></div>
      <div class="right-input">
        <el-input v-model="middleValue" style="width: 100%" placeholder="请输入" clearable @focus="handlerFocus"
          @blur="handlerBlur" />
      </div>
      <div class="sp"></div>
      <div class="right-input">
        <el-input v-model="postValue" style="width: 100%" placeholder="请输入" clearable @focus="handlerFocus"
          @blur="handlerBlur" />
      </div>
    </div>
  
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    title: {
      type: String,
      default() {
        ''
      }
    }
  })
  const preValue = defineModel('preValue')
  const middleValue = defineModel('middleValue')
  const postValue = defineModel('postValue')
  
  const focus = ref(false)
  
  const handlerFocus = () => {
    focus.value = true
  }
  const handlerBlur = () => {
    focus.value = false
  }
  </script>
  
  <style lang="scss" scoped>
  .my-inputs {
    width: 100%;
    background-color: rgb(245, 245, 245);
    display: flex;
    align-items: center;
    // border: 1px solid var(--report-border-color);
    border: 1px solid transparent;
  
    border-radius: 0px;
      // * {
    //   box-sizing: border-box;
    // }
  
    .title {
      padding-left: 12px;
      flex-grow: 0;
      white-space: nowrap;
      color: #737480;
      font-size: 14px;
  
    }
  
    .left-input {
      display: flex;
      justify-content: center;
      flex-grow: 1
    }
  
    // .sp {
    //   width: 12px;
    //   flex-grow: 0;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   color: var(--report-border-color);
    //   ;
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
  
  
  
  
  
    .right-input {
      flex-grow: 1
    }
  
    :deep(.report-input__wrapper) {
      box-sizing: border-box;
      box-shadow: none;
      height: 44px;
      border: 1px solid transparent;
      background-color: rgb(245, 245, 245);
    }
  
    // &:hover {
    //     // border: 1px solid var(--report-border-color-hover);
    //     box-shadow: 0 0 0 1px var(--report-color-primary);
    // }
  
    :deep(.report-input__inner) {
      transform: translateY(2px);
      text-align: center;
  
     // placeholder文字
      &::placeholder {
        font-size: 15px;
        color: var(--report-input-placeholder-color);
        text-align: center;
      }
    }

    :deep(.report-input__suffix) {
    width: 0px;
    background-color: rgb(245, 245, 245);
    position: absolute;
    right: 24px;

  }
  
  
  }
  
  .my-inputsfocus {
    // border: 1px solid var(--report-color-primary)!important;
    box-shadow: 0 0 0 1px var(--report-color-primary);
  
  }
  </style>
  