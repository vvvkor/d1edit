# d1edit

Add-on for [d1](https://github.com/vvvkor/d1).  
Lightweight WYSIWYG text editor.  
[Demo & docs](https://vvvkor.github.io/d1#edit)

## Install

```
npm install d1edit
```

## Usage

On page load call:
```
d1edit.init(options);
```

In your ``textarea`` markup:
* Add ``edit`` class to enable WYSIWYG editor.
* Add ``adjust`` class to automatically adjust textarea height to content.
* Add ``data-wys`` attribute to set initial editor mode. Set empty string as value for source code editing, any other value for WYSIWYG. If attribute is absent, initial mode is determined automatically (WYSIWYG if text contains HTML tags).
* Add ``data-tools`` attribute to customize WYSIWYG editor toolset.

## Example

```
<textarea class="edit" cols="50" rows="20">
  Write <b>formatted</b> text.
</textarea>
```

## Options

### qsAdjust

Query selector of textarea elements to auto-adjust height.  
Default: ``"textarea.adjust"``

### qsEdit

Query selector of textarea elements to enable WYSIWYG.  Default: ``"textarea.edit"``

### height

Default height of WYSIWYG editor in ``em``s.  
Default: ``50``

### tools

WYSIWYG editor toolset. 
Each character stands for tool:

* ``/`` - **toggle editing mode** (WYSIWYG/source)
* ``*`` - insert image
* ``@`` - insert link
* ``x`` - remove link
* ``b`` - bold
* ``i`` - italic
* ``_`` - remove format
* ``.`` - unordered list
* ``#`` - ordered list
* ``1`` - heading 1
* ``2`` - heading 2
* ``3`` - heading 3
* ``p`` - paragraph
* ``|`` - **toggle more tools**
* ``c`` - code
* ``,`` - abbreviation
* ``s`` - strike through
* ``^`` - subscript
* ``v`` - superscript
* ``d`` - div
* ``q`` - block quote
* ``f`` - preformatted
* ``~`` - horizontal ruler
* ``T`` - table
* ``(`` - justify left
* ``=`` - justify center
* ``)`` - justify right
* ``j`` - justify full
* ``+`` - increase indent
* ``-`` - decrease indent
 
Default: ``"/*@xbi_.#123p|c,s^vdqf~T(=)j+-"``

## Browser Support

* IE 10+
* Latest Stable: Chrome, Firefox, Opera, Safari

## License

[MIT](./LICENSE)
