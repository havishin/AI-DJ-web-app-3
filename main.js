song1 = "";
song2 = "";

song_1_status = "";
song_2_status = "";

scoreRightWrist  = 0;
scoreLeftWrist  = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){
    song1 = loadSound("Beliver.mp3");
    song2 = loadSound("STAR_WALKIN.mp3");
}

function setup(){
    canvas = createCanvas(300, 200);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
}

function modelLoded() {
    console.log("posenet is intialized")
}

function gotPoses(results){
    if(results.length > 0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
    
}

function draw(){
    image(video, 0, 0, 300, 200);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#ff0000");
    stroke("#ff0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Beliver";
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - star walkin";
        }
    }

}

function play(){
    song.play();
    song.setVolume(0.003);
    song.rate(1);
}