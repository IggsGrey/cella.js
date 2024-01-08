const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const paths = {
	scripts: {
		src: './sitedocs/landing',
		dest: './docs'
	}
};


gulp.task('bundleHTML', function bundleHTML() {
	return gulp.src(`${paths.scripts.src}/index.html`)
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('bundleImages', function bundleImages() {
	return gulp.src(`${paths.scripts.src}/*.jpg`)
		.pipe(gulp.dest(`${paths.scripts.dest}`));
});

gulp.task('bundleCSS', function bundleCSS() {
	return gulp.src(`${paths.scripts.src}/index.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`${paths.scripts.dest}`));
});



gulp.task('default', function() {
	gulp.watch(paths.scripts.src, gulp.parallel('bundleHTML', 'bundleCSS', 'bundleImages'));
});

