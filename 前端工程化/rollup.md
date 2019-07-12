### tree shaking
除了使用ES6模块之外，Rollup还静态分析代码中的import，并排除任何未实际使用的代码。

```
// main.js
import {a} from './foo.js';
export default function () {
  console.log(a);
}
```

```
// foo.js
var a = 1;
var b = 2;
export {a,b};
```
在这两个模块中，foo里面变量b是没有被任何模块所引用的，所以，我们可以利用rollup来进行不用代码的去除


```
// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    }
  };
```

**执行rollup -c**

生成一个 bundle.js

```
'use strict';

var a = 1;

function main () {
  console.log(a);
}

module.exports = main;

```
我们可以看到生成之后，在定义的时候，变量b被清洗掉了。

