'use strict';

import galleryImg from './gallery-items.js';


const refs = {
    jsGallery: document.querySelector('ul.js-gallery'),
    jsLightbox: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    jsLightboxImage: document.querySelector('.lightbox__image'),
    closeLightbox: document.querySelector('button[data-action="close-lightbox"]'),
}

const addImg = refs.jsGallery.insertAdjacentHTML('beforeend', galleryImg.map(({ preview, original, description }) =>
    `<li class="gallery__item">
     <a class="gallery__link" href="${original}">
     <img class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}">
    </a>
    </li>`)
    .join(''));

function addModalSrc(event) {
    refs.jsLightboxImage.src = event.target.dataset.source;
    refs.jsLightboxImage.alt = event.target.alt;
}; 

function cleanModalSrc() {
    refs.jsLightboxImage.src = '#';
    refs.jsLightboxImage.alt = '';
};

function modalIsOpen(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;   
    };

    refs.jsLightbox.classList.add('is-open');

    addModalSrc(event);
} 

function modalIsClose() {

    refs.jsLightbox.classList.remove('is-open');

    cleanModalSrc();
} 

function keyModalIsClose(event) {

    if (refs.jsLightbox.classList.contains('is-open') && event.code === 'Escape') {
        modalIsClose();
    }
    
}; 

refs.jsGallery.addEventListener('click', modalIsOpen);

refs.lightboxOverlay.addEventListener('click', modalIsClose);

refs.closeLightbox.addEventListener('click', modalIsClose);

window.addEventListener('keydown', keyModalIsClose);
