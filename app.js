
const canvas = document.getElementById('canvas');
    uploader = document.getElementById('uploader');
    customBtn = document.getElementById('custom');
    cForm = document.getElementById('cForm');
    context = canvas.getContext('2d');
    patternContainer = document.querySelector('.pattern-container');
    message = document.querySelector('.message');
    modal = document.querySelector('.modal');
    previewImage = document.querySelector('.preview');
    closeBtn = document.querySelector('.close');
    popupForm = document.querySelector('.popup-form');
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
           
           let msg = `<p>Input image: width = ${image.width}px, height = ${image.height}px</p>`
          
           generatePattern();
       }

    }

}

let previousSrc = null;

const checkAndGenerate = () => {
    
    if(!image.src){
        let msg = `<p class="red" >No Images Selected!</p>`
        message.innerHTML = msg;
        return;
    }
    if(image.src === previousSrc){
        let msg = `<p class="red">Select New Image</p>`
        message.innerHTML = msg;
        return;
    }

    generatePattern();

    previousSrc = image.src;

}

const generatePattern = () => {
    
        if(!image.src){
            let msg = `<p class="red" >No Images Selected!</p>`
            message.innerHTML = msg;
            return;
        }
        if(image.src === previousSrc){
            let msg = `<p class="red">Select New Image</p>`
            message.innerHTML = msg;
            return;
        }
   
  
   

   // Temporary Canvas to draw the output image 
let tempCanvas =  document.createElement('canvas');
    tempContext = tempCanvas.getContext('2d');
    tempCanvas.height = tempCanvas.width = 1000; 


    // MiniCanvas to store the print 
let miniCanvas = document.createElement('canvas');
    miniContext = miniCanvas.getContext('2d');

    miniCanvas.height = miniCanvas.width = 200;
    
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


uploader.addEventListener('change', uploadImage);




const closeForm = () => {
    popupForm.classList.remove('open');
}
customBtn.addEventListener('click', () => {
    popupForm.classList.add('open');
});
closeBtn.addEventListener('click', closeForm);

const updateForm = () => {
    let format =  cForm.querySelector('input[name="format"]:checked').value;
    let quality = cForm.querySelector('input[type="range"]').value;
    let output = cForm.querySelector('.output-info');
    output.innerHTML = ` <p>Output resolution: ${format * quality} X ${format * quality} </p>`;
    cForm.querySelector('.quality').textContent = quality;
   
}

const handleCustom = (e) => {
    e.preventDefault();
    console.log(e.target);
}

cForm.addEventListener('input', updateForm);
cForm.addEventListener('submit', handleCustom);


// Closing the modal
modal.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal')){
        modal.classList.remove('open');
    }
})

const openModal = (e) => {
    let source = e.target.src;
    modal.classList.add('open');
    previewImage.src = source;
}

const addImage = (dataUrl) => {
    let pattern = 
    `<figure class="pattern">
        <img class="image" src="${dataUrl}" alt="pattern" height="340" onclick="openModal(event)" >
            <figcaption> <a class="download-btn" href="${dataUrl}" download="pattern.png" >Download</a> </figcaption>
    </figure>
     ` 
    patternContainer.innerHTML = pattern + patternContainer.innerHTML;

    let msg = `<p>
        Input image: width = ${image.width}px, height = ${image.height}px<br/>
        Click on Images to Preview
            </p>`

    message.innerHTML = msg;
}