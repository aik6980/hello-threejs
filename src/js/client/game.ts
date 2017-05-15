
var scene : THREE.Scene;
var camera : THREE.PerspectiveCamera;
var renderer : THREE.WebGLRenderer;

function init_renderwindow(){
    // render context
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);

    // main scene
    scene = new THREE.Scene();
    // main camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    document.body.appendChild( renderer.domElement );
}

function init_scene() {
    var geom = new THREE.SphereGeometry(1, 4, 4);
    var material = 
}

function init() {

    init_renderwindow();

    var vs_str : string;
    var ps_str : string;
    // test loading file
    var loader = new THREE.FileLoader();
    loader.setPath("public/js/shaders/");

    var loaded_vs : Promise<string> = new Promise( function(resolve, reject) {
        loader.load("gbuffer.vs.glsl", function( data : string ){ resolve(data); });
    });
    var loaded_ps : Promise<string> = new Promise( function(resolve, reject) {
        loader.load("gbuffer.ps.glsl", function( data : string ){ resolve(data); });
    });

    Promise.all( [loaded_vs, loaded_ps] ).then(function(values : Array<string> ){ 
        //console.log(values);
        var uniforms = {
            t_albedo : { type: "t", value: THREE.ImageUtils.loadTexture("public/js/shaders/checker.jpg") }
        };

        var material = new THREE.ShaderMaterial({
            uniforms : uniforms, 
            vertexShader : values[0],
            fragmentShader : values[1]  
        });

        var box_geom = new THREE.BoxGeometry(1,1,1);
        var box = new THREE.Mesh(box_geom, material);
        box.position.y = 2.25;
        scene.add(box);
    });

    // scene init
    var box_geom = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    var box = new THREE.Mesh(box_geom, material);
    scene.add(box);
}

function render() {

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();