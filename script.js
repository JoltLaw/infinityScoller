
const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages  = 0;
let photosArray = [];

// Unslpash API
const count = 30;
const apiKey = "mNHR8tjdDUvIQnft2I7vmWg2b6F3MqXHiIfk8EKFeU8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
    }
}

// helper function to set attributes to dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes [key]);
    }
}

// create elements to display photos
function displayPhotos() {
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
    // create anchor element to link to unsplash
    const item = document.createElement('a');
    // Making an object lay out so that the code can automaticialy repeat its self
        setAttributes(item, 
            {href: photo.links.html,
                target: '_blank',
            });
        // // create image for photo
        const img = document.createElement("img");
      
            // fills out all the Elements attributes
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            tittle: photo.alt_description,
        });
        // Event listner, check when an event is finished
        img.addEventListener('load', imageLoaded)
        //  put img inside the anchor Element and then put both inside img container
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}
// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {

    }
}

// check to see if the user is scrolling near the bottom of the page and if so add more photos. also sets ready value to false and imagesloaded to zero so that more photos can be contuined to


window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
    imagesLoaded = 0;
}})

// on load
getPhotos()