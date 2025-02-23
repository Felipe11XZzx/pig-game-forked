(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))y(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const u of t.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&y(u)}).observe(document,{childList:!0,subtree:!0});function v(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function y(e){if(e.ep)return;e.ep=!0;const t=v(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
  <main>
    <section class="player player--0 player--active">
      <h2 class="name" id="name--0">Player 1</h2>
      <p class="score" id="score--0">0</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--0">0</p>
      </div>
    </section>
    <section class="player player--1">
      <h2 class="name" id="name--1">Player 2</h2>
      <p class="score" id="score--1">0</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--1">0</p>
      </div>
    </section>

    <img src="dice-1.png" alt="Playing dice" class="dice hidden" />
    <button class="btn btn--new">🔄 New game</button>
    <button class="btn btn--roll">🎲 Roll dice</button>
    <button class="btn btn--hold">📥 Hold</button>
  </main>
`;let n=[0,0],o=0,r=0,i=1,d=!0,s=!0,m=null;const f=document.querySelector(".player--0"),g=document.querySelector(".player--1"),S=document.querySelector("#score--0"),L=document.querySelector("#score--1"),q=document.querySelector("#current--0"),P=document.querySelector("#current--1"),w=document.querySelector(".btn--new"),C=document.querySelector(".btn--hold"),N=document.querySelector(".btn--roll"),h=document.querySelector(".dice"),a=()=>{S.textContent=n[0],L.textContent=n[1],q.textContent=r===0?o:0,P.textContent=r===1?o:0,f.classList.toggle("player--active",r===0),g.classList.toggle("player--active",r===1),h.src=`dice-${i}.png`,h.classList.toggle("hidden",d),f.classList.toggle("player--winner",!s&&n[0]>=100),g.classList.toggle("player--winner",!s&&n[1]>=100)},E=()=>{const l=document.createElement("div");l.className="victory-overlay";const c=document.createElement("div");c.className="victory-message",c.innerHTML=`
    <h1>¡Felicidades! 🎉</h1>
    <span>Jugador ${m+1} ha ganado</span>
  `,document.querySelector("main").appendChild(l),document.querySelector("main").appendChild(c),setTimeout(()=>{l.remove(),c.remove(),setTimeout(p,500)},3e3)},b=()=>{o=0,r=r===0?1:0,a()},p=()=>{n=[0,0],o=0,r=0,d=!0,s=!0,m=null,a()},M=()=>{s&&(i=Math.trunc(Math.random()*6)+1,d=!1,i!==1?o+=i:b(),a())},O=()=>{s&&(n[r]+=o,n[r]>=100?(s=!1,m=r,E()):b(),a())};N.addEventListener("click",M);C.addEventListener("click",O);w.addEventListener("click",p);p();
