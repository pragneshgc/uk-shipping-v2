var Y=Object.defineProperty;var ee=(r,t,n)=>t in r?Y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var j=(r,t,n)=>(ee(r,typeof t!="symbol"?t+"":t,n),n);import{n as te}from"./app-d2e97fa4.js";function H(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let v=H();function ne(r){v=r}const X=/[&<>"']/,ie=new RegExp(X.source,"g"),V=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,se=new RegExp(V.source,"g"),re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},U=r=>re[r];function b(r,t){if(t){if(X.test(r))return r.replace(ie,U)}else if(V.test(r))return r.replace(se,U);return r}const le=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function W(r){return r.replace(le,(t,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}const ae=/(^|[^\[])\^/g;function m(r,t){r=typeof r=="string"?r:r.source,t=t||"";const n={replace:(e,i)=>(i=i.source||i,i=i.replace(ae,"$1"),r=r.replace(e,i),n),getRegex:()=>new RegExp(r,t)};return n}const oe=/[^\w:]/g,ce=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function O(r,t,n){if(r){let e;try{e=decodeURIComponent(W(n)).replace(oe,"").toLowerCase()}catch{return null}if(e.indexOf("javascript:")===0||e.indexOf("vbscript:")===0||e.indexOf("data:")===0)return null}t&&!ce.test(n)&&(n=fe(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const E={},he=/^[^:]+:\/*[^/]*$/,ue=/^([^:]+:)[\s\S]*$/,pe=/^([^:]+:\/*[^/]*)[\s\S]*$/;function fe(r,t){E[" "+r]||(he.test(r)?E[" "+r]=r+"/":E[" "+r]=L(r,"/",!0)),r=E[" "+r];const n=r.indexOf(":")===-1;return t.substring(0,2)==="//"?n?t:r.replace(ue,"$1")+t:t.charAt(0)==="/"?n?t:r.replace(pe,"$1")+t:r+t}const Z={exec:function(){}};function M(r,t){const n=r.replace(/\|/g,(s,l,a)=>{let c=!1,d=l;for(;--d>=0&&a[d]==="\\";)c=!c;return c?"|":" |"}),e=n.split(/ \|/);let i=0;if(e[0].trim()||e.shift(),e.length>0&&!e[e.length-1].trim()&&e.pop(),e.length>t)e.splice(t);else for(;e.length<t;)e.push("");for(;i<e.length;i++)e[i]=e[i].trim().replace(/\\\|/g,"|");return e}function L(r,t,n){const e=r.length;if(e===0)return"";let i=0;for(;i<e;){const s=r.charAt(e-i-1);if(s===t&&!n)i++;else if(s!==t&&n)i++;else break}return r.slice(0,e-i)}function ge(r,t){if(r.indexOf(t[1])===-1)return-1;const n=r.length;let e=0,i=0;for(;i<n;i++)if(r[i]==="\\")i++;else if(r[i]===t[0])e++;else if(r[i]===t[1]&&(e--,e<0))return i;return-1}function de(r,t){!r||r.silent||(t&&console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"),(r.sanitize||r.sanitizer)&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"),(r.highlight||r.langPrefix)&&console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."),r.mangle&&console.warn("marked(): mangle parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-mangle."),r.baseUrl&&console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."),r.smartypants&&console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."),r.xhtml&&console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."),(r.headerIds||r.headerPrefix)&&console.warn("marked(): headerIds and headerPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-gfm-heading-id."))}function Q(r,t){if(t<1)return"";let n="";for(;t>1;)t&1&&(n+=r),t>>=1,r+=r;return n+r}function N(r,t,n,e){const i=t.href,s=t.title?b(t.title):null,l=r[1].replace(/\\([\[\]])/g,"$1");if(r[0].charAt(0)!=="!"){e.state.inLink=!0;const a={type:"link",raw:n,href:i,title:s,text:l,tokens:e.inlineTokens(l)};return e.state.inLink=!1,a}return{type:"image",raw:n,href:i,title:s,text:b(l)}}function ke(r,t){const n=r.match(/^(\s+)(?:```)/);if(n===null)return t;const e=n[1];return t.split(`
`).map(i=>{const s=i.match(/^\s+/);if(s===null)return i;const[l]=s;return l.length>=e.length?i.slice(e.length):i}).join(`
`)}class B{constructor(t){this.options=t||v}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const e=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?e:L(e,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const e=n[0],i=ke(e,n[3]||"");return{type:"code",raw:e,lang:n[2]?n[2].trim().replace(this.rules.inline._escapes,"$1"):n[2],text:i}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let e=n[2].trim();if(/#$/.test(e)){const i=L(e,"#");(this.options.pedantic||!i||/ $/.test(i))&&(e=i.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:n[0]}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){const e=n[0].replace(/^ *>[ \t]?/gm,""),i=this.lexer.state.top;this.lexer.state.top=!0;const s=this.lexer.blockTokens(e);return this.lexer.state.top=i,{type:"blockquote",raw:n[0],tokens:s,text:e}}}list(t){let n=this.rules.block.list.exec(t);if(n){let e,i,s,l,a,c,d,f,g,k,h,z,_=n[1].trim();const R=_.length>1,x={type:"list",raw:"",ordered:R,start:R?+_.slice(0,-1):"",loose:!1,items:[]};_=R?`\\d{1,9}\\${_.slice(-1)}`:`\\${_}`,this.options.pedantic&&(_=R?_:"[*+-]");const w=new RegExp(`^( {0,3}${_})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;t&&(z=!1,!(!(n=w.exec(t))||this.rules.block.hr.test(t)));){if(e=n[0],t=t.substring(e.length),f=n[2].split(`
`,1)[0].replace(/^\t+/,S=>" ".repeat(3*S.length)),g=t.split(`
`,1)[0],this.options.pedantic?(l=2,h=f.trimLeft()):(l=n[2].search(/[^ ]/),l=l>4?1:l,h=f.slice(l),l+=n[1].length),c=!1,!f&&/^ *$/.test(g)&&(e+=g+`
`,t=t.substring(g.length+1),z=!0),!z){const S=new RegExp(`^ {0,${Math.min(3,l-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),y=new RegExp(`^ {0,${Math.min(3,l-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),$=new RegExp(`^ {0,${Math.min(3,l-1)}}(?:\`\`\`|~~~)`),C=new RegExp(`^ {0,${Math.min(3,l-1)}}#`);for(;t&&(k=t.split(`
`,1)[0],g=k,this.options.pedantic&&(g=g.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!($.test(g)||C.test(g)||S.test(g)||y.test(t)));){if(g.search(/[^ ]/)>=l||!g.trim())h+=`
`+g.slice(l);else{if(c||f.search(/[^ ]/)>=4||$.test(f)||C.test(f)||y.test(f))break;h+=`
`+g}!c&&!g.trim()&&(c=!0),e+=k+`
`,t=t.substring(k.length+1),f=g.slice(l)}}x.loose||(d?x.loose=!0:/\n *\n *$/.test(e)&&(d=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(h),i&&(s=i[0]!=="[ ] ",h=h.replace(/^\[[ xX]\] +/,""))),x.items.push({type:"list_item",raw:e,task:!!i,checked:s,loose:!1,text:h}),x.raw+=e}x.items[x.items.length-1].raw=e.trimRight(),x.items[x.items.length-1].text=h.trimRight(),x.raw=x.raw.trimRight();const A=x.items.length;for(a=0;a<A;a++)if(this.lexer.state.top=!1,x.items[a].tokens=this.lexer.blockTokens(x.items[a].text,[]),!x.loose){const S=x.items[a].tokens.filter($=>$.type==="space"),y=S.length>0&&S.some($=>/\n.*\n/.test($.raw));x.loose=y}if(x.loose)for(a=0;a<A;a++)x.items[a].loose=!0;return x}}html(t){const n=this.rules.block.html.exec(t);if(n){const e={type:"html",block:!0,raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};if(this.options.sanitize){const i=this.options.sanitizer?this.options.sanitizer(n[0]):b(n[0]);e.type="paragraph",e.text=i,e.tokens=this.lexer.inline(i)}return e}}def(t){const n=this.rules.block.def.exec(t);if(n){const e=n[1].toLowerCase().replace(/\s+/g," "),i=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",s=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline._escapes,"$1"):n[3];return{type:"def",tag:e,raw:n[0],href:i,title:s}}}table(t){const n=this.rules.block.table.exec(t);if(n){const e={type:"table",header:M(n[1]).map(i=>({text:i})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(e.header.length===e.align.length){e.raw=n[0];let i=e.align.length,s,l,a,c;for(s=0;s<i;s++)/^ *-+: *$/.test(e.align[s])?e.align[s]="right":/^ *:-+: *$/.test(e.align[s])?e.align[s]="center":/^ *:-+ *$/.test(e.align[s])?e.align[s]="left":e.align[s]=null;for(i=e.rows.length,s=0;s<i;s++)e.rows[s]=M(e.rows[s],e.header.length).map(d=>({text:d}));for(i=e.header.length,l=0;l<i;l++)e.header[l].tokens=this.lexer.inline(e.header[l].text);for(i=e.rows.length,l=0;l<i;l++)for(c=e.rows[l],a=0;a<c.length;a++)c[a].tokens=this.lexer.inline(c[a].text);return e}}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const e=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:e,tokens:this.lexer.inline(e)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:b(n[1])}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):b(n[0]):n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const e=n[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const l=L(e.slice(0,-1),"\\");if((e.length-l.length)%2===0)return}else{const l=ge(n[2],"()");if(l>-1){const c=(n[0].indexOf("!")===0?5:4)+n[1].length+l;n[2]=n[2].substring(0,l),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let i=n[2],s="";if(this.options.pedantic){const l=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);l&&(i=l[1],s=l[3])}else s=n[3]?n[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(e)?i=i.slice(1):i=i.slice(1,-1)),N(n,{href:i&&i.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(t,n){let e;if((e=this.rules.inline.reflink.exec(t))||(e=this.rules.inline.nolink.exec(t))){let i=(e[2]||e[1]).replace(/\s+/g," ");if(i=n[i.toLowerCase()],!i){const s=e[0].charAt(0);return{type:"text",raw:s,text:s}}return N(e,i,e[0],this.lexer)}}emStrong(t,n,e=""){let i=this.rules.inline.emStrong.lDelim.exec(t);if(!i||i[3]&&e.match(/[\p{L}\p{N}]/u))return;const s=i[1]||i[2]||"";if(!s||s&&(e===""||this.rules.inline.punctuation.exec(e))){const l=i[0].length-1;let a,c,d=l,f=0;const g=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(g.lastIndex=0,n=n.slice(-1*t.length+l);(i=g.exec(n))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(c=a.length,i[3]||i[4]){d+=c;continue}else if((i[5]||i[6])&&l%3&&!((l+c)%3)){f+=c;continue}if(d-=c,d>0)continue;c=Math.min(c,c+d+f);const k=t.slice(0,l+i.index+(i[0].length-a.length)+c);if(Math.min(l,c)%2){const z=k.slice(1,-1);return{type:"em",raw:k,text:z,tokens:this.lexer.inlineTokens(z)}}const h=k.slice(2,-2);return{type:"strong",raw:k,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let e=n[2].replace(/\n/g," ");const i=/[^ ]/.test(e),s=/^ /.test(e)&&/ $/.test(e);return i&&s&&(e=e.substring(1,e.length-1)),e=b(e,!0),{type:"codespan",raw:n[0],text:e}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t,n){const e=this.rules.inline.autolink.exec(t);if(e){let i,s;return e[2]==="@"?(i=b(this.options.mangle?n(e[1]):e[1]),s="mailto:"+i):(i=b(e[1]),s=i),{type:"link",raw:e[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}url(t,n){let e;if(e=this.rules.inline.url.exec(t)){let i,s;if(e[2]==="@")i=b(this.options.mangle?n(e[0]):e[0]),s="mailto:"+i;else{let l;do l=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])[0];while(l!==e[0]);i=b(e[0]),e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t,n){const e=this.rules.inline.text.exec(t);if(e){let i;return this.lexer.state.inRawBlock?i=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):b(e[0]):e[0]:i=b(this.options.smartypants?n(e[0]):e[0]),{type:"text",raw:e[0],text:i}}}}const u={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Z,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};u._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;u._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;u.def=m(u.def).replace("label",u._label).replace("title",u._title).getRegex();u.bullet=/(?:[*+-]|\d{1,9}[.)])/;u.listItemStart=m(/^( *)(bull) */).replace("bull",u.bullet).getRegex();u.list=m(u.list).replace(/bull/g,u.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+u.def.source+")").getRegex();u._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";u._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;u.html=m(u.html,"i").replace("comment",u._comment).replace("tag",u._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();u.paragraph=m(u._paragraph).replace("hr",u.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",u._tag).getRegex();u.blockquote=m(u.blockquote).replace("paragraph",u.paragraph).getRegex();u.normal={...u};u.gfm={...u.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"};u.gfm.table=m(u.gfm.table).replace("hr",u.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",u._tag).getRegex();u.gfm.paragraph=m(u._paragraph).replace("hr",u.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",u.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",u._tag).getRegex();u.pedantic={...u.normal,html:m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",u._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Z,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:m(u.normal._paragraph).replace("hr",u.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",u.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const o={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Z,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Z,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};o._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";o.punctuation=m(o.punctuation).replace(/punctuation/g,o._punctuation).getRegex();o.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;o.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g;o._comment=m(u._comment).replace("(?:-->|$)","-->").getRegex();o.emStrong.lDelim=m(o.emStrong.lDelim).replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimAst=m(o.emStrong.rDelimAst,"g").replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimUnd=m(o.emStrong.rDelimUnd,"g").replace(/punct/g,o._punctuation).getRegex();o._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;o._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;o._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;o.autolink=m(o.autolink).replace("scheme",o._scheme).replace("email",o._email).getRegex();o._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;o.tag=m(o.tag).replace("comment",o._comment).replace("attribute",o._attribute).getRegex();o._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;o._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;o._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;o.link=m(o.link).replace("label",o._label).replace("href",o._href).replace("title",o._title).getRegex();o.reflink=m(o.reflink).replace("label",o._label).replace("ref",u._label).getRegex();o.nolink=m(o.nolink).replace("ref",u._label).getRegex();o.reflinkSearch=m(o.reflinkSearch,"g").replace("reflink",o.reflink).replace("nolink",o.nolink).getRegex();o.normal={...o};o.pedantic={...o.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:m(/^!?\[(label)\]\((.*?)\)/).replace("label",o._label).getRegex(),reflink:m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",o._label).getRegex()};o.gfm={...o.normal,escape:m(o.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/};o.gfm.url=m(o.gfm.url,"i").replace("email",o.gfm._extended_email).getRegex();o.breaks={...o.gfm,br:m(o.br).replace("{2,}","*").getRegex(),text:m(o.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};function me(r){return r.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function F(r){let t="",n,e;const i=r.length;for(n=0;n<i;n++)e=r.charCodeAt(n),Math.random()>.5&&(e="x"+e.toString(16)),t+="&#"+e+";";return t}class T{constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||v,this.options.tokenizer=this.options.tokenizer||new B,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:u.normal,inline:o.normal};this.options.pedantic?(n.block=u.pedantic,n.inline=o.pedantic):this.options.gfm&&(n.block=u.gfm,this.options.breaks?n.inline=o.breaks:n.inline=o.gfm),this.tokenizer.rules=n}static get rules(){return{block:u,inline:o}}static lex(t,n){return new T(n).lex(t)}static lexInline(t,n){return new T(n).inlineTokens(t)}lex(t){t=t.replace(/\r\n|\r/g,`
`),this.blockTokens(t,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(t,n=[]){this.options.pedantic?t=t.replace(/\t/g,"    ").replace(/^ +$/gm,""):t=t.replace(/^( *)(\t+)/gm,(a,c,d)=>c+"    ".repeat(d.length));let e,i,s,l;for(;t;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(e=a.call({lexer:this},t,n))?(t=t.substring(e.raw.length),n.push(e),!0):!1))){if(e=this.tokenizer.space(t)){t=t.substring(e.raw.length),e.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(e);continue}if(e=this.tokenizer.code(t)){t=t.substring(e.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+e.raw,i.text+=`
`+e.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(e);continue}if(e=this.tokenizer.fences(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.heading(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.hr(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.blockquote(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.list(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.html(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.def(t)){t=t.substring(e.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+e.raw,i.text+=`
`+e.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[e.tag]||(this.tokens.links[e.tag]={href:e.href,title:e.title});continue}if(e=this.tokenizer.table(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.lheading(t)){t=t.substring(e.raw.length),n.push(e);continue}if(s=t,this.options.extensions&&this.options.extensions.startBlock){let a=1/0;const c=t.slice(1);let d;this.options.extensions.startBlock.forEach(function(f){d=f.call({lexer:this},c),typeof d=="number"&&d>=0&&(a=Math.min(a,d))}),a<1/0&&a>=0&&(s=t.substring(0,a+1))}if(this.state.top&&(e=this.tokenizer.paragraph(s))){i=n[n.length-1],l&&i.type==="paragraph"?(i.raw+=`
`+e.raw,i.text+=`
`+e.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(e),l=s.length!==t.length,t=t.substring(e.raw.length);continue}if(e=this.tokenizer.text(t)){t=t.substring(e.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+e.raw,i.text+=`
`+e.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(e);continue}if(t){const a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let e,i,s,l=t,a,c,d;if(this.tokens.links){const f=Object.keys(this.tokens.links);if(f.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(l))!=null;)f.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,a.index)+"["+Q("a",a[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(l))!=null;)l=l.slice(0,a.index)+"["+Q("a",a[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.escapedEmSt.exec(l))!=null;)l=l.slice(0,a.index+a[0].length-2)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;t;)if(c||(d=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(f=>(e=f.call({lexer:this},t,n))?(t=t.substring(e.raw.length),n.push(e),!0):!1))){if(e=this.tokenizer.escape(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.tag(t)){t=t.substring(e.raw.length),i=n[n.length-1],i&&e.type==="text"&&i.type==="text"?(i.raw+=e.raw,i.text+=e.text):n.push(e);continue}if(e=this.tokenizer.link(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(e.raw.length),i=n[n.length-1],i&&e.type==="text"&&i.type==="text"?(i.raw+=e.raw,i.text+=e.text):n.push(e);continue}if(e=this.tokenizer.emStrong(t,l,d)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.codespan(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.br(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.del(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.autolink(t,F)){t=t.substring(e.raw.length),n.push(e);continue}if(!this.state.inLink&&(e=this.tokenizer.url(t,F))){t=t.substring(e.raw.length),n.push(e);continue}if(s=t,this.options.extensions&&this.options.extensions.startInline){let f=1/0;const g=t.slice(1);let k;this.options.extensions.startInline.forEach(function(h){k=h.call({lexer:this},g),typeof k=="number"&&k>=0&&(f=Math.min(f,k))}),f<1/0&&f>=0&&(s=t.substring(0,f+1))}if(e=this.tokenizer.inlineText(s,me)){t=t.substring(e.raw.length),e.raw.slice(-1)!=="_"&&(d=e.raw.slice(-1)),c=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=e.raw,i.text+=e.text):n.push(e);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}}class D{constructor(t){this.options=t||v}code(t,n,e){const i=(n||"").match(/\S*/)[0];if(this.options.highlight){const s=this.options.highlight(t,i);s!=null&&s!==t&&(e=!0,t=s)}return t=t.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+b(i)+'">'+(e?t:b(t,!0))+`</code></pre>
`:"<pre><code>"+(e?t:b(t,!0))+`</code></pre>
`}blockquote(t){return`<blockquote>
${t}</blockquote>
`}html(t,n){return t}heading(t,n,e,i){if(this.options.headerIds){const s=this.options.headerPrefix+i.slug(e);return`<h${n} id="${s}">${t}</h${n}>
`}return`<h${n}>${t}</h${n}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(t,n,e){const i=n?"ol":"ul",s=n&&e!==1?' start="'+e+'"':"";return"<"+i+s+`>
`+t+"</"+i+`>
`}listitem(t){return`<li>${t}</li>
`}checkbox(t){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(t){return`<p>${t}</p>
`}table(t,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow(t){return`<tr>
${t}</tr>
`}tablecell(t,n){const e=n.header?"th":"td";return(n.align?`<${e} align="${n.align}">`:`<${e}>`)+t+`</${e}>
`}strong(t){return`<strong>${t}</strong>`}em(t){return`<em>${t}</em>`}codespan(t){return`<code>${t}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(t){return`<del>${t}</del>`}link(t,n,e){if(t=O(this.options.sanitize,this.options.baseUrl,t),t===null)return e;let i='<a href="'+t+'"';return n&&(i+=' title="'+n+'"'),i+=">"+e+"</a>",i}image(t,n,e){if(t=O(this.options.sanitize,this.options.baseUrl,t),t===null)return e;let i=`<img src="${t}" alt="${e}"`;return n&&(i+=` title="${n}"`),i+=this.options.xhtml?"/>":">",i}text(t){return t}}class G{strong(t){return t}em(t){return t}codespan(t){return t}del(t){return t}html(t){return t}text(t){return t}link(t,n,e){return""+e}image(t,n,e){return""+e}br(){return""}}class J{constructor(){this.seen={}}serialize(t){return t.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(t,n){let e=t,i=0;if(this.seen.hasOwnProperty(e)){i=this.seen[t];do i++,e=t+"-"+i;while(this.seen.hasOwnProperty(e))}return n||(this.seen[t]=i,this.seen[e]=0),e}slug(t,n={}){const e=this.serialize(t);return this.getNextSafeSlug(e,n.dryrun)}}class I{constructor(t){this.options=t||v,this.options.renderer=this.options.renderer||new D,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new G,this.slugger=new J}static parse(t,n){return new I(n).parse(t)}static parseInline(t,n){return new I(n).parseInline(t)}parse(t,n=!0){let e="",i,s,l,a,c,d,f,g,k,h,z,_,R,x,w,A,S,y,$;const C=t.length;for(i=0;i<C;i++){if(h=t[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[h.type]&&($=this.options.extensions.renderers[h.type].call({parser:this},h),$!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(h.type))){e+=$||"";continue}switch(h.type){case"space":continue;case"hr":{e+=this.renderer.hr();continue}case"heading":{e+=this.renderer.heading(this.parseInline(h.tokens),h.depth,W(this.parseInline(h.tokens,this.textRenderer)),this.slugger);continue}case"code":{e+=this.renderer.code(h.text,h.lang,h.escaped);continue}case"table":{for(g="",f="",a=h.header.length,s=0;s<a;s++)f+=this.renderer.tablecell(this.parseInline(h.header[s].tokens),{header:!0,align:h.align[s]});for(g+=this.renderer.tablerow(f),k="",a=h.rows.length,s=0;s<a;s++){for(d=h.rows[s],f="",c=d.length,l=0;l<c;l++)f+=this.renderer.tablecell(this.parseInline(d[l].tokens),{header:!1,align:h.align[l]});k+=this.renderer.tablerow(f)}e+=this.renderer.table(g,k);continue}case"blockquote":{k=this.parse(h.tokens),e+=this.renderer.blockquote(k);continue}case"list":{for(z=h.ordered,_=h.start,R=h.loose,a=h.items.length,k="",s=0;s<a;s++)w=h.items[s],A=w.checked,S=w.task,x="",w.task&&(y=this.renderer.checkbox(A),R?w.tokens.length>0&&w.tokens[0].type==="paragraph"?(w.tokens[0].text=y+" "+w.tokens[0].text,w.tokens[0].tokens&&w.tokens[0].tokens.length>0&&w.tokens[0].tokens[0].type==="text"&&(w.tokens[0].tokens[0].text=y+" "+w.tokens[0].tokens[0].text)):w.tokens.unshift({type:"text",text:y}):x+=y),x+=this.parse(w.tokens,R),k+=this.renderer.listitem(x,S,A);e+=this.renderer.list(k,z,_);continue}case"html":{e+=this.renderer.html(h.text,h.block);continue}case"paragraph":{e+=this.renderer.paragraph(this.parseInline(h.tokens));continue}case"text":{for(k=h.tokens?this.parseInline(h.tokens):h.text;i+1<C&&t[i+1].type==="text";)h=t[++i],k+=`
`+(h.tokens?this.parseInline(h.tokens):h.text);e+=n?this.renderer.paragraph(k):k;continue}default:{const P='Token with "'+h.type+'" type was not found.';if(this.options.silent){console.error(P);return}else throw new Error(P)}}}return e}parseInline(t,n){n=n||this.renderer;let e="",i,s,l;const a=t.length;for(i=0;i<a;i++){if(s=t[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(l=this.options.extensions.renderers[s.type].call({parser:this},s),l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type))){e+=l||"";continue}switch(s.type){case"escape":{e+=n.text(s.text);break}case"html":{e+=n.html(s.text);break}case"link":{e+=n.link(s.href,s.title,this.parseInline(s.tokens,n));break}case"image":{e+=n.image(s.href,s.title,s.text);break}case"strong":{e+=n.strong(this.parseInline(s.tokens,n));break}case"em":{e+=n.em(this.parseInline(s.tokens,n));break}case"codespan":{e+=n.codespan(s.text);break}case"br":{e+=n.br();break}case"del":{e+=n.del(this.parseInline(s.tokens,n));break}case"text":{e+=n.text(s.text);break}default:{const c='Token with "'+s.type+'" type was not found.';if(this.options.silent){console.error(c);return}else throw new Error(c)}}}return e}}class q{constructor(t){this.options=t||v}preprocess(t){return t}postprocess(t){return t}}j(q,"passThroughHooks",new Set(["preprocess","postprocess"]));function xe(r,t,n){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,r){const i="<p>An error occurred:</p><pre>"+b(e.message+"",!0)+"</pre>";if(t)return Promise.resolve(i);if(n){n(null,i);return}return i}if(t)return Promise.reject(e);if(n){n(e);return}throw e}}function K(r,t){return(n,e,i)=>{typeof e=="function"&&(i=e,e=null);const s={...e};e={...p.defaults,...s};const l=xe(e.silent,e.async,i);if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(de(e,i),e.hooks&&(e.hooks.options=e),i){const a=e.highlight;let c;try{e.hooks&&(n=e.hooks.preprocess(n)),c=r(n,e)}catch(g){return l(g)}const d=function(g){let k;if(!g)try{e.walkTokens&&p.walkTokens(c,e.walkTokens),k=t(c,e),e.hooks&&(k=e.hooks.postprocess(k))}catch(h){g=h}return e.highlight=a,g?l(g):i(null,k)};if(!a||a.length<3||(delete e.highlight,!c.length))return d();let f=0;p.walkTokens(c,function(g){g.type==="code"&&(f++,setTimeout(()=>{a(g.text,g.lang,function(k,h){if(k)return d(k);h!=null&&h!==g.text&&(g.text=h,g.escaped=!0),f--,f===0&&d()})},0))}),f===0&&d();return}if(e.async)return Promise.resolve(e.hooks?e.hooks.preprocess(n):n).then(a=>r(a,e)).then(a=>e.walkTokens?Promise.all(p.walkTokens(a,e.walkTokens)).then(()=>a):a).then(a=>t(a,e)).then(a=>e.hooks?e.hooks.postprocess(a):a).catch(l);try{e.hooks&&(n=e.hooks.preprocess(n));const a=r(n,e);e.walkTokens&&p.walkTokens(a,e.walkTokens);let c=t(a,e);return e.hooks&&(c=e.hooks.postprocess(c)),c}catch(a){return l(a)}}}function p(r,t,n){return K(T.lex,I.parse)(r,t,n)}p.options=p.setOptions=function(r){return p.defaults={...p.defaults,...r},ne(p.defaults),p};p.getDefaults=H;p.defaults=v;p.use=function(...r){const t=p.defaults.extensions||{renderers:{},childTokens:{}};r.forEach(n=>{const e={...n};if(e.async=p.defaults.async||e.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if(i.renderer){const s=t.renderers[i.name];s?t.renderers[i.name]=function(...l){let a=i.renderer.apply(this,l);return a===!1&&(a=s.apply(this,l)),a}:t.renderers[i.name]=i.renderer}if(i.tokenizer){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");t[i.level]?t[i.level].unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),e.extensions=t),n.renderer){const i=p.defaults.renderer||new D;for(const s in n.renderer){const l=i[s];i[s]=(...a)=>{let c=n.renderer[s].apply(i,a);return c===!1&&(c=l.apply(i,a)),c}}e.renderer=i}if(n.tokenizer){const i=p.defaults.tokenizer||new B;for(const s in n.tokenizer){const l=i[s];i[s]=(...a)=>{let c=n.tokenizer[s].apply(i,a);return c===!1&&(c=l.apply(i,a)),c}}e.tokenizer=i}if(n.hooks){const i=p.defaults.hooks||new q;for(const s in n.hooks){const l=i[s];q.passThroughHooks.has(s)?i[s]=a=>{if(p.defaults.async)return Promise.resolve(n.hooks[s].call(i,a)).then(d=>l.call(i,d));const c=n.hooks[s].call(i,a);return l.call(i,c)}:i[s]=(...a)=>{let c=n.hooks[s].apply(i,a);return c===!1&&(c=l.apply(i,a)),c}}e.hooks=i}if(n.walkTokens){const i=p.defaults.walkTokens;e.walkTokens=function(s){let l=[];return l.push(n.walkTokens.call(this,s)),i&&(l=l.concat(i.call(this,s))),l}}p.setOptions(e)})};p.walkTokens=function(r,t){let n=[];for(const e of r)switch(n=n.concat(t.call(p,e)),e.type){case"table":{for(const i of e.header)n=n.concat(p.walkTokens(i.tokens,t));for(const i of e.rows)for(const s of i)n=n.concat(p.walkTokens(s.tokens,t));break}case"list":{n=n.concat(p.walkTokens(e.items,t));break}default:p.defaults.extensions&&p.defaults.extensions.childTokens&&p.defaults.extensions.childTokens[e.type]?p.defaults.extensions.childTokens[e.type].forEach(function(i){n=n.concat(p.walkTokens(e[i],t))}):e.tokens&&(n=n.concat(p.walkTokens(e.tokens,t)))}return n};p.parseInline=K(T.lexInline,I.parseInline);p.Parser=I;p.parser=I.parse;p.Renderer=D;p.TextRenderer=G;p.Lexer=T;p.lexer=T.lex;p.Tokenizer=B;p.Slugger=J;p.Hooks=q;p.parse=p;p.options;p.setOptions;p.use;p.walkTokens;p.parseInline;I.parse;T.lex;const we={data:function(){return{info:!1}},mounted(){axios.get("/info").then(r=>{this.info=p.parse(r.data.data.changelog)}).catch(r=>{console.log(r)})}};var be=function(){var t=this,n=t._self._c;return n("section",{staticClass:"card"},[t._m(0),n("div",{staticClass:"card-body"},[t.info?n("div",[n("div",{staticClass:"appInfo mb-10"},[n("h4",[t._v("Current Version: "),n("b",[t._v(t._s(t.info.version))])]),n("h4",[t._v("Environment: "),n("b",[t._v(t._s(t.info.environment))])])]),n("hr",{staticClass:"mb-10"}),n("h2",{staticClass:"mb-10"},[t._v("Changelog: ")]),n("hr"),n("div",{domProps:{innerHTML:t._s(t.info)}})]):t._e()])])},_e=[function(){var r=this,t=r._self._c;return t("div",{staticClass:"card-header"},[t("h3",{staticClass:"text-center"},[r._v("App Info")])])}],ye=te(we,be,_e,!1,null,null,null,null);const Se=ye.exports;export{Se as default};
