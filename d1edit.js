/*! d1edit https://github.com/vvvkor/d1edit */
/* Lightweight WYSIWYG text editor */

//textarea.edit[data-wys=""|"1"][data-tools], textarea.adjust
if(typeof module !== "undefined") var d1 = require('d1css');
(function () {
var main = new(function () {

  "use strict";

  this.name = 'edit';
  
  this.opt = {
    qsAdjust: 'textarea.adjust',
    qsEdit: 'textarea.edit',
    height: '50vh',
    tools: '/*@xbi_.#123p|c,s^vdqf~T(=)j+-'
  };
  
  this.btn = {
    '/': ['src', '', '/', 'Source'],
    '*': ['insertimage', '~', '*', 'Image'],
    '@': ['createlink', '~', '@', 'Link'],
    'x': ['unlink', '', '&times;', 'Unlink'],
    'b': ['bold', '', '<b>B</b>', 'Bold'],
    'i': ['italic', '', '<i>I</i>', 'Italic'],
    '_': ['removeformat', '', '_', 'Unformat'],
    '.': ['insertUnorderedList', '', '&bull;', 'List'],
    '#': ['insertOrderedList', '', '#', 'Ordered'],
    '1': ['formatblock', '<h1>', 'H1', 'Head 1'],
    '2': ['formatblock', '<h2>', 'H2', 'Head 2'],
    '3': ['formatblock', '<h3>', 'H3', 'Head 3'],
    'p': ['formatblock', '<p>', '&sect;', 'Paragraph'],
    '|': ['tools', '', '&hellip;', 'Tools'],
    //more
    //inline
    'c': ['inserthtml', '<code>^</code>', '{}', 'Code'],
    ',': ['inserthtml', '<abbr title="~">^</abbr>', 'A.B.', 'Abbreviation'],
    's': ['strikeThrough', '', '<s>S</s>', 'Strike through'],
    '^': ['subscript','','a<sub>x</sub>','Subscript'],
    'v': ['superscript','','a<sup>x</sup>','Superscript'],
    //block
    'd': ['formatblock', '<div>', 'D', 'Div'],
    'q': ['formatblock', '<blockquote>', '&#8220;', 'Block quote'],
    'f': ['formatblock', '<pre>', '[]', 'Preformatted'],
    '~': ['inserthorizontalrule', '', '&minus;', 'Horizontal ruler'],
    'T': ['inserthtml', '<table><tr><th>#<th>#<tr><td>-<td>-</table>', 'T', 'Table'],
    //more
    '(': ['justifyLeft', '', '&lt;', 'Justify left'],
    '=': ['justifyCenter', '', '=', 'Justify center'],
    ')': ['justifyRight', '', '&gt;', 'Justify right'],
    'j': ['justifyFull', '', '&equiv;', 'Justify full'],
    '+': ['indent', '', '&raquo;', 'Increase indent'],
    '-': ['outdent', '', '&laquo;', 'Decrease indent']
    /*
    'u': ['underline', '', 'U', 'Underline'],
    'C': ['foreColor','~','TC','Text color','#c00'],
    'h': ['hiliteColor','~','HC','Hilite color','#ff0'],
    'B': ['backColor','~','BC','Back color','#eee'],
    'S': ['fontSize','~','FS','Font size',4],
    'F': ['fontName','~','FN','Font name','serif'],
    'L': ['inserthtml','<div class="pad bg left">^</div>','FL','Float left'],
    'R': ['inserthtml','<div class="pad bg right">^</div>','FR','Float right']
    */
  };

  this.init = function (opt) {
    var i;
    for (i in opt) this.opt[i] = opt[i];
    d1.b('', this.opt.qsEdit, '', this.prepare.bind(this));
    d1.b('', this.opt.qsAdjust, '', this.setStyle.bind(this));
    d1.b('', this.opt.qsAdjust, '', this.adjust.bind(this));
    d1.b('', this.opt.qsAdjust, 'input', this.adjust.bind(this));
  }

  this.prepare = function (n) {
    if(!n.theWys){
      var d = d1.ins('div', '', {className: ''});
      var m = d1.ins('nav', '', {className: 'bg'}, d);
      var mm = d1.ins('div');
      var z = d1.ins('div', '', {className: d1.opt.cHide + ' bord pad'}, d);
      z.setAttribute('contenteditable', true);
      z.theArea = n;
      n.theWys = z;
      if(n.id) {
        z.id = 'lookup-' + n.id;
        d1.b('', '[for="' + n.id + '"]', 'click', function(lbl, e) { if(d1.getState(z)) z.focus(); });
      }
      d1.setState(mm, 0)
      var t = (n.getAttribute('data-tools') || this.opt.tools).split('');
      var to = m, a, b;
      for (var i in t) {
        b = this.btn[t[i]];
        a = d1.ins('a', b[2], {href: '#cmd-' + b[0]/*i*/, title: b[3], className: 'pad hover'}, to);
        if(b[0] == 'tools') to = mm;
        a.onclick = this.cmd.bind(this, z, b, a);
      }
      m.appendChild(mm);
      //d1.b(m, 'a', 'click', this.cmd.bind(this, z));
      n.className += ' bord pad';
      n.style.width = '100%';
      this.setStyle(n);
      this.setStyle(z);
      var l = d1.ancestor('label', n) || n;
      l.parentNode.insertBefore(d, l.nextSibling);
      d.appendChild(n);
      d1.b('', [z], 'blur', this.up.bind(this, 0));
      d1.b('', [n], 'input', this.adjust.bind(this, n));
    }
    this.up(1, n.theWys);
    this.modeAuto(n);
  }
  
  this.modeAuto = function(n){
    var t = (n.getAttribute('data-tools') || this.opt.tools).split('');
    var wys = n.getAttribute('data-wys');
    if(wys===null) wys = (t.indexOf('/')==-1) || (n.value.match(/(>|&\w+;)/) && !n.value.match(/<script/i));
    this.mode(n.theWys, wys);
  }

  this.cmd = function (z, b, n, e) {
    if(e) e.preventDefault();
    //var b = this.btn[n.hash.substr(4)];
    if (b[0] == 'src') this.mode(z, !d1.getState(z), 1);
    else if (b[0] == 'tools'){
      var mm = d1.q('div', 0, n.parentNode);
      if(mm) d1.toggle(mm);
    }
    else {
      var arg = b[1];
      if (arg.match(/~/)) {
        var q = prompt(b[3], b[4] || '');
        arg = q === null ? q : arg.replace(/~/, q);
        if (arg && arg.match(/@/)) arg = 'mailto:' + arg;
      }
      if (arg) arg = arg.replace('^', document.getSelection());
      z.focus();
      if (arg !== null) document.execCommand(b[0], false, arg);
      if (b[2] == '*') {
        this.up(0, z);
        this.up(1, z);
      }
    }
  }

  this.up = function (w, z) {
    if (w) z.innerHTML = z.theArea.value;
    else z.theArea.value = z.innerHTML.
    replace(/(\shref=")!/ig, ' target="_blank"$1').
    replace(/(\ssrc="[^"]+#[a-z]*)(\d+%?)"/ig, ' width="$2"$1"');
    //.replace(/(\ssrc="[^"]+)#([lrc])"/ig,' class="$2"$1"');
    if(!w && (typeof(Event) === 'function')) z.theArea.dispatchEvent(new Event('input'));//-ie
  }

  this.mode = function (z, w) {
    d1.setState(z, w);
    d1.setState(z.theArea, !w);
    if(!w){
      if(z.style.height) z.theArea.style.height = z.style.height;
      else this.adjust(z.theArea);
    }
    this.up(w, z);
    d1.b(z.previousSibling, 'a', '', function (n) {
      if(n.hash != '#cmd-src') d1.setState(n, w);
    });
  }

  this.setStyle = function(n){
    n.style.resize = 'vertical'; //both
    n.style.overflow = 'auto';
    n.style.minHeight = '3em';
    n.style.maxHeight = this.opt.height;
  }
  
  this.adjust = function(n){
    //1. jumps
    //n.style.height = 'auto';
    //n.style.height = (24 + n.scrollHeight) + 'px';
    //2. not exact
    n.style.height = (1.5 * (2 + Math.max(n.value.length/50, (n.value.match(/\n/g) || []).length))) + 'em';
  }

  d1.plug(this);

})();

  if (typeof module !== "undefined") module.exports = main;
  else if (window) d1edit = main;
})();