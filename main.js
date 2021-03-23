status = '';
object = [];
objectDetector = '';

function setup(){
    canvas = createCanvas(480, 380);
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ''){
        objectDetector.detect(video, gotResults);
        for(i = 0 ; i < object.length ; i++){
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);

            if(object[i].label == objMentioned){
                document.getElementById('status').innerHTML = 'Status - Object Detected';
                document.getElementById('obj_mentioned').innerHTML = objMentioned + ' is found';

                video.stop();

                var synth = window.speechSynthesis;

                var speak_data = objMentioned + ' is found';
            
                var utterThis = new SpeechSynthesisUtterance(speak_data);
            
                synth.speak(utterThis);
            }
            else{
                document.getElementById('status').innerHTML = 'Status - Detecting Object';
                document.getElementById('obj_mentioned').innerHTML = objMentioned + ' is not found';
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status - Detecting Objects';

    var synth = window.speechSynthesis;

    var speak_data = "Detecting objects";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    objMentioned = document.getElementById('input').value;
    if(objMentioned == ''){
        alert('please insert your name');
    }
    else{
        alert('Successfully done');
    }
}

function modelLoaded(){
    console.log('model is Loaded');
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results
    }
}



