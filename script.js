(function(){

    var sliders = [];

    function MySlider(element) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('element should be HTMLElement');
        }


        this._element = element;
        this._slide = element.querySelector('.houdini-slide');
        this._slides = element.querySelectorAll('.houdini-slide');
        this._slidesAmount = this._slides.length;
        this._currentSlide = 0;

        if(!this._slides) {
            throw new Error('.houdini-slide has to be included into slider');
        }

        if(this._slide.hasAttribute("data-slide-bg")) {
            this._slides.forEach(element => {
                this.setSlideBg(element, element.getAttribute("data-slide-bg"));
            });
        }

    }

    MySlider.prototype.setSlideBg = function (el, value) {
        if(!el) {
            throw new Error('slide bg is not defined');
        }

        el.style.cssText = `background-image: url('images/${value}'); background-size: cover;`;
    };

    document.addEventListener( 'DOMContentLoaded', function () {
        document.querySelectorAll('.houdini-slider').forEach((slider)=> {
          sliders.push(new MySlider(slider));
        });
        
      });


})();