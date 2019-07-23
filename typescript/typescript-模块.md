### module
**模块**
1. 内部模块，现在被称为“命名空间”
2. 外部模块，现在被简称为“模块”
模块在其自身的作用域执行，而不是在全局作用域里；这意味着在一个模块的变量，函数，类等在模块外部是不可见的，除非明确使用`export`形式之一导出他们。相反如果要使用其他模块导出的变量，函数，类等等，比如导入，可以使用`import`或者`require`

**ts外部模块**

```
module module名{
    // 模块内部代码
}
```

**使用方法**

```
// myModules.d.ts
declare module "SomeModule" {
    export function fn(): string;
}
```

```
// myOtherModule.ts
import * as m from "SomeModule";
```

**ts内部模块**

```
//shapes.ts
export namespace Shapes {
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
```
```
// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?
```
Typescript里模块的一个特点是不同的模块永远也不会在相同的作用域使用相同的名字，因为使用模块的人会为它们命名，所以完全没必要吧导出的字符包裹在一个命名空间里
再次重申，不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突，模块文件本身已经是一个逻辑分组，并且他的名字由导入这个模块的代码指定，所以没必要为导出对象增加额外的模块层.
所以上述代码出现了增加了额外模块层的错误，可以重写成一下代码
```
//shapes.ts

    export class Triangle { /* ... */ }
    export class Square { /* ... */ }

```

```
// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Triangle();
```