const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin'); //instanciar el pluguin instalado
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//creamos un nuevo modulo y lo exportamos
module.exports = {
    entry: './src/index.js',  //entrada
    output: {//donde vamos a guardar nuestros archivos resultantes
        path: path.resolve(__dirname, 'dist'), //detectar el directorio donde estamos y el directorio donde estamos guardando los archivos
        filename: 'bundle.js'  //ponerle nombre a nuestro archivo
    },
    resolve: { //resolver las extensiones q tenemos en nuestro proyecto
        extensions: ['.js', '.jsx']
    },
    module: {  //reglas para el proyecto
        rules: [
            //identificacion de nuestros archivos
            {
                test: /\.(js|jsx)$/, //identificar archivos js y jsx
                exclude: /node_modules/, //excluimos node_modules
                use: {
                    loader: "babel-loader" //tengo que usar el loader instalado
                }
            },

            //para los archivos html
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        'loader': 'file-loader',
                        options: {
                            name: 'assets/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    //plugins necesarios
    plugins: [
        new HtmlWebPackPlugin({ //nueva referencia a webpackplugin
            template: './public/index.html', //donde esta ubicado en template que tenemos
            filename: './index.html' //su nombre
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css'
        })
    ]
};