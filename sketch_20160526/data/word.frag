#define PI 3.14159265
#define V vec2(0.,1.)
#define saturate(i) clamp(i,0.,1.)

precision highp float;

uniform vec2 resolution;
uniform float horizon;
uniform sampler2D textureWord;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float hor = 1.0 - horizon / resolution.y;

  vec3 rgb = mix(
    vec3( 0.76, 0.92, 0.98 ),
    vec3( 0.15, 0.02, 0.44 ),
    ( uv.y - hor ) * 20.0 + 1.0
  );

  if ( 0.0 < ( uv.y - hor ) ) {
    rgb = mix(
      vec3( 0.76, 0.92, 0.98 ),
      vec3( 0.29, 0.62, 0.89 ),
      ( uv.y - hor ) * 20.0
    );
  }

  gl_FragColor = vec4( pow( rgb, V.yyy * 1.0 / 2.2 ), 1.0 );
}
