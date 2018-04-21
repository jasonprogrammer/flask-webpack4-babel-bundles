const entryGlob = require('webpack-glob-entry')
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const fullPath = function(folderName) {
    return path.join(__dirname, folderName);
}

module.exports = [{
    devtool: 'eval-source-map',
    entry: entryGlob("./src/**/*.entry.js"),
    output: {
        path: fullPath('dist'),
        filename: '[name].js'
    },
    optimization:{
        runtimeChunk: false,
        splitChunks: false,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.s[c|a]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", 'sass-loader'
                ]
            },
          {
            test: /\.tpl.html$/,
            use: 'raw-loader'
          }
        ]
    },
    watch: true
}]
