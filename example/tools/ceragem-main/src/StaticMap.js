import axios from "axios";

export default class StaticMap {

  constructor({ data, config, api, readOnly }) {
    console.log("MyMap constructor ", data);
    console.log(config, api, readOnly);
    this.data = data;
    this.api = api;
    this.address = {};
    this.sourceAddress = '';
    this.config = config;
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
        '\t viewBox="0 0 360 360" style="enable-background:new 0 0 360 360;" xml:space="preserve">\n' +
        '<g id="XMLID_1088_">\n' +
        '\t<polygon id="XMLID_1104_" style="fill:#CDCDD0;" points="240,50 240,80 330,80 330,186.551 330,218.386 330,280 240,280 240,310 \n' +
        '\t\t360,310 360,50 \t"/>\n' +
        '\t<rect id="XMLID_1105_" x="120" y="50" style="fill:#EBEBEC;" width="120" height="30"/>\n' +
        '\t<polygon id="XMLID_1106_" style="fill:#EBEBEC;" points="151.75,280 120,280 120,310 240,310 240,280 \t"/>\n' +
        '\t<polygon id="XMLID_1107_" style="fill:#CDCDD0;" points="30,280 30,111.836 30,80 120,80 120,50 0,50 0,310 120,310 120,280 \t"/>\n' +
        '\t<path id="XMLID_1108_" style="fill:#64C37D;" d="M135,165c0-5.247,0.907-10.28,2.558-14.963L30,111.836V280h90l27.335-78.899\n' +
        '\t\tC140.337,189.699,135,177.054,135,165z"/>\n' +
        '\t<path id="XMLID_1109_" style="fill:#64C37D;" d="M180,240c0,0-4.527-4.026-10.707-10.635L151.75,280H240h90v-61.614\n' +
        '\t\tl-107.505-38.182C213.037,210.631,180,240,180,240z"/>\n' +
        '\t<path id="XMLID_1110_" style="fill:#99EFF2;" d="M147.335,201.101L120,280h31.75l17.543-50.635\n' +
        '\t\tC162.695,222.309,154.214,212.308,147.335,201.101z"/>\n' +
        '\t<path id="XMLID_1111_" style="fill:#78B9EB;" d="M30,80l128.308,45.571C164.742,122.023,172.134,120,180,120\n' +
        '\t\tc18.868,0,35.015,11.618,41.701,28.086L330,186.551V80h-90H120H30z"/>\n' +
        '\t<path id="XMLID_1112_" style="fill:#FFDA44;" d="M158.308,125.571L30,80v31.836l107.558,38.201\n' +
        '\t\tC141.251,139.561,148.706,130.864,158.308,125.571z"/>\n' +
        '\t<path id="XMLID_1113_" style="fill:#FFDA44;" d="M225,165c0,5.01-0.925,10.121-2.505,15.204L330,218.386v-31.835l-108.299-38.464\n' +
        '\t\tC223.822,153.31,225,159.016,225,165z"/>\n' +
        '\t<path id="XMLID_1114_" style="fill:#FF5023;" d="M137.558,150.037C135.907,154.72,135,159.753,135,165\n' +
        '\t\tc0,12.054,5.337,24.699,12.335,36.101c6.879,11.208,15.36,21.208,21.958,28.265C175.473,235.974,180,240,180,240v-60\n' +
        '\t\tc-8.284,0-15-6.716-15-15s6.716-15,15-15v-30c-7.866,0-15.258,2.023-21.692,5.571C148.706,130.864,141.251,139.561,137.558,150.037\n' +
        '\t\tz"/>\n' +
        '\t<path id="XMLID_1115_" style="fill:#BF3C1A;" d="M195,165c0,8.284-6.716,15-15,15v60c0,0,33.037-29.369,42.495-59.796\n' +
        '\t\tC224.075,175.121,225,170.01,225,165c0-5.984-1.178-11.69-3.299-16.914C215.015,131.618,198.868,120,180,120v30\n' +
        '\t\tC188.284,150,195,156.716,195,165z"/>\n' +
        '\t<circle id="XMLID_1116_" style="fill:#FFFFFF;" cx="180" cy="165" r="15"/>'
    };
  }

  render(){
    const self = this;
    this._createMainWrapper();

    if(this?.data?.url?.length > 0) {
      let mapImage = this._renderMapImage(this.data.url);
      this.wrapper.appendChild(mapImage);
      return this.wrapper;
    }

    /* 주소 창 */
    const width = this.config.address.width; //팝업의 너비
    const height = this.config.address.height; //팝업의 높이
    new daum.Postcode({
      oncomplete: function(data) {
        console.log(data);
        self.sourceAddress = data.roadAddress ? data.roadAddress : data.jibunAddress;
        console.log("address " + self.sourceAddress);
        const mapImagePromise = self._makeMapImage();
        mapImagePromise.then(function(result) {
          console.log(result);
          self.wrapper.appendChild(result);
        })
      },
    }).open({
      left: (window.screen.width / 2) - (width / 2),
      top: (window.screen.height / 2) - (height / 2)
    });

    return this.wrapper;
  }

  async _makeMapImage() {

    let targetUrl = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + this.sourceAddress;
    console.log("targetUrl : " + targetUrl);
    const self = this;
    const response = await axios.get(targetUrl, {
      headers : {
        'X-NCP-APIGW-API-KEY-ID': self.config.naverCloud.apiKeyId,
        'X-NCP-APIGW-API-KEY': self.config.naverCloud.apiKey
      }
    });
    //const response = await axios.get('./json/address-sample.json');
    console.log(response);
    if(response.data?.addresses?.length > 0) {
      self.address = response.data?.addresses[0];
    }
    const client_id = self.config.naverCloud.apiKeyId;
    const x = self.address.x;
    const y = self.address.y;
    const mapImage = document.createElement('img');
    let src = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?"
      + "w=" + self.config.naverCloud.mapWidth + "&h="+ self.config.naverCloud.mapHeight + "&center=" + x + "," + y
      + "&level=15"
      + "&markers=type:d|size:mid|pos:" + x + "%20" + y
      + "&X-NCP-APIGW-API-KEY-ID=" + client_id;
    console.log("mapImage src : " , src);
    mapImage.src = src;
    return mapImage;
  }

  _createMainWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('module-container');
  }

  _renderMapImage(src) {
    const mapImage = document.createElement('img');
    console.log("mapImage src : " , src);
    mapImage.src = src;
    return mapImage;
  }

  /*
    blockContent 는 render() 함수에서 만든 element 이다.
     */
  save(blockContent){
    console.log(blockContent);
    const mapImage = blockContent.querySelector('img');
    return {
      url: mapImage.src
    }
  }

}
