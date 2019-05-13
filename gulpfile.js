const gulp            = require('gulp');
const convertEncoding = require('gulp-convert-encoding');
const zip             = require('gulp-zip');
const rename          = require('gulp-rename');

gulp.task('convert_encoding', () => {
    return gulp.src('br/Localization/INT/**')
        .pipe(convertEncoding(
            {
                from: 'utf8',
                to: 'utf16'
            }))
        .pipe(gulp.dest('br/Localization/INT/'));
});

gulp.task('make_mod_zip', () => {
    return gulp.src('**/br/**')
        .pipe(zip('MOD.zip'))
        .pipe(gulp.dest('build'));
});

gulp.task('create_br_files', () => {
    return gulp.src('br/Localization/INT/**/*.int')
        .pipe(rename((path) => {
            path.extname = ".ptb"
        }))
        .pipe(gulp.dest('gfb/PTB'));
});

gulp.task('make_gfb_zip', () => {
    return gulp.src('gfb/**')
        .pipe(zip('GfB.zip'))
        .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('convert_encoding', 'make_mod_zip', 'create_br_files', 'make_gfb_zip'));

