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
    const titleString = this._makeTitle();
    const inputWrapper = this._makeInputWrapper();

    const pasteInput = this._makePasteInput();

    inputWrapper.appendChild(pasteInput);
    this.wrapper.appendChild(titleString);
    this.wrapper.appendChild(inputWrapper);

    console.log('render() ', this.wrapper, this.wrapper.parentElement);
    pasteInput.addEventListener('paste', (event) => {

      const url = event.clipboardData.getData('text');
      /* validation check */
      if(url.includes('vimeo.com')) {
        self.wrapper.innerHTML = '';
        const vimeoWrapper = this._makeVimeoWrapper(event);
        self.wrapper.appendChild(vimeoWrapper);
      } else if(url.includes('youtube.com')) {
        self.wrapper.innerHTML = '';
        const youtubeWrapper = this._makeYoutubeWrapper(url);
        self.wrapper.classList.remove('input-module');
        self.wrapper.classList.add('video-module');
        self.wrapper.appendChild(youtubeWrapper);
      } else {
        return;
      }
      //this._createImage(event.clipboardData.getData('text'));
      //<iframe title="vimeo-player" src="https://player.vimeo.com/video/685751292?autoplay=0" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
    });

    return this.wrapper;
  }

  _makeYoutubeWrapper(src) {
    /* <iframe width="500" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"></iframe>*/
    const youTubeIframe = document.createElement('iframe');

    youTubeIframe.src = src;
    youTubeIframe.style.width = '1080px';
    youTubeIframe.style.height = '600px';
    return youTubeIframe;
  }

  _makeVimeoWrapper(event) {
    const vimeoWrapper = document.createElement('div');
    const url = event.clipboardData.getData('text');
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
    return input;
  }

  _createMainWrapper() {
    this.wrapper = document.createElement('div');
    //this.wrapper.parent.  .classList.add('input-module');
    this.wrapper.classList.add('module-container');
    this.wrapper.classList.add('input-module');
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
    console.log(blockContent);
    return {
      url: '',
    };
  }
}
