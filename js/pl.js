
//JS for FULL SCREEN VIDEO
// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}


// BEGIN SLIDE IN ANIMATIONS ON LOAN TYPES
$(function() {
    var $blocks = $('.animBlock.notViewed');
    var $window = $(window);
  
    $window.on('scroll', function(e){
      $blocks.each(function(i,elem){
        if($(this).hasClass('viewed')) 
          return;
          
        isScrolledIntoView($(this));
      });
    });
  });
  
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemOffset = 0;
    
    if(elem.data('offset') != undefined) {
      elemOffset = elem.data('offset');
    }
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    
    if(elemOffset != 0) { // custom offset is updated based on scrolling direction
      if(docViewTop - elemTop >= 0) {
        // scrolling up from bottom
        elemTop = $(elem).offset().top + elemOffset;
      } else {
        // scrolling down from top
        elemBottom = elemTop + $(elem).height() - elemOffset
      }
    }
    
    if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
      // once an element is visible exchange the classes
      $(elem).removeClass('notViewed').addClass('viewed');
      
      var animElemsLeft = $('.animBlock.notViewed').length;
      if(animElemsLeft == 0){
        // with no animated elements left debind the scroll event
        $(window).off('scroll');
      }
    }
  }
  //END ANIMARTIONS

// JS for infinite scroller //
const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation()
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    })
  });
}

// Sets carousel-items all to the same height to keep the page from jumping //
function setCarouselItemHeight() {
  document.querySelectorAll('.carousel').forEach(carousel => {
      let maxHeight = 0;
      const items = carousel.querySelectorAll('.carousel-item');

      // Reset heights to auto to get natural height
      items.forEach(item => {
          item.style.height = 'auto';
          const itemHeight = item.offsetHeight;
          if (itemHeight > maxHeight) {
              maxHeight = itemHeight;
          }
      });

      // Set all items to the tallest height
      items.forEach(item => {
          item.style.height = `${maxHeight}px`;
      });
  });
}

// Run function on page load and window resize
document.addEventListener('DOMContentLoaded', setCarouselItemHeight);
window.addEventListener('resize', setCarouselItemHeight);

