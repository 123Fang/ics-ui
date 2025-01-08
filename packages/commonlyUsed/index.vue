<template>
  <div class="dragContainer">
    <el-drawer v-model="modelValue" :size="799" title="常用条件设置">
      <div class="dragComponent">
        <div class="left">
          <!--货品资料-->
          <div v-if="goods.length !== 0">
            <div class="title">货品资料</div>
            <checkBlock v-model="a" :options="goods" label="title" value="title" single @add="(v)=> handleAdd('a',v)" @delete="(v)=>handleDelete('a',v)"></checkBlock>
            <div class="line-style"></div>
          </div>

           <!--模号资料-->
          <div v-if="model.length !== 0">
            <div class="title">模号资料</div>
            <!-- <template v-if="model.length === 0">
              <el-empty description="模号资料暂无数据"  :image-size="50"  />
            </template> -->
            <checkBlock v-model="b" :options="model" label="title" value="title" single @add="(v)=> handleAdd('b',v)" @delete="(v)=>handleDelete('b',v)"></checkBlock>
            <div class="line-style"></div>
          </div>

          <!--分店资料-->
          <div v-if="branch.length !== 0">
            <div class="title">分店资料</div>
            <template v-if="branch.length === 0">
              <el-empty description="分店资料暂无数据" :image-size="50" />
            </template>
            <checkBlock v-model="c" :options="branch" label="title" value="title" single @add="(v)=> handleAdd('c',v)" @delete="(v)=>handleDelete('c',v)"></checkBlock>
          </div>

        </div>
        <!-- <div class="right">
          <div class="vueDraggable-head">
            <div class="seleted text-style">
              {{ `已选${list.length}个` }}
            </div>
            <div class="clear">
              <el-image style="transform: translateY(4px);" :src="deleteImg" />
              <span class="text-style" @click="handleClearAll">全部清除</span>
            </div>
          </div>
          <div class="tip-text">拖拽可调整展示位置和顺序</div>
          <VueDraggable v-model="list" item-key="title" class="dragArea">
            <div style="margin-bottom: 10px;" v-for="(item, index) in list" :key="index">
              <el-tag class="dargPoint" size="large" type="info" closable @close="closeTag(item)">
                <el-image style="transform: translateY(1px); margin-right: 4px;" :src="dargImg" />
                <span style="display: inline-block;transform: translateY(-2px)">{{ item.title }}</span>
              </el-tag>
            </div>
          </VueDraggable>
        </div> -->
      </div>

      <template #footer>
        <div style="display: flex; justify-content: space-between;align-items: center;">
          
          <div>
            <el-image style="transform: translateY(1px);" :src="imgBack"/>
            <span class="back-button-type" @click="defaultClick">还原默认</span>
          </div>
          <div>
            <el-button class="report-web-button-style" @click="cancelClick">取消</el-button>
            <el-button class="report-web-button-style" type="primary" @click="confirmClick">保存</el-button>

          </div>
         
        </div>
      </template>
    </el-drawer>
  </div>

</template>

<script lang="ts" setup>
import { inject, onUpdated, ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
import deleteImg from '@/assets/d.png'
import dargImg from '@/assets/darg.png'
import { ElMessage } from 'element-plus'
import { useCommonlyUsed } from '@/components/commonlyUsed/commonlyUsed'
import checkBlock from '@/components/checkBlock/index.vue'
import imgBack from '@/assets/back1.png'




const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  defaultCommonlyUsed: {
    type: Array,
    default() {
      return []
    }
  }
})


const functionCode: any = inject('functionCode') // 功能编号

const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}

const platformComponents = JSON.parse(JSON.stringify(props.data))
const goods = ref(platformComponents.goods)
const model = ref(platformComponents.model)
const branch = ref(platformComponents.branch)

// 优先使用用户保存的本地存储数据
const commonlyUsed = ref((platformComponents.commonlyUsed))


const filterValue = (arr1, arr2) => {
  let data = arr1.filter((item1) => {
    return arr2.find((item2) => {
      return item1.title === item2.title
    })
  })
  data = data.map((item) => {
    return item.title
  })
  return data
}


// el-drawer 展开或收起的时候重置状态
watch(() => props.modelValue, () => { reSetState() })

const reSetState = () => {
  commonlyUsed.value = JSON.parse(JSON.stringify(props.data.commonlyUsed))
  a.value = filterValue(goods.value, commonlyUsed.value)
  b.value = filterValue(model.value, commonlyUsed.value)
  c.value = filterValue(branch.value, commonlyUsed.value)
  list.value = JSON.parse(JSON.stringify(props.data.commonlyUsed))
}

const modelValue = defineModel('modelValue')
const emit = defineEmits(['setCommonlyUsed'])

const a = ref([]) // 货品资料
const b = ref([]) // 模号资料
const c = ref([]) // 分店资料
console.log('commonlyUsed.value', commonlyUsed.value)
// const list = ref(JSON.parse(JSON.stringify(commonlyUsed.value))) // VueDraggable 组件 v-model
const list = ref([])

const handleAdd = (type, item)=>{
  list.value.push(item)
}

const handleDelete = (type, item)=>{
  console.log('item',item)
  const index = list.value.findIndex((data) => data.title === item.title)
  list.value.splice(index, 1)

}





watch(() => props.data, (data) => {
}, { deep: true })



const closeTag = (data) => {
  const index = list.value.findIndex((item) => data.title === item.title)
  list.value.splice(index, 1)
  const indexA = a.value.findIndex((title) => data.title === title)
  console.log(indexA, a.value)
  if (indexA >= 0) {
    a.value.splice(indexA, 1)
    a.value = JSON.parse(JSON.stringify(a.value))
  }
  const indexB = b.value.findIndex((title) => data.title === title)
  if (indexB >= 0) {
    b.value.splice(indexB, 1)
    b.value = JSON.parse(JSON.stringify(b.value))
  }
  const indexC = c.value.findIndex((title) => data.title === title)
  if (indexC >= 0) {
    c.value.splice(indexC, 1)
    c.value = JSON.parse(JSON.stringify(c.value))
  }
  // const indexCommonlyUsed = commonlyUsed.value.findIndex((item) => data.title === item.title)
  // if (indexCommonlyUsed >= 0) {
  //   commonlyUsed.value.splice(indexCommonlyUsed, 1)
  // }
}

const handleClearAll = () => {
  a.value = []
  b.value = []
  c.value = []
  commonlyUsed.value = []
}

// 还原默认
const defaultClick = () => {
  const reSetState = () => {
    commonlyUsed.value = JSON.parse(JSON.stringify(props.defaultCommonlyUsed))
    a.value = filterValue(goods.value, commonlyUsed.value)
    b.value = filterValue(model.value, commonlyUsed.value)
    c.value = filterValue(branch.value, commonlyUsed.value)
    list.value = JSON.parse(JSON.stringify(props.defaultCommonlyUsed))
  }
  reSetState()
  // 清除对应的本地缓存 start 
  const { clearLocalData } = useCommonlyUsed()
  clearLocalData(functionCode)
  // 清除对应的本地缓存 end 
  emit('setCommonlyUsed', JSON.parse(JSON.stringify(props.defaultCommonlyUsed)))
}


// 保存
const confirmClick = () => {
  const allComponents = [...platformComponents.goods, ...platformComponents.model, ...platformComponents.branch]

  const data = list.value.map((item) => {
    return allComponents.find((compont) => compont.title === item.title)
  })

  emit('setCommonlyUsed', data)
  emit('update:modelValue', false)

  const { saveLocalData } = useCommonlyUsed()

  // 保存在本地
  console.log('----', functionCode)
  console.log('----', data)

  saveLocalData(data, functionCode)
}
const cancelClick = () => {
  emit('update:modelValue', false)
}



</script>

<style lang="scss" scoped>
.dragContainer {
  .dragComponent {
    display: flex;
    position: relative;

    .left {
      // width: calc(100% - 180px);
      height: calc(100vh - 190px);
      overflow-y: auto;
      overflow-x: hidden;
      // border: 1px solid rgb(229, 230, 235);
      padding-right: 20px;

      .title {
        font-size: 17px;
        color: rgb(121, 110, 101);
        font-weight: 600;
        margin-bottom: 30px;

      }
    }

    .right {
      height: calc(100vh - 190px);
      border: 1px solid rgb(229, 230, 235);
      // background-color: #f8f8f8;
      // overflow: auto;
      // overflow-y: auto;
      // overflow-x: hidden;



      .tip-text {
        padding: 24px;
        color: rgb(121, 110, 101);
        font-size: 13px;
      }

      .vueDraggable-head {
        position: relative;
        box-sizing: border-box;
        width: 266px;
        display: flex;
        align-items: center;
        padding: 17px 24px;
        justify-content: space-between;
        // height: 40px;
        border-bottom: 1px solid rgb(229, 230, 235);



        .text-style {
          color: rgb(121, 110, 101);
          font-size: 15px;
          font-weight: 400;

        }

        .seleted {
          font-size: 14px;
          font-weight: 400;
        }

        .clear {
          cursor: pointer;
        }
      }

      .dragArea {
        padding: 0px 22px 22px 22px;
        height: calc(100% - 146px);
        // border: 1px solid rgba(229, 230, 235, .7);
        overflow: auto;
      }
    }

    .dragItem {
      background-color: #fff;
      height: 20px;
      border: 1px solid #ddd;
      // margin: 5px 0;
      // padding: 10px;
      cursor: move;
    }

    .bottom {
      position: absolute;
      bottom: 0px;
      height: 40px;
      border: 1px solid rgb(229, 230, 235);

    }

  }

  .dargPoint {
    cursor: move;
    // width: 220px;
    // height: 32px;
    color: rgb(29, 29, 29);
    font-size: 15px;
  }

  :deep(.report-drawer__footer) {
    border-top: 1px solid rgb(229, 230, 235);
    padding-top:15px ;
    padding-bottom: 15px;
  }

  :deep(.report-empty) {
    padding: 0px;
  }

  .line-style {
    height: 1px;
    background-color: rgb(245, 245, 245);
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .back-button-type {
    color: rgb(121, 110, 101);
    font-size: 15px;
    cursor: pointer;
    margin-left: 8px;
  }
  :deep(.report-drawer__header) {
    margin-bottom: 24px;
    > span {
      font-size: 17px!important;
      font-weight: 600;
      color: rgb(121, 110, 101);

    }
   
  }
}

.report-web-button-style {
  height: 44px;
  padding: 10px 40px;
  border-radius: 0px;
  font-size: 15px !important;
}
</style>
