import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import fxlUI from "../packages/index";
import hljs from "highlight.js";
// import "highlight.js/styles/color-brewer.css";

// 导入 start
// 这里的导后，才有 element plus 的 css变量！
// import 'element-plus/theme-chalk/index.css';
// import 'element-plus/theme-chalk/src/index.scss';
// 导入 end 

import router from "@/router";
// import mzlUI from '../dist/mzl-ui.es'
// import '../dist/style.css'
const app = createApp(App);
app.use(fxlUI);
app.use(router);
app.use(createPinia());
hljs.configure({
  ignoreUnescapedHTML: true,
  languages: [
    "javascript",
    "css",
    "python",
    "html",
    "bash",
    "java",
    "sql",
    "json",
    "http",
    "go",
    "c++",
    "c#",
    "",
  ],
});
app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
app.mount("#app");
