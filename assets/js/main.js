(function(){
  // ---- clone shared templates
  document.querySelectorAll('[data-use]').forEach(function(slot){
    var t=document.getElementById(slot.dataset.use); if(!t) return;
    var frag=t.content.cloneNode(true);
    if(slot.classList.contains('wrap')){ slot.appendChild(frag); }
    else { slot.replaceWith(frag); }
  });

  // ---- timeline
  var TL=[
    ['2015',['Laboratório no Hospital do Câncer de Barretos e Supera Parque.','Desenvolvimento do exame mir-THYpe (PIPE 1 Fapesp).'],[]],
    ['2017',['Desenvolvimento de um classificador para câncer de próstata (PIPE 1 Fapesp)'],[]],
    ['2018',['Laboratório dentro da USP Ribeirão Preto.','Lançamento do mir-THYpe no mercado.'],['ONKOS-Premiacoes-top10-healthtechs-1','ONKOS-Premiacoes-premio-octavio-frias-de-oliveira-1']],
    ['2019',['Laboratório próprio em Ribeirão Preto e parceria com Eretz Bio','Publicação na revista Thyroid pertencente à American Thyroid Association (ATA), os resultados do desenvolvimento e a validação do teste mir-THYpe','Otimização do exame mir-THYpe (PIPE 2 Fapesp)'],[]],
    ['2020',['Lançamento das mutações BRAF V600E + TERT no mir-THYpe.','Mudança para novo laboratório próprio de 600m² em Ribeirão Preto.'],['ONKOS-Premiacoes-100-open-startups1-1024x1024','ONKOS-Premiacoes-100-startups1']],
    ['2021',['Expansão de mercado mir-THYpe (PIPE3 Fapesp).'],['ONKOS-premiacoes-saude-business-1']],
    ['2022',['Lançamento do teste molecular mir-THYpe pre-op.','Estudo publicado na The LANCET Discovery Science (eBioMedicine).','Otimização do algoritmo do mir-THYpe.','Desenvolvimento de teste de origem tumoral (PIPE 2 FAPESP).'],['Logo-Premio-Startups-do-futuro-1024x445']],
    ['2023',['Lançamento dos novos testes moleculares mir-THYpe target e mir-THYpe RET-hereditary.','Lançamento da nova marca mir-THYpe.','Conclusão do PIPE 3 (FAPESP).'],['Insper-positivo-1','logo-1-1024x260','Logo-sboc-1']],
    ['2024',['Conquista de Excelência no Programa Internacional de Avaliação de Qualidade','A Onkos foi uma das 80 Startups Semi finalistas do Hello Tomorrow Global Summit'],['elemento2_banner']],
    ['2025',['Recebemos um certificado internacional pelo College of American Pathologists (CAP) 100% de precisão na pesquisa da mutação do gene BRAF V600E, realizada pelos testes mir-THYpe full, mir-THYpe pre-op e mir-THYpe target.'],['Sem-titulo-1','ONKOS_Card-WP-1024x1024']],
    ['2026',['O mir-THYpe full, foi mencionado em um estudo externo, independente, publicado no European Thyroid Journal. - External validation of a microRNA thyroid classifier: a real-world prospective study','Conquista do prêmio Greater Bay Area Most Promising Development Potential Award 2026, concedido no Concurso Anual de Tecnologia e Inovação de Macau para os Países Lusófonos e Hispânicos.'],[]]
  ];
  var tl=document.getElementById('tl');
  if(tl){ TL.forEach(function(r){
    var d=document.createElement('div'); d.className='tl';
    var L=document.createElement('div'); var y=document.createElement('span'); y.className='tl-year'; y.textContent=r[0]; L.appendChild(y);
    var b=document.createElement('div'); b.className='tl-body'; r[1].forEach(function(t){var p=document.createElement('p');p.textContent=t;b.appendChild(p)}); L.appendChild(b); d.appendChild(L);
    var R=document.createElement('div'); R.className='tl-imgs'; r[2].forEach(function(n){var i=document.createElement('img');i.src='assets/img/'+n+'.webp';i.alt='';i.loading='lazy';R.appendChild(i)}); d.appendChild(R);
    tl.appendChild(d);
  }); }

  // ---- header + footer per page
  var hT=document.getElementById('tpl-header'), fT=document.getElementById('tpl-footer');
  var pages=[].slice.call(document.querySelectorAll('.page'));
  pages.forEach(function(p){
    if(!p.hasAttribute('data-noheader')) p.insertBefore(hT.content.cloneNode(true), p.firstChild);
    if(!p.hasAttribute('data-nofooter') && p.dataset.page!=='revisao') p.appendChild(fT.content.cloneNode(true));
  });
  document.querySelectorAll('.burger').forEach(function(b){ b.addEventListener('click',function(){ b.parentNode.querySelector('.menu').classList.toggle('open'); }); });

  // ---- page switcher
    function show(){
    var id=(location.hash||'#inicio').slice(1);
    if(!pages.some(function(p){return p.dataset.page===id})) id='inicio';
    pages.forEach(function(p){ p.hidden=p.dataset.page!==id; });
    document.querySelectorAll('.menu.open').forEach(function(m){m.classList.remove('open')});
    window.scrollTo(0,0);
    var v=document.querySelector('.page:not([hidden]) video'); if(v){ try{ v.play().catch(function(){}); }catch(e){} }
  }
  window.addEventListener('hashchange',show); show();

  // ---- carousels
  document.querySelectorAll('.car').forEach(function(c){
    var t=c.querySelector('.track'); if(!t) return;
    c.querySelectorAll('.arrow').forEach(function(a){ a.addEventListener('click',function(){ t.scrollBy({left:(a.classList.contains('next')?1:-1)*t.clientWidth*.9}); }); });
  });
  document.querySelectorAll('.arrow[data-for]').forEach(function(a){
    a.addEventListener('click',function(){ var t=document.getElementById(a.dataset.for); t.scrollBy({left:(a.classList.contains('next')?1:-1)*t.clientWidth}); });
  });

  // ---- home slider
  var hs=document.getElementById('hs');
  if(hs){
    var sl=[].slice.call(hs.querySelectorAll('.slide')), dots=hs.querySelector('.dots'), cur=0, timer;
    sl.forEach(function(_,i){ var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label','Slide '+(i+1)); b.addEventListener('click',function(){go(i,true)}); dots.appendChild(b); });
    function go(i,user){ cur=(i+sl.length)%sl.length; sl.forEach(function(s,k){s.classList.toggle('on',k===cur)}); [].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k===cur)}); if(user) restart(); }
    function restart(){ clearInterval(timer); if(!matchMedia('(prefers-reduced-motion: reduce)').matches) timer=setInterval(function(){go(cur+1)},7000); }
    hs.querySelector('.prev').addEventListener('click',function(){go(cur-1,true)});
    hs.querySelector('.next').addEventListener('click',function(){go(cur+1,true)});
    go(0); restart();
  }

  // ---- partner filter pills (visual only)
  document.querySelectorAll('.filters').forEach(function(f){ f.addEventListener('click',function(e){ if(e.target.tagName!=='BUTTON') return; f.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b===e.target)}); }); });
  document.querySelectorAll('form[data-demo]').forEach(function(f){ f.addEventListener('submit',function(e){ e.preventDefault(); var i=f.querySelector('input'); i.value=''; i.placeholder='Recebido (exemplo)'; }); });

})();
