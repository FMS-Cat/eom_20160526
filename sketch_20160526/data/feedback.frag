#define PI 3.14159265
#define V vec2(0.,1.)
#define saturate(i) clamp(i,0.,1.)

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform sampler2D textureFeedback;

mat2 rotate2D( float _t ) {
  return mat2( cos( _t ), sin( _t ), -sin( _t ), cos( _t ) );
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec4 some = texture2D( texture, uv ) * ( 0.5 + 0.5 * sin( time * PI * 2.0 ) );

  vec2 feedUv = ( vec2( uv * vec2( 1.0, -1.0 ) + V.xy ) - vec2( 0.5 ) ) * 0.98 + vec2( 0.5, 0.4955 );
  vec4 glitch = gl_FragColor;
  vec4 feed = pow( texture2D( textureFeedback, feedUv ) * 1.1, V.yyyy * 2.2 );
  gl_FragColor = max( some, feed ) + glitch * 0.0001;
}
