const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
          // moduleは "下" から順に適用される
          // {
          //   loader: "style-loader", //cssファイルを適用するためのモジュール(正確にはHTMLの中にスタイルタグを注入する役割を担っている)
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", //jsファイルにcssファイルを読み込ませるためのモジュール
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: "src/index.html" }), // templateにビルドされたJS, cssファイルが全て読み込まれる
  ],
};
