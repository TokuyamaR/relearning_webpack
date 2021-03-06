const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // ここを指定しておくと、CLIにてmodeのオプション指定が不要となる
  devtool: "source-map",
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./javascripts/main-[contenthash].js",
  },
  module: {
    rules: [
      {
        // typescript
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        // JavaScript, React
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader", // JSをES5の文法にコンパイル
            options: {
              // presets: pluginsが束になったもの
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "> 0.25%, not dead", // 対象ブラウザを設定
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        // css
        test: /\.(css|sass|scss)/,
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
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader", //sassで記載されたファイルを読み込ませるためのモジュール
          },
        ],
      },
      {
        // image
        test: /\.(png|jpe?g)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext]",
          publicPath: "/",
        },
        use: [
          {
            loader: "image-webpack-loader",
          },
        ],
      },
      {
        // html
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
      filename: "./stylesheets/main-[contenthash].css", // jsにimportされたcssをcssファイルを切り離して自動生成する
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
    new HtmlWebpackPlugin({
      template: "src/templates/members/taro.pug",
      filename: "members/taro.html",
    }),
    new CleanWebpackPlugin(), // outputディレクトリ配下にて、自動生成されるファイル以外の不要ファイルを削除する
  ],
};
