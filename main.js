var muñecaDY=0;
var muñecaDX=0;
var muñecaIY=0;
var muñecaIX=0;
var muñeca_derecha=0;
var muñeca_izquierda=0;
cancion=" "
function setup() {
    canvas=createCanvas(700,500);
    canvas.position(300,150);

    video=createCapture(VIDEO);
    
    mocelo=ml5.poseNet(video,palabra);
    mocelo.on("pose",resultados);
     
    video.hide();
}

function resultados(results) {
    if (results.length>0) {
        muñeca_derecha=results[0].pose.keypoints[10].score;
        muñeca_izquierda=results[0].pose.keypoints[9].score;

        muñecaDX=results[0].pose.rightWrist.x;
        muñecaDY=results[0].pose.rightWrist.y;

        muñecaIX=results[0].pose.leftWrist.x;
        muñecaIY=results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(video,0,0,700,500);

    fill("red");
    stroke("red");


    if (muñeca_derecha>0.2) {
        circle(muñecaDX,muñecaDY,20);
        if (muñecaDY>0 && muñecaDY<=100) {
            document.getElementById("velocidad").innerHTML="velocidad=0.5x";
            cancion.rate(0.5);
        }
        else if (muñecaDY>100 && muñecaDY<=200){
            document.getElementById("velocidad").innerHTML="velocidad=1x";
            cancion.rate(1);
        }
        else if (muñecaDY>200 && muñecaDY<=300){
            document.getElementById("velocidad").innerHTML="velocidad=1.5x";
            cancion.rate(1.5);
        }
        else if (muñecaDY>300 && muñecaDY<=400){
            document.getElementById("velocidad").innerHTML="velocidad=2x";
            cancion.rate(2);
        }
        else if (muñecaDY>400){
            document.getElementById("velocidad").innerHTML="velocidad=2.5x";
            cancion.rate(2.5);
        }
    }

    if(muñeca_izquierda>0.2){
        circle(muñecaIX,muñecaIY,20);
        numero=Number(muñeca_izquierda);
        nuevo_muñeca_izquierda=floor(numero*2);
        dividir=nuevo_muñeca_izquierda*100;
        document.getElementById("volumen").innerHTML="Volumen="+dividir;
        cancion.setVolume(dividir)
    }
}

function preload() {
    cancion=loadSound("Alan Walker   The Spectre.mp3");
}
 
function palabra() {
    console.log("ta bien👍");
}

function function_de_cansion(){
    cancion.play();
    cancion.setVolume(1);
    cancion.rate(1);
} 