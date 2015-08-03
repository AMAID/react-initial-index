var gulp=require('gulp')
var plumber=require('gulp-plumber')
var util=require('gulp-util')
var stylus=require('gulp-stylus')
var browserSync=require('browser-sync')
var jade=require('gulp-jade')
var autoprefixer=require('gulp-autoprefixer')
var uglify=require('gulp-uglify')
var webpack=require('webpack-stream')
var rename=require('gulp-rename')

var error = function(e){
    util.beep()
    util.log(e.toString())
}
var paths={
    develop:{
        jade:"src/jade/*.jade",
        html:"src/html/**",
        css:"src/css/**",
        stylus:"src/stylus/**",
        js:"src/js/main.js",
        jsx:"src/jsx/**",
        img:"src/img/**",
        data:"src/data/**"
    },
    build:{
        html:"build",
        css:"build/css",
        js:"build/js",
        img:"build/img",
        data:"build/data"
    }
}

gulp.task('reload',function(){
    browserSync.reload()
})
gulp.task('jade', function () {
    return gulp.src([paths.develop.jade])
        .pipe(plumber({"errorHandler":error}))
        .pipe(jade())
        .pipe(gulp.dest(paths.build.html))
})
gulp.task("stylus", function () {
    return gulp.src([paths.develop.stylus])
        .pipe(plumber({"errorHandler":error}))
        .pipe(stylus())
        .pipe(autoprefixer())
        //.pipe(minifyCss())
        .pipe(gulp.dest(paths.build.css))
})
gulp.task("jsx",function(){
    return gulp.src([paths.develop.jsx])
        .pipe(plumber({"errorHandler":error}))
        .pipe(webpack(
            {
                output:{
                    filename:'react-initial-index.min.js'
                },
                module: {
                    loaders: [
                        { test: /\.json$/, loader: 'json' },
                        { test: /\.jsx$/, exclude:/node_modules/,loader: 'babel-loader' }
                    ]
                },
                stage: 0
            }
        ))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
})
gulp.task("data",function(){
    return gulp.src([paths.develop.data])
        .pipe(gulp.dest(paths.build.data))
})
gulp.task("browser-sync", function () {
    browserSync({
        server:{
            baseDir:"build"
        }
    })
    gulp.watch("src/data/**",["data","reload"])
    gulp.watch("src/jade/**",["jade","reload"])
    gulp.watch("src/stylus/**",["stylus","reload"])
    gulp.watch("src/img/**",["img","reload"])
    gulp.watch("src/jsx/**",["jsx","reload"])
})

gulp.task("default", ["jade","jsx","stylus","browser-sync","data"])