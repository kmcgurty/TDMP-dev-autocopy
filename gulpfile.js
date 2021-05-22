const gulp = require('gulp');
const log = require('fancy-log');
const fs = require('fs');
const { execSync } = require("child_process");

let fromPath = "C:/Users/Kmc/source/repos/TDMP";
let toPath = "D:/Steam Games/steamapps/common/Teardown";

//-------------------------------------------------------

let tdmp = fromPath + "/TDMP/build/debug/**/*";
let loader = fromPath + "/TDMPLoader/build/debug/**/*";

gulp.task('watch', function() {
    gulp.watch('gulpfile.js', exit);

    gulp.watch([tdmp], gulp.series('copy-tdmp'));
    gulp.watch([loader], gulp.series('copy-loader'));
});

gulp.task('copy-tdmp', async function(e) {
    console.log("Killing process...");
    kill("teardown.exe");

    console.log("Copying TDMP...");
    return gulp.src(tdmp)
        .pipe(gulp.dest(toPath));
});

gulp.task('copy-loader', function(e) {
    console.log("Copying loader...");
    return gulp.src(loader)
        .pipe(gulp.dest(toPath));
});

function kill(name){
    try{
        let output = execSync(`taskkill /IM "${name}" /F`);
        console.log(output.toString());
    } catch(e) {
        //console.log(e.stderr.toString());
    }
}

async function exit() {
    process.exit();
}

gulp.task('default', gulp.series('copy-tdmp', 'copy-loader', 'watch'));