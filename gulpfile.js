var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    // sass = require('gulp-sass'),
    // sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    jade = require('gulp-jade'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


// Сервер
gulp.task ('server', function () {
    browserSync ({
        port: 9000,
        server: {
            baseDir: 'site'
        }
    });
});


// // Compass
gulp.task('compass', function() {
  gulp.src('compass/sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'site/css',
      sass: 'sass'
    }))
    .pipe(prefixer({browsers:['>1%']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('site/css/'));
});


// Jade
gulp.task('jade', function () {
    gulp.src('jade/pages/*.jade')
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest('site'))
});


// // Sass
// gulp.task('sass', function () {
//     gulp.src('style/main.scss') 
//         .pipe(sourcemaps.init())
//         .pipe(sass({
//             includePaths: ['style/'],
//             outputStyle: 'expanded',
//             sourceMap: true,
//             errLogToConsole: true
//         }))
//         .pipe(prefixer({browsers:['>1%']}))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('site/css/'))
//         .pipe(reload({stream: true}));
// });


//autoprefixer
// gulp.task('prefixer', function () {
//     gulp.src('site/css/main.css')
//         .pipe(prefixer({browsers:['>1%']}));
// });

gulp.task('prefixer', function () {
    return gulp.src('site/css/main.css')
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('site/css/main2.css'));
});



// Sprites
gulp.task('sprite', function () {
    var spriteData = gulp.src('sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: 'site/images/sprite.png',
        cssName: '_sprite.scss',
        algorithm: 'alt-diagonal',
        padding: 40
    }));
    spriteData.img.pipe(gulp.dest('./site/images/sprites/'));
    spriteData.css.pipe(gulp.dest('./style/'));
});


// Слежка
gulp.task ('watch', function () {
        gulp.watch ([
        'site/*.html',
        'site/js/**/*.js',
        'site/css/*.css'
        ]).on ('change', browserSync.reload);
        // gulp.watch ('style/**/*.scss', ['sass']);
        gulp.watch ('jade/**/*.jade', ['jade']);          
});


// Задача по умолчанию
gulp.task ('default', ['server', 'prefixer', 'watch']);


// Сборка - перенос html, css, js в папку dist
gulp.task ('useref', function () {
    return gulp.src('site/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
});


// Очистка
gulp.task ('clean', function () {
    return gulp.src ('dist', { read: false })
    .pipe(rimraf());
});

// Перенос шрифтов
gulp.task('fonts', function () {
    gulp.src('site/fonts/*')
        .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
        .pipe(gulp.dest('dist/fonts/'))     
});


// Картинки
gulp.task('images', function () {
    return gulp.src('site/images/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'));
});


// Остальные файлы (напр. favicon.io и пр.)
gulp.task('extras', function () {
    return gulp.src([
        'site/*.*',
        '!site/*.html'
    ]).pipe(gulp.dest('dist'));
});


// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean'], function () {
    gulp.start('dist');
});


// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});


// Проверка, все ли работает
gulp.task ('serverdist', function () {
    browserSync ({
        port: 8050,
        server: {
            baseDir: 'dist'
        }
    });
});