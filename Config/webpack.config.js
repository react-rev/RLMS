/**
 * Created by Alex Redmon on 8/22/2016.
 */
var webpack = require('webpack');
var path= require('path');
const BUILD_DIR = path.resolve('app/public/JS/');
const APP_DIR = path.resolve('app/dev/');
var glob = require('glob');
var config ={
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'common',
        //   filename: 'rlmsCommon.js',
        //   minChunks: 2
        // })
        //new webpack.optimize.UglifyJsPlugin()
    ],
    entry:{
      vendor:['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000','react','react-dom'],
      rlmsForum:glob.sync(APP_DIR + '/RLMSForum/**/*.jsx'),
      rlmsAdmin:glob.sync(APP_DIR+ '/RLMSAdmin/**/*.jsx'),
      rlmsCurriculum:glob.sync(APP_DIR + '/RLMSCurriculum/**/*.jsx'),
      rlmsLogin:glob.sync(APP_DIR + '/RLMSLogin/**/*.jsx'),
      rlmsExam:glob.sync(APP_DIR + '/RLMSExams/**/*.jsx'),
      rlmsUser:glob.sync(APP_DIR + '/RLMSUsers/**/*.jsx'),
      rlmsMain:glob.sync(APP_DIR + '/RLMSMain/**/*.jsx'),
      rlmsTests:glob.sync(APP_DIR + '/RLMSTests/**/*.jsx')
    },

    output:{
        path:BUILD_DIR,
        filename:'[name].js'
    },

    watch: true,
    module:{
        loaders:[
            {
                test : /\.jsx?/,
                include:APP_DIR,
                loader:'babel-loader',
                query:{
                    presets: ['es2015', 'react']
                }
            }


        ]

    },
    externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  }



};
module.exports = config;
