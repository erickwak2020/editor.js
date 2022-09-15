export default class VideoEmbedded {

  constructor({ data, config, api, readOnly }) {
    console.log('VideoEmbedded constructor ', data);
    console.log(config, api, readOnly);
    this.data = data;
    this.api = api;
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="28px" height="28px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '        <path d="M5.25 5.5C3.45507 5.5 2 6.95508 2 8.75V19.25C2 21.0449 3.45507 22.5 5.25 22.5H14.75C16.5449 22.5 18 21.0449 18 19.25V8.75C18 6.95507 16.5449 5.5 14.75 5.5H5.25Z" fill="#212121"/>\n' +
        '        <path d="M23.1232 20.6431L19.5 17.0935V10.9989L23.1121 7.3706C23.8988 6.58044 25.248 7.13753 25.248 8.25251V19.7502C25.248 20.8577 23.9143 21.4181 23.1232 20.6431Z" fill="#212121"/>\n' +
        '      </svg>',
    };
  }

  render(){
    const self = this;

    self._createMainWrapper();
    this.errorTxt = this._makeErrorText();
    if(this?.data?.videoSrc?.length > 0) {
      this._drawVideo(this.data.videoSrc);
      return this.wrapper;
    }

    const titleString = this._makeTitle();
    const inputWrapper = this._makeInputWrapper();

    const pasteInput = this._makePasteInput();
    const confirmButton = this._makePasteInputButton(pasteInput);

    inputWrapper.appendChild(pasteInput);
    inputWrapper.appendChild(confirmButton);
    this.wrapper.appendChild(titleString);
    this.wrapper.appendChild(inputWrapper);
    this.wrapper.appendChild(this.errorTxt);

    // <iframe title="vimeo-player" src="https://player.vimeo.com/video/685751292?autoplay=0" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

    /*pasteInput.addEventListener('paste', (event) => {
      const url = event.clipboardData.getData('text');
      console.log('paste', this, event, pasteInput.value);
      self._drawVideo(url);
    });*/

    return this.wrapper;
  }

  _drawVideo(url) {

    console.log("--- drawVideo : " , url);
    if(url.includes('youtu.be')) {
      /* www.youtube.com/embed */
      url = url.replace('youtu.be', 'www.youtube.com/embed');
    }

    /* https://vimeo.com/730186753 --> https://player.vimeo.com/video/730186753 */
    if(url.match(/https?:\/\/vimeo.com\/\d{3,}/g)) {
      url = url.replace('vimeo.com', 'player.vimeo.com/video');
    }

    if(url.includes('https://www.youtube.com/watch?v=')) {
      url = url.replace('www.youtube.com/watch?v=','www.youtube.com/embed/');
    }

    /*
    https://www.youtube.com/watch?v=Qxx-G2IEQnE --> https://www.youtube.com/embed/Qxx-G2IEQnE
    https://youtu.be/Qxx-G2IEQnE --> https://www.youtube.com/embed/Qxx-G2IEQnE
     */


    if(url.includes('vimeo.com')) {
      this.wrapper.innerHTML = '';
      this.errorTxt.innerText = '';
      const vimeoWrapper = this._makeVimeoWrapper(url);
      this.wrapper.appendChild(vimeoWrapper);
    } else if(url.includes('youtube.com')) {
      this.wrapper.innerHTML = '';
      const youtubeWrapper = this._makeYoutubeWrapper(url);
      this.wrapper.classList.remove('input-module');
      this.wrapper.classList.add('video-module');
      this.wrapper.appendChild(youtubeWrapper);
      this.errorTxt.innerText = '';
    } else {
      this.errorTxt.innerText = '“https://”로 시작하는 유효한 URL을 입력 해 주세요.';
    }
  }

  _makeYoutubeWrapper(src) {
    /* <iframe width="500" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"></iframe>*/
    const youTubeIframe = document.createElement('iframe');

    youTubeIframe.src = src;
    youTubeIframe.style.width = '1080px';
    youTubeIframe.style.height = '600px';
    return youTubeIframe;
  }

  _makeVimeoWrapper(url) {
    const vimeoWrapper = document.createElement('div');
    const vimeoIframe = document.createElement('iframe');

    vimeoWrapper.style.height = '600px';
    vimeoIframe.title = 'vimeo-player';
    vimeoIframe.src = url;
    vimeoIframe.allowfullscreen = 'allowfullscreen';
    vimeoIframe.frameBorder = 0;
    vimeoIframe.style.width = '100%';
    vimeoIframe.style.height = '100%';
    this.wrapper.classList.remove('input-module');
    this.wrapper.classList.add('video-module');
    vimeoWrapper.appendChild(vimeoIframe);
    return vimeoWrapper;
  }

  _makePasteInput() {
    const input = document.createElement('input');

    input.type = 'text';
    input.placeholder = 'https://”로 시작하는 URL을 입력 해 주세요.';

    input.addEventListener('keydown',
      (event) => {
        event.stopPropagation();
        if (event.keyCode === 13) {
          this._drawVideo(input.value);
        }
      });


    return input;
  }

  _makeErrorText() {
    /* <span class="error-txt">“https://”로 시작하는 유효한 URL을 입력 해 주세요.</span> */
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-txt');
    // input.type = 'text';
    // input.placeholder = 'https://”로 시작하는 URL을 입력 해 주세요.';
    return errorSpan;
  }

  _makePasteInputButton(pasteInput) {
    const button = document.createElement('button');

    button.type = 'button';
    button.classList.add('btn-sm','btn-black','md-ripples','ripples-light','btn-comfirm');
    button.innerText = '확인';

    button.addEventListener('click',
      (event) => {
        this._drawVideo(pasteInput.value);
      });

    return button;
  }

  /* <button type="button" class="btn-sm btn-black md-ripples ripples-light btn-comfirm">확인</button> */


  _createMainWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('module-container','input-module','error');
  }

  _makeTitle() {
    const title = document.createElement('strong');
    title.classList.add('tit');
    title.innerText = '동영상 URL';
    return title;
  }

  _makeInputWrapper() {
    const input = document.createElement('div');
    input.classList.add('input-wrap');
    input.classList.add('error');
    return input;
  }

  save(blockContent){
    const videoSrc = blockContent.querySelector('iframe') ? blockContent.querySelector('iframe').src : '';
    return {
      videoSrc: videoSrc,
    };
  }

  validate(savedData){
    console.log('savedData.videoSrc ', savedData);
    if (!savedData.videoSrc.trim()){
      return false;
    }
    return true;
  }
}
