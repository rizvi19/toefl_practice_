// Smaller movable units, while preserving the authored sentence and grammar focus.
// This is an editorial layout profile, not an official ETS item specification.
export function standardTiles(q) {
  const prefixWords=q.prefix.trim().split(/\s+/).filter(Boolean),keep=Math.min(2,prefixWords.length);
  const chunks=[...(prefixWords.length>keep?[prefixWords.slice(keep).join(' ')]:[]),...q.chunks];
  const count=chunks.join(' ').split(/\s+/).length,target=Math.min(9,Math.max(6,Math.round(count*.65)));
  while(chunks.length<target){
    let candidate=null;
    for(let i=0;i<chunks.length;i++){
      const words=chunks[i].split(/\s+/);
      for(let at=1;at<words.length;at++){
        const left=words.slice(0,at).join(' '),right=words.slice(at).join(' '),others=chunks.filter((_,j)=>j!==i).concat(q.extra||[]).map(t=>t.toLowerCase());
        if(left.toLowerCase()===right.toLowerCase()||others.includes(left.toLowerCase())||others.includes(right.toLowerCase()))continue;
        const score=words.length*10-Math.abs(at-(words.length/2))+i/100;
        if(!candidate||score>candidate.score)candidate={i,left,right,score};
      }
    }
    if(!candidate)break;
    chunks.splice(candidate.i,1,candidate.left,candidate.right);
  }
  const fixedInsertions=[],seed=[...q.id].reduce((n,c)=>n+c.charCodeAt(0),0);
  const anchor=chunks.findIndex((t,i)=>i>=2&&i<chunks.length-1&&['that','whether','if','when','because','although','while','until'].includes(t.toLowerCase()));
  if(chunks.length>=7&&seed%3===0&&anchor>=0)fixedInsertions.push({after:anchor,text:chunks.splice(anchor,1)[0]});
  return {...q,prefix:prefixWords.slice(0,keep).join(' '),chunks,fixedInsertions,tileLayoutVersion:1};
}
