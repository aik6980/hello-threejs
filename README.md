# hello-threejs

## nodejs skeleton

### building app
using gulp as a build system
```
gulp build_server => gulp tasks for app.js
gulp build_client => gulp tasks for public/js/game.js
```
HTML pages are dynamically generated using `jade`

### using typings
- Typings is a typescript package manager, it is worth installing `globally` through `npm` using following command  
```
npm install typings -g
```

- Run cmd in the folder where we want /typings to be stored then run `typings install`  
some common typescript definition  
```
typings install --global --save dt~node
typings install --global --save dt~jquery
...
```

### using glup
- `gulp-clean` a proper way to delete files/folder

## threejs
### deferred rendering pipeline
- http://edankwan.com/tests/threejs-multi-render-target/webgl_mrt.html
- custom shaders in THREE, http://www.ianww.com/blog/2012/12/16/an-introduction-to-custom-shaders-with-three-dot-js/
- http://www.paulallenrenton.com/individual-projects/webgl-deferred-renderer

### loading shader files
- WEBGL shader is basically a text string. It can be embeded using tags, like `<script type="x-shader/x-fragment">` or load from files
- using THREE file loader (ajax wrapper), https://threejs.org/docs/api/loaders/FileLoader.html
- shader loader js from github, https://github.com/codecruzer/webgl-shader-loader-js
- http://www.pheelicks.com/2014/02/working-better-with-glsl-source-files/
- 

### introduction
official guide  
- https://threejs.org/docs/#Manual/Getting_Started/Creating_a_scene  

tutorials
- http://blog.teamtreehouse.com/the-beginners-guide-to-three-js  
- https://www.jonathan-petitcolas.com/2013/04/02/create-rotating-cube-in-webgl-with-threejs.html
- https://aerotwist.com/tutorials/getting-started-with-three-js/  
- http://learningthreejs.com/

WEBGL tutorials
- http://learningwebgl.com/blog/?page_id=1217
- http://blog.tojicode.com/p/webgl-resources.html
- 