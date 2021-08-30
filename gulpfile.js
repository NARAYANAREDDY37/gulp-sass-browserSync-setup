const sass = require('gulp-sass')(require('sass'));
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// compile scss to css
function style() {
	return (
		gulp
			// scss file location
			.src('./app/sass/**/*.scss')
			// if there is compilation error
			.pipe(sass().on('error', sass.logError))
			// passing scss file through sass compiler
			.pipe(sass())
			// saving the compiled css file
			.pipe(gulp.dest('./app/css'))
			// auto-inject changes to all broswers
			.pipe(browserSync.stream())
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './app',
		},
		port: 2000,
		ui: {
			port: 2001,
		},
	});
	gulp.watch('./app/sass/**/*.scss', style);
	gulp.watch('./app/*.html').on('change', browserSync.reload);
	gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
