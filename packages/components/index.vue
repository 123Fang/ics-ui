<template>
  <div class="components">
    <!--  这里 item 是对象描述， 类似 json schema --->
    <!--  instance.exposeProxy 是父组件实例暴露的属性和方法 -->
    <el-form ref="ruleFormRef" label-width="90px" label-position="right" status-icon>

      <el-row :gutter="16">
        <template v-for="(item, index) in data" :key="index">
          <!-- 多选下拉 -->
          <el-col v-if="item.componentName === 'selectMultiple'" :xs="8" :sm="8" :md="8" :lg="8" :xl="6">
            <el-form-item :label="item.title" prop="name">
              <selectMultiple :title="item.title" v-model="form[item.vModel]" :prop="item.prop" :number="item.number"
                :disabled="instance.exposeProxy[item.disabled]" :options="instance.exposeProxy[item.options]"
                :labelAttr="item.labelAttr" :valueAttr="item.valueAttr" @change="instance.exposeProxy[item.change]">
              </selectMultiple>
            </el-form-item>
          </el-col>
          <!-- 单选下拉 -->
          <el-col v-if="item.componentName === 'selectSingle'" :xs="8" :sm="8" :md="8" :lg="8" :xl="6">
            <el-form-item :label="item.title" prop="name">
              <selectSingle :title="item.title" v-model="form[item.vModel]"
                :disabled="instance.exposeProxy[item.disabled]" :options="instance.exposeProxy[item.options]"
                :labelAttr="item.labelAttr" :valueAttr="item.valueAttr" @change="instance.exposeProxy[item.change]">
              </selectSingle>
            </el-form-item>
          </el-col>
          <!-- input输入框 -->
          <el-col v-if="item.componentName === 'inputSingle'" :xs="8" :sm="8" :md="8" :lg="8" :xl="6">
            <el-form-item :label="item.title" prop="name">
              <inputSingle :title="item.title" v-model="form[item.vModel]"></inputSingle>
            </el-form-item>
          </el-col>
          <!-- 两个input输入框  -->
          <el-col v-if="item.componentName === 'inputMultiple'" :xs="8" :sm="8" :md="8" :lg="8" :xl="6">
            <el-form-item  :label="item.title" prop="name">
              <inputMultiple :title="item.title" v-model:preValue="form[item.vModel[0]]"
                v-model:postValue="form[item.vModel[1]]"></inputMultiple>
            </el-form-item>
          </el-col>
           <!-- 三个 input输入框 -->
           <el-col v-if="item.componentName === 'inputThree'" :xs="8" :sm="8" :md="8" :lg="8" :xl="6">
            <el-form-item  :label="item.title" prop="name">
              <inputThree :title="item.title" v-model:preValue="form[item.vModel[0]]" 
               v-model:middleValue="form[item.vModel[1]]"
               v-model:postValue="form[item.vModel[2]]">
              </inputThree>
            </el-form-item>
          </el-col>
          <!-- 日期选择器 -->
          <el-col v-if="item.componentName === 'datePicker'" :xs="12" :sm="12" :md="8" :lg="8" :xl="6">

            <el-form-item  :label="item.title" prop="name">
              <datePicker :title="item.title" v-model:preValue="form[item.vModel[0]]"
                v-model:postValue="form[item.vModel[1]]"></datePicker>
            </el-form-item>

          </el-col>
          <!-- 两个 select 单选 -->
          <el-col v-if="item.componentName === 'selects'" :xs="8" :sm="8" :md="8" :lg="8" :xl="6">
            <el-form-item  :label="item.title" prop="name">
              <selects :title="item.title" v-model:preValue="form[item.vModel[0]]"
                v-model:postValue="form[item.vModel[1]]" :labelAttr="item.labelAttr" :valueAttr="item.valueAttr"
                :options1="instance.exposeProxy[item.option1]" :options2="instance.exposeProxy[item.option2]"
                :disabled="instance.exposeProxy[item.disabled]" @change="instance.exposeProxy[item.change]">
              </selects>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { inject, onBeforeMount, watch } from 'vue'
import selectMultiple from '@/components/selectMultiple/index.vue'
import selectSingle from '@/components/selectSingle/index.vue'
import inputSingle from '@/components/input/index.vue'
import inputMultiple from '@/components/inputs/index.vue'
import datePicker from '@/components/datePicker/datePicker2.vue'
import selects from '@/components/selects/index.vue'
import inputThree from '@/components/inputThree/index.vue'

const instance = inject('instance')
const form = inject('form')
watch(() => form, () => {
}, { deep: true })
const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<style lang="scss" scoped>
.components {
  :deep(.report-form-item__label) {
    display: flex;
    align-items: center;
    transform: translateY(2px);
    height: 44px;
    line-height: 16px;
    font-size: 15px;
    color: rgb(121, 110, 101);
    text-align: right;
    letter-spacing: 1px;
  }
  :deep(.report-col) {
    margin-bottom: 0px!important;
  }
  :deep(.report-form-item) {
    margin-bottom: 20px;
  }
}
</style>
