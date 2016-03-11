const
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	consolidate = require('gulp-consolidate');

var runTimestamp = Math.round(Date.now() / 1000);

var fontName = 'myfont' // font name
var className = 'mf' // css prefix, e.g. mf-email-inbox
var template = 'template'

gulp.task('iconfont', function(done) {
  return iconStream = gulp.src(['icons/**/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'css',
      targetPath: '../dist/css/' + fontName + '.css',
      fontPath: '../',
			cssClass: className
    }))
    .pipe(iconfont({
			fontName: fontName,
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // you can remove some of these
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
      targetPath: '../icons.css',
      fontPath: '../',
			cssClass: className
    }))
    .on('glyphs', (glyphs) => {
      const options = {
        className,
        fontName,
        fontPath: '../dist/', // set path to font (from your CSS file if relative)
        glyphs: glyphs.map(mapGlyphs)
      }
      // gulp.src(`templates/${ template }.less`)
      //   .pipe(consolidate('lodash', options))
      //   .pipe(rename({ basename: fontName }))
      //   .pipe(gulp.dest('dist/css/')) // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src(`templates/${template}.html`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: 'sample' }))
        .pipe(gulp.dest('dist/')) // set path to export your sample HTML
    })
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['iconfont'])
gulp.task('watch', () => gulp.watch(['iconfont']))


/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
  return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}