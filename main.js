rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = "+scoreRightWrist+"  Score Left Wrist = "+scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+ "  Right Wrist Y = "+rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+ "Left Wrist Y = "+leftWristY);
    }
}


function draw()
{
    image(video, 0, 0, 600, 500);

    song1 = loadSound("music.mp3");
    song1.isPlaying();

    fill("#00ddff");
    stroke("#00ddff");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1 = false)
        {
            song1.play()
            document.getElementById("song_name").innerHTML = " Song Playing - Harry Potter remix";
        }

    }
    
    song2 = loadSound("music2.mp3");
    song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2 = false)
        {
            song2.play()
            document.getElementById("song_name").innerHTML = " Song Playing - PeterPan!";
        }

    }
}

function modelLoaded()
{
    console.log("PoseNet is Initialised!");
}