import Swiper from "swiper";

export default class MySimpleImage {

  constructor({ data, config, api, readOnly }) {
    console.log("MySimpleImage constructor ", data);
    console.log(config, api, readOnly);
    this.data = data;
    this.api = api;
    this.swiper = null;
    this.tempAddImageUrl = 'https://img.hazzys.com/cmsstatic/section-custom-entity/eventList/9502/whiteday.jpg';
    this.swiperClass = {
      main: 'swiper',
      wrapper: 'swiper-wrapper',
      slide: 'swiper-slide',
      pagination: 'swiper-pagination',
      prev: 'swiper-button-prev',
      next: 'swiper-button-next',
      scrollbar: 'swiper-scrollbar'
    }
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  render(){
    this._createMainWrapper();
    const pasteInput = this._makePasteInput();
    this.swiperCount = document.querySelectorAll('.swiper').length;

    if(this?.data?.url?.length > 0) {
      this._createSwiper(this.data.url);
      return this.wrapper;
    }

    this.wrapper.appendChild(pasteInput);
    pasteInput.addEventListener('paste', (event) => {
      //this._createImage(event.clipboardData.getData('text'));
      this._createSwiper(Array.of(event.clipboardData.getData('text')));
      this.swiper = new Swiper(".swiper.number-" + this.swiperCount , {});
    });

    return this.wrapper;
  }

  _makePasteInput() {
    const input = document.createElement('input');
    input.placeholder = 'Paste an image URL...';
    return input;
  }

  _createMainWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('simple-image');
  }

  _createSwiper(urls) {
    this.wrapper.innerHTML = '';
    const swiperMain = this._makeSwiperMain();
    const swiperWrapper = this._makeSwiperWrapper();
    this._addSwiperSlider(urls, swiperWrapper);
    const pagination = this._makePagination();
    const navigationButtons = this._makeNavigationButtons();

    swiperMain.appendChild(swiperWrapper);
    swiperMain.appendChild(pagination);
    swiperMain.appendChild(navigationButtons.prev);
    swiperMain.appendChild(navigationButtons.next);

    const buttonWrapper = this._makeButtonWrapper();
    const addPictureButton = this._makeAddPictureButton();
    const deletePictureButton = this._makeDeletePictureButton();

    buttonWrapper.appendChild(addPictureButton);
    buttonWrapper.appendChild(deletePictureButton);

    this.wrapper.appendChild(swiperMain);
    this.wrapper.appendChild(buttonWrapper);
    //this.wrapper.appendChild(deletePictureButton);
  }

  _makeButtonWrapper() {
    return document.createElement('div');
  }
  _makeAddPictureButton() {
    const addButton = document.createElement('button');
    addButton.className = "btn btn-primary";
    addButton.innerText = 'add picture';

    const self = this;
    addButton.addEventListener('click', function () {
      const slider = document.createElement('div');
      slider.classList.add(self.swiperClass.slide);
      const img = document.createElement('img');
      img.src = self.tempAddImageUrl;
      slider.appendChild(img);
      console.log(self, self.wrapper, self.swiperClass.slide);
      const swiperWrapper = self.wrapper.querySelector("." + self.swiperClass.wrapper);
      console.log(swiperWrapper);
      swiperWrapper.appendChild(slider);
      self.swiper.updateSlides();
    });
    return addButton;
  }

  _makeDeletePictureButton() {
    const deleteButton = document.createElement('button');
    deleteButton.className = "btn btn-primary";
    deleteButton.innerText = 'delete picture';

    const self = this;
    deleteButton.addEventListener('click', function () {
      /* image가 한장이면 지울수 없게 만듬 */
      if(self.swiper.slides.length < 2) {
        return;
      }
      console.log('delete button', self.api);
      console.log('this data', self.data);
      console.log(self.swiper.activeIndex);
      const currentBlockIndex = self.api.blocks.getCurrentBlockIndex();
      const currentBlock = self.api.blocks.getBlockByIndex(currentBlockIndex);
      const swiperWrapper = currentBlock.holder.querySelector('.' + self.swiperClass.wrapper);
      const children = swiperWrapper.children;
      const currentSlider = children[self.swiper.activeIndex];
      console.log(currentSlider, self.swiper.slides.length);
      swiperWrapper.removeChild(currentSlider);
      self.swiper.updateSlides();
      self.swiper.slideTo(0);
      //const number = Array.from(swiperWrapper.children).indexOf(self.swiper.activeIndex);
      console.log(currentBlockIndex, currentBlock);
    });
    return deleteButton;
  }

  _makeSwiperMain() {
    const swiperMain = document.createElement('div');
    swiperMain.classList.add(this.swiperClass.main);
    swiperMain.classList.add('number-' + this.swiperCount);
    return swiperMain;
  }

  _makeSwiperWrapper() {
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add(this.swiperClass.wrapper);
    return swiperWrapper;
  }

  _makePagination() {
    const pagination = document.createElement('div');
    pagination.classList.add(this.swiperClass.pagination);
    return pagination;
  }

  _makeNavigationButtons() {
    const prev = document.createElement('div');
    prev.classList.add(this.swiperClass.prev);

    const next = document.createElement('div');
    next.classList.add(this.swiperClass.next);

    return {
      "prev": prev,
      "next": next,
    }
  }

  _addSwiperSlider(urls, swiperWrapper) {
    const self = this;
    urls.forEach(function (url) {
      const slider = document.createElement('div');
      slider.classList.add(self.swiperClass.slide);
      const imgElement = document.createElement('img');
      imgElement.src = url;
      slider.appendChild(imgElement);
      swiperWrapper.appendChild(slider);
    });
  }

  /*
    blockContent 는 render() 함수에서 만든 element 이다.
     */
  save(blockContent){
    console.log(blockContent);
    const images = blockContent.querySelectorAll('img');
    const returnImages = [];
    images.forEach(function (element) {
      returnImages.push(element.src);
    })
    return {
      url: returnImages
    }
  }

  renderSwiper() {
    console.log("========= refreshContent");
    this.swiper = new Swiper(".swiper.number-" + this.swiperCount , {});
  }

  /*validate(savedData){
    if (!savedData.url.trim()){
      console.log(savedData, "validate false");
      return false;
    }
    return true;
  }*/

}