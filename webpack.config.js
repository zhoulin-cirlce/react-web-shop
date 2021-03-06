const webpack =require('webpack');
const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin =require('extract-text-webpack-plugin');
module.exports={
    entry:'./src/app.jsx',
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist/',
        filename:"js/app.js"

    },
    resolve:{
        alias:{
            page:path.resolve(__dirname,'src/page'),
            component:path.resolve(__dirname,'src/component')
        }
    },
    module:{
        rules:[
            {
                test:/\.jsx$/,
                exclude:/(node_modules)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env','react']
                    }
                }
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:["css-loader","sass-loader"]
                })
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:12192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2|otf)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:12192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        //处理html文件，指定html模版文件生成
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            favicon:"./favicon.ico"
        }),
        //css文件独立生成
        new ExtractTextPlugin('css/[name].css'),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        })
    ],
    devServer:{
        port:8000,
        //任何路径找不到的情况会跳转到index.html
        historyApiFallback:{
            index:'/dist/index.html'
        }
    }

}