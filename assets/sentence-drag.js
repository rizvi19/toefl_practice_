// Shared, pointer-based sentence tiles. Answers keep their exact slot positions.
export const instructions = 'Drag a word into any blank. Drag between filled slots to swap, or back to the word bank to remove. You can also select a blank, then tap a word. Alt + Left/Right moves a focused tile; Escape cancels a drag.';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function moveSentenceTile(answer, size, tokenCount, token, destination) {
  const next = Array.from({length:size}, (_, i) => answer[i] ?? null);
  if (!Number.isInteger(token) || token < 0 || token >= tokenCount || next.some(v => v !== null && (!Number.isInteger(v) || v < 0 || v >= tokenCount)) || new Set(next.filter(v => v !== null)).size !== next.filter(v => v !== null).length) return null;
  const from = next.indexOf(token);
  if (destination === 'bank') {
    if (from < 0) return null;
    next[from] = null;
  } else {
    if (!Number.isInteger(destination) || destination < 0 || destination >= size || destination === from) return null;
    if (from >= 0) next[from] = next[destination];
    next[destination] = token;
  }
  return next;
}
export function sentenceSlots(answer, size, label, {locked=false, slotClass='sentence-slot', emptyClass='unfilled', fixed, action='remove', indexAttr='data-slot', numbered=true}={}) {
  return Array.from({length:size}, (_, i) => {
    const token = answer[i] ?? null, text = token === null ? '_____' : label(token, i);
    return ((Array.isArray(fixed)?fixed:[fixed]).filter(f=>f?.after===i).map(f=>` <span>${esc(f.text)}</span> `).join('')) + `<button type="button" class="${slotClass} ${token === null ? emptyClass : ''}" data-sentence-slot="${i}" ${token === null ? '' : `data-sentence-token="${token}"`} data-action="${action}" ${indexAttr}="${i}" ${locked?'disabled':''} aria-label="Slot ${i+1}${token === null ? ', empty; select a word for this blank' : ': '+esc(text)+'; drag to move or select to return'}">${numbered?`<small>${i+1}</small>`:''}${esc(text)}</button>`;
  }).join('');
}
export function sentencePool(answer, order, label, {locked=false, action='place', indexAttr='data-token', tileClass=''}={}) {
  return order.map(token => `<button type="button" class="${tileClass}" data-sentence-token="${token}" data-action="${action}" ${indexAttr}="${token}" ${locked || answer.includes(token)?'disabled':''}>${esc(label(token))}</button>`).join('');
}

export function installSentenceDrag(root, {getState, commit}) {
  let pointer=null, selected=null, suppressUntil=0, committing=false, frame=0;
  const live=document.createElement('span');live.className='sentence-drag-live';live.setAttribute('role','status');live.setAttribute('aria-live','polite');document.body.append(live);
  const announce=text=>{live.textContent=text;};
  const state=()=>{const s=getState();return s&&!s.locked?s:null;};
  const board=()=>root.querySelector('[data-sentence-board]');
  const valid=(s,id)=>s&&s.id===id&&board()?.dataset.sentenceBoard===id;
  function clearTarget(){root.querySelectorAll('.sentence-drop-target,.sentence-picked-slot').forEach(el=>el.classList.remove('sentence-drop-target','sentence-picked-slot'));}
  function finish(){cancelAnimationFrame(frame);frame=0;clearTarget();pointer?.source.classList.remove('sentence-drag-source');pointer?.ghost?.remove();document.body.classList.remove('sentence-dragging');pointer=null;}
  function targetAt(x,y){const el=document.elementFromPoint(x,y);if(!board()?.contains(el))return null;const slot=el.closest('[data-sentence-slot]');if(slot&&!slot.disabled)return {el:slot,to:Number(slot.dataset.sentenceSlot)};const bank=el.closest('[data-sentence-bank]');return bank?{el:bank,to:'bank'}:null;}
  function track(){
    if(!pointer?.dragging)return;
    if(!valid(state(),pointer.id)||!pointer.source.isConnected){finish();return;}
    const edge=55,step=pointer.y<edge?-Math.ceil((edge-pointer.y)/5):pointer.y>innerHeight-edge?Math.ceil((pointer.y-innerHeight+edge)/5):0;
    if(step)window.scrollBy(0,step);
    pointer.ghost.style.transform=`translate3d(${pointer.x-pointer.dx}px,${pointer.y-pointer.dy}px,0)`;
    clearTarget();pointer.target=targetAt(pointer.x,pointer.y);pointer.target?.el.classList.add('sentence-drop-target');frame=requestAnimationFrame(track);
  }
  async function apply(token,to,id,{ghost,source}={}){
    const s=state();if(committing||!valid(s,id)){ghost?.remove();return;}
    const next=moveSentenceTile(s.answer,s.size,s.tokenCount,token,to);if(!next){ghost?.remove();return;}
    const positions=new Map([...board().querySelectorAll('[data-sentence-slot][data-sentence-token]')].map(el=>[el.dataset.sentenceToken,el.getBoundingClientRect()]));
    committing=true;selected=null;
    try{
      await commit(next,id);
      if(!valid(state(),id))return;
      const destination=to==='bank'?board().querySelector(`[data-sentence-bank] [data-sentence-token="${token}"]`):board().querySelector(`[data-sentence-slot="${to}"]`);
      destination?.focus({preventScroll:true});
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches)for(const el of board().querySelectorAll('[data-sentence-slot][data-sentence-token]')){
        const before=positions.get(el.dataset.sentenceToken),after=el.getBoundingClientRect();
        if(before&&Number(el.dataset.sentenceToken)!==token&&(before.x!==after.x||before.y!==after.y))el.animate([{transform:`translate(${before.x-after.x}px,${before.y-after.y}px)`},{transform:'translate(0,0)'}],{duration:150,easing:'ease-out'});
      }
      if(ghost&&destination&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
        const rect=destination.getBoundingClientRect(),start=ghost.getBoundingClientRect();
        await ghost.animate([{transform:`translate(${start.x}px,${start.y}px)`},{transform:`translate(${rect.x}px,${rect.y}px) scale(${rect.width/start.width},${rect.height/start.height})`,opacity:.25}],{duration:150,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'}).finished;
      }else if(destination&&!matchMedia('(prefers-reduced-motion: reduce)').matches)destination.animate([{backgroundColor:'#d5e7bc'},{backgroundColor:getComputedStyle(destination).backgroundColor}],{duration:180});
      announce(to==='bank'?'Word returned to the bank.':`Word placed in slot ${to+1}.`);
    }catch{announce('The move could not be saved. Please try again.');}finally{ghost?.remove();source?.classList.remove('sentence-drag-source');committing=false;}
  }
  root.addEventListener('pointerdown',e=>{
    if(e.button!==0||!e.isPrimary||committing||pointer)return;
    const source=e.target.closest('[data-sentence-token]'),s=state();
    if(!source||source.disabled||!board()?.contains(source)||!valid(s,s?.id))return;
    const rect=source.getBoundingClientRect();pointer={id:s.id,token:Number(source.dataset.sentenceToken),source,pid:e.pointerId,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,dx:e.clientX-rect.x,dy:e.clientY-rect.y,rect,dragging:false};
  });
  root.addEventListener('pointermove',e=>{
    if(!pointer||e.pointerId!==pointer.pid)return;
    pointer.x=e.clientX;pointer.y=e.clientY;
    if(!pointer.dragging&&Math.hypot(pointer.x-pointer.startX,pointer.y-pointer.startY)>7){
      pointer.dragging=true;selected=null;
      root.setPointerCapture(e.pointerId);
      const ghost=document.createElement('div');ghost.className='sentence-drag-ghost';ghost.setAttribute('aria-hidden','true');ghost.textContent=pointer.source.childNodes.length>1?pointer.source.lastChild.textContent:pointer.source.textContent;ghost.style.width=pointer.rect.width+'px';ghost.style.height=pointer.rect.height+'px';document.body.append(ghost);pointer.ghost=ghost;pointer.source.classList.add('sentence-drag-source');document.body.classList.add('sentence-dragging');track();
    }
    if(pointer.dragging)e.preventDefault();
  });
  root.addEventListener('pointerup',e=>{
    if(!pointer||e.pointerId!==pointer.pid)return;
    const p=pointer;
    if(p.dragging){
      e.preventDefault();suppressUntil=Date.now()+400;
      const target=targetAt(e.clientX,e.clientY),ghost=p.ghost;p.ghost=null;finish();
      if(target)void apply(p.token,target.to,p.id,{ghost,source:p.source});
      else{ghost?.remove();announce('Move cancelled. Your sentence is unchanged.');}
    }else pointer=null;
    if(root.hasPointerCapture(e.pointerId))root.releasePointerCapture(e.pointerId);
  });
  root.addEventListener('pointercancel',()=>{if(pointer?.dragging)suppressUntil=Date.now()+400;finish();});
  root.addEventListener('lostpointercapture',e=>{if(e.target===root&&pointer)finish();});
  root.addEventListener('dragstart',e=>{if(e.target.closest('[data-sentence-token]'))e.preventDefault();});
  root.addEventListener('click',e=>{
    const el=e.target.closest('[data-sentence-token],[data-sentence-slot]');if(!el||!board()?.contains(el))return;
    e.preventDefault();e.stopImmediatePropagation();
    const s=state();if(Date.now()<suppressUntil||committing||el.disabled||!valid(s,s?.id))return;
    if(el.dataset.sentenceToken!==undefined){
      const token=Number(el.dataset.sentenceToken),placed=el.dataset.sentenceSlot!==undefined;
      const to=placed?'bank':selected?.id===s.id?selected.slot:Array.from({length:s.size},(_,i)=>s.answer[i]??null).indexOf(null);
      if(to===-1){announce('Select a filled slot to replace it, or drag this word onto a slot.');return;}
      void apply(token,to,s.id);
    }else{
      clearTarget();selected={id:s.id,slot:Number(el.dataset.sentenceSlot)};el.classList.add('sentence-picked-slot');announce(`Slot ${selected.slot+1} selected. Choose a word from the bank.`);
    }
  },true);
  root.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(pointer?.dragging)suppressUntil=Date.now()+400;finish();selected=null;announce('Move cancelled.');return;}
    const el=e.target.closest('[data-sentence-slot][data-sentence-token]'),s=state();
    if(el&&e.altKey&&['ArrowLeft','ArrowRight'].includes(e.key)&&valid(s,s?.id)){
      e.preventDefault();e.stopImmediatePropagation();const to=Number(el.dataset.sentenceSlot)+(e.key==='ArrowLeft'?-1:1);if(to>=0&&to<s.size)void apply(Number(el.dataset.sentenceToken),to,s.id);
    }
  },true);
  // Navigation, task submission and expiry invalidate a gesture before it can save.
  new MutationObserver(()=>{if(pointer&&!pointer.source.isConnected)finish();if(selected&&selected.id!==board()?.dataset.sentenceBoard)selected=null;}).observe(root,{childList:true,subtree:true});
  window.addEventListener('blur',()=>finish());
}
