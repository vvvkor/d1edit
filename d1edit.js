(function(){
var main = new(function() {

"use strict";

this.opt = {
  height: '40vh'
};

this.btn=[
['src','','/','Source'],
['insertimage','~','*','Image'],
['createlink','~','@','Link'],
['unlink','','x','Unlink'],
['bold','','B','Bold'],
['italic','','I','Italic'],
['removeformat','','_','Unformat'],
['insertUnorderedList','','&bull;','List'],
['insertOrderedList','','#','Ordered'],
['formatblock','<h1>','H1','Head 1'],
['formatblock','<h2>','H2','Head 2'],
['formatblock','<h3>','H3','Head 3'],
['formatblock','<p>','&sect;','Paragraph'],
['tools','','&hellip;','Tools'],
  ['inserthtml','<code>^</code>','{}','Code',1],
  ['inserthtml','<abbr title="~">^</abbr>','A.B.','Abbreviation',1],
  ['formatblock','<div>','D','Div',1],
  ['formatblock','<blockquote>','&#8220;','Block quote',1],
  ['formatblock','<pre>','[]','Preformatted',1],
  ['inserthorizontalrule','','&minus;','Horizontal ruler',1],
  ['inserthtml','<table class="bord"><tr><th>#<th>#<tr><td>-<td>-</table>','T','Table',1],
  //more
  ['underline','','U','Underline',1],
  ['strikeThrough','','S','Strike through',1],
  ['justifyLeft','','&lt;','Justify left',1],
  ['justifyCenter','','=','Justify center',1],
  ['justifyRight','','&gt;','Justify right',1],
  ['justifyFull','','&equiv;','Justify full',1],
  ['indent','','&raquo;','Increase indent',1],
  ['outdent','','&laquo;','Decrease indent',1],
  /*
  ['subscript','','a<sub>x</sub>','Subscript',1],
  ['superscript','','a<sup>x</sup>','Superscript',1],
  ['foreColor','~','TC','Text color',1,'#c00'],
  ['hiliteColor','~','HC','Hilite color',1,'#ff0'],
  ['backColor','~','BC','Back color',1,'#eee'],
  ['fontSize','~','FS','Font size',1,4],
  ['fontName','~','FN','Font name',1,'serif'],
  ['inserthtml','<div class="pad bg left">^</div>','FL','Float left',1],
  ['inserthtml','<div class="pad bg right">^</div>','FR','Float right',1]
  */
];
  this.init = function(opt){
    var i;
    for(i in opt) this.opt[i] = opt[i];
    d1.b('','textarea.edit','',this.prepare.bind(this));
  }
this.prepare=function(n){
  var d = d1.ins('div','',{className:''});
  var m = d1.ins('nav','',{className:'bg'},d);
    var mm = d1.ins('div','',{className:'hide'});
  var z = d1.ins('div','',{className:'bord pad hide'},d);
  z.setAttribute('contenteditable',true);
  z.theArea=n;
  for(var i in this.btn){
    var b = this.btn[i];
    d1.ins('a',b[2],{href:'#cmd'+i,title:b[3],className:'pad hover'},b[4]?mm:m);
  }
  m.appendChild(mm);
  d1.b(m,'a','click',this.cmd.bind(this,z))
  n.className += ' bord pad bg';
  n.style.width = '100%';
  n.style.height = z.style.height = this.opt.height;
  var l = d1.ancestor('label',n)||n;
  l.parentNode.insertBefore(d,l.nextSibling);
  d.appendChild(n);
  this.up(1,z);
  this.mode(z,n.value.match(/(>|&\w+;)/));
  d1.b('',[z],'blur',this.up.bind(this,0))
}
this.cmd=function(z,n,e){
  e.preventDefault();
  var b = this.btn[n.hash.substr(4)];
  if(b[0]=='src') this.mode(z,z.classList.contains('hide'));
  else if(b[0]=='tools') d1.q('div',0,n.parentNode).classList.toggle('hide');
  else{
    var arg = b[1];
    if(arg.match(/~/)){
      var q = prompt(b[3],b[5]||'');
      arg = q===null ? q : arg.replace(/~/,q);
      if(arg && arg.match(/@/)) arg = 'mailto:'+arg;
    }
    if(arg) arg = arg.replace('^',document.getSelection());
    z.focus();
    if(arg!==null) document.execCommand(b[0],false,arg);
    if(b[2]=='*'){this.up(0,z);this.up(1,z);}
  }
}
this.up=function(w,z){
  if(w) z.innerHTML = z.theArea.value;
  else z.theArea.value = z.innerHTML.
    replace(/(\shref=")!/ig,' target="_blank"$1').
    replace(/(\ssrc="[^"]+#[a-z]*)(\d+%?)"/ig,' width="$2"$1"');
    //.replace(/(\ssrc="[^"]+)#([lrc])"/ig,' class="$2"$1"');
}
this.mode=function(z,w){
  z.classList[w?'remove':'add']('hide');
  z.theArea.classList[w?'add':'remove']('hide');
  this.up(w,z);
  d1.b(z.previousSibling,'a+a,div>a','',function(n){n.classList[w?'remove':'add']('hide');});
}

})();

  if(typeof module !== "undefined") module.exports = main;
  else if(window) d1edit = main;
})();