'use strict';
window.onload = () => {
  // モーダルウィンドウ
  const open = document.getElementById('jsModalOpen');
  const close = document.getElementById('jsModalClose');
  const mask = document.getElementById('jsModalMask');
  const modal = document.getElementById('jsModalContent');
  open.addEventListener('click', function () {
    mask.classList.remove('jsHidden');
    modal.classList.remove('jsHidden');
  });
  close.addEventListener('click', function () {
    mask.classList.add('jsHidden');
    modal.classList.add('jsHidden');
  });
  mask.addEventListener('click', function () {
    modal.classList.add('jsHidden');
    mask.classList.add('jsHidden');
  });

  // Vimeo再生機能
  const playBtn = document.getElementById('jsPlayer');
  const playBtnIcon = document.getElementById('jsPlayerIcon');
  const playBtnTxt = document.getElementById('jsPlayerTxt');
  let iframe = document.getElementById('video');

  function setTxtPlay() {
    playBtnIcon.classList.remove('pause');
    playBtnTxt.innerHTML = '再生する';
  }
  function setTxtPause() {
    playBtnIcon.classList.add('pause');
    playBtnTxt.innerHTML = '停止する';
  }

  if (iframe) {
    let player = new Vimeo.Player(iframe);
    playBtn.addEventListener("click", function () {
      player.getPaused().then(paused => {
        if (paused) {
          setTxtPause();
          player.play();
        } else {
          setTxtPlay();
          player.pause();
        }
      });
    });
  }
}