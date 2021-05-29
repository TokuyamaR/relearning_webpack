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
      {
        test: /\.(png|jpe?g)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true, // 出力されるファイルをフォーマットするか
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css", // jsにimportされたcssをcssファイルを切り離して自動生成する
    }),
    // templateにビルドされたJS, cssファイルが全て読み込まれる
    new HtmlWebpackPlugin({
      template: "src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/access.pug",
      filename: "access.html",
    }),
    new CleanWebpackPlugin(), // outputディレクトリ配下にて、自動生成されるファイル以外の不要ファイルを削除する
  ],
};
