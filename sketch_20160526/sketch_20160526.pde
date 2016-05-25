float time;
int frames;

PImage imageCorn;
PImage imageFeedback;

PFont font;

PShader shaderWord;
PShader shaderFeedback;

void setup() {
  size( 400, 400, P2D );
  
  time = 0.0;
  frames = 120;
  
  imageCorn = loadImage( "corn.png" );
  imageMode( CENTER );
  imageFeedback = createImage( width, height, RGB );
  
  font = createFont( "HelveticaNeue-BoldItalic", width * 0.15 );
  textFont( font );
  textAlign( CENTER, CENTER );
  textMode( SHAPE );
  
  shaderWord = loadShader( "word.frag" );
  shaderWord.set( "resolution", width * 1.0, height * 1.0 );
  shaderFeedback = loadShader( "feedback.frag" );
  shaderFeedback.set( "resolution", width * 1.0, height * 1.0 );
}

void draw() {
  time = frameCount * 1.0 / frames;
  
  
  background( 0 );
  
  resetShader();
  
  pushMatrix();
  translate( width * 0.5, height * 0.5 );
  image( imageCorn, 0, 0, width, height );
  popMatrix();
  
  shader( shaderWord );
  shaderWord.set( "horizon", height * 0.52 );
  text( "LIFE SUCKS", width * 0.5, height * 0.5 );

  shaderFeedback.set( "time", time );
  shaderFeedback.set( "textureFeedback", imageFeedback );
  filter( shaderFeedback );
  imageFeedback = copy();
  
  saveFrame( "out/####.png" );
}