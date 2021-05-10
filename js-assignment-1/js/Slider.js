function Slider(){
    this.carouselContainer = document.getElementsByClassName("carousel-container")[0];
    this.carouselWrapper = document.getElementsByClassName("carousel-wrapper")[0];
    this.sliderIndex = 0;
    this.numOfImages = this.carouselWrapper.childElementCount;
    this.carouselItemWidth = document.getElementsByClassName('carousel-item')[0].width;
    console.log(this.carouselItemWidth);
    this.carouselContainer.style.width = this.carouselItemWidth;

    // indicator wrapper creation and styling
    this.indicatorWrapper = document.createElement('div');
    this.indicatorWrapper.style.padding = "5px";
    this.indicatorWrapper.style.backgroundColor = "#5D97A2";
    this.indicatorWrapper.style.position = "absolute";
    this.indicatorWrapper.style.bottom = "20px";
    this.indicatorWrapper.style.left = "50%";
    this.indicatorWrapper.style.transform = "translate(-50%)";
    this.indicators = [];

    // indicator creation as per no of images present
    for(var i=0; i<this.numOfImages; i++){
        indicator = document.createElement('img');
        indicator.src = "images/indicator_passive.png";
        this.indicators.push(indicator);
        this.indicatorWrapper.appendChild(indicator);
    }

    // appending indicator to wrapper and setting 1st image as active
    this.indicators[this.sliderIndex].src = "images/indicator_active.png";
    this.carouselContainer.appendChild(this.indicatorWrapper);

    // left action button creation and styling
    this.actionLeft = document.createElement('div');
    this.actionLeft.style.height = '40px';
    this.actionLeft.style.borderRadius = '50%';
    this.actionLeft.style.position = 'absolute';
    this.actionLeft.style.backgroundColor = 'white';
    this.actionLeft.style.width = '40px';
    this.actionLeft.style.top = '50%';
    this.actionLeft.style.left = '10px';
    this.actionLeft.style.transform = 'translateY(-50%)';

    // left arrow img styling
    this.leftArrow = document.createElement('img');
    this.leftArrow.src = 'images/left_arrow.png';
    this.leftArrow.style.width = '20px';
    this.leftArrow.style.position = 'absolute';
    this.leftArrow.style.top = '50%';
    this.leftArrow.style.left = '50%';
    this.leftArrow.style.transform = 'translate(-50%, -50%)';

    // appending the arrow img with action button
    this.actionLeft.appendChild(this.leftArrow);
    this.carouselContainer.appendChild(this.actionLeft);

    // right action button creation and styling
    this.actionRight = document.createElement('div');
    this.actionRight.style.height = '40px';
    this.actionRight.style.borderRadius = '50%';
    this.actionRight.style.position = 'absolute';
    this.actionRight.style.backgroundColor = 'white';
    this.actionRight.style.width = '40px';
    this.actionRight.style.top = '50%';
    this.actionRight.style.right = '10px';
    this.actionRight.style.transform = 'translateY(-50%)';

    // right arrow image styling
    this.rightArrow = document.createElement('img');
    this.rightArrow.src = 'images/right_arrow.png';
    this.rightArrow.style.width = '20px';
    this.rightArrow.style.position = 'absolute';
    this.rightArrow.style.top = '50%';
    this.rightArrow.style.left = '50%';
    this.rightArrow.style.transform = 'translate(-50%, -50%)';

    // appending the arrow img with action button 
    this.actionRight.appendChild(this.rightArrow);
    this.carouselContainer.appendChild(this.actionRight);

    this.actionLeft.addEventListener('click', () =>{
        this.indicators[this.sliderIndex].src = "images/indicator_passive.png";
        if(this.sliderIndex == 0){
            this.sliderIndex = this.numOfImages - 1;
        }
        else{
            this.sliderIndex = this.sliderIndex - 1; 
        }
        this.transitionLeft(this.carouselWrapper, this.carouselItemWidth, this.sliderIndex, this.stopAnimation, 500);
        this.indicators[this.sliderIndex].src = "images/indicator_active.png";
    });
    
    this.actionRight.addEventListener('click', () =>{
        this.indicators[this.sliderIndex].src = "images/indicator_passive.png";
        this.sliderIndex = (this.sliderIndex + 1) % this.numOfImages;

        this.transitionRight(this.carouselWrapper, this.carouselItemWidth, this.sliderIndex, this.stopAnimation, 500);
        this.indicators[this.sliderIndex].src = "images/indicator_active.png";
    });

    this.indicators.forEach((element, index, array) => {
        element.addEventListener('click', ()=>{
            if(this.sliderIndex!=index){
                array[this.sliderIndex].src = "images/indicator_passive.png";
            }
            if(this.sliderIndex > index){
                //action left 
                this.transitionLeft(this.carouselWrapper, this.carouselItemWidth, index, this.stopAnimation, 500);
            }
            else if(this.sliderIndex < index){
                //action right
                this.transitionRight(this.carouselWrapper, this.carouselItemWidth, index, this.stopAnimation, 500);
            }
            
            this.sliderIndex = index;
            element.src = "images/indicator_active.png";
        })
    });
}

Slider.prototype.transitionLeft = function(carouselWrapper, carouselItemWidth, sliderIndex, stopAnimation, transitionTime){
    var animation = setInterval(function(){
            /* In transitionTime, a width of carouselItemWidth should be shifted,
               In interval of 100, a width of carouselItemWidth/(transitionTime/100), should be shifted.
            */

        //    TODO not defined console.log(transitionTime);
            carouselWrapper.style.left = Math.min(parseInt(carouselWrapper.style.left, 10) + carouselItemWidth/(500/100), '-' + sliderIndex*586) + 'px';
            if(parseInt(carouselWrapper.style.left, 10)>='-' + sliderIndex*586){
                stopAnimation(animation);
            }
        }, 100);
    }

Slider.prototype.transitionRight = function(carouselWrapper, carouselItemWidth, sliderIndex, stopAnimation){
    var animation = setInterval(function(){
            /* TODO: Initially, default value of left is 0px,which is stored as empty string.
            */
            leftValue = carouselWrapper.style.left === ""? "0px": carouselWrapper.style.left;
            carouselWrapper.style.left = Math.max(parseInt(leftValue, 10) - carouselItemWidth/(500/100), '-' + sliderIndex*586) + 'px';
            if(parseInt(carouselWrapper.style.left, 10)<='-' + sliderIndex*586){
                stopAnimation(animation);
            }
        }, 100);
    }

Slider.prototype.stopAnimation = function(intervalId){
    clearInterval(intervalId);
}

x = new Slider();