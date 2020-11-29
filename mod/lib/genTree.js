//库作者pv糊
//现在可以很好地完成小型树的生成了。
LIBRARY({
    name : "genTree",
    version : 1.1,
    shared : true,
    api : "CoreEngine",
});

var imp = JavaImporter();
imp.importPackage(Packages.java.util);
//imp.importPackage(Packages.com.google.common.collect.Lists);



var genAPI = {

};

genAPI.rand = {
	nextInt : function(i){//int (int i)  [随机生成一个大于等于0，小于i的整数]
		//var min = 0,max = i;
		//return Math.floor(Math.random() * (max - min)) + min;
		var rand = new imp.Random();
		return rand.nextInt(i);
	}
};

genAPI.minecraft = {
	isAir : function(block){//Boolean (Object {int id,int data})
		if(block.id > 0){
			return false;
		}
		return true;
	},
	isLeaves : function(block){
		if(block.id === 18){
			return true;
		}
		return false;
	},
	isWood : function(block){
		if(block.id === 17){
			return true;
		}
		return false;
	},
	canGrowInto : function(block){
    
	},
	canSuistainPlant : function(block){//Boolean (Object {int id,int data})
		if(block.id === 2 || block.id === 3){
			return true;
		}
		return false;
	},
	up : function(position,t){
		return {
			x : position.x,
			y : position.y - t,
			z : position.z
		};
	},
	foliageCoordinates : function(spec){
		var that = {
			
		};
		
		that.x = spec.position.x;
		that.y = spec.position.y;
		that.z = spec.position.z;
		var branchBase = spec.branchBase;//int
		
		that.getX = function(){
			return this.x;
		};
		that.getY = function(){
			return this.y;
		};
		that.getZ = function(){
			return this.z;
		};
		that.getBranchBase = function(){
			return branchBase;
		};
		
		return that;
	}
};

genAPI.tree = function(spec){//Boolean (Object {leaves,wood,minTreeHeight})
	var that = {
		
	};

	var leaves = spec.leaves;//Object {int id,int data} 树叶
	var wood  = spec.wood;//Object {int id,int data} 树干
	var minTreeHeight = spec.minTreeHeight;//int 树的最小高度
	
	that.isReplaceable = function(block){//Boolean (Object {int id,int data})
    if(block.id === 31 || block.id === 37 || block.id === 38 || block.id <= 0){
      return true;
    }
    return false;
	};
	
	that.generate = function(position){//Boolean (Object {int x,int y,int z} 树根的位置)
		//Debug.message("try");
		var isReplaceable = true;
		var height = minTreeHeight + genAPI.rand.nextInt(3);
		var x,y,z,downBlock,downPos,upBlock,upPos;
		
		downPos = {
			x : position.x,
			y : position.y - 1,
			z : position.z
		};
		
		downBlock = World.getBlock(downPos.x,downPos.y,downPos.z);
		
		Callback.invokeCallback("TreeTryGrow",this,position);
		//Debug.message("height:" + minTreeHeight);
		
		//检查所有方块可替换
		if(position.y >= 1 && position.y + height + 1 <= 256){
			for(y = position.y;y <= position.y + height +1; ++y){
				let xzSize = 1;
				
				//底端
				if(y === position.y){
					xzSize = 0;
				}
				
				//顶端
				if(y >= position.y + height -1){
					xzSize = 2;
				}
				for(x = position.x - xzSize;x <= position.x + xzSize && isReplaceable; ++x){
					for(z = position.z - xzSize;z <= position.z + xzSize && isReplaceable; ++z){
						if(y >= 0 && y < 256){
							if(!this.isReplaceable(World.getBlock(x, y, z))){
                				isReplaceable = false;
                				return isReplaceable;
							}
						}
						else{
              					isReplaceable = false;
              					return isReplaceable;
						}
					}
				}
			}
			
			//Debug.message("isReplaceable:" + isReplaceable);
			if(!isReplaceable){
				return false;
			}
			else{
				if(genAPI.minecraft.canSuistainPlant(downBlock) && position.y < 256 - height - 1){
					Callback.invokeCallback("TreeGrow",this,position);
					
					//生成叶子
					for(y = position.y + height -3;y <= position.y + height; ++y){
						let restHeight = y - (position.y + height);
						let xzSize = Math.floor(1 - restHeight / 2);
						
						for(x = position.x - xzSize;x <= position.x + xzSize; ++x){
							let xOffset = x - position.x;
							
							for(z = position.z - xzSize;z <= position.z + xzSize; ++z){
								let zOffset = z - position.z;
								
								 if (   Math.abs(xOffset) != xzSize
                                    || Math.abs(zOffset) != xzSize // 不在边缘4个点
                                    || genAPI.rand.nextInt(2) != 0
                                    && restHeight != 0){
										let block = World.getBlock(x, y, z);
										if(this.isReplaceable(block)){
											 World.setBlock(x, y, z, this.getLeaves().id, this.getLeaves().data); 
										}
									}
							}
						}
					}
					
					//生成木头
					for(y = position.y;y < position.y + height; ++y){
						//Debug.message(y);
		
						let nowBlock = World.getBlock(position.x,y,position.z);
		
						if(this.isReplaceable(nowBlock)){
							 World.setBlock(position.x, y, position.z, this.getWood().id, this.getWood().data); 
						}
					}
					return true;
				}
				else{
					return false;
				}
			}
		}
		else{
			return false;
		}
	};
	
	that.getLeaves = function(){//Object {int id,int data}
		return leaves;
	};
	that.getWood = function(){//Object {int id,int data}
		return wood;
	};
	that.getMinTreeHeight = function(){//int
		return minTreeHeight;
	};
	
	return that;
};

genAPI.bigTree = function(spec){
	var that = genAPI.tree(spec);
	that.heightAttenuation = spec.heightAttenuation;//double 高度衰减
	that.branchSlope = spec.branchSlope;//double
	that.leafDensity = spec.leafDensity;//double 叶密度
	that.scaleWidth = spec.scaleWidth;//double
	that.heightLimit = spec.heightLimit;//int
	that.leafDistanceLimit = spec.leafDistanceLimit;//int
	that.foliageCoords = imp.ArrayList();
	that.basePos = {
		x : 0,
		y : 0,
		z : 0
	};
	that.height = null;
	
	var rand = null;
	
	that.layerSize = function(y){//float (int)
		if (y < this.heightLimit * 0.3){
            return -1.0;
        }
		
		var f = this.heightLimit / 2.0;
		var f1 = f - y;
		var f2 = Math.pow(f * f - f1 * f1,0.5);
		
		if (f1 == 0.0){
		    f2 = f;
		}
		else if (Math.abs(f1) >= f){
		    return 0.0;
		}
		
		return f2 * 0.5;
	};
	
	that.leafSize = function(y){//float (int)
		if (y >= 0 && y < this.leafDistanceLimit){
            return y != 0 && y != this.leafDistanceLimit - 1 ? 3.0 : 2.0;
        }
		return -1.0;
	};
	
	var getGreatestDistance = function(posln){
		var i = Math.abs(posln.x);
		var j = Math.abs(posln.y);
		var k = Math.abs(posln.z);
		
		if(k > i && k > j){
            return k;
        }
		return j > i ? j : i;
	};
	
	that.checkBlockLine = function(posOne,posTwo){
    	var blockPos = {
			x : -posOne.x,
			y : -posOne.y,
			z : -posOne.z
    	};
		var i = getGreatestDistance(blockPos);
		var f = blockPos.x / i;
		var f1 = blockPos.y / i;
		var f2 = blockPos.z / i;
		
		if (i == 0){
            return -1;
        }
		for (let j = 0; j <= i; ++j){
			let blockPos1 = {
				x : 0.5 + j * f,
				y : 0.5 + j * f1,
				z : 0.5 + j * f2
			};
			
			if (!this.isReplaceable(World.getBlock(blockPos.x,blockPos.y,blockPos.z))){
		        return j;
		    }
		}
		
		return -1;
	};
	
	that.setDecorationDefaults = function(){
		this.leafDistanceLimit = 5;
	};
	
	that.generateLeafNodeList = function(){//void
		this.height = Math.floor(this.heightLimit * this.heightAttenuation);
		
		if(this.height >= this.heightLimit){
			this.height = this.heightLimit - 1;
		}
		
		var i = Math.floor(1.382 + Math.pow(this.leafDensity * this.heightLimit / 13.0, 2.0));

        if (i < 1){
            i = 1;
        }
		
		var j = this.basePos.y + this.height;
		var basePos = this.basePos;
		var k = this.heightLimit - this.leafDistanceLimit;
		
		this.foliageCoords.add(genAPI.minecraft.foliageCoordinates({
			position : genAPI.minecraft.up(basePos,k),
			branchBase : j
		}));
		
		for (; k >= 0; --k){
			let f = this.layerSize(k);
			
			if (f >= 0.0){
				for (let l = 0; l < i; ++l){
					let d0 = this.scaleWidth * f * (rand.nextFloat() + 0.328);
					let d1 = rand.nextFloat() * 2.0 * Math.PI;
					let d2 = d0 * Math.sin(d1) + 0.5;
                    let d3 = d0 * Math.cos(d1) + 0.5;
					let blockPos = {
						x : d2,
						y : k - 1,
						z : d3
					};
					let blockPos1 = genAPI.minecraft.up(blockPos,this.leafDistanceLimit);
				}
			}
		}
	};
	
	return that;
};

registerAPIUnit("genAPI", genAPI);
