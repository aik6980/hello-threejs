
var scene : THREE.Scene;
var camera : THREE.PerspectiveCamera;
var renderer : THREE.WebGLRenderer;

// scene object
var object_group : THREE.Object3D;

function init_renderwindow(){
    // render context
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);

    // main scene
    scene = new THREE.Scene();
    // main camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 400;

    document.body.appendChild( renderer.domElement );
}

function init_scene() {
    var geom = new THREE.SphereGeometry(1, 4, 4);
    var material = new THREE.MeshPhongMaterial(
        {
            color: 0xffffff,
            shading: THREE.FlatShading,
        }
    )

    object_group = new THREE.Object3D();
    scene.add(object_group);

    for(var i=0; i<100; ++i)
    {
        var mesh = new THREE.Mesh( geom, material);
        mesh.position.set( THREE.Math.randFloatSpread(1.0), THREE.Math.randFloatSpread(1.0), THREE.Math.randFloatSpread(1.0));
        mesh.position.multiplyScalar( Math.random() * 400 );
        mesh.rotation.set( THREE.Math.randFloatSpread(Math.PI), THREE.Math.randFloatSpread(Math.PI), THREE.Math.randFloatSpread(Math.PI));
        mesh.scale.multiplyScalar(Math.random() * 50);
        object_group.add(mesh);
    }

    // lighting
    var ambient_light = new THREE.AmbientLight(0x222222);
    scene.add(ambient_light);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1,1,1);
    scene.add(light);
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

    init_scene();
}

function render() {
    requestAnimationFrame(render);
    // update
    object_group.rotation.y += 0.005;
    // render
    renderer.render(scene, camera);
}

init();
render();