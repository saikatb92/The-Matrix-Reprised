var symbol;
var create;
var symbolSize = 26;
var totalStreamsArray = [];
var flag = 1;
function setup() {
createCanvas(window.innerWidth, window.innerHeight);
background(0, 120);
create = new CreateStreamsArray();
create.pushStreamsIntoArray();
}

function draw() {
    background(0, 165);
    create.callTheDisplay();
}

function CreateStreamsArray() {
    this.totalStreams = window.innerWidth/symbolSize;;
     
    this.pushStreamsIntoArray = function() {
        var x = 0;
        var y = random(-200, 100);
       for(var k = 0; k < this.totalStreams; k++) {
        var stream = new Stream();
        stream.generateStream(x, y);  
        x+=symbolSize;
        totalStreamsArray.push(stream);
    }
        
    }
    
    this.callTheDisplay = function() {  
          for(var w = 0; w <totalStreamsArray.length; w++) {
            totalStreamsArray[w].display();
              (w%8==0) ? flag = 1 : flag = 0; 
          }
    }
}

function Symbol(x, y) {
    this.x = x;
    this.y = y; 
    this.value = String.fromCharCode(0x30A0+1);
    this.changingSpeed;
    
    this.flickerSymbol = function() { 
    this.changingSpeed = ~~(random(13, 18));
    if(frameCount % this.changingSpeed == 0)
    this.value = String.fromCharCode(0x30A0+ ~~random(0, 96));
    }
       
}

function Stream() {
    this.streamArray = [];
    this.streamLength = round(random(10, 42));
    var streamSpeed = random(2, 14);
    
    this.generateStream = function(x, y) {
    this.x = x;
    this.y = y;
    for(var i = 0; i<this.streamLength; i++) {
        symbol = new Symbol(this.x, this.y);      
        symbol.flickerSymbol();
        this.y-= symbolSize;
        if(i >= this.streamArray.length)
        this.streamArray.push(symbol);
    }
       // x+=20;
    }
    
    this.display = function() {
        textSize(symbolSize);
        textStyle(BOLD);
        for(var j = 0; j<this.streamArray.length; j++) {
            if(j==0 && flag)
                fill(180,255,180);
            else
             fill(0, random(100,255), random(100,230), random(100,240));
        text(this.streamArray[j].value, this.streamArray[j].x, this.streamArray[j].y);
        (this.streamArray[j].y >= window.innerHeight) > 0 ? this.streamArray[j].y = 0 :  this.streamArray[j].y+=streamSpeed ;
        this.streamArray[j].flickerSymbol();
        }
         
       
    }
}
