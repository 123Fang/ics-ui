<template>
  <div class="pre-code-box">
    <span class="m-copy" v-if="showCode" @click="copyCode"
      ><i class="fx-icon-copy"></i
    ></span>
    <transition name="slide-fade">
      <pre
        class="language-html"
        v-if="showCode"
        v-highlight
      ><code class="language-html">{{ sourceCode }}</code></pre>
    </transition>
    <div class="showCode">
      <div @click="showOrhideCode">
        <span>{{ showCode ? "隐藏代码" : "显示代码" }}</span>
        <i class="fx-icon-code"></i>
      </div>
      <div>
        <a :style="{textDecoration: 'none',color: 'inherit'}" :href="codePlaygroundUrl" target="_blank">在线编辑</a>
        <i class="fx-icon-electronics"></i>
      </div>
      
    </div>
    <textarea id="inputCopy" />
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import Message from "../../packages/message/index";
const props = defineProps({
  compName: {
    type: String,
    default: "",
    require: true,
  },
  demoName: {
    type: String,
    default: "",
    require: true,
  },
});


const showCode = ref(false);
const border = ref("1px solid rgba(0,0,0,.06)");
const showOrhideCode = () => {
  showCode.value = !showCode.value;
  if (showCode.value) {
    border.value = "0";
  } else {
    border.value = "1px solid rgba(0,0,0,.06)";
  }
};
const utoa = (data) => {
  return btoa(unescape(encodeURIComponent(data)));
};
let codePlaygroundUrl = ref("")
const serialize = (data) => {
  const files = {
    'src/App.vue': data
  }; // http://47.115.47.29/repl/
  // return 'http://localhost:5175/#' + utoa(JSON.stringify(files));
  return 'http://47.115.47.29/repl/#' + utoa(JSON.stringify(files));
};

const sourceCode = ref("");
async function getSourceCode() {
  const isDev = import.meta.env.MODE === "development";
  if (isDev) {
    sourceCode.value = (
      await import(
        /* @vite-ignore */ `/packages/${props.compName}/doc/${props.demoName}.vue?raw`
      )
    ).default;
    codePlaygroundUrl.value = serialize(sourceCode.value)
  } else {
    sourceCode.value = await import(
      `../../packages/${props.compName}/doc/${props.demoName}.vue?raw`
    ).then((res) => {
      console.log('code:', res.default)
      codePlaygroundUrl.value = serialize(res.default)
      return res.default
    }).catch((err) => {
      console.log('err---',err)
    });
  }
}
const copyCode = () => {
  const input = document.getElementById("inputCopy");
  input.value = sourceCode.value;
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    Message({
      type: "success",
      text: "代码复制成功",
    });
  } else {
    Message({
      type: "error",
      text: "代码复制成功",
    });
  }
};
onMounted(() => {
  getSourceCode();
});
</script>

<style scoped lang="scss">
#inputCopy {
  opacity: 0;
  border: 0;
  outline: none;
  height: 0;
  position: fixed;
  z-index: -99999999;
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0.5;
}
.pre-code-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  border-top: 0;
  margin: 0px 0 15px 0;
  position: relative;
  transition: all 0.15s ease-out;
  .m-copy {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    i {
      font-size: 22px;
      color: #b7b3b3;
      &:hover {
        color: #000;
      }
    }
  }
  .showCode {
    width: 100%;
    line-height: 36px;
    font-size: 14px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;

    background: rgb(233, 233, 235);
    box-shadow: 0px 16px 15px -16px rgb(0 0 0 / 10%);
    color: #505050;
    cursor: pointer;
    i {
      margin-left: 10px;
    }
    i.rotate {
      transform: rotate(180deg);
    }
    >div:hover {
      // background: #f9f9f9;
      color: #0e80eb;
    }
  }
  &:hover {
    box-shadow: 0px 16px 15px -16px rgb(0 0 0 / 10%);
  }
}
</style>
