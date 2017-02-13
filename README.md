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

## threejs 

### introduction
official guide  
- https://threejs.org/docs/#Manual/Getting_Started/Creating_a_scene  

tutorials
- http://blog.teamtreehouse.com/the-beginners-guide-to-three-js  
- https://www.jonathan-petitcolas.com/2013/04/02/create-rotating-cube-in-webgl-with-threejs.html
- https://aerotwist.com/tutorials/getting-started-with-three-js/  
- http://learningthreejs.com/
