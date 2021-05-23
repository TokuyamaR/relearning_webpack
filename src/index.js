import my from "./modules/my";
import "./modules/my.css"; // jsファイル以外を読み込む時はloaderが必要(例：css-loader)

console.log("This is index.js");
my();
