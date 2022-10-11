
import 'https://rawcdn.githack.com/flackr/scroll-timeline/637746fa559c3f9d01fcdaf2fcb7e649d18dfc33/dist/scroll-timeline.js';

$("div.container").click(function()
{
    $("ul.navs").toggleClass("navsChange"),
    $("div.container").toggleClass("change")
    
});


document.querySelector('.navs').onmousemove = e => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  };



  const animitedElements = document.querySelectorAll(".animited");

animitedElements.forEach((elements) => {

    const animitedImageTimeline = new ScrollTimeline({
        scrollOffsets: [
          {target: elements, edge: "end", threshold: "0"},
          {target: elements, edge: "start", threshold: "1"},
        ],
    }); 

    elements.animate(
        {
            opacity: ["0", "1"],
        },
        {
            duration: 1,
            easing: "linear",
            timeline: animitedImageTimeline,
        }
    );
});


const animitedImage = document.querySelectorAll(".image");

animitedImage.forEach((elements) => {

    const animitedImageTimeline = new ScrollTimeline({
        scrollOffsets: [
            {target: elements, edge: "end", threshold: "1"},
            {target: elements, edge: "start", threshold: "0"},
        ],
    }); 

    elements.animate(
        {
            opacity: ["1", "0"],
            
        },
        {
            duration: 1,
            easing: "linear",
            timeline: animitedImageTimeline,
            
    
        }
    );
});


$(window).scroll(function() {
  
    // selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel');
        
    var scroll = $window.scrollTop() + ($window.height() / 3);
   
    $panel.each(function () {
      var $this = $(this);
      
      if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
            
        
        $body.removeClass(function (index, css) {
          return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });
       
         
        $body.addClass('color-' + $(this).data('color'));
      }
    });    
    
  }).scroll();

 
(function(){
    init();

    var g_containerInViewport;
    function init(){
        setStickyContainersSize();
        bindEvents();
    }

    function bindEvents(){
        window.addEventListener("wheel", wheelHandler);        
    }

    function setStickyContainersSize(){
        document.querySelectorAll('.sticky-container').forEach(function(container){
            const stikyContainerHeight = container.querySelector('.galery').scrollWidth;
            container.setAttribute('style', 'height: ' + (stikyContainerHeight-1000) + 'px');
        });
    }

    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }

    function wheelHandler(evt){
        
        const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
            return isElementInViewport(container);
        })[0];

        if(!containerInViewPort){
            return;
        }

        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

        if(g_canScrollHorizontally){
            containerInViewPort.querySelector('.galery').scrollLeft += evt.deltaY;
        }
    }
})();



