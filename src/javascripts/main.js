import "./reactApp.jsx";
import my from "./my";
import "../stylesheets/main.scss"; // jsファイル以外を読み込む時はloaderが必要(例：css-loader)

import Vue from "vue";
import VueApp from "./vueApp.vue";
new Vue({
  el: "#vue-root",
  render: (h) => h(VueApp),
});
console.log("This is index.js");
my();
