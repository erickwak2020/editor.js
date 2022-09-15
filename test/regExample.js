
function drawVideo(url) {
  console.log('origin url : ' , url);

  if(url.includes('youtu.be')) {
    /* www.youtube.com/embed */
    url = url.replace('youtu.be', 'www.youtube.com/embed');
  }

  if(url.includes('https://www.youtube.com/watch?v=')) {
    url = url.replace('www.youtube.com/watch?v=','www.youtube.com/embed/');
  }

  if(url.match(/https?:\/\/vimeo.com\/\d{3,}/g)) {
    url = url.replace('vimeo.com', 'player.vimeo.com/video');
  }

  console.log("url : ", url);

}

drawVideo('https://youtu.be/Qxx-G2IEQnE');
drawVideo('https://vimeo.com/730186753');
drawVideo('https://www.youtube.com/watch?v=Qxx-G2IEQnE');
