$(document).ready(function() {
  let currentIndex = 0;
  const slides = $('.slide');
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.removeClass('active');
    slides.eq(index).addClass('active');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  // Initialize the slideshow
  showSlide(currentIndex);

  // Change slide every 3 seconds
  setInterval(nextSlide, 3000);

});

