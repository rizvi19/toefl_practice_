import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.env.SITE_ROOT||".");
const prefix="/toefl_practice_/";
const types={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".wav":"audio/wav",".woff":"font/woff",".woff2":"font/woff2",".txt":"text/plain;charset=utf-8",".json":"application/json"};
http.createServer((req,res)=>{
 const pathname=new URL(req.url,"http://localhost").pathname;
 if(!pathname.startsWith(prefix)){res.writeHead(404);res.end("Wrong GitHub Pages prefix");return;}
 const rel=decodeURIComponent(pathname.slice(prefix.length))||"index.html";
 const file=path.resolve(root,rel);
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try{const stat=fs.statSync(file);if(!stat.isFile())throw Error("not a file");res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream","Content-Length":stat.size});fs.createReadStream(file).pipe(res)}
 catch{res.writeHead(404);res.end("Missing file "+rel);}
}).listen(4177,"127.0.0.1",()=>console.log("Serving "+root+" at "+prefix));
