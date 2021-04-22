 
var greens = ['#134611','#3e8914','#3da35d','#96e072','#e8fccf'];
var greenPink = [ '#134611', '#3e8914', '#e30d59','#e07198','#e8fccf'];

var nowPalette = [];
var palette = {
    color0: '#ffeeaa',
    color1: '#ffeeaa',
    color2: '#ffeeaa',
    color3: '#ffeeaa',
    color4: '#ffeeaa',
    total: 5
};

var params = {
    "min": 3,
    "max": 5,
    "sizeMin": 44,
    "sizeMax": 360
}

var total;
var angles = [];
var shapes = [];
var shapeAngles = [];
var shapeColors = [];
var shapeSizes = [];

const SHAPE = {
    CIRC_CENT: 'circle',
    SQUARE: 'square',
    TRI: 'tri',
    CIRC_CORN: 'circle_corner'
}

var whiteSin = 0;

const gui = new dat.GUI()
let showGui = false;
//let frameSlider;
let pg;

function setup() {

    setAttributes('alpha', false);

    createCanvas(windowWidth, windowHeight);
    pg = createGraphics(windowWidth,windowHeight);
    pg.background( 0 );

    // possible rotations
    angles.push( 0 );
    angles.push( TWO_PI * 0.25);
    angles.push( TWO_PI * 0.5);
    angles.push( TWO_PI * 0.75 );
    angles.push( TWO_PI );
    
    // assign palette
    var thisPal = greenPink;

    palette.color0 = thisPal[0];
    palette.color1 = thisPal[1];
    palette.color2 = thisPal[2];
    palette.color3 = thisPal[3];
    palette.color4 = thisPal[4];
 
    // gui.remember(palette);
    // gui.remember(params);

    gui.addColor(palette, 'color0');
    gui.addColor(palette, 'color1');
    gui.addColor(palette, 'color2');
    gui.addColor(palette, 'color3');
    gui.addColor(palette, 'color4');

    gui.add( params, 'min', 1, 10, 1 );
    gui.add( params, 'max', 2, 30, 1 ); 
    gui.add( params, 'sizeMin', 10, 100, 1);
    gui.add( params, 'sizeMax', 10, 400, 1);

  // frameSlider = gui.add( params, 'frameNum', 0, 40, 1 );

    gui.hide();
    showGui = false;
    
    build(); 
} 

function keyPressed() { 
    //console.log( keyCode );
    if(keyCode === 32){ // spacebar
        build();
    } else if ( keyCode === 83 ){ // s
        saveImage();
    } else if( keyCode == 68 ){
        showGui = !showGui;
        showGui ? gui.show() : gui.hide();
    }
}

function saveImage(){
    console.log('save!');
    saveCanvas( pg, 'gen_05_' + Date.now(), 'png' );
}

function build(){

    var min = params.min;
    var max = params.max;
      
    // how many things
    total = floor(random( min,  max));
    console.log( total );

    // frameSlider.max(total);
    // frameSlider.setValue(total); 

    shapes = [];
    shapeAngles = [];
    shapeColors = [];
    shapeSizes = [];

    nowPalette = [palette.color0,palette.color1,palette.color2,palette.color3,palette.color4];

    // assign
    var shp;
    for( var i = 0; i < total; i++){
        var s = floor(random() * 4); 
        switch(s){
            default:
            case 0:
                shp = SHAPE.CIRC_CENT; break;
            case 1:
                shp = SHAPE.SQUARE; break;
            case 2:
                shp = SHAPE.TRI; break;
            case 3:
                shp = SHAPE.CIRC_CORN; break;
        }

        shapes.push( shp );

        s = floor(random() * angles.length);
        shapeAngles.push( angles[s] );

        s = floor(random() * nowPalette.length);
        shapeColors.push( nowPalette[s]);

        shapeSizes.push( random( params.sizeMin, params.sizeMax ));
 
    } 
     
}
  
function draw() {
    pg.clear();

    pg.blendMode( BLEND );
    pg.fill(0);
    pg.rect( 0, 0, width, height);

    pg.blendMode( ADD);     
    pg.push();
    pg.translate(width/2, height/2);

    pg.noStroke();

    for( var i = 0; i <  shapes.length; ++i){ 
   
        pg.fill( color(shapeColors[i]) );
        pg.push();
        pg.rotate( shapeAngles[i] );
        var size = shapeSizes[i];

        switch(shapes[i]){
            default:
            case SHAPE.CIRC_CENT:
                pg.ellipseMode( CENTER );
                pg.ellipse( 0, 0, size, size );
                break;
            case SHAPE.SQUARE:
                pg.rect( 0, 0, size, size );
                break;
            case SHAPE.TRI:
                pg.triangle( 0, 0, size, 0, 0.5 * size, 0.866025 * size);
                break;
            case SHAPE.CIRC_CORN:
                pg.ellipseMode( CORNER ); // top left of box
               // pg.ellipseMode( CORNERS ); // top left of bounding box
                pg.ellipse( 0, 0, size, size );
                break;
        }
        pg.pop();
    }

    pg.pop();

    image( pg, 0, 0, width, height );
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pg.resizeCanvas( windowWidth, windowHeight);
}
