// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
// var jshint = require('gulp-jshint');
var sass      = require('gulp-sass'),
    gutil     = require('gulp-util'),
    sass      = require('gulp-sass'),
    cleanCSS  = require('gulp-clean-css')
    expectFile  = require('gulp-expect-file'),
    PluginError = gutil.PluginError;
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');


var isProduction = true;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!'+hidden_files;

// SOURCES CONFIG 
var source = {
  scripts: {
    app:    [ 'js/**/*.js',
              ignored_files
            ],
    watch: ['js/*.js','js/**/*.js']
  },
  templates: {
    app: {
        files : ['jade/index.jade'],
        watch: ['jade/index.jade', hidden_files]
    },
    views: {
        files : ['jade/views/*.jade', 'jade/views/**/*.jade', ignored_files],
        watch: ['jade/views/**/*.jade']
    },
    pages: {
        files : ['jade/pages/*.jade'],
        watch: ['jade/pages/**/*.jade']
    }
  },
  styles: {
    app: {
      main: ['less/app.less'],
      dir:  'less',
      watch: ['less/**/*.less']
    },
    app2:{
      main: ['scss/base.scss','scss/**/*.scss'],
      dir:  'scss',
      watch: ['scss/**/*.scss']
    }
  }
};


// BUILD TARGET CONFIG 
var build = {
  scripts: {
    app: {
      main: 'app.js',
      dir: '../dist/js'
    },
  },
  styles: '../dist/css',
  templates: {
    app: '..',
    views: '../app/views',
    pages: '../app/pages'
  }
};

var vendor = {
  // used as destiny to copy only required assets from bower
  folder: '../dist/vendor',
  // Edit here the scripts that will be included statically.
  // - Requires run `bower install` first
  basePath: '../app/js/',
  baseFile: 'base.js',
  baseInclude: [
    // modernizr custom build
    '../app/js/modernizr/modernizr.custom.js',
    // jQuery
    'bower_components/jquery/dist/jquery.js',
    // Angular
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    // Angular storage
    'bower_components/ngstorage/ngStorage.js',
    // Angular UI Utils
    'bower_components/angular-ui-utils/ui-utils.js',
    // Angular Translate
    'bower_components/angular-translate/angular-translate.js',
    'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
    'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
    // oclazyload
    'bower_components/oclazyload/dist/ocLazyLoad.js',
    // UI Bootstrap
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    // Loading Bar
    'bower_components/angular-loading-bar/build/loading-bar.js'
  ],
};

var doc = {
  source: '../app/documentation/readme.md',
  dest: '../'
};



// 检查脚本
// gulp.task('lint', function() {
//     gulp.src('./js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// 编译Sass
// gulp.task('sass', function() {
//     gulp.src('./scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./css'));
// });

// Scss APP 
gulp.task('styles:app', function() {
    //@link http://stackoverflow.com/a/36229400/5840474
    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded',
        includePaths: 'node_modules/bootstrap-sass/assets/stylesheets'
    };

    return gulp.src(source.styles.app2.main)
        .pipe( isProduction ? gutil.noop() : sourcemaps.init())
        .pipe(sass(sassOptions))
        .on("error", handleError)
        .pipe( isProduction ? cleanCSS() : gutil.noop() )
        .pipe( isProduction ? gutil.noop() : sourcemaps.write() )
        .pipe(gulp.dest(build.styles))
        ;
});

// 合并，压缩文件
// gulp.task('scripts', function() {
//     gulp.src('./js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('./dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist'));
// });

//---------------
// TASKS
//---------------

// JS APP
gulp.task('scripts:app', function() {
    // Minify and copy all JavaScript
    return gulp.src(source.scripts.app)
        // .pipe(concat(build.scripts.app.main))
        // .on("error", handleError)
        // .pipe(ngAnnotate())
        // .on("error", handleError)
        // .pipe( isProduction ? uglify({preserveComments:'some'}) : gutil.noop() )
        // .on("error", handleError)
        .pipe(gulp.dest(build.scripts.app.dir))
        ;
});


// copy file from bower folder into the app vendor folder
gulp.task('vendor:copy', function() {

  var vendorSrc = require('./vendor.json'),
      path = require('path');

  gulp.src(vendorSrc, {base: 'bower_components'})
      .pipe( expectFile(vendorSrc) )
      .pipe( gulp.dest(vendor.folder) )
      ;

});
gulp.task('vendor:copy2', function() {

  var vendorSrc = require('./vendor.json'),
      path = require('path');

  gulp.src(vendorSrc, {base: 'node_modules'})
      .pipe( expectFile(vendorSrc) )
      .pipe( gulp.dest(vendor.folder) )
      ;

});

//---------------
// GROUPED TASKS
//---------------

var tasks = [
          'scripts:app',
          'styles:app',
          'vendor:copy',
          'vendor:copy2',
        ];

// 默认任务
gulp.task('default', function(){
    //gulp.run('lint', 'sass', 'scripts');
    gulp.run(tasks);
    // 监听文件变化
    // gulp.watch('./js/*.js', function(){
    //     gulp.run('lint', 'sass', 'scripts');
    // });
});


//---------------
// HELPERS
//---------------

// Error handler
function handleError(err) {
  // console.log(err.toString());
  gutil.log(err);
  gutil.beep();
  this.emit('end');
}

// Micro Gulp plugin to flip css (rtl)
function flipcss(opt) {
  
  if (!opt) opt = {};

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if(file.isNull()) return cb(null, file);

    if(file.isStream()) {
        console.log("todo: isStream!");
    }

    var flippedCss = flip(String(file.contents), opt);
    file.contents = new Buffer(flippedCss);
    cb(null, file);
  });

  // returning the file stream
  return stream;
}