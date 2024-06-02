function handleVisibilityChange() {
    const videos = document.querySelectorAll('video');
    if (document.hidden) {
      videos.forEach(video => video.pause());
    } else {
      videos.forEach(video => video.play());
    }
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  