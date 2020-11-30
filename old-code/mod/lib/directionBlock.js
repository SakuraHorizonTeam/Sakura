//directionBlock旋转方块库v1.3.1
//本库由 pv糊 开发并开源
//pv糊邮箱 pvpaste@meowcat.org
//pv糊qq 2351579300

LIBRARY({
    name: "directionBlock",
    version: 2,
    shared: true,
    api: "CoreEngine",
});


var  directionBlockAPI = {
	creatBlock : function(blockid , name, bool){
		//blockid应为一个字符串如"coffeeworkshop$coffee"。
        //该方法创建四个空方块，字符串id分别为blockid后面跟一个数字
		//如 BlockID.coffeeworkshop$coffee0
		//以此类推，...1,...2,...3
		//name是方块名称。
		//bool布尔值决定四个方块是否在创造模式中显示
var bqlmi = 0;
for ( bqlmi = 0 ; bqlmi < 4 ; bqlmi += 1 ){
IDRegistry.genBlockID(blockid + bqlmi );
Block.createBlock(blockid + bqlmi , [
{name: name, texture: [["anvil_base", 0]], inCreative: bool}
]);
}
   },
    bundItem : function(itemid,blockid,en){
        //en是一个布尔值，取决于这个方块是否为实体方块
        //itemid是一个数字，如ItemID.coffeeworkshop$coffee
        for (i = 0;i<4;i+=1){
Block.registerDropFunction(BlockID[blockid+i], function(c, d, e, a, b){
 return [[itemid,1,0]];
});
}
Item.registerUseFunction(itemid, function(coords, item, tile){
	var place = coords.relative;
	var angle = Entity.getLookAngle(Player.get()).yaw % (2*Math.PI);
var angleabs = (Entity.getLookAngle(Player.get()).yaw % (2*Math.PI))+2*Math.PI;
if(World.getBlockID(place.x, place.y, place.z) === 0){
if( angle > 0){
	if ( angle  > 1.75*Math.PI || angle < 0.25*Math.PI){
    World.setBlock(place.x, place.y, place.z, BlockID[blockid + "0"]);
    }
    else if (angle  >= 0.25*Math.PI && angle < 0.75*Math.PI){
    World.setBlock(place.x, place.y, place.z, BlockID[blockid + "2"]);
    }
    else if(angle  >= 0.75*Math.PI && angle < 1.25*Math.PI){
    World.setBlock(place.x, place.y, place.z, BlockID[blockid + "1"]);
    }
    else {World.setBlock(place.x, place.y, place.z, BlockID[blockid + "3"]);}
       } 
    else{
   	if ( angleabs  > 1.75*Math.PI || angleabs < 0.25*Math.PI){
    World.setBlock(place.x, place.y, place.z, BlockID[blockid + "0"]);
    }
    else if (angleabs  >= 0.25*Math.PI && angleabs < 0.75*Math.PI){
    World.setBlock(place.x, place.y, place.z, BlockID[blockid + "2"]);
    }
    else if(angleabs  >= 0.75*Math.PI && angleabs < 1.25*Math.PI){
    World.setBlock(place.x, place.y, place.z, BlockID[blockid + "1"]);
    }
    else {World.setBlock(place.x, place.y, place.z, BlockID[blockid + "3"]);}
       } 
    }
		//World.setBlock(place.x, place.y, place.z, blockid);
		if (en === true){World.addTileEntity(place.x, place.y, place.z);}
		Player.setCarriedItem(itemid, item.count - 1, item.data);
}

);
},
	 model:[
	//示范modelArray格式
     [0,14/16,0,1,16/16,1,[["wood", 0], ["wood", 0],
["oak", 0], ["oak", 0],
["oak", 0], ["oak", 0]]],
     [0, 0, 0, 1,2/16, 1,[["wood", 0], ["wood", 0],
["oak", 0], ["oak", 0],
["oak", 0], ["oak", 0]]],
     [5/16, 11/16, 1/16, 11/16,14/16, 11/16,[["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0]]],
     [5/16, 2/16, 11/16, 11/16,14/16, 15/16,[["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0]]],
     [11/16, 2/16, 1/16, 15/16,14/16, 15/16,[["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0]]],
    [1/16, 2/16, 1/16, 5/16,14/16, 15/16,[["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0],
["iron_block", 0], ["iron_block", 0]]],
   [7/16, 9/16, 2/16, 9/16,11/16, 4/16,[["anvil_base", 0], ["anvil_base", 0],
["anvil_base", 0], ["anvil_base", 0],
["anvil_base", 0], ["anvil_base", 0]]]
    ],
	one : function (id,modelArray){
    var render = new ICRender.Model();
    var model =   BlockRenderer.createModel();
    var i;
    for ( i = 0 ; i < modelArray.length ; i += 1 ){
    model.addBox( modelArray[i][0] , modelArray[i][1] , modelArray[i][2] , modelArray[i][3] , modelArray[i][4] , modelArray[i][5] , modelArray[i][6] );
    }
    render.addEntry(model);
    BlockRenderer.setStaticICRender(id, -1 , render);
    },
    two : function (id , modelArray){
    var render = new ICRender.Model();
    var model =   BlockRenderer.createModel();
    var i;
    for ( i = 0 ; i < modelArray.length ; i += 1 ){
    model.addBox(1 - modelArray[i][0] , modelArray[i][1] ,1- modelArray[i][2] ,1- modelArray[i][3] , modelArray[i][4] ,1 - modelArray[i][5] , [modelArray[i][6][0],modelArray[i][6][1],modelArray[i][6][2],modelArray[i][6][3],modelArray[i][6][5], modelArray[i][6][4]]);
    }
    render.addEntry(model);
    BlockRenderer.setStaticICRender(id, -1 , render);
    },
    three : function (id , modelArray){
    var render = new ICRender.Model();
    var model =   BlockRenderer.createModel();
    var i;
    for ( i = 0 ; i < modelArray.length ; i += 1 ){
    model.addBox(1 - modelArray[i][2] , modelArray[i][1] ,1- modelArray[i][0] ,1- modelArray[i][5] , modelArray[i][4] ,1 - modelArray[i][3] , [modelArray[i][6][0],modelArray[i][6][1],modelArray[i][6][4],modelArray[i][6][5],modelArray[i][6][2], modelArray[i][6][3]]);
    }
    render.addEntry(model);
    BlockRenderer.setStaticICRender(id, -1 , render);
    },
    four : function (id , modelArray){
   var render = new ICRender.Model();
    var model =   BlockRenderer.createModel();
    var i;
    for ( i = 0 ; i < modelArray.length ; i += 1 ){
    model.addBox(modelArray[i][2] , modelArray[i][1] ,modelArray[i][0] ,modelArray[i][5] , modelArray[i][4] , modelArray[i][3] , [modelArray[i][6][0],modelArray[i][6][1],modelArray[i][6][4],modelArray[i][6][5],modelArray[i][6][2], modelArray[i][6][3]]);
    }
    render.addEntry(model);
    BlockRenderer.setStaticICRender(id, -1 , render);
    },
    createModel: function(blockid,modelArray){
    //modelArray格式见上面
    this.one(BlockID[blockid+0],modelArray);
    this.two(BlockID[blockid+1],modelArray);
    this.three(BlockID[blockid+2],modelArray);
    this.four(BlockID[blockid+3],modelArray);
    },
    createModel1: function(blockid,modelArray){
    //modelArray格式见上面
    this.one(BlockID[blockid+1],modelArray);
    this.two(BlockID[blockid+0],modelArray);
    this.three(BlockID[blockid+3],modelArray);
    this.four(BlockID[blockid+2],modelArray);
    }
 };

registerAPIUnit("directionBlockAPI", directionBlockAPI);