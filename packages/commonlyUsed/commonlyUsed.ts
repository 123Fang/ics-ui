/**
 * 功能需求：
 * 1 保存用户常用设置
 * 2 获取用户保存常用设置 
 * 
 * 
 * 保存的数据的结构如下：
 * [user_id]-commonlyUsed : {
 *   1908: [xxx],
 *   1918: [xxx],
 *   ...
 * }
 * **/

export const useCommonlyUsed = () => {

    // 获取本地存储的 key 
    const getLocalStorageKey = ():string => {
        const useId = localStorage.getItem('user_id') || 'useId'
        const localStorageKey = useId + '-' + 'commonlyUsed'
        return localStorageKey
      }

      // 1 保存用户常用设置
      const saveLocalData = (data, functionCode:string):void => {
        const localStorageKey = getLocalStorageKey()

        if (!localStorage.getItem(localStorageKey)) {
          localStorage.setItem(localStorageKey,JSON.stringify({
            [functionCode]: data
          }))
          return
        }
        const obj = JSON.parse(localStorage.getItem(localStorageKey))
        obj[functionCode] = data
        localStorage.setItem(localStorageKey,JSON.stringify(obj))
      }


      // 2 获取用户保存常用设置
      const getLocalData = (functionCode:string) => {
        if (localStorage.getItem(getLocalStorageKey())) {
          const obj =  JSON.parse(localStorage.getItem(getLocalStorageKey()))

          if (obj && obj[functionCode]) {
            console.log(functionCode, obj[functionCode])
            return obj[functionCode]
          }
        }
        return null
      }

       // 清除对应的本地缓存
       const clearLocalData =(functionCode:string) => {
        if (localStorage.getItem(getLocalStorageKey())) {
          const obj =  JSON.parse(localStorage.getItem(getLocalStorageKey()))
          if (obj && obj[functionCode]) {
            delete obj[functionCode]

            localStorage.setItem(getLocalStorageKey(),JSON.stringify(obj))

          }
        }
      }

    return {
        getLocalData,
        saveLocalData,
        clearLocalData
    }
}