const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MyPlugin = require("./plugin/my-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name]/js",
        clean: true,
    },
    module: {
        rules: [],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new MyPlugin({
            filename: 'list.md'//输出新文件list.md
        })
    ],
    mode: "development",
}