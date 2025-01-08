import {inject, ref, Ref} from 'vue'

/***
 * 历史记录功能：
 * 
 * 1 获取历史记录
 * 2 追加历史记录
 * 3 固定历史记录
 * 
 * **/
// 获取历史记录


/**
 * 最终保存在本地的结构：
 * 
 * [user_id]-'history': {
 *    [functionCode]: { // 如  1908，1918，1979
 *      [prop]: [{xxx},{xxx},{xxx}]， // 每个属性需要保存三条记录
 *      ...
 *    },
 *    ...
 * }
 * **/




export const useHistory = function(prop:string, value: Ref<any>) {
  // const historyQueue:any = ref([]) // 注册队列 
  const historyList = ref([])

  /**
   * 
   * 1908 ,1918 ,xxx 页面需要提供 功能编号 :
   *  provide('functionCode', '1908')
   * 
   * **/
  const historyQueue = inject('historyQueue')
  const functionCode: any = inject('functionCode') // 功能编号


    //  ['用户账号' + '-' + 'history'] 作为历史记录对象
   // const ROOT_HISTORY_KEY = localStorage.getItem('user_id') + '-' + 'history' // 正式作为子应用嵌入取值
  //  const ROOT_HISTORY_KEY = 'test-history' // 测试阶段用取值
   const ROOT_HISTORY_KEY =  (localStorage.getItem('user_id') || 'test-history') + '-' + 'history'



   //  1 获取历史记录
    const getHistory = () => {
        if (localStorage.getItem(ROOT_HISTORY_KEY)) {
          const rootHistoryObj = JSON.parse(localStorage.getItem(ROOT_HISTORY_KEY) as string)
          if (rootHistoryObj[functionCode]) {
            const functionCodeObj = rootHistoryObj[functionCode]
            if (functionCodeObj[prop]) {
              // 历史记录 historyList
              historyList.value = functionCodeObj[prop]
              return  historyList
            }
          }
        }
        return historyList
      }

      
     //  2 固定历史记录
     const setHistoryWhenChangeFixed = (fixedList:[]) => {
      const rootHistoryObj = getRootHistoryObj()
      const functionCodeObj = getFunctionCodeObj(rootHistoryObj)
      const historyRecords: [] = getHistoryRecords(functionCodeObj)

      historyRecords.forEach((item,index)=>{
        item.record = fixedList[index].record
        if(fixedList[index].fixed) {
          item.fixed = fixedList[index].fixed
        }
        if(!fixedList[index].fixed) {
          item.fixed = fixedList[index].fixed
        }
      })
      localStorage.setItem(ROOT_HISTORY_KEY, JSON.stringify(rootHistoryObj))
    }


      // 3 追加历史记录  ---- 提交表单时调用
      const setHistory = () => {

         /**  输入控件没有值，不追增加历史记录，直接返回  **/
        if (!value.value || value.value.length === 0) return
      
        const rootHistoryObj = getRootHistoryObj()
        const functionCodeObj = getFunctionCodeObj(rootHistoryObj)
        const historyRecords: [] = getHistoryRecords(functionCodeObj)
      
        addHistoryRecord(historyRecords, rootHistoryObj)
      }

      const getRootHistoryObj = () => {
        if (!localStorage.getItem(ROOT_HISTORY_KEY)) {
          localStorage.setItem(ROOT_HISTORY_KEY, JSON.stringify({}))
        }
        return JSON.parse(localStorage.getItem(ROOT_HISTORY_KEY) as string)
      }
      
      // ['1908']的数据
      const getFunctionCodeObj = (rootHistoryObj: any) => {
        if (!rootHistoryObj[functionCode]) {
          rootHistoryObj[functionCode] = {} // '1908': {}
        }
        return rootHistoryObj[functionCode]
      }
      
      const getHistoryRecords = (functionCodeObj: any) => {
        console.log('prop', prop)
        if (!functionCodeObj[prop]) {
          functionCodeObj[prop] = []
        }
        return functionCodeObj[prop]
      }
      
      const addHistoryRecord = (historyRecords: any[], rootHistoryObj: typeof Object) => {
        // 没有值就不添加
        if (!value.value) return
        if (value.value.length === 0) return
      
        let data = JSON.parse(JSON.stringify(value.value))
        if (Array.isArray(data)) {
          data = data.join(',')
        }
      
        // historyRecords.unshift({ record: data })
        const fixedList = historyRecords.filter((item)=>{
          return item.fixed
        })
        const noFixedList = historyRecords.filter((item)=>{
          return !item.fixed
        })

        // eslint-disable-next-line no-param-reassign

        const result = [...fixedList, { record: data }, ...noFixedList]
        historyRecords.length = 0
        historyRecords.push(...result)

      
        // 最多保留3条
        if (historyRecords.length > 3) {
          // eslint-disable-next-line no-param-reassign
          historyRecords.length = 3
        }
      
        // 写入 localStorage
        localStorage.setItem(ROOT_HISTORY_KEY, JSON.stringify(rootHistoryObj))
        console.log(`功能 [${functionCode}] 的表单属性 ${prop} ：${value.value} 已存入历史记录`)
      }




      /**
       * 注册当前设置历史记录的函数 (在父组件如1908提交成功, 就循环遍历调用 historyQueue数组中的每一个函数.,一次性设置所有历史记录)
       * 
       **/
      const registersetHistoryFn = () => { // 订阅
        historyQueue.value.push(setHistory)
      }
      // registersetHistoryFn()
      // 保存历史记录
      const saveHistory = () => { // 发布
        historyQueue.value.forEach((saveHistoryFn:()=>{}) => {
          saveHistoryFn()
        });
      }


      return {
        historyList,
        getHistory,
        setHistory,
        setHistoryWhenChangeFixed,

        
        registersetHistoryFn,
        saveHistory
      }

}