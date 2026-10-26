/* ===== YOUR PROJECTS: to add one, copy a line, put your video in "videos" and cover in "posters" ===== */
var PROJECTS=[
 {file:"nursing-ad-1",cat:"Meta Ads",title:"Nursing cover ad, version 1",desc:"Product ad with Arabic hook and lifestyle shots."},
 {file:"nursing-ad-2",cat:"Meta Ads",title:"Nursing cover ad, version 2",desc:"Second cut with a new opening and pacing."},
 {file:"wedding-favors",cat:"Meta Ads",title:"Wedding favors product ad",desc:"Close-up product showcase with soft transitions."},
 {file:"kids-activity-book",cat:"Meta Ads",title:"Kids activity book ad",desc:"Bilingual ad with a QR call to action."},
 {file:"education-promo",cat:"Reels & Montage",title:"Education center promo",desc:"School promo reel with logo and animated icons."},
 {file:"arabic-reel",cat:"Reels & Montage",title:"Educational reel with animated subtitles",desc:"Talking-head reel with motion graphics and Arabic captions."},
 {file:"intro",cat:"Motion graphics",title:"Personal intro animation",desc:"Animated text intro with a moving gradient.",wide:true}
];
var $=function(i){return document.getElementById(i)};
function split(el,t,off){t.split("").forEach(function(c,i){var s=document.createElement("span");s.className="ch";s.style.setProperty("--i",i+off);s.textContent=c===" "?"\u00a0":c;el.appendChild(s)})}
split($("n1"),"Sayf",0);split($("n2"),"Eddyne",4);

var grid=$("grid"),filters=$("filters"),cur="All";
var cats=["All"];PROJECTS.forEach(function(p){if(cats.indexOf(p.cat)<0)cats.push(p.cat)});
filters.innerHTML=cats.map(function(c){return '<button class="chip'+(c==="All"?' on':'')+'">'+c.replace("&","&amp;")+'</button>'}).join("");
grid.innerHTML=PROJECTS.map(function(p,i){
 return '<button class="card'+(p.wide?' wide':'')+'" data-i="'+i+'" data-cat="'+p.cat.replace("&","&amp;")+'" style="transition-delay:'+(i%4)*80+'ms"><div class="vid"><span class="pill">'+p.cat.replace("&","&amp;")+'</span><video muted loop playsinline preload="none" poster="posters/'+p.file+'.jpg" data-src="videos/'+p.file+'.mp4"></video><span class="pb"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></div><div class="info"><h3>'+p.title+'</h3><p>'+p.desc+'</p></div></button>';
}).join("");
var cards=[].slice.call(grid.children);

function play(c){var v=c.querySelector("video");if(!v.src)v.src=v.getAttribute("data-src");var r=v.play();if(r&&r.catch)r.catch(function(){})}
function stop(c){var v=c.querySelector("video");v.pause()}
cards.forEach(function(c){c.addEventListener("mouseenter",function(){play(c)});c.addEventListener("mouseleave",function(){stop(c)});c.addEventListener("click",function(){open(+c.getAttribute("data-i"))})});

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in")}})},{threshold:.12});
cards.forEach(function(c){io.observe(c)});
if(matchMedia("(hover:none)").matches){var io2=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?play(e.target):stop(e.target)})},{threshold:.7});cards.forEach(function(c){io2.observe(c)})}

filters.addEventListener("click",function(e){if(e.target.className.indexOf("chip")<0)return;
 cur=e.target.textContent;[].forEach.call(filters.children,function(b){b.classList.toggle("on",b===e.target)});
 cards.forEach(function(c){var ok=cur==="All"||c.getAttribute("data-cat")===cur;c.classList.toggle("hide",!ok);if(ok){c.classList.remove("in");void c.offsetWidth;c.classList.add("in")}})});

var lb=$("lb"),lv=lb.querySelector("video");
function open(i){var p=PROJECTS[i];lv.src="videos/"+p.file+".mp4";lv.poster="posters/"+p.file+".jpg";lb.showModal();lv.play().catch(function(){})}
function close(){lv.pause();lb.close()}
lb.querySelector("button").addEventListener("click",close);
lb.addEventListener("click",function(e){if(e.target===lb)close()});
lb.addEventListener("close",function(){lv.pause()});

/* counters */
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var n=+e.target.getAttribute("data-n"),k=0;var t=setInterval(function(){k++;e.target.textContent=k;if(k>=n)clearInterval(t)},180)})},{threshold:1});
document.querySelectorAll("[data-n]").forEach(function(b){co.observe(b)});
/* scroll bar */
addEventListener("scroll",function(){var h=document.documentElement;$("bar").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});
/* hero tilt */
var st=$("stage"),fr=$("frame");
st.addEventListener("mousemove",function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fr.style.transform="rotateY("+x*10+"deg) rotateX("+(-y*10)+"deg)"});
st.addEventListener("mouseleave",function(){fr.style.transform=""});
