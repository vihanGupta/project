var object = [];
var video = "";
var status = "";
function preload()
{
    video = createVideo("log.mp4");
}
function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelloaded); 
    document.getElementById("status").innerHTML = "status: detecting object...";
}
function modelloaded()
{
    console.log("Model loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotresult(result,error)
{
    if(error)
    {
        console.log(error);
    }else
    {
        console.log(result);
        object = result;
    }
}
function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
        objectDetector.detect(video,gotresult);
        for(i = 0;i < object.length;i++)
        {
            document.getElementById("status").innerHTML = "status: objectdetected"

            document.getElementById("objects").innerHTML = "number of objects detected - " + object.length;
            fill("green")
            percent = floor(object[i].confidence * 100);
            text(object[i].label+percent+"%" , object[i].x , object[i].y);
            noFill()
            stroke("green");
            rect(object[i].x,object[i].y,object[i].width,object[i].hight)
        }
    }
}