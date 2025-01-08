<template>
  <el-config-provider namespace="report">
    <div 
      class="my-inputs" 
      @click="click" 
      :class="focus ? 'my-inputsfocus' : 'my-inputs-no-focus'"
    >
      <!-- <div class="title">{{ props.title }}</div> -->
      <div class="left-input">
        <el-input 
          v-model="localPreValue" 
          style="width: 100%" 
          placeholder="请输入" 
          clearable 
          @focus="handlerFocus"
          @blur="handlerBlur" 
        />
      </div>
      <div class="sp"></div>
      <div class="right-input">
        <el-input 
          v-model="localPostValue" 
          style="width: 100%" 
          placeholder="请输入" 
          clearable 
          @focus="handlerFocus"
          @blur="handlerBlur" 
        />
      </div>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
export default {
    name: "fx-inputs"
}
</script>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { ElConfigProvider, ElInput } from 'element-plus';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  preValue: {
    type: String,
    default: ''
  },
  postValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:preValue', 'update:postValue']);

const focus = ref(false);

const localPreValue = computed({
  get() {
    return props.preValue;
  },
  set(value) {
    emit('update:preValue', value);
  }
});

const localPostValue = computed({
  get() {
    return props.postValue;
  },
  set(value) {
    emit('update:postValue', value);
  }
});

const handlerFocus = () => {
  focus.value = true;
};

const handlerBlur = () => {
  focus.value = false;
};
</script>

<style lang="scss" scoped>
.my-inputs {
  width: 100%;
  background-color: rgb(245, 245, 245);
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0px;

  .title {
    padding-left: 12px;
    flex-grow: 0;
    white-space: nowrap;
    color: #737480;
    font-size: 14px;
  }

  .left-input,
  .right-input {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .sp {
    flex-grow: 0;
    &::before {
      content: '';
      display: inline-block;
      height: 2px;
      width: 10px;
      background-color: rgba(121, 110, 101, .6);
      transform: translateY(0px);
    }
  }

  :deep(.report-input__wrapper) {
    box-sizing: border-box;
    box-shadow: none;
    height: 44px;
    border: 1px solid transparent;
    background-color: rgb(245, 245, 245);
    padding: 0px 11px;
  }

  :deep(.report-input__inner) {
    transform: translateY(2px);
    text-align: center;
    &::placeholder {
      font-size: 15px;
      text-align: center;
    }
  }
}

.my-inputsfocus {
  box-shadow: 0 0 0 1px var(--report-color-primary);
}
</style>