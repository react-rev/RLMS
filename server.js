/**
 * Created by Alex Redmon on 8/22/2016.
 */
var express = require('express'),
    path = require('path');
    app = express(),
    webpack = require('webpack'),
    configDir = path.resolve('config/webpack.config.js'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    gutil = require('gulp-util'),
    webpackConfig =require(configDir);
    compiler=webpack(webpackConfig);

var userRouter  = require('./routing/RLMSGetUsers.js');
app.use('',userRouter);
var basicRouter = require('./routing/RLMSTesting.js');
app.use('/api',basicRouter);

var DA = require('./tools/mongoDataAccess.js');

var RLMSExam = require('./routing/RLMSExam.js');
app.use("", RLMSExam);

var login = require('./routing/RLMSPassport/sRoutes');
app.use('/api', login);

var DA = require('./tools/mongoDataAccess.js');

var RLMSForum = require('./routing/RLMSForum.js');
var RLMSC = require('./routing/RLMSCurriculum.js');

var RLMSAdmin = require('./routing/RLMSAdmin.js');
app.use("/admin", RLMSAdmin);

app.use("",RLMSForum);
app.use("",RLMSC);
app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: '[name].js',
    publicPath: '/JS',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
}));
app.use(express.static('app/public'));
app.use(function(req,res){
    res.status(404);
    res.end("The requested document doesn't exist");
    gutil.log('[Express - info]','A 404 error was reached at ',gutil.colors.magenta(req.originalUrl));
});
try{

listen(3000);
}
catch(err)
{
  gutil.log('[Express - error]', guitil.colors.red('cannot bind to port'));
  process.exit();
}
function listen(port){
  app.listen(port);
  gutil.log('[Express -info]','Currently listening on port',gutil.colors.green(port));
}
