LIBRARY({
    name : "BlockBase",
    version : 1.0,
    shared : true,
    api : "CoreEngine",
});

var BlockBase = {
	
};

BlockBase.Block = function(spec){
	var that = {};
	
	that.strId = spec.strId;
	that.intId = BlockID[spec.strId];
	
	
	that.blockType = spec.blockType;
	
	return that;
};
