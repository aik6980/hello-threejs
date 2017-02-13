
var scene : THREE.Scene;
var camera : THREE.PerspectiveCamera;
var renderer : THREE.WebGLRenderer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(256, 256);

    document.body.appendChild( renderer.domElement );

    // scene init
    var box_geom = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    var box = new THREE.Mesh(box_geom, material);
    scene.add(box);

    camera.position.z = 5;
}

function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

init();
render();