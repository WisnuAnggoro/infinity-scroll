const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let readyToLoadImages = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        readyToLoadImages = true;
    }
}

// Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements then display them
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Iterate through array's elements
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash website
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event listener, check if image is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> then put in image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Fetch photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}

// Check if scrolling near the bottom, if so, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoadImages) {
        readyToLoadImages = false;
        getPhotos();
    }
});

// On Load
getPhotos();