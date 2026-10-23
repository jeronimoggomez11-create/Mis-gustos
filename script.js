(function(){
  var bubble=document.getElementById('bubble'), pic=document.getElementById('pic');
  var cards=document.querySelectorAll('.card');
  var mx=0,my=0,bx=0,by=0,raf=null;
 
  function loop(){
    bx+=(mx-bx)*0.22; by+=(my-by)*0.22;
    bubble.style.left=bx+'px'; bubble.style.top=by+'px';
    raf=requestAnimationFrame(loop);
  }
  function show(card){
    var img=card.getAttribute('data-img');
    bubble.style.background=card.getAttribute('data-bg')||'#333';
    if(img){bubble.textContent='';bubble.style.backgroundImage='url("'+img+'")';bubble.style.backgroundSize='cover'}
    else{bubble.style.backgroundImage='none';bubble.textContent=card.getAttribute('data-emoji')||''}
    bubble.classList.add('on');
    if(!raf) raf=requestAnimationFrame(loop);
  }
  function hide(){
    bubble.classList.remove('on');
    if(raf){cancelAnimationFrame(raf);raf=null}
  }
  cards.forEach(function(c){
    c.addEventListener('mouseenter',function(e){mx=bx=e.clientX;my=by=e.clientY;show(c)});
    c.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
    c.addEventListener('mouseleave',hide);
    c.addEventListener('blur',hide);
  });
  // la mascota mira hacia el cursor
  document.addEventListener('mousemove',function(e){
    var r=pic.getBoundingClientRect();
    var dx=(e.clientX-(r.left+r.width/2))/window.innerWidth*14;
    var dy=(e.clientY-(r.top+r.height/2))/window.innerHeight*14;
    pic.style.transform='translate('+dx+'px,'+dy+'px)';
  });
})();
 