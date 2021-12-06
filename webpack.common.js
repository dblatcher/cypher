const path = require('path');
const fs = require('fs');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
// const publicFiles = fs.readdirSync("./public").map(filename => "./public/" + filename)

module.exports = {
    entry: {
        "index": { import: './src/js/index.js', filename: "js/[name].js" },
        // "public-files": {import: publicFiles, filename:"js/[name].js"},
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
        assetModuleFilename: '[name][ext][query]',
        globalObject: 'this',
        clean: true
    },

    plugins: [
        new HandlebarsPlugin({
            // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
            entry: path.join(process.cwd(), "src","views", "*.hbs"),
            // output path and filename(s). This should lie within the webpacks output-folder
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "dist", "[name].html"),
            // you can also add a [path] variable, which will emit the files with their relative path, like
            // output: path.join(process.cwd(), "build", [path], "[name].html"),
            
            // data passed to main hbs template: `main-template(data)`
            // data: {value:"foobar"},
            // data: require("./app/data/project.json"),
            // // or add it as filepath to rebuild data on change using webpack-dev-server
            data: path.join(__dirname, "data/info.json"),
      
            // globbed path to partials, where folder/filename is unique
            partials: [
              path.join(process.cwd(),  "src", "views", "*", "*.hbs")
            ],
      
            // register custom helpers. May be either a function or a glob-pattern
            // helpers: {
            //   nameOfHbsHelper: Function.prototype,
            //   projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
            // },
      
            // hooks
            // getTargetFilepath: function (filepath, outputTemplate) {},
            // getPartialId: function (filePath) {}
            onBeforeSetup: function (Handlebars) {},
            onBeforeAddPartials: function (Handlebars, partialsMap) {},
            onBeforeCompile: function (Handlebars, templateContent) {},
            onBeforeRender: function (Handlebars, data, filename) {},
            onBeforeSave: function (Handlebars, resultHtml, filename) {},
            onDone: function (Handlebars, filename) {}
          })

      ],
};
