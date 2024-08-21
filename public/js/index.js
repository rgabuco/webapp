$(document).ready(function () {
    localStorage.clear();
    createDummyData();

    const seeMoreButton = document.querySelector('.button button');
    if (seeMoreButton) {
        seeMoreButton.addEventListener('click', function() {
            window.location.href = '/html/login.html';
        });
    }

    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');
    let slider = document.querySelector('.slider');
    let sliderList = slider ? slider.querySelector('.slider .list') : null;
    let thumbnail = document.querySelector('.slider .thumbnail');
    let thumbnailItems = thumbnail ? thumbnail.querySelectorAll('.item') : null;

    if (thumbnailItems && thumbnailItems.length > 0) {
        thumbnail.appendChild(thumbnailItems[0]);
    }

    if (nextBtn && prevBtn && slider && sliderList && thumbnail && thumbnailItems) {
        nextBtn.onclick = function() {
            moveSlider('next');
        }

        prevBtn.onclick = function() {
            moveSlider('prev');
        }

        function moveSlider(direction) {
            let sliderItems = sliderList.querySelectorAll('.item');
            let thumbnailItems = document.querySelectorAll('.thumbnail .item');
            
            if (direction === 'next') {
                sliderList.appendChild(sliderItems[0]);
                thumbnail.appendChild(thumbnailItems[0]);
                slider.classList.add('next');
            } else {
                sliderList.prepend(sliderItems[sliderItems.length - 1]);
                thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
                slider.classList.add('prev');
            }

            slider.addEventListener('animationend', function() {
                if (direction === 'next') {
                    slider.classList.remove('next');
                } else {
                    slider.classList.remove('prev');
                }
            }, { once: true });
        }
    }

    const playPauseButton = $('#playPauseButton');
    const backgroundMusic = $('#backgroundMusic')[0];

    // Debugging: Log the audio element to check if it's correctly selected
    console.log('Background Music Element:', backgroundMusic);

    playPauseButton.on('click', function () {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playPauseButton.text('Pause');
        } else {
            backgroundMusic.pause();
            playPauseButton.text('Play');
        }
    });
});
