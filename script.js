(function() {
  var sliders = [];

  function MySlider(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error("element should be HTMLElement");
    }

    this._element = element;
    this._wrapper = element.querySelector(".houdini-wrapper");
    this._slide = element.querySelector(".houdini-slide");
    this._slides = element.querySelectorAll(".houdini-slide");
    this._slidesAmount = this._slides.length;
    this._currentSlide = 0;
    this._slideWidth = 0;
    this._next = this._element.querySelector(".houdini-next");
    this._prev = this._element.querySelector(".houdini-prev");


    this.defineSlideWidth();
    this.changeSlide();
  

    window.addEventListener("resize", ()=> {
      this.defineSlideWidth();
      this.changeSlide();
    });

    if (!this._slides) {
      throw new Error(".houdini-slide has to be included into slider");
    }

    if (this._slide.hasAttribute("data-slide-bg")) {
      this._slides.forEach(element => {
        this.setSlideBg(element, element.getAttribute("data-slide-bg"));
      });
    }

    if (this._next) {
      this._next.addEventListener("click", () => {    
        if(!(this._currentSlide > this._slides.length - 2)) {
          this._currentSlide += 1;
          this._slidewidth = this._currentSlide * this._slideWidth;
          this.changeSlide();
        }
   
      });
    }

    if (this._prev) {
      this._prev.addEventListener("click", () => {     
        if(!(this._currentSlide < 0) ) {
          this._currentSlide -= 1;
          this._slidewidth = this._currentSlide * this._slideWidth;
          this.changeSlide();
        }  
      });
    }
  }

  // Slider Methods

  MySlider.prototype.setSlideBg = function(el, value) {
    if (!el) {
      throw new Error("slide bg is not defined");
    }

    el.style.cssText = `background-image: url('images/${value}'); background-size: cover;`;
  };

  

  MySlider.prototype.defineSlideWidth = function() {
    this._slideWidth = this._slide.offsetWidth;
  };

  MySlider.prototype.changeSlide = function() {
    this._wrapper.style.transform = `translate3d(-${this._slidewidth}px, 0, 0)`;
  };

  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".houdini-slider").forEach(slider => {
      sliders.push(new MySlider(slider));
    });
  });
})();
