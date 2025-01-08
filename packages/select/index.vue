<template>
      <el-config-provider namespace="report">
    <div ref="roolRef"  :class="['test-my-select', 'test-my-select-collapseTags',
        maxCollapseTags === 1 ? 'change-input-postion-for-tag-bug' : '',
        selectContainerRef ? 'add-line-linear-gradient-for-select' : ''
    ]">
        <el-tooltip ref="tooltipRef" class="box-item" trigger="" effect="dark"
            :content="number ? '输入格式错误，请输入数字或以英文逗号分割的数字！' : '输入格式错误，请输入字母或以英文逗号分割的字母！'" placement="top">

            <el-select v-if="!useVirtualizedScroll" ref="selectRef" v-model="selectValue" :placeholder="placeholderText" filterable
                multiple allow-create  clearable no-data-text="暂无数据" :reserve-keyword="false"
                @blur="handleBlur" @change="(v) => props.number ? changeForNumber(v) : change(v)"
                @visible-change="visibleUiChange" v-bind="$attrs" :collapse-tags="collapseTags"
                :max-collapse-tags="maxCollapseTags">
                <el-option v-for="item in computedOptions" :key="item[props.valueAttr] + item[props.labelAttr[0]]"
                    :label="item[props.labelAttr[0]] + ')' + item[props.labelAttr[1]]" :value="item[props.valueAttr]">
                </el-option>
            </el-select>


            <!-- 虚拟滚动 -->
            <el-select-v2 v-if="useVirtualizedScroll" v-model="selectValue" :options="computedOptions" multiple
                allow-create filterable :placeholder="placeholderText" clearable no-data-text="暂无数据" :collapse-tags="collapseTags"
                :max-collapse-tags="maxCollapseTags"
                @blur="handleBlur" @change="(v) => props.number ? changeForNumber(v) : change(v)"
                @visible-change="visibleUiChange">
                <template #default="{ item }">
                    <div class="test-my-select-option-text-container" v-if="item[props.labelAttr[0]] == 0 || item[props.labelAttr[0]]">
                        <span :class="['test-my-select-option-text', item.val ? 'hight-light-select-option-text' : '']"
                            style="margin-left:10px;color: rgb(29, 33, 41);
                    font-size: 14px" @click="item.val = !item.val">{{ item[props.labelAttr[0]] + ')' +
                        item[props.labelAttr[1]] }}</span>
                    </div>
                </template>
            </el-select-v2>
        </el-tooltip>
        <div v-if="maxCollapseTags === 100 && selectValue.length" class="tag-number-tip">{{ selectValue.length }}</div>
        <div v-if="maxCollapseTags === 1 && selectValue.length" class="tag-clear-tip"><el-image :src="clearImg" /></div>
    </div>
</el-config-provider>
</template>



<script lang="ts">
export default {
    name: "fx-select"
}
</script>
<script lang="ts" setup>
import { ref, watch, onMounted, type PropType, computed } from 'vue'
import clearImg from '@/assets/close.png'
import { cpSync } from 'fs'




interface Option {
    [key: string]: string // 字符串索引签名
    label: string
    value: string
}
const props = defineProps({
    title: String,
    options: { /** 下拉回显的数据 **/
        type: Array as PropType<Option[]>,
        default: () => []
    },
    labelAttr: {
        type: Array as PropType<string[]>,
        // default: () => ['label', 'value']
        default: () => ['value','label']
    },
    valueAttr: {
        type: String,
        default: 'value'
    },
    modelValue: {
        type: [Array, String]
    },
    number: {
        type: Boolean,
        default: false
    },
    prop: { // from 属性，给history组件做缓存
        type: String,
        default: ''
    },
    upperCase: { // 默认字母字符串会转大写
        type: Boolean,
        default: true
    },
    /**
     * 
   * 虚拟滚动触发的两种方式：
   * 
   * 1 如果下拉数据量超过 500 条数据，会自动使用虚拟滚动。
   * 2 通过 props 传入，virtualized: true  ，会使用虚拟滚动。
   * 
   * **/
    virtualized: { // 是否启用虚拟滚动
        type: Boolean,
        default: false
    }
});

const useVirtualizedScroll = ref(false)

const computedOptions = computed(() => {
    if (props.number) {
        props.options.forEach((optionItem) => {
            const valueKey = props.valueAttr
            optionItem[valueKey] = Number(optionItem[valueKey])
        })
    }

    // 如果传入的 virtualized 为 true, 或者 数据量大于500条，就启用虚拟滚动！
    if (props.virtualized || props.options.length > 500) {
        console.log('下拉数据大于500条,总条数为：', props.options.length, props.options)
        useVirtualizedScroll.value = true
        props.options.forEach((item) => {
            item.label = `${item[props.labelAttr[0]]})${item[props.labelAttr[1]]}`
            item.value = item[props.valueAttr]
        })
    } else {
        useVirtualizedScroll.value = false
    }

    return props.options
})

watch(() => props.options, (val) => {
    if (props.number) {
        val.forEach((optionItem) => {
            const valueKey = props.valueAttr
            optionItem[valueKey] = Number(optionItem[valueKey])
        })
    }
})

const emit = defineEmits(['update:modelValue', 'change'])
const selectValue = ref([])
let lastValue = [] // 缓存上一次得值，用来和当前值对比对，判断是新增还是删除。
watch(selectValue, (val) => {
    emit('update:modelValue', val)
})
watch(() => props.modelValue, (val) => {
    selectValue.value = val
    if (val?.length === 0) {
        props.options.forEach((item) => {
            item.val = false
        })
        lastValue = []

        selectContainerRef.value = false // 清空值后，状态切换为初始状态！
    }
})
const collapseTags = ref(true)
const selectRef = ref<any>(null)
const tooltipRef = ref<any>(null)




// const selectContainerRef = ref<any>(null)
// const roolRef = ref<any>(null)
// const placeholderText = ref('请选择')
// const maxCollapseTags = ref(1)
// // 下拉框出现/隐藏时触发
// const visibleUiChange = (show: any) => {
//     if (show) { // 展开
//         maxCollapseTags.value = 1
//         placeholderText.value = '多个用逗号隔开，如 A,B,C'
//     } else { // 收起
//         maxCollapseTags.value = 100
//         placeholderText.value = '请选择'
//     }
//     setTimeout(() => {
//         setTagOverStyle()
//     })
// }

const change = (val: any) => {
    setTimeout(() => { setTagOverStyle() })


    if (val.length === 0) { // clearable 清空时
        props.options.forEach((item) => { item.val = false })
        setTimeout(() => {
            lastValue = []
            emit('change', [])
        })
        return
    }

    const checkBoxStateUiChange = (value: string, state: boolean) => {
        props.options.forEach((item) => {
            if (item[props.valueAttr] === value) {
                item.val = state
            }
        })
    }
    const pushValueInSelectValue = (value: string) => {
        props.options.forEach((item) => {
            if (item[props.valueAttr] === value && item.val) {
                if (!selectValue.value.includes(value)) {
                    selectValue.value.push(value)
                }
            }
        })
    }

    // console.log('chang 事件 的 val----, 也就是当前选中的数据 value 值：', val)
    // console.log('上一次选中的数据 value 值---lastValue：', lastValue)

    // 只能输入字母或以逗号分割的字母
    const addItem: string = val[val.length - 1]
    const regex = /^[a-zA-Z]+(,[a-zA-Z]+)*$/
    if (!regex.test(addItem)) {
        selectValue.value.pop() // 删除错误项
        tooltipRef.value.onOpen() // UI提示输入错误
        return
    }

    if (val.length > lastValue.length) { // 新增
        let addItem: string = val[val.length - 1]
        // 带逗号的多个输入
        if (addItem.includes(',')) {
            if (!addItem.startsWith(',')) {
                selectValue.value.pop()
                addItem.split(',').forEach((str) => {
                    // str = str.toUpperCase()
                    str = props.upperCase ? str.toUpperCase() : str // 字母统一转大写

                    checkBoxStateUiChange(str, true)
                    pushValueInSelectValue(str)
                })
            } else {
                // console.log('第一个字符是英文逗号')
                selectValue.value.pop()
                addItem.split(',').forEach((str) => {
                    // str = str.toUpperCase() // 字母统一转大写
                    str = props.upperCase ? str.toUpperCase() : str // 字母统一转大写

                    checkBoxStateUiChange(str, true)
                    pushValueInSelectValue(str)
                })
            }
        } else { // 单个输入
            selectValue.value.pop()

            // addItem = addItem.toUpperCase() // 字母统一转大写
            addItem = props.upperCase ? addItem.toUpperCase() : addItem // 字母统一转大写

            checkBoxStateUiChange(addItem, true)
            pushValueInSelectValue(addItem)
        }
    } else { // 删除
        let deleteItem = lastValue.filter((item) => val.indexOf(item) === -1)
        deleteItem = deleteItem[0]
        checkBoxStateUiChange(deleteItem, false)
    }

    setTimeout(() => {
        // lastValue = val
        lastValue = JSON.parse(JSON.stringify(selectValue.value))
        emit('change', val)
    })
}

const changeForNumber = (val) => {
    setTimeout(() => {setTagOverStyle()})

    if (val.length === 0) {
        props.options.forEach((item) => { item.val = false })
        setTimeout(() => {
            lastValue = []
            emit('change', [])
        })
        console.log('清空 value: ', val)
        return
    }

    const checkBoxStateUiChange = (value: number, state: boolean) => {
        props.options.forEach((item) => {
            if (item[props.valueAttr] === value) {
                item.val = state
            }
        })
    }

    const pushValueInSelectValue = (value: number) => {
        props.options.forEach((item) => {
            if (item[props.valueAttr] === value && item.val) {
                if (!selectValue.value.includes(value)) {
                    selectValue.value.push(value)
                }
            }
        })
    }

    console.log('chang 事件 的 val----, 也就是当前选中的数据 value 值：', val)
    console.log('上一次选中的数据 value 值---lastValue：', lastValue)
    const addItem: string = val[val.length - 1]
    const regex = /^[0-9]+(,[0-9]+)*$/
    if (!regex.test(addItem)) {
        selectValue.value.pop()
        console.log('不符合', addItem)
        tooltipRef.value.onOpen()
        return
    }

    if (val.length > lastValue.length) { // 新增
        const addItem: number | string = val[val.length - 1]
        // 带逗号的多个输入
        if (typeof addItem === 'string' && addItem.includes(',')) {
            if (!addItem.startsWith(',')) {
                selectValue.value.pop()
                console.log('批量新增：', addItem.split(','))
                addItem.split(',').forEach((str) => {
                    const num = Number(str)
                    checkBoxStateUiChange(num, true)
                    pushValueInSelectValue(num)
                })
            } else {
                // console.log('第一个字符是英文逗号')
                selectValue.value.pop()
                console.log('批量新增：', addItem.split(','))
                addItem.split(',').forEach((str) => {
                    const num = Number(str)
                    checkBoxStateUiChange(num, true)
                    pushValueInSelectValue(num)
                })
            }
        } else { // 单个输入
            if (typeof addItem === 'string') {
                selectValue.value.pop()
                const num = Number(addItem)
                checkBoxStateUiChange(num, true)
                pushValueInSelectValue(num)
            } else {
                selectValue.value.pop()
                checkBoxStateUiChange(addItem, true)
                pushValueInSelectValue(addItem)
            }
        }
    } else { // 删除
        let deleteItem = lastValue.filter((item) => val.indexOf(item) === -1)
        deleteItem = deleteItem[0]
        console.log('删除的元素的 value ：', deleteItem)
        checkBoxStateUiChange(deleteItem, false)
    }
    setTimeout(() => {
        // lastValue = val
        lastValue = JSON.parse(JSON.stringify(selectValue.value))
        emit('change', val)
    })
}

// 输入框失焦时，选中输入框中对应的值
const handleBlur = (val) => {
    const inputValue: string = val.target?.value
    if (!inputValue) return

    selectValue.value.push(inputValue)
    const valueArray: string[] = JSON.parse(JSON.stringify(selectValue.value))
    if (props.number) {
        changeForNumber(valueArray)
    } else {
        change(valueArray)
    }
}

const selectContainerRef = ref<any>(null)
const roolRef = ref<any>(null)
const placeholderText = ref('请选择')
const maxCollapseTags = ref(1)
// 下拉框出现/隐藏时触发
const visibleUiChange = (show: any) => {
    if (show) { // 展开
        maxCollapseTags.value = 1
        placeholderText.value = '多个用逗号隔开，如 A,B,C'
    } else { // 收起
        maxCollapseTags.value = 100
        placeholderText.value = '请选择'
    }
    setTimeout(() => {
        setTagOverStyle()
    })
}

// 内部子元素宽度超过其自身宽度,添加一个文字逐渐变淡的css效果
const setTagOverStyle = () => {
  const selectionElements = roolRef.value.querySelectorAll('.is-near'); // select tag 的 父容器
  selectionElements.forEach(element => {
    if (element.scrollWidth > element.clientWidth) { // 内部子元素宽度超过其自身宽度
        selectContainerRef.value = true
    } else {
      selectContainerRef.value = false
    }
  });
}
// 宽度变化后，自动判断内部子元素宽度超过其自身宽度,添加一个文字逐渐变淡的css效果
onMounted(()=>{
    const rootDom = roolRef.value
    const resizeObserver = new ResizeObserver(setTagOverStyle)
    resizeObserver.observe(rootDom);
})


</script>

<style lang="scss" scoped>
.test-my-select {
    width: 100%;
    position: relative;

    .prefix-title {
        color: rgb(115, 116, 128);
        font-size: 14px;
    }

    :deep(.report-select__caret) {
        color: rgb(51, 52, 61);
    }

    :deep(.report-select) {
        box-shadow: none;
    }

    // tag标签的父容器
    :deep(.report-select__selection.is-near) {
        flex-wrap: nowrap; // 子节点不换行
        overflow: auto; // 超出父容器宽度时滚动
        // margin-right: 6px;
        // 隐藏滚动条
        &::-webkit-scrollbar {
            display: none;
        }
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
        height: 32px;
    }

    :deep(.report-select__tags-text) {
        // text-overflow: clip;
        position: relative;
    }

    // 圆球
    :deep(.report-select__selected-item.report-tooltip__trigger.report-tooltip__trigger) {
        display: none;
        position: absolute;
        right: -10px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        color: #fff;
        background-color: rgb(121, 110, 101);

        .report-select__tags-text {
            color: #fff;
            transform: translate(-10px, -6px);
        }
    }

    // placeholder 文字
    :deep(.report-select__placeholder.is-transparent) {
        font-size: 15px;
    }

    // 小球
    .tag-number-tip {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgb(121, 110, 101);
        color: #fff;
        font-size: 14px;
        position: absolute;
        right: 10px;
        top: 10px;
        line-height: 24px;
        text-align: center;
    }

    // X 关闭按钮
    .tag-clear-tip {
        position: absolute;
        right: 10px;
        top: 12px;
        background-color: #f5f5f5;
        width: 20px;
        height: 20px;
        pointer-events: none;
    }

    // tag 样式
    :deep(.report-select__selected-item) {
        .report-tag {
            border-radius: 0px;
            color: rgb(29, 29, 29);
            background-color: rgba(228, 226, 224, 0.5);
            font-size: 15px;
            max-width: 140px !important;
            // width: 100px;
        }
    }
}

.test-my-select-option-text-container {
    padding-right: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /* 防止文本换行 */
}


.test-my-select-option-text {
    width: 100%;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /* 防止文本换行 */



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

.hight-light-select-option-text {
    color: var(--report-color-primary) !important;
    font-weight: bold !important;
}



// report-select-dropdown__item


.test-my-select-collapseTags {
    :deep(.report-select__input-wrapper) {
        // 这里注释，为满足ipad的实现，注释后， input 才出现在第一tag后。
        position: absolute;
        z-index: -10;
    }
}

.test-my-select-close {
    :deep(.report-select__selection.is-near) {
        flex-wrap: wrap;
    }

    :deep(.report-select__selected-item) {
        .report-tag {
            border-radius: 0px;
            color: rgb(29, 29, 29);
            background-color: rgba(228, 226, 224, 0.5);
            font-size: 15px;
            width: auto;
            // width: 100px;
        }
    }

}

/***
*  .report-select__input-wrapper 设置定位 position: absolute; 解决点击单个tag关闭时，多个tag状态下会向左滚动超出父容的bug.
*  但是，点击后下拉展开后，input输入框要出现在第一个tag后面，需要把 .report-select__input-wrapper 的  position 改为 static;
*/
.change-input-postion-for-tag-bug {
    :deep(.report-select__input-wrapper) {
        // position: static; input 才出现在第一tag后。
        position: static;
        z-index: 999;    
    }
}



// .add-line-linear-gradient-for-select 这个类，负责给下拉组件最右边添加一个图片蒙层，模拟tag 逐渐变淡的效果。
// 添加时机在 setTagOverStyle 方法中动态添加，因为需要判断tag是否超出了父元素。
.add-line-linear-gradient-for-select {
    :deep(.report-select__wrapper) {
       
        &::after {
            // border: 1px solid greenyellow;
            display: inline-block;
            height: 30px;
            width: 69;
            height: 40px;
            content: "";
            position: absolute;
            right: 0px;
            top: 0px;
            pointer-events: none;
            cursor: pointer;
            // padding-left: 30px;
            background-image: url('@/assets/gradient.png');
        }
    }
}

</style>
<style lang="scss">

.text-overflow-linear-gradient {
    &:after {
        height: 16px;
        content: "";
        position: absolute;
        right: 0px;
        padding-left: 30px;
        background: linear-gradient(to left, rgb(236, 235, 234), rgba(245, 245, 245, 0));
    }
}

// 下拉框的样式
.report-popper.is-pure.is-light.report-select__popper {
    border-radius: 0px;
}

// .report-popper__arrow {
//     display: none;
// }

// 输入搜索时的第一项，是用户输入的文字，不需要响应点击事件。
.report-select-dropdown__item.is-created {
   pointer-events: none;
}

// 设置下拉框项右侧的对勾,
.report-select-dropdown.is-multiple  .report-select-dropdown__item.is-selected:after {
    width: 16px;
    height: 16px;
}





.report-select-dropdown.is-multiple .report-select-dropdown__item {

}

</style>
