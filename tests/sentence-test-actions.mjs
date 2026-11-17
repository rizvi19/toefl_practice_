// Browser-test migration helper: sentence actions perform real pointer drags.
export async function dropSentenceTile(page,source,destination){
 if(await source.isDisabled())throw Error('Cannot drag a disabled sentence tile');
 const placed=await source.getAttribute('data-sentence-slot');
 destination??=placed===null?page.locator('[data-sentence-slot]:not([data-sentence-token])').first():page.locator('[data-sentence-bank]');
 const token=await source.getAttribute('data-sentence-token'),targetSlot=await destination.getAttribute('data-sentence-slot');
 await source.scrollIntoViewIfNeeded();const a=await source.boundingBox();let b=await destination.boundingBox();
 if(!a||!b)throw Error('Sentence drag source or destination missing');
 const x=a.x+a.width/2,y=a.y+a.height/2;await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+12,y-8,{steps:2});
 // Auto-scroll while holding a tile if a wrapped mobile board exceeds the viewport.
 for(let i=0;i<100&&(b.y<220||b.y+b.height>await page.evaluate(()=>innerHeight)-100);i++){
  const h=await page.evaluate(()=>innerHeight);await page.mouse.move(180,b.y<220?8:h-8);await page.waitForTimeout(35);b=await destination.boundingBox();
 }
 await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:10});await page.waitForTimeout(60);b=await destination.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:2});
 await destination.evaluate(el=>{if(!el.classList.contains('sentence-drop-target'))throw Error('Sentence tile is not over its intended destination');});
 await page.mouse.up();await page.locator('.sentence-drag-ghost').waitFor({state:'detached'});
 if(targetSlot===null)await page.locator(`[data-sentence-bank] [data-sentence-token="${token}"]`).waitFor({state:'visible'});
 else await page.waitForFunction(({slot,token})=>document.querySelector(`[data-sentence-slot="${slot}"]`)?.dataset.sentenceToken===token,{slot:targetSlot,token});
}
