//#extension GL_EXT_draw_buffers : require

// camera
varying vec3 o_normal;
varying vec2 o_uv;

void main()
{
    // glsl use * operator, don't get confuse with HLSL!
    vec4 pos_view = modelViewMatrix * vec4(position, 1.0);
    vec3 normal_world = normalMatrix * normal;
     
    gl_Position = projectionMatrix * pos_view;
    o_uv = uv;
    o_normal = normal_world;
}