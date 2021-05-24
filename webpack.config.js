const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./javascripts/main.js",
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
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css",
    }),
    new HtmlWebpackPlugin({ template: "src/templates/index.html" }), // templateにビルドされたJS, cssファイルが全て読み込まれる
    new CleanWebpackPlugin(), // outputディレクトリ配下にて、自動生成されるファイル以外の不要ファイルを削除する
  ],
};
