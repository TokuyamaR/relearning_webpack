const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          // moduleはしたから順に適用される(style-loaderは必ずcss-laoderの上に記述する)
          {
            loader: "style-loader", //cssファイルを適用するためのモジュール(正確にはHTMLの中にスタイルタグを注入する役割を担っている)
          },
          {
            loader: "css-loader", //jsファイルにcssファイルを読み込ませるためのモジュール
          },
        ],
      },
    ],
  },
};
