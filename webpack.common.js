const path = require('path');
const fs = require('fs');

// const publicFiles = fs.readdirSync("./public").map(filename => "./public/" + filename)

module.exports = {
    entry: {
        "index": './src/index.js',
        // "public-files": publicFiles,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            { //sass rule
                test: /\.s[ac]ss$/i, exclude: /node_modules/,
                use: ['style-loader', 'css-loader', "postcss-loader", 'sass-loader',],
            },

            { // css rule
                test: /\.css$/i, exclude: /node_modules/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            { // public file rule
                test: path.resolve(__dirname, 'public'),
                type: 'asset/resource',
                generator: {
                    filename: 'public/[name][ext][query]'
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {

        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'public/[name][ext][query]',
        globalObject: 'this',
        clean: true
    },
};
