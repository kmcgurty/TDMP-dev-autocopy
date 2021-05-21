const gulp = require('gulp');
const log = require('fancy-log');
const fs = require('fs');

let fromPath = "C:/Users/Kmc/source/repos/TDMP";
let toPath = "D:/Steam Games/steamapps/common/Teardown";

let tdmp = fromPath + "/TDMP/build/debug/**/*";
let loader = fromPath + "/TDMPLoader/build/debug/**/*";

gulp.task('watch', function() {
    gulp.watch('gulpfile.js', exit);

    gulp.watch([tdmp , loader], gulp.series('copy-files'));
});

gulp.task('copy-files', function(e) {
    gulp.src(tdmp)
        .pipe(gulp.dest(toPath));

    return gulp.src(loader)
        .pipe(gulp.dest(toPath));
});

async function exit() {
    process.exit();
}

gulp.task('default', gulp.series('copy-files', 'watch'));