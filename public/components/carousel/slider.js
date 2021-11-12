class Slider {
  constructor(slider) {
    this.slider = slider
    this.sliderContainer = this.slider?.querySelector('.sliderContainer')
    this.sliderItems = this.sliderContainer?.querySelectorAll('.sliderItem')
    this.activeItem = this.sliderContainer.children[0]
    this.activeIndex = 0
    this.prevCardIndex = null
    this.nextCardIndex = null
    this.sliderLength = this.sliderContainer.children.length
    this.controls = this.slider?.querySelector('.controls')
    this.leftControl = this.controls?.querySelector('.leftControl')
    this.rightControl = this.controls?.querySelector('.rightControl')
    console.log(this.sliderContainer)
  }

  init() {
    for (let i = 0; i < this.sliderContainer.children.length; i++) {
      this.sliderContainer.children[i].classList.add('sliderItem')
    }
    this.activeItem.classList.add('active')
    this.prevCard = this.sliderContainer.children[this.sliderContainer.children.length - 1]
    this.prevCard.classList.add('prev')
    this.nextCard = this.sliderContainer.children[1]
    this.nextCard.classList.add('next')

    this.leftControl.addEventListener('click', (e) => {
      this.moveSliderToTheLeft()
    })

    this.rightControl.addEventListener('click', () => {
      this.moveSliderToTheRight()
    })

  }

  moveSliderToTheLeft() {
    if (this.activeIndex == 0) {
      this.activeIndex = this.sliderLength - 1
    } else {
        this.activeIndex -= 1
    }

    this.updateSliderView()
  }

  moveSliderToTheRight() {
    if (this.activeIndex == this.sliderLength - 1) {
      this.activeIndex = 0
    } else {
        this.activeIndex += 1
    }

    this.updateSliderView()
  }

  updateSliderView() {
    for (let i = 0; i < this.sliderLength; i++) {
      this.sliderContainer.children[i].className = 'sliderItem'
    }

    this.prevCardIndex = ((((this.activeIndex - 1) % this.sliderLength) + this.sliderLength) % this.sliderLength)
    this.nextCardIndex = ((((this.activeIndex + 1) % this.sliderLength) + this.sliderLength) % this.sliderLength)
    console.log(this.activeIndex, this.sliderLength)
    this.sliderContainer.children[this.activeIndex].classList.add('active')
    this.sliderContainer.children[this.prevCardIndex].classList.add('prev')
    this.sliderContainer.children[this.nextCardIndex].classList.add('next')
  }
}

const sliders = document.querySelectorAll('.slider')

for (let i = 0; i < sliders.length; i++) {
  const HTMLSlider = sliders[i]
  console.log(HTMLSlider)
  const slider = new Slider(HTMLSlider)
  slider.init()
}