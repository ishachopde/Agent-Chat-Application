const path = require("path");
module.exports = {
    entry: "./client/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devtool: "source-map",
    resolve: {
        modules: ['client', 'node_modules'],
        extensions: [".js", ".ts", ".tsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: [
                    "node_modules"
                  ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/
              },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
};