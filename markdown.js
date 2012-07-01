var Markdown = (function(){
	var doc_tag = "div",
		ESCAPED_CHARS = ['\\', '`', '*', '_', '{', '}', '[', ']','(', ')', '>', '#', '+', '-', '.', '!'],
		_md = {},
		lines;
	/**
	 * Cribbed from a post by Bart Lateur:
	 * <http://www.nntp.perl.org/group/perl.macperl.anyperl/154>
	 */
	function _Detab(text){
	    /**
	     * get the length of the string( the size of bytes)
	     */
	    function getByteLength(source) {
	        return String(source).replace(/[^\x00-\xff]/g, "ci").length;
	    }

	    text = text.replace(
	        /(.*?)\t/g,
	        function(sMatch, _$1){
	            return _$1 + (new Array(g_tab_width - getByteLength(_$1)%g_tab_width+1)).join(" ");
	        }
	    );
	    return text;
	}
	function markdown(txt){
	}

	_md.preprocessors = build_preprocessors();
	_md.parser = build_block_parser();
	_md.inlinePatterns = build_inlinepatterns();
	_md.treeprocessors = build_treeprocessors();
	_md.postprocessors = build_postprocessors();
	_md.references = {};
	_md.htmlStash = util.HtmlStash;
	_md.reset = function(){
		this.htmlStash.reset();
		this.references = {};
	};
	function convert(source){
		if(!source.trim())
			return '';
		source = source
				.replace(util.STX, '')
				.replace(util.ETX, '')
				.replace("\r\n", "\n")
				.replace("\r", "\n")
				.replace(/\n\s+\n/g, '\n\n')
				+ "\n\n";
		source = _Detab(source);

		//Split into lines and run the line preprocessors.
		lines = source.split('\n');


	}

	return _md;
})();
