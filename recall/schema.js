// @ts-check
/** @typedef {import('./types.js').LearningItem} LearningItem */
export const REGISTERS=['spoken','academic','email','mixed'];
/** @param {unknown} input @returns {asserts input is LearningItem[]} */
export function validateBank(input){
 if(!Array.isArray(input)||input.length<33)throw Error('The learning bank must contain at least the 33 original entries.');
 const seen=new Set();
 for(const row of input){
  if(!row||typeof row!=='object')throw Error('Invalid learning item');
  for(const key of ['id','canonicalForm','meaning','grammarPattern','memoryFamily','goodExample','wrongExample','commonError','clozeSentence','clozeAnswer','scenarioPrompt','transferPrompt','mnemonic'])if(typeof row[key]!=='string'||!row[key].trim())throw Error(`${row.id||'Item'}: missing ${key}`);
  if(seen.has(row.id))throw Error('Duplicate canonical ID '+row.id);seen.add(row.id);
  if(!REGISTERS.includes(row.register)||!['A','B'].includes(row.priorityTier)||!['word','collocation','discourse marker','formal email phrase'].includes(row.itemType))throw Error('Invalid category '+row.id);
  for(const key of ['aliases','prepositions','tags','sourceRefs','acceptedForms'])if(!Array.isArray(row[key])||!row[key].length&&['aliases','sourceRefs','acceptedForms'].includes(key))throw Error('Invalid '+key+' '+row.id);
  if(!row.clozeSentence.includes('____'))throw Error('Missing cloze blank '+row.id);
  if(row.sourceRefs.some(ref=>!ref.sourceFile||!ref.sourceId||!ref.originalForm||!Number.isInteger(ref.csvRecord)&&!Number.isInteger(ref.physicalPage)&&!ref.editorial))throw Error('Missing provenance '+row.id);
 }
}
