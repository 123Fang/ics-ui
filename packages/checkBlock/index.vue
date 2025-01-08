<template>
    <div class="check-block-group">
        <el-row :gutter="16" v-if="!single">
            <el-col v-for="(item, index) in options" :key="index" :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
                <div :class="['check-block-item', item.selected ? 'check-block-item-selected' : '']"
                    @click="handleClickItem(item)">
                    {{ item[props.value] + ')' + item[props.label] }}
                    <div class="triangle"></div>
                </div>
            </el-col>
        </el-row>


        <el-row :gutter="16" v-if="single">
            <el-col v-for="(item, index) in options" :key="index" :span="6">
                <div :class="['check-block-item', item.selected ? 'check-block-item-selected' : '']"
                    @click="handleClickItem(item)">
                    {{ item[props.label] }}
                    <div class="triangle"></div>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useHistory } from '@/components/history/history'
const props = defineProps({
    modelValue: {
        type: Array,
        default() {
            return []
        }
    },
    options: {
        type: Array,
        default() {
            return []
        }
    },
    value: {
        type: String,
        default: 'value'
    },
    label: {
        type: String,
        default: 'label'
    },
    prop: {
        type: String,
        default: 'prop'
    },
    single: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue', 'change', 'add','delete', 'historyCheck'])

const selectValue = ref([])
selectValue.value = JSON.parse(JSON.stringify(props.modelValue))

// useHistory函数， 一个参数作为历史记录的key; 第二个参数作为历史记录的值
const { getHistory, registersetHistoryFn } = useHistory(props.prop, selectValue)
// getHistory函数，返回值是一个ref数组，存放已经存在的历史记录
const historyList = getHistory() // 返回对应的历史记录（数组ref）
registersetHistoryFn() // 注册 (必须)



const updateCheckUi = (arr) => {
    props.options.forEach((item) => {
        const index = arr.findIndex((v) => {
            return v === item[props.value]
        })
        if (index > -1) {
            item.selected = true
        } else {
            item.selected = false
        }
    })
}

watch(() => props.modelValue, (val) => {
    selectValue.value = val
})


// 点击或父组件传入时，勾选对应的选项
watch(() => selectValue.value, (val) => {
    updateCheckUi(val)
}, { immediate: true })


// 加载时，如果有历史记录，则勾选上一次选中的内容
watch(() => props.options, () => {
    if (historyList.value.length) {
        // historyList 保存的历史记录列表,默认保留三次提交，数组的第一个是最近一次记录。
        const val: string[] = historyList.value[0].record?.split(',')
        emit('historyCheck') // 改变外部全选checkbox状态为要已选
        emit('update:modelValue',val) // 告诉父组件更新v-model数据
    }
}, { immediate: true })


const handleClickItem = (item) => {
    item.selected = !item.selected
    if (item.selected) {
        selectValue.value.push(item[props.value])
        emit('add', item)
    } else {
        const index = selectValue.value.findIndex((val) => val === item[props.value])
        selectValue.value.splice(index, 1)
        emit('delete', item)
    }
    const data = JSON.parse(JSON.stringify(selectValue.value))
    emit('update:modelValue', data)
    emit('change', data)
}
</script>

<style lang="scss">
.check-block-group {
    box-sizing: border-box;

    * {
        box-sizing: border-box;
    }

    .check-block-item {
        background-color: rgb(245, 245, 245);
        border: 1px solid rgb(245, 245, 245);
        min-width: 120px;
        padding: 11px 12px;
        height: 44px;
        color: rgb(121, 110, 101);
        font-size: 14px;
        margin-bottom: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap
        
    }

    .check-block-item-selected {
        position: relative;
        background-color: #fff;
        border: 1px solid var(--report-color-primary);

        .triangle {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-bottom: 20px solid var(--report-color-primary);
            margin: 20px auto;
            bottom: -20px;
            right: 0px;

            &::after {
                content: "\2713";
                /* 使用Unicode字符 */
                position: absolute;
                bottom: -20px;
                left: -10px;
                font-size: 10px;
                color: #fff;
            }
        }
    }
    :deep(.report-col) {
        margin-bottom: 0px!important;
    }
}
</style>
