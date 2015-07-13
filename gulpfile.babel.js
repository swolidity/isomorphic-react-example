import gulp from 'gulp';
import webpack from 'webpack';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import cp from 'child_process';
import del from 'del';
import mkdirp from 'mkdirp';
import minimist from 'minimist';

const $ = gulpLoadPlugins();
const argv = minimist(process.argv.slice(2));
const src = Object.create(null);

let watch = false;
let browserSync;

gulp.task('default', ['serve']);

// Clean output directory
gulp.task('clean', cb => {
	del(['.tmp', 'build/*', '!build/.git'], {dot: true}, () => {
		mkdirp('build/public/', cb);
	});
});

// Static files
gulp.task('assets', () => {
	src.assets = 'src/public/**';
	return gulp.src(src.assets)
		.pipe($.changed('build/public'))
		.pipe(gulp.dest('build/public'));
});

// Resource files
gulp.task('resources', () => {
	src.resources = [
		'package.json',
		'src/content*/**',
		'src/templates*/**'
	];
	return gulp.src(src.resources)
		.pipe($.changed('build'))
		.pipe(gulp.dest('build'));
});

// Bundle
gulp.task('bundle', cb => {
	let config = require('./webpack.config.js');
	const bundler = webpack(config);
	const verbose = !!argv.verbose;
	let bundlerRunCount = 0;

	function bundle(err, stats) {
		if (err) {
			throw new $.util.PluginError('webpack', err);
		}

		console.log(stats.toString({
			colors: $.util.colors.supportsColor,
			hash: verbose,
			version: verbose,
			timings: verbose,
			chunks: verbose,
			chunkModules: verbose,
			cached: verbose,
			cachedAssets: verbose
		}));

		if (++bundlerRunCount === config.length) {
			return cb();
		}
	}

	if (watch) {
		bundler.watch(200, bundle);
	} else {
		bundler.run(bundle);
	}
});

// Build app
gulp.task('build', ['clean'], cb => {
	runSequence(['assets', 'resources'], ['bundle'], cb);
});

// Build and watch for changes
gulp.task('build:watch', cb => {
	watch = true;
	runSequence('build', () => {
		gulp.watch(src.assets, ['assets']);
		gulp.watch(src.resources, ['resources']);
		cb();
	});
});

gulp.task('serve', ['build:watch'], cb => {
	src.server = [
		'build/server.js',
		'build/templates/**/*',
		'build/templates/**/*'
	];
	let started = false;
	let server = (function startup() {
		var child = cp.fork('build/server.js', {
			env: Object.assign({NODE_ENV: 'development'}, process.env)
		});
		child.once('message', message => {
			if (message.match(/^online$/)) {
				if (browserSync) {
					browserSync.reload();
				}
				if (!started) {
					started = true;
					gulp.watch(src.server, function() {
						$.util.log('Restarting development server.');
						server.kill('SIGTERM');
						server = startup();
					});
					cb();
				}
			}
		});
		return child;
	})();

	process.on('exit', () => server.kill('SIGTERM'));
});
