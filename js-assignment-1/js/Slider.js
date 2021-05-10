function Slider(){
    this.sliderIndex = 0;
    this.carouselContainer = document.getElementsByClassName("carousel-container")[0];
    this.carouselWrapper = document.getElementsByClassName("carousel-wrapper")[0];
    this.numOfImages = this.carouselWrapper.childElementCount;
    this.indicatorWrapper = document.createElement('div');
    this.indicatorWrapper.style.padding = "5px";
    this.indicatorWrapper.style.backgroundColor = "#5D97A2";
    this.indicatorWrapper.style.position = "absolute";
    this.indicatorWrapper.style.bottom = "20px";
    this.indicatorWrapper.style.left = "50%";
    this.indicatorWrapper.style.transform = "translate(-50%)";
    this.indicators = [];

    for(var i=0; i<this.numOfImages; i++){
        indicator = document.createElement('img');
        indicator.src = "images/indicator_passive.png";
        this.indicators.push(indicator);
        this.indicatorWrapper.appendChild(indicator);
    }

    this.indicators[this.sliderIndex].src = "images/indicator_active.png";
    this.carouselContainer.appendChild(this.indicatorWrapper);

    this.actionLeft = document.createElement('div');
    this.actionLeft.style.height = '40px';
    this.actionLeft.style.borderRadius = '50%';
    this.actionLeft.style.position = 'absolute';
    this.actionLeft.style.backgroundColor = 'white';
    this.actionLeft.style.width = '40px';
    this.actionLeft.style.top = '50%';
    this.actionLeft.style.left = '10px';
    this.actionLeft.style.transform = 'translateY(-50%)';

    this.leftArrow = document.createElement('img');
    this.leftArrow.src = 'images/left_arrow.png';
    this.leftArrow.style.width = '20px';
    this.leftArrow.style.position = 'absolute';
    this.leftArrow.style.top = '50%';
    this.leftArrow.style.left = '50%';
    this.leftArrow.style.transform = 'translate(-50%, -50%)';

    this.actionLeft.appendChild(this.leftArrow);
    this.carouselContainer.appendChild(this.actionLeft);


    this.actionRight = document.createElement('div');
    this.actionRight.style.height = '40px';
    this.actionRight.style.borderRadius = '50%';
    this.actionRight.style.position = 'absolute';
    this.actionRight.style.backgroundColor = 'white';
    this.actionRight.style.width = '40px';
    this.actionRight.style.top = '50%';
    this.actionRight.style.right = '10px';
    this.actionRight.style.transform = 'translateY(-50%)';


    this.rightArrow = document.createElement('img');
    this.rightArrow.src = 'images/right_arrow.png';
    this.rightArrow.style.width = '20px';
    this.rightArrow.style.position = 'absolute';
    this.rightArrow.style.top = '50%';
    this.rightArrow.style.left = '50%';
    this.rightArrow.style.transform = 'translate(-50%, -50%)';

    this.actionRight.appendChild(this.rightArrow);
    this.carouselContainer.appendChild(this.actionRight);

    this.actionLeft.addEventListener('click', () =>{
        this.indicators[this.sliderIndex].src = "images/indicator_passive.png";
        this.sliderIndex = (this.sliderIndex + 1) % this.numOfImages;
        this.carouselWrapper.style.left = '-' + this.sliderIndex*586 + 'px';
        this.indicators[this.sliderIndex].src = "images/indicator_active.png";
    });
    
    this.actionRight.addEventListener('click', () =>{
        this.indicators[this.sliderIndex].src = "images/indicator_passive.png";
        this.sliderIndex = (this.sliderIndex + 1) % this.numOfImages;
        this.carouselWrapper.style.left = '-' + this.sliderIndex*586 + 'px';
        this.indicators[this.sliderIndex].src = "images/indicator_active.png";
    });
}

x = new Slider();