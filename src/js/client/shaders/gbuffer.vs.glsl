// camera
varying vec3 v_normal;
varying vec2 v_uv;

void main()
{
    // glsl use * operator, don't get confuse with HLSL!
    vec4 pos_view = modelViewMatrix * vec4(position, 1.0);
    vec3 normal_world = normalMatrix * normal;
     
    gl_Position = projectionMatrix * pos_view;
    v_uv = uv;
    v_normal = normal_world;
}