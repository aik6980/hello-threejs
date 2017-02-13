/*
Note:
 [29/12/2016] "diagnosticLogging" : true
	- launch.json, if we have problem with Breakpoints or Sourcemaps turn this on for more information (default is false)
 [29/12/2016] ".pipe(sourcemaps.write( ".", { sourceRoot : "../.."} ))"
	- "../../game", our sourcemap file is generated next to .js file, 
	however, we have to set the correct value for sourceRoot so VSCode can find the path of the original cource code (for example "game.ts")
	I'm not sure about other tools (IntelliJ) but this helps resolving the correct path for the current .vscode/launch.json
	(VSCode uses this file to attach/launch debugger)
*/

var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var concat = require('gulp-concat');
var sass = require('gulp-sass');

// typescript project for game
var ts_project_game 		= ts.createProject("tsconfig.game.json");
var ts_project_game_output 	= 'game.js';

gulp.task("default", ['build_client', 'sass']);

gulp.task("dev", ['default'], function () {
    gulp.watch('src/js/client/**/*.*', ['build_client']);
    gulp.watch('src/sass/**/*.*', ['sass']);
});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task("typescript_convert", function () {
	var output_folder = "public/js";
	var ts_result_game 		= ts_project_game.src()
							.pipe(sourcemaps.init())
							.pipe(ts_project_game())
							.pipe(concat(ts_project_game_output))
							.pipe(sourcemaps.write( ".", { sourceRoot : "../.."} )) // supply sourceRoot so we can use sourcemaps in VSCode debugger
							.pipe(gulp.dest(output_folder));
							
    return ts_result_game;
});


function ts_process( ts_project, output_path, output_filename, srcmaps_sourceroot ) {
	
	var result 	= ts_project.src()
				.pipe(sourcemaps.init())
				.pipe(ts_project())
				.pipe(concat(output_filename))
				.pipe(sourcemaps.write( ".", { sourceRoot : srcmaps_sourceroot } )) // supply sourceRoot so we can use sourcemaps in VSCode debugger
				.pipe(gulp.dest(output_path));
				
    return result;
}

{
	var ts_project = ts.createProject("tsconfig.server.json");
	var ts_project_params = [ ".", "app.js", "."];

	gulp.task("build_server", function() {
		ts_process( ts_project, ts_project_params[0], ts_project_params[1], ts_project_params[2] ) 
	});	
}

gulp.task("build_client", ['client_ts', 'client_js_move']);
{
	var ts_project = ts.createProject("tsconfig.game.json");
	var ts_project_params = [ "public/js", "game.js", "../.."];

	gulp.task("client_ts", function() {
		ts_process( ts_project, ts_project_params[0], ts_project_params[1], ts_project_params[2] ) 
	});
	
	gulp.task("client_js_move", function () {
		return gulp.src("src/js/client/libs/**/*.js")
			.pipe(gulp.dest("public/js/libs"));
	});
}