### gulp 概念
一个流式的构建工具
```
var gulp = require('gulp');

gulp.task('default', function() {
  console.log(123)
});
默认的名为：`default`的任务`task`将会被执行，
如果要执行特定的任务`task`，可以使用`gulp task名`
```
关键字`pipe`：管道
```
var minify = require("gulp-minify");
gulp.src('client/js/**/*.js') // 匹配所有client下的js的所有的文件下的js
  .pipe(minify()) 
  .pipe(gulp.dest('build')); // 然后将打包完的文件放入到build文件
```

为什么要用构建工具
一句话：自动化，对于需要反复重复的工作，例如压缩，编译，单元测试，linting等。自动化工具可以减轻你的劳动力，简化工作。