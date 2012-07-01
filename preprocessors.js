var prepro = {
	build_preprocessors : function(md){
		var preprocessors = odict.OrderedDict();
		if(md.safeMode != 'escape')
			preprocessors['html_block'] = HtmlBlockPreprocessor(md);
		preprocessors['reference'] = ReferencePreprocessor(md);
		return preprocessors;
	},

	Preprocessor : Object.create(util.Processor,{
		run :{
			value : function(lines){}
		}
	})
};
(function(){
	var right_tag_patterns = ["</%s>", "%s>"],
		attrs_pattern =
			'\\s+([^>"\'/= ]+)=([\'"])(.*?)\2'  // attr="value"
			+'|'                                // OR
			+'\\s+([^>"\'/= ]+)=([^> ]+)'       // attr=value
			+'|'                                // OR
			+'\\s+([^>"\'/= ]+)',               // attr
		left_tag_pattern =
			'^<([^> ]+)'
			+'(('
				+'\\s+([^>"\'/= ]+)=([\'"])(.*?)\3'  // attr="value"
				+'|'                                // OR
				+'\\s+([^>"\'/= ]+)=([^> ]+)'       // attr=value
				+'|'                                // OR
				+'\\s+([^>"\'/= ]+)'
			+')*)'
			+'\\s*/?\\>?',
		attrs_re = new RegExp(attrs_pattern,'g'),
		left_tag_re = new RegExp(left_tag_pattern),
		markdown_in_raw = false;


	function _get_left_tag(block){
		if(left_tag_re.test(block)){
			var tag = RegExp.$1,
				raw_attrs = RegExp.$2,
				attrs = {};
			if(raw_attrs){
				raw_attrs.replace(attrs_re, function(sMathc, _$1, _$2, _$3, _$4, _$5, _$6){
					if(_$1)
						attrs[_$1.trim()] = _$3;
					else if(_$4)
						attrs[_$4.trim()] = _$5;
					else if(_$6)
						attrs[_$6.trim()] = '';
				});
				return [tag, _$1.length, attrs]
			}
		}else{
			var tag = block.substring(1,block.indexOf('>')).toLowerCase();
			return [tag, tag.length+2, {}];
		}
	}

	function _get_right_tag(left_tag, left_index, block){
		var right_tag_patterns = ['</'+left_tag+'>',left_tag+'>'];
		for(var i=0;i<2;i++){
			var tag = right_tag_patterns[i];

		}
	}

	function _recursive_tagfind(ltag, rtag, start_index, block){
		w
	}

	function run(lines){
		var text = lines.join('\n').split('\n\n'),
			new_blocks = [],
			items = [],
			left_tag = '',
			right_tag = '',
			in_tag = false;
		while(text.length){
			var block = text.shift();
			block = block.replace(/^\n{1,2}/m,'');
			if(!in_tag){
				if(block[0] == '<' && block.trim().length>1){
					if(block[1] == '!'){
						left_tag = '--';
						left_index = 2;
						attrs = {}
					}else{
						var data = _get_left_tag(block);
						left_tag = data[0];
						left_index = data[1];
						attrs = data[2];
					}
					var data = _get_left_tag(block);
				}
			}
		}
	}
})();

