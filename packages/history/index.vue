<template>
    <div class="history-item" v-for="(item, index) in list" :key="index">
        <div class="content" @click="setRecord(item)">
            <el-image style="width: 16px; height: 16px;margin-right: 6px;transform: translateY(3px)" :src="historyUrl"
                fit="cover" />
            <span class="content-text">{{ item.record }}</span>
        </div>
        <div class="pin">
            <el-image style="width: 16px; height: 16px; transform: translateY(3px); cursor: pointer" 
            :src="item.fixed ? pinOneUrl : pinTwoUrl"
            fit="cover" 
            @click="switchFixed(item,index)" 
            />
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted, inject, watch, toRef } from 'vue'
import pinOneUrl from '@/assets/pin-one.png'
import pinTwoUrl from '@/assets/pin-two.png'
import historyUrl from '@/assets/history.png'


const props = defineProps({
  list: {
    type: Array,
    default () {
      return []
    }
  }
})
const emit = defineEmits(['historyRecord','fixed'])

const setRecord = (item:any) => {
  emit('historyRecord', item.record)
}

const switchFixed = (item,index) => {
  item.fixed = !item.fixed
  emit('fixed', item,index)
 
}


</script>

<style lang="scss" scoped>
.history-item {
    height: 28px;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .content {
      flex-grow: 1;
        .content-text {
            display: inline-block;
            font-size: 14px;
            color: rgb(29, 33, 41);

            &:hover {
                color: rgba(29, 33, 41, .6);
            }
        }
        &:hover {
          background-color: #f5f7fa;
    }
    }

    .pin {
      flex-grow: 0;
    }

}
</style>
