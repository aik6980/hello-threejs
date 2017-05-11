//#extension GL_EXT_draw_buffers : require

uniform sampler2D t_albedo;

varying vec2 v_uv;

void main(void)
{
    vec4 col_albedo = texture2D(t_albedo, v_uv);
    gl_FragColor = vec4(col_albedo.rgb,1);
}