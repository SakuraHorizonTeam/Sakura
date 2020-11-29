LIBRARY({
	name:"WheatAPI",
	version:1.7,
	shared:false,
	api:"CoreEngine"
});

var canTileBeReplaced = ModAPI.requireGlobal("canTileBeReplaced");

Block.createSpecialType({
	base:59,
    opaque:false,
    destroytime:0
},"crop");

var UIRegistry = {
	dip2px:function(dips){
		return Math.ceil(dips * UI.getContext().getResources().getDisplayMetrics().density);
	},

	getScreenWidth:function(){
		return UI.getContext().getWindowManager().getDefaultDisplay().getWidth();
	},

	getScreenHeight:function(){
		return UI.getContext().getWindowManager().getDefaultDisplay().getHeight();
	},
	
	window:function(state){
		state.background = state.background || "classic_frame_bg_light";
		state.header.close = state.header.close || "classic_close_button";
		state.header.close2 = state.header.close2 || state.header.close;

		var width = UIRegistry.getScreenWidth(),height = UIRegistry.getScreenHeight();

		var drawing = [
			{type:"background",color:android.graphics.Color.TRANSPARENT},
			{type:"frame",x:0,y:0,width:1000,height:750,bitmap:state.background,scale:6}
		]

		for(let i in state.drawing){drawing.push(state.drawing[i]);}
		drawing.push({type:"text",x:30,y:60,text:state.header.text,scale:3,font:{color:android.graphics.Color.BLACK,size:40}});

		var element = {close:{type:"closeButton",x:945,y:25,bitmap:state.header.close,bitmap2:state.header.close2,scale:7}}

		for(let i in state.elements){element[i] = state.elements[i];}
		for(let i = 9;i <= 44;i++){element["invSlot" + i] = {type:"invSlot",x:163 + (i % 9) * 75,y:345 + (i / 9 | 0) * 75,size:80,index:i}}
		
		var ui = UI.Window({
			location:{padding:{left:width / 10,right:width / 10,bottom:(height - 0.6 * width) / 2,top:0}},
			params:{slot:"classic_slot",inv_slot:"classic_slot"},drawing:drawing,elements:element
		});
		
		ui.setInventoryNeeded(true);
		ui.setBlockingBackground(true);

		return ui;
	}
}

var CropRegistry = {
    CROP_ID:{},
    CROP_DATA:{},

	isCrop:function(id){
		for(let count in this.CROP_ID){
			var crop = this.CROP_ID[count];
			if(crop.seed == id || crop.crop == id){
				return true;
			}
		}
		return false;
	},

	createCrop:function(uid,name,texture,data){
		if(!this.isCrop(ItemID[uid])){
			if(data){
				data.farmland = data.farmland || {id:60,data:-1}
				data.growTime = data.growTime || 1200;
				data.growSpeed = data.growSpeed || 1;
				data.growLight = data.growLight || 8;
				data.drop = data.drop || [];
			} else {
				data = {
					farmland:{id:60,data:-1},
					growTime:3600,
					growSpeed:1,
					growLight:8,
					drop:[]
				}
			}

			var crop = texture.crop[0];
			Block.createBlock(uid,[{name:"tile." + uid + ".name",texture:[[crop[0],crop[1]]]}],"crop");
			Item.createItem(uid,name,texture.seed);

			this.CROP_ID[uid] = {seed:ItemID[uid],crop:BlockID[uid]};
			this.CROP_DATA[uid] = {farmland:data.farmland,grow_time:data.growTime,grow_speed:data.growSpeed,grow_light:data.growLight,drop:data.drop}
			
			var shape = new ICRender.CollisionShape();
			shape.addEntry().addBox(1,1,1,0,0,0);
			BlockRenderer.setCustomCollisionShape(BlockID[uid],-1,shape);

			var model = BlockRenderer.createModel();
			model.addBox(0.25,0,0,0.25,1,1,BlockID[uid],0);
			model.addBox(0.75,0,0,0.75,1,1,BlockID[uid],0);
			model.addBox(0,0,0.25,1,1,0.25,BlockID[uid],0);
			model.addBox(0,0,0.75,1,1,0.75,BlockID[uid],0);
			RendererRegistry.initRenderModel(BlockID[uid],-1,model);

			for(var count = 0;count < texture.crop.length;count++){
				var crop = texture.crop[count];

				var model = BlockRenderer.createModel();
				model.addBox(0.25,0,0,0.25,1,1,[[crop[0],crop[1]]]);
				model.addBox(0.75,0,0,0.75,1,1,[[crop[0],crop[1]]]);
				model.addBox(0,0,0.25,1,1,0.25,[[crop[0],crop[1]]]);
				model.addBox(0,0,0.75,1,1,0.75,[[crop[0],crop[1]]]);

				RendererRegistry.registerRenderModel(BlockID[uid],count,model);
			}

			Block.registerDropFunction(uid,function(){
				return [];
			});

			this.registerSeedUseCallback(uid,function(coords,item,block){
				var farmland = CropRegistry.getCropFarmland(uid);
				if(farmland.id == -1 || farmland.id == block.id && (farmland.data == -1 || farmland.data == block.data)){
					var place = coords;
					if(!canTileBeReplaced(block.id,block.data)){
						place = coords.relative,block = World.getBlock(place.x,place.y,place.z);
						if(!canTileBeReplaced(block.id,block.data)){
							return;
						}
					}
					CropRegistry.setCropBlock(place.x,place.y,place.z,uid);
					Player.decreaseCarriedItem(1);
				}
			});

			Callback.addCallback("PreLoaded",function(){
				var speed = CropRegistry.getCropGrowSpeed(uid),time = CropRegistry.getCropGrowTime(uid),light = CropRegistry.getCropGrowLight(uid);

				var tile = TileEntity.getPrototype(BlockID[uid]);
				if(tile){
					var prototype = TileEntity.getPrototype(BlockID[uid]);

					if(prototype.defaultValues){
						prototype.defaultValues.grow_speed = speed;
						prototype.defaultValues.grow_time = time;
						prototype.defaultValues.grow_light = light;
						prototype.defaultValues.grow_progress = 0;
						prototype.defaultValues.grow_count = texture.crop.length - 1;
					} else {
						prototype.defaultValues = {
							grow_speed:speed,
							grow_time:time,
							grow_light:light,
							grow_progress:0,
							grow_count:texture.crop.length - 1
						}
					}

					prototype.$click = prototype.click || function(id,count,data){}
					prototype.$init = prototype.init || function(){};
					prototype.$tick = prototype.tick || function(){};
					prototype.$destroy = prototype.destroy || function(){};

					prototype.CropRender = function(){
						if(this.data.grow_progress >= this.data.grow_time){
							RendererRegistry.mapAtCoords(this.x,this.y,this.z,BlockID[uid],this.data.grow_count);
						} else {
							RendererRegistry.mapAtCoords(this.x,this.y,this.z,BlockID[uid],Math.round(this.data.grow_progress / this.data.grow_time * (this.data.grow_count - 1)));
						}
					}

					prototype.click = function(id,count,data){
						this.$click();
						
						if(id == 351 && data == 15){
							for(var i = 0;i < 16;i++){
								Particles.addFarParticle(Native.ParticleType.happyVillager,this.x + Math.random(),this.y + Math.random(),this.z + Math.random(),0,0,0);
							}
							if(this.data.grow_progress < this.data.grow_time){
								this.data.grow_progress += Math.random() * this.data.grow_time;
								Player.decreaseCarriedItem(1);
							}
						}
					}

					prototype.init = function(){
						this.$init();

						this.CropRender();
					}

					prototype.tick = function(){
						this.$tick();

						this.CropRender();

						var light_level = World.getLightLevel(this.x,this.y + 1,this.z);
						if(light_level >= this.data.grow_light && this.data.grow_progress < this.data.grow_time){
							this.data.grow_progress += this.data.grow_speed;
						}

						var farmland = CropRegistry.getCropFarmland(uid),block = World.getBlock(this.x,this.y - 1,this.z);
						if(block.id != farmland.id){
							this.selfDestroy();
							World.setBlock(this.x,this.y,this.z,0,0);
						}

						if(this.data.grow_progress > this.data.grow_time){this.data.grow_progress = this.data.grow_time;}
					}

					prototype.destroy = function(){
						this.$destroy();
						
						if(this.data.grow_progress < this.data.grow_time){
							World.drop(this.x,this.y,this.z,ItemID[uid],1,0);
						} else {
							var drops = CropRegistry.getCropDrop(uid);
							for(let count = 0;count < drops.length;count++){
								var drop = drops[count];
								if(Math.floor(Math.random() * 100) <= drop[3]){
									World.drop(this.x,this.y,this.z,drop[0],drop[1],drop[2]);
								}
							}
						}

						BlockRenderer.unmapAtCoords(this.x,this.y,this.z);
					}
				} else {
					TileEntity.registerPrototype(BlockID[uid],{
						defaultValues:{
							grow_speed:speed,
							grow_time:time,
							grow_light:light,
							grow_progress:0,
							grow_count:texture.crop.length - 1
						},

						CropRender:function(){
							if(this.data.grow_progress >= this.data.grow_time){
								RendererRegistry.mapAtCoords(this.x,this.y,this.z,BlockID[uid],this.data.grow_count);
							} else {
								RendererRegistry.mapAtCoords(this.x,this.y,this.z,BlockID[uid],Math.round(this.data.grow_progress / this.data.grow_time * (this.data.grow_count - 1)));
							}
						},

						click:function(id,count,data){
							if(id == 351 && data == 15){
								for(var i = 0;i < 16;i++){
									Particles.addFarParticle(Native.ParticleType.happyVillager,this.x + Math.random(),this.y + Math.random(),this.z + Math.random(),0,0,0);
								}
								if(this.data.grow_progress < this.data.grow_time){
									this.data.grow_progress += Math.random() * this.data.grow_time;
									Player.decreaseCarriedItem(1);
								}
							}
						},

						init:function(){
							this.CropRender();
						},

						tick:function(){
							this.CropRender();

							var light_level = World.getLightLevel(this.x,this.y + 1,this.z);
							if(light_level >= this.data.grow_light && this.data.grow_progress < this.data.grow_time){
								this.data.grow_progress += this.data.grow_speed;
							}
	
							var farmland = CropRegistry.getCropFarmland(uid),block = World.getBlock(this.x,this.y - 1,this.z);
							if(block.id != farmland.id){
								this.selfDestroy();
								World.setBlock(this.x,this.y,this.z,0,0);
							}

							if(this.data.grow_progress > this.data.grow_time){this.data.grow_progress = this.data.grow_time;}
						},

						destroy:function(){
							if(this.data.grow_progress < this.data.grow_time){
								World.drop(this.x,this.y,this.z,ItemID[uid],1,0);
							} else {
								var drops = CropRegistry.getCropDrop(uid);
								for(let count = 0;count < drops.length;count++){
									var drop = drops[count];
									if(Math.floor(Math.random() * 100) <= drop[3]){
										World.drop(this.x,this.y,this.z,drop[0],drop[1],drop[2]);
									}
								}
							}

							BlockRenderer.unmapAtCoords(this.x,this.y,this.z);
						}
					});
				}
				
			});
		} else {
			Logger.Log("This crop: [" + name + "] already been registered.","CROP/ERROR");
		}
	},

	getCropUID:function(id){
		for(let count in this.CROP_ID){
			var crop = this.CROP_ID[count];
			if(crop.seed == id || crop.crop == id){
				return count;
			}
		}
		return null;
	},

	getCropData:function(uid){
		if(this.isCrop(ItemID[uid])){
			return this.CROP_DATA[uid];
		}
	},

	getCropGrowSpeed:function(uid){
        var crop = this.getCropData(uid);
		return crop.grow_speed;
	},

	getCropDrop:function(uid){
        var crop = this.getCropData(uid);
		return crop.drop;
	},
	
	getCropGrowTime:function(uid){
        var crop = this.getCropData(uid);
		return crop.grow_time;
	},

	getCropGrowLight:function(uid){
        var crop = this.getCropData(uid);
		return crop.grow_light;
	},

	getCropFarmland:function(uid){
        var crop = this.getCropData(uid);
		return crop.farmland;
	},

	setCropFarmland:function(uid,id,data){
        if(!data){data = 0;}
		if(this.isCrop(ItemID[uid])){
            var crop = this.getCropData(uid);
			crop.farmland = {id:id,data:data}
		}
	},

	registerSeedUseCallback:function(uid,state){
		if(this.isCrop(ItemID[uid])){
			Callback.addCallback("SeedUse",function(coords,item,block){
				if(item.id == ItemID[uid]){
					state(coords,item,block);
				}
			});
		}
	},

	setCropBlock:function(x,y,z,uid){
		var block = World.getBlock(x,y - 1,z);
		var farmland = CropRegistry.getCropFarmland(uid);
		if(farmland.id == -1 || farmland.id == block.id && (farmland.data == -1 || farmland.data == block.data)){
			World.setBlock(x,y,z,BlockID[uid],0);
			World.addTileEntity(x,y,z);
		}
	}
}

var GameRegistry = {
    LOOT_POOL:[],
    GRASS_DROP:[],
	VANILLA_LOOT:false,

    getLootPool:function(){
        return this.LOOT_POOL;
    },

    addLoot:function(id,count,data){
        if(!data){data = 0;}
        this.LOOT_POOL.push([id,count,data]);
    },

    getLootExists:function(id,count,data){
        if(!data){data = 0;}
        for(let i in this.LOOT_POOL){
            let loot = this.LOOT_POOL[i];
            if(loot[0] == id && loot[1] == count && loot[2] == data){
                return true;
            }
        }
        return false;
    },
    
    removeLoot:function(id,count,data){
        if(!data){data = 0;}
        for(let i in this.LOOT_POOL){
            let loot = this.LOOT_POOL[i];
			if(loot[0] == id && loot[1] == count && loot[2] == data){
                delete this.LOOT_POOL[i];
            }
        }
    },

	removeVanillaLoot:function(){
		this.VANILLA_LOOT = true;
	},

    removeAllLoot:function(){
        for(let i in this.LOOT_POOL){
            delete this.LOOT_POOL[i];
        }
    },

    addGrassDrop:function(id,count,data){
        if(!data){data = 0;}
		this.GRASS_DROP.push([id,count,data]);
	},
	
	removeGrassDrop:function(id,count,data){
        if(!data){data = 0;}
        for(let i in this.GRASS_DROP){
            let drop = this.GRASS_DROP[i];
            if(drop[0] == id && drop[1] == count && drop[2] == data){
                delete this.GRASS_DROP[i];
            }
        }
    },

	removeGrassAllDrop:function(){
		for(let i in this.GRASS_DROP){
            delete this.GRASS_DROP[i];
        }
	},

    getSetting:function(data){
		var dir = "games/com.mojang/minecraftpe/options.txt";
		return FileTools.ReadKeyValueFile(dir)[data];
	},

	getLanguage:function(){
		return this.getSetting("game_language");
	},

	getUIProfile:function(){
		return this.getSetting("gfx_ui_profile");
	}
}

var ItemRegistry = {
    TOOLTIP:{},

	getTooltip:function(id){
		return this.TOOLTIP[id]?this.TOOLTIP[id]:"";
	},

	addTooltip:function(id,tooltip,colour){
		if(!colour){colour = "§7";}

        if(!this.getTooltip(id)){
            this.TOOLTIP[id] = "\n" + colour + tooltip + "§n"
        } else {
            this.TOOLTIP[id] += "\n" + colour + tooltip + "§n";
        }
        
        this.setItemName(id,function(item,name,tooltip){
            return name + tooltip;
        });
	},

	setItemName:function(id,state){
		Item.registerNameOverrideFunction(id,function(item,name){
			var item = Player.getCarriedItem(),tooltip = ItemRegistry.getTooltip(id);
            return state(item,name,tooltip);
        });
	},

	registerFoodEatenCallback:function(id,state){
		Callback.addCallback("FoodEaten",function(heal,satRatio){
			var item = Player.getCarriedItem();
			if(item.id == id){
				state(item,heal,satRatio);
			}
		});
	},

	registerItemAttackCallback:function(id,state,isPlayer){
		Callback.addCallback(isPlayer?"PlayerAttack":"EntityHurt",function(attacker,victim,damage){
			var item = Player.getCarriedItem();
			if(item.id == id){
				state(attacker,victim,damage);
			}
		});
	},

	setItemForAnimation:function(id,texture,time){
		if(!time){time = 20;}
		Item.registerIconOverrideFunction(id,function(item,name){
			var thread = World.getThreadTime();
			var tick = Math.round(Math.round(thread / time) % texture.length);
			return {name:texture[tick][0],meta:texture[tick][1]}
		});
	}
}

var WorldRegistry = {
	isLootChest:function(x,y,z){
        var block = World.getBlock(x,y,z);
		if(block.id == 54){
			return PlayerRegistry.PLAYER_PLACE_CHEST[x + ":" + y + ":" + z]?false:true;
		}
		return false;
	}
}

var PlayerRegistry = {
    PLAYER_PLACE_CHEST:[],

    getInventoryItemCount:function(id,data){
        if(!data){data = 0;}
		var count = 0;
		for (var slot = 8;slot <= 48;slot++){
			var inventory = Player.getInventorySlot(slot);
			if (inventory.id == id && (data == -1 || inventory.data == (data || 0))){
				count += inventory.count;
			}
		}
		return count;
	},

	getSneaking:function(){
		var player = Player.get();
		return Entity.getSneaking(player);
	},

	addEffect:function(id,level,time){
		var player = Player.get();
		Entity.addEffect(player,id,level,time);
	}
}

var RendererRegistry = {
    RENDER_MODEL:{},

	initRenderModel:function(id,data,model){
		if(!this.RENDER_MODEL[id]){this.RENDER_MODEL[id] = {};}

		var render = new ICRender.Model();
		render.addEntry(model);
		BlockRenderer.enableCoordMapping(id,(data?data:-1),render);
	},

	registerRenderModel:function(id,data,model){
		if(!this.RENDER_MODEL[id]){this.initRenderModel(id,data,model);}

		var render = new ICRender.Model();
		render.addEntry(model);
		this.RENDER_MODEL[id][data] = render;
	},

	getRenderModel:function(id,data){
		var renderer = this.RENDER_MODEL[id];
		if(renderer){
			return renderer[data];
		}
		return 0;
	},

	mapAtCoords:function(x,y,z,id,data){
		var render = this.getRenderModel(id,data);
		if(render){
			BlockRenderer.mapAtCoords(x,y,z,render);
		}
	}
}

IDRegistry.genCropID = function(uid){
	IDRegistry.genBlockID(uid);
	IDRegistry.genItemID(uid);
}

Callback.addCallback("EntityDeath",function(entity){
	let player = Player.get();
	if(entity == player){
		Callback.invokeCallback("PlayerDeath",entity);
	}
});

Callback.addCallback("tick",function(){
	var coords = Player.getPosition();
	if(PlayerRegistry.getSneaking()){
		Callback.invokeCallback("PlayerSneaking",coords);
	}
});

Callback.addCallback("DestroyBlock",function(coords,block,player){
	if(CropRegistry.isCrop(block.id)){
		Callback.invokeCallback("DestroyCrop",coords,block,player);
	}
	if(WorldRegistry.isLootChest(coords.x,coords.y,coords.z)){
		Callback.invokeCallback("DestroyLootChest",coords,block,player);
	}
});

Callback.addCallback("ItemUse",function(coords,item,block){
	if(CropRegistry.isCrop(item.id)){
		Callback.invokeCallback("SeedUse",coords,item,block);
	}
});

Callback.addCallback("EntityHurt",function(attacker,victim,damage){
	if(attacker == Player.get()){
		Callback.invokeCallback("PlayerAttack",attacker,victim,damage);
	}

	if(victim == Player.get()){
		Callback.invokeCallback("PlayerHurt",attacker,victim,damage);
	}
});

Saver.addSavesScope("WheatAPI",
	function read(scope){
    	PlayerRegistry.PLAYER_PLACE_CHEST = scope.PLAYER_PLACE_CHEST || {};
    },
    function save(){
        return {
            PLAYER_PLACE_CHEST:PlayerRegistry.PLAYER_PLACE_CHEST
        }
    }
);

GameRegistry.addGrassDrop(295,1,0);

Block.registerDropFunctionForID(31,function(coords,id,data,level,enchant){
	var grass = GameRegistry.GRASS_DROP;
	if(data == 0){
		if(enchant.silk){return [[id,1,data]];}
		if(Math.floor(Math.random()*100) <= 25){return [[280,1,0]];}
		return [];
	} else if(data == 1){
		if(enchant.silk){return [[id,1,data]];}
		if(Math.floor(Math.random()*100) <= 25){return [grass[Math.floor(Math.random() * grass.length)]];}
		return [];
	} else if(data == 2){
		if(enchant.silk){return [[id,1,data]];}
		return [];
	}
});

function LootChest(x,y,z){
    let chest = WorldRegistry.isLootChest(x,y,z);
    if(chest){
		let container = World.getContainer(x,y,z);
		if(GameRegistry.VANILLA_LOOT){
			for(let i = 0;i < container.getSize();i++){
				container.setSlot(i,0,0,0);
			}
		}

		let loots = GameRegistry.LOOT_POOL;
		if(loots.length > 0){
			// Debug.message("Loot Chest");
			let count = Math.floor(Math.random() * container.getSize());
			for(let i = 0;i < count;i++){
				let slot = Math.min(27,Math.floor(Math.random() * container.getSize()));
				let loot = loots[Math.floor(Math.random() * loots.length)];
				if(container.getSlot(slot).id == 0){
					container.setSlot(slot,loot[0],loot[1],loot[2]);
				}
			}
		}
		PlayerRegistry.PLAYER_PLACE_CHEST[x + ":" + y + ":" + z] = true;
    }
}

Callback.addCallback("ItemUse",function(coords,item,block){
    let relative = coords.relative;
	if(item.id == 54){
        PlayerRegistry.PLAYER_PLACE_CHEST[relative.x + ":" + relative.y + ":" + relative.z] = true;
	}

	let Directions = [[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]];
	for(let i in Directions){
		let dir = Directions[i],block = World.getBlock(coords.x + dir[0],coords.y + dir[1],coords.z + dir[2]);
		LootChest(coords.x + dir[0],coords.y + dir[1],coords.z + dir[2]);
	}
	
    LootChest(coords.x,coords.y,coords.z);
});

Callback.addCallback("DestroyBlock",function(coords,block,player){
	let Directions = [[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]];
	for(let i in Directions){
		let dir = Directions[i],block = World.getBlock(coords.x + dir[0],coords.y + dir[1],coords.z + dir[2]);
		LootChest(coords.x + dir[0],coords.y + dir[1],coords.z + dir[2]);
	}
	
	LootChest(coords.x,coords.y,coords.z);
});

Callback.addCallback("DestroyBlock",function(coords,block,player){
	if(block.id == 54){
		if(PlayerRegistry.PLAYER_PLACE_CHEST[coords.x + ":" + coords.y + ":" + coords.z]){
			delete PlayerRegistry.PLAYER_PLACE_CHEST[coords.x + ":" + coords.y + ":" + coords.z];
		}
	}
});

EXPORT("wheat",{
    ui:UIRegistry,
    crop:CropRegistry,
    game:GameRegistry,
    item:ItemRegistry,
    world:WorldRegistry,
    player:PlayerRegistry,
    renderer:RendererRegistry,

    requireGlobal:function(command){
		return eval(command);
	}
});