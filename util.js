var util = {};
(function(){
	var STX = '\u0002',
		ETX = '\u0003';
	var BLOCK_LEVEL_ELEMENTS = new RegExp(
			"/p|div|h[1-6]|blockquote|pre|table|dl|ol|ul"
	        + "|script|noscript|form|fieldset|iframe|math"
	        + "|ins|del|hr|hr/|style|li|dt|dd|thead|tbody"
	        + "|tr|th|td|section|footer|header|group|figure"
	        + "|figcaption|aside|article|canvas|output"
	        + "|progress|video");
	util.HtmlStash = {
		html_counter : 0,
		rawHtmlBlocks : [],
		store : function(html){
			this.rawHtmlBlocks.push(html);
			var placeholder = this.get_placeholder(this.html_counter);
			this.html_counter += 1;
			return placeholder;
		},

		reset : function(){
			this.html_counter = 0;
			this.rawHtmlBlocks = [];
		},

		get_placeholder : function(key){
			return STX+'wzxhzdk:'+key+ETX;
		}
	};

	util.STX = STX;
	util.ETX = ETX;

	util.Processor = {
		init : function(md){
			if(md)
				this.markdown = md;
		}
	}
})();
