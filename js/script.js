function toggleMenu(){
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

const heroVideo = document.getElementById("heroVideo");
const soundBtn = document.getElementById("soundBtn");

if(heroVideo && soundBtn){

soundBtn.addEventListener("click",function(){

if(heroVideo.muted){

heroVideo.muted=false;

soundBtn.innerHTML="🔊";

}else{

heroVideo.muted=true;

soundBtn.innerHTML="🔇";

}

});

}
