
var scene : THREE.Scene;
var camera : THREE.PerspectiveCamera;
var renderer : THREE.WebGLRenderer;

function init() {

    scene = new THREE.Scene();

    var vs_str : string;
    var ps_str : string;
    // test loading file
    var loader = new THREE.FileLoader();
    loader.setPath("public/js/shaders/");
    loader.load("gbuffer.vs.glsl", 
        function( data : string ){
            // console.log(data);
            vs_str = data;
            loader.load("gbuffer.ps.glsl", 
            function( data : string ){
                ps_str = data;

                var uniforms = {
                    t_albedo : { type: "t", value: THREE.ImageUtils.loadTexture("public/js/shaders/checker.jpg") }
                };

                var material = new THREE.ShaderMaterial({
                    uniforms : uniforms, 
                    vertexShader : vs_str,
                    fragmentShader : ps_str  
                });

                var box_geom = new THREE.BoxGeometry(1,1,1);
                var box = new THREE.Mesh(box_geom, material);
                box.position.y = 2.25;
                scene.add(box);
            }); 
        });

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