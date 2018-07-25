const path = require('path');

module.exports = {
    mode: 'production',
    entry: './app.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    },
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [__dirname],
                        },
                    }],
                exclude: /node_modules/,
            },
            {
                test: /three\/examples\/js/,
                use: 'imports-loader?THREE=three',
            },
        ],
    },
    resolve: {
        alias: {
            'three-examples': path.join(__dirname, './node_modules/three/examples/js')
        },
        extensions: ['.ts', '.js', '.scss'],
    },
    output: {
        pathinfo: false,
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
