#extension GL_EXT_draw_buffers : require

// camera
uniform mat4 projectionMatrix; 
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

attribute vec4 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec3 o_normal;
varying vec2 o_uv;

void main()
{
    // glsl use * operator, don't get confuse with HLSL!
    vec4 pos_view = modelViewMatrix * position;
    vec3 normal_world = normalMatrix * normal;
     
    gl_Position = projectionMatrix * pos_view;
    o_uv = uv;
    o_normal = normal_world;
}