"use strict";window.onload=()=>{const e=document.getElementById("jsModalOpen"),t=document.getElementById("jsModalClose"),d=document.getElementById("jsModalMask"),n=document.getElementById("jsModalContent");e.addEventListener("click",(function(){d.classList.remove("jsHidden"),n.classList.remove("jsHidden")})),t.addEventListener("click",(function(){d.classList.add("jsHidden"),n.classList.add("jsHidden")})),d.addEventListener("click",(function(){n.classList.add("jsHidden"),d.classList.add("jsHidden")}));const s=document.getElementById("jsPlayer"),i=document.getElementById("jsPlayerIcon"),l=document.getElementById("jsPlayerTxt");let a=document.getElementById("video");if(a){let e=new Vimeo.Player(a);s.addEventListener("click",(function(){e.getPaused().then((t=>{t?(i.classList.add("pause"),l.innerHTML="停止する",e.play()):(i.classList.remove("pause"),l.innerHTML="再生する",e.pause())}))}))}};