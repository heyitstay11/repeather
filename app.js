
const canvas = document.getElementById('canvas');
    uploader = document.getElementById('uploader');
    context = canvas.getContext('2d');
    patternContainer = document.querySelector('.pattern-container');
    reader = new FileReader(); 
    image = new Image();


const uploadImage = (e) =>{
    let file = e.target.files[0]
    if(!file) return;
    reader.readAsDataURL(file); // input file to  Data URI

    reader.onload = () => {
       //reader.result stores the converted file 
       image.src = reader.result;   //  Pass Data URI in Image element

       image.onload = () => {
          // console.log(image);
           // set Canvas width and height according to Image
          // let width = Math.min(image.width, 500);
         //  let height = Math.min(image.height, 1000);
           canvas.width = image.width;
           canvas.height = image.height;
           
           // Draw
           context.drawImage(image, 0, 0);
           generatePattern()
       }

    }

}


uploader.addEventListener('change', uploadImage);


const generatePattern = () => {
        // Temporary Canvas to draw the output image 
    let tempCanvas =  document.createElement('canvas');
        tempContext = tempCanvas.getContext('2d');
        tempCanvas.height = tempCanvas.width = 500; 


        // MiniCanvas to store the print 
    let miniCanvas = document.createElement('canvas');
        miniContext = miniCanvas.getContext('2d');
    
        miniCanvas.height = miniCanvas.width = 100;
        
        // Draw a single print
        miniContext.drawImage(image, 0, 0, miniCanvas.width, miniCanvas.height)
    

        // Create a pattern using the print
    let pattern = context.createPattern(miniCanvas, 'repeat');

        // Draw
    tempContext.fillStyle = pattern;
    tempContext.fillRect(0, 0 , tempCanvas.width, tempCanvas.height);
    
    // Convert the canvas to a DataUrl 
    let dataUrl = tempCanvas.toDataURL('image/png');

    //console.log(dataUrl);
    addImage(dataUrl);

}

const addImage = (dataUrl) => {

    let pattern = ` <figure class="pattern">
                        <img src="${dataUrl}" alt="pattern" height="300" >
                        <figcaption> <a class="download-btn" href="${dataUrl}" download="pattern.png" >Download</a> </figcaption>
                    </figure>
                    ` 
    patternContainer.innerHTML = pattern + patternContainer.innerHTML;
}