import MySimpleImage from './MySimpleImage.js';
import VideoEmbedded from './VideoEmbedded.js';
//import VideoTool from 'editorjs-video-jdp';
//import VideoTool from 'example/tools/editorjs-video/dist/bundle.js';

import MyMap from './MyMap';


window.editorConfig = {
  /**
   * Enable/Disable the read only mode
   */
  readOnly: false,

  /**
   * Wrapper of Editor
   */
  holder: 'editorjs',
  autofocus: true,
  /**
   * Common Inline Toolbar settings
   * - if true (or not specified), the order from 'tool' property will be used
   * - if an array of tool names, this order will be used
   */
  inlineToolbar: ['link', 'bold', 'italic', 'strike', 'underline', 'color', 'marker', 'justifyLeft',
    'justifyCenter', 'justifyRight'],
  // inlineToolbar: true,

  /**
   * Tools list
   */
  tools: {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: 'Header'
      },
      shortcut: 'CMD+SHIFT+H'
    },
    subheader: {
      class: SubHeader,
      inlineToolbar: true,
      config: {
        placeholder: 'SubHeader'
      },
      shortcut: 'CMD+SHIFT+S'
    },
    color: {
      class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      config: {
        colorCollections: ['#161616', '#444', '#999', '#aaa', '#c4c4c4',
          '#FFFFFF', '#FF7A6B', '#FFD24D', '#5DD98B', '#62D9D5',
          '#5CAAE6', '#7A7BE6', '#E56F61', '#ECC346', '#439C64',
          '#57C0BC', '#4783B2', '#5C5EAC', '#FFCAC4', '#FFEDB8',
          '#BEF0D1', '#C0F0EE', '#BEDDF5', '#CACAF5', '#66312B',
          '#66541F', '#255738', '#275755', '#25445C', '#31315C'],
        defaultColor: '#161616',
        type: 'text',
      },
    },
    marker: {
      class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      config: {
        colorCollections: ['#161616','#444','#999','#aaa','#c4c4c4'
          ,'#FFFFFF','#FF7A6B','#FFD24D','#5DD98B','#62D9D5'
          ,'#5CAAE6','#7A7BE6','#E56F61','#ECC346','#439C64'
          ,'#57C0BC','#4783B2','#5C5EAC','#FFCAC4','#FFEDB8'
          ,'#BEF0D1','#C0F0EE','#BEDDF5','#CACAF5','#66312B'
          ,'#66541F','#255738','#275755','#25445C','#31315C'
        ],
        defaultColor: '#161616',
        type: 'marker',
      },
      shortcut: 'CMD+SHIFT+M'
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
    },
    video: VideoEmbedded,
    videoUpload: {
      class: VideoTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
    }
  },

  /**
   * This Tool will be used as default
   */
  // defaultBlock: 'header',

  //autofocus: true,

  /**
   * Initial Editor data
   */
  data: {},
  onReady: function(){
    console.log('Editor.js is ready to work!');
    // saveButton.click();
  }, /* ,
    onChange: function(api, event) {
      console.log('something changed', api, event);
    },*/
};

function start() {
  window.editor = new EditorJS(editorConfig);
  areYouReady();
  async function areYouReady() {
    await editor.isReady;
  }
}

window.ceragemEditorStart = start;
