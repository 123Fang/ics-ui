<template>
    <!-- 自由组合 -->
    <div class="part">
        <div><span class="part-title">自由组合</span></div>
        <el-row :gutter="16">
            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6" style="margin-bottom: 30px;">
                <inputSelect ref="inputSelect1Ref" number prop="freeCombination"
                    @entertSelected="(arr) => handlerEntertSelected(arr, '1')" @clear="settingGroupChecked = []">
                </inputSelect>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                <el-checkbox style="transform: translateY(6px);margin-right: 10px" :indeterminate="isGroupIndeterminate"
                    v-model="checkGroupAllFlag" @change="handleCheckAllChange">全选</el-checkbox>

            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="12" :xl="12" style="text-align: right;">
                <el-image style="transform: translateY(3px); width: 24px; cursor: pointer;" :src="upImg"
                    :class="!collapse_D ? 'rotate180deg' : ''" @click="handlerCollapse('D')" />
            </el-col>

            <el-col :span="24" v-show="collapse_D">
                <checkBlock :options="groupConSelectList" v-model="settingGroupChecked" value="id" label="fldItemName"
                    prop="freeComposition" @change="handleCheckedChange" @historyCheck="isGroupIndeterminate = true">
                </checkBlock>
            </el-col>
        </el-row>
        <div class="model-line"></div>
    </div>


    <!-- 显示内容设置 -->
    <div class="part">
        <div>
            <span class="part-title">显示内容设置</span>
        </div>
        <el-row :gutter="16">
            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6" style="margin-bottom: 30px;">
                <inputSelect ref="inputSelect2Ref" number prop="ab"
                    @entertSelected="(arr) => handlerEntertSelected(arr, '2')" @clear="settingShowChecked = []">
                </inputSelect>
            </el-col>
            <!-- 全选 --->
            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                <el-checkbox style="transform: translateY(6px);margin-right: 10px" :indeterminate="isShowIndeterminate"
                    v-model="checkShowAllFlag" @change="handleShowCheckAllChange">全选</el-checkbox>
            </el-col>


            <el-col :xs="8" :sm="8" :md="8" :lg="12" :xl="12" style="text-align: right;">
                <el-image style="transform: translateY(4px); width: 24px; cursor: pointer;" :src="upImg"
                    :class="!collapse_E ? 'rotate180deg' : ''" @click="handlerCollapse('E')" />
            </el-col>

            <!-- checkbox选项 --->
            <el-col :span="24" v-show="collapse_E">
                <checkBlock :options="showConSelectList" v-model="settingShowChecked" value="id" label="fldItemName"
                    prop="viewContent" @change="handleShowCheckedChange" @historyCheck="isShowIndeterminate = true">
                </checkBlock>
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import $http from '@/api';
import upImg from '@/assets/up.png'

const props = defineProps({
    pre: {
        type: Array,
        default() {
            return []
        }
    },
    post: {
        type: Array,
        default() {
            return []
        }
    }
})
const emit = defineEmits(['update:pre', 'update:post'])





const parentName = localStorage.getItem('parentName') // 基座名
const fldSite = computed(() => {
    if (parentName === 'franchised') return '1'
    if (parentName === 'smartPortal') return '2'
    if (parentName === 'ics2plus') return '0'
    return '0'
})



onMounted(() => {
    get_tb_item_select(1) // 自由组合选项设置
    get_tb_item_select(2) // 显示内容设置列表

})




const get_tb_item_select = async (fldType: number, showList?: string[]) => {
    const params = {
        fldType,
        fldSystemID: 1528,
        // fldCentralFlag: 0, // 这个字段需要去掉
        // fldSite: 1
        fldSite: fldSite.value
    }
    const { data } = await $http.SellGoods.get_tb_item_select(params);
    if (fldType === 1) { // 自由组合
        groupConSelectList.value = data
    } else { // 显示内容
        showConSelectList.value = data
    }
}


const showConSelectList = ref<ConSelectItem[]>([])
const isShowIndeterminate = ref(false)
const checkShowAllFlag = ref(false)
const settingShowChecked = ref<string[]>([])
const handleShowCheckAllChange = (val: any) => {
    settingShowChecked.value = [];
    if (val) {
        for (let i = 0; i < showConSelectList.value.length; i++) {
            settingShowChecked.value.push(showConSelectList.value[i].id);
        }
        isShowIndeterminate.value = false;
    }
}
// 显示内容设置
const handleShowCheckedChange = (val: any) => {
    settingShowChecked.value = val;
    const checkedCount = val.length;
    checkShowAllFlag.value = checkedCount === showConSelectList.value.length;
    isShowIndeterminate.value =
        checkedCount > 0 && checkedCount < showConSelectList.value.length;
}
const groupConSelectList = ref<ConSelectItem[]>([])
const isGroupIndeterminate = ref(false)
const checkGroupAllFlag = ref(false)

const settingGroupChecked = ref<string[]>([])
const handleCheckAllChange = (val: any) => {
    settingGroupChecked.value = [];
    if (val) {
        for (let i = 0; i < groupConSelectList.value.length; i++) {
            settingGroupChecked.value.push(groupConSelectList.value[i].id);
        }
        isGroupIndeterminate.value = false;
    }
}
const handleCheckedChange = (val: any) => {
    console.log('val', val)
    settingGroupChecked.value = val;
    const checkedCount = val.length;
    checkGroupAllFlag.value = checkedCount === groupConSelectList.value.length;
    isGroupIndeterminate.value =
        checkedCount > 0 && checkedCount < groupConSelectList.value.length;
}


const handlerEntertSelected = (arr: string[], type: string) => {
    if (type === '1') {
        settingGroupChecked.value = arr
    }
    if (type === '2') {
        settingShowChecked.value = arr
    }
}


const collapse_A = ref(true)
const collapse_B = ref(true)
const collapse_C = ref(true)
const collapse_D = ref(true)
const collapse_E = ref(true)
const collapse_F = ref(true)
const collapse_G = ref(true)
const handlerCollapse = (tag: string) => {
    switch (tag) {
        case 'A':
            collapse_A.value = !collapse_A.value
            break;
        case 'B':
            collapse_B.value = !collapse_B.value
            break;
        case 'C':
            collapse_C.value = !collapse_C.value
            break;
        case 'D':
            collapse_D.value = !collapse_D.value
            break;
        case 'E':
            collapse_E.value = !collapse_E.value
            break;
        case 'F':
            collapse_F.value = !collapse_F.value
            break;
        case 'G':
            collapse_G.value = !collapse_G.value
            break;
        default:
            break;
    }
}

const inputSelect1Ref = ref(null)
const inputSelect2Ref = ref(null)
const clearValue = () => {
    inputSelect1Ref.value.clearValue();
    inputSelect2Ref.value.clearValue();

    checkGroupAllFlag.value = false
    checkShowAllFlag.value = false
    settingGroupChecked.value = []
    settingShowChecked.value = []
    isShowIndeterminate.value = false
    isGroupIndeterminate.value = false

}


watch(settingGroupChecked, (newValue) => {
    emit('update:pre', newValue)
})
watch(settingShowChecked, (newValue) => {
    emit('update:post', newValue)
})

watch(() => props.pre, (newValue) => {
    settingGroupChecked.value = newValue
}, {
    immediate: true
})
watch(() => props.post, (newValue) => {
    settingShowChecked.value = newValue
}, {
    immediate: true
})

defineExpose({
    clearValue,
    showConSelectList,
    groupConSelectList
})


</script>

<style lang="scss" scoped>
.part {
    padding: 0px 24px 24px 24px;

    .part-title-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .title {
        display: flex;
        width: 100%;
        justify-content: space-between;

        .part-title {
            display: inline-block;

            height: 24px;
            line-height: 24px;
            color: rgb(121, 110, 101);
            letter-spacing: 1px;
            font-size: 17px;
            font-weight: 600;
            margin-right: 8px;
            margin-bottom: 24px;


        }

        .part-title-button {
            color: rgb(183, 142, 108);
            font-size: 15px;
            cursor: pointer;
        }

    }

    .sub-title {
        font-size: 15px;
        color: rgba(121, 110, 101, .6);
        letter-spacing: 1px;
        margin-bottom: 10px;
    }

    .part-title {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        color: rgb(121, 110, 101);
        letter-spacing: 1px;
        font-size: 17px;
        font-weight: 600;
        margin-right: 8px;
        margin-bottom: 24px;
    }

    .model-line {
        height: 4px;
        background-color: rgb(245, 245, 245);
        margin: 20px 0px 10px 0px;
    }

}
</style>