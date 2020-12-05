import ModConfig from "../ModConfig/ModConfig";
import Resource from "../Resource/Resource";
import Pot from "../TileEntity/Pot";

    export class Campfire{
        constructor(){
            Block.createSpecialType({	
                base: 50, rendertype: 2,translucency: 1, lightopacity: 0, lightlevel: 8
            }, "torch");

            IDRegistry.genBlockID(ModConfig.MODID + ".campfire_idle");
            Block.createBlock(ModConfig.MODID + ".campfire_idle",[
                {
                    name:Resource.blockResource.getLang("en_us")["tile.sakura.campfire_idle.name"],texture: [["sakura_log", 0]],inCreative: true
                }
            ]);

            IDRegistry.genBlockID(ModConfig.MODID + ".campfire_lit");
            Block.createBlock(ModConfig.MODID + ".campfire_lit",[
                {
                    name:Resource.blockResource.getLang("en_us")["tile.sakura.campfire_lit.name"],texture: [["sakura_log", 0]],inCreative: false
                }
            ],"torch");

            Translation.addTranslation(Resource.blockResource.getLang("en_us")["tile.sakura.campfire_idle.name"],{
                zh : Resource.blockResource.getLang("zh_cn")["tile.sakura.campfire_idle.name"]
            });

            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(ModConfig.MODID + ".campfire_idle",-1,"campfire");
            

           

            Block.registerDropFunction(ModConfig.MODID + ".campfire_lit",function(){
                return [[
                    BlockID[ModConfig.MODID + ".campfire_idle"],1,0
                ]];
            });

            Callback.addCallback("DestroyBlock",function(coords: Callback.ItemUseCoordinates, block: Tile, player: number){
                let tileEntity = World.getTileEntity(coords.x,coords.y,coords.z);
                if (block.id ===  BlockID[ModConfig.MODID + ".campfire_lit"] || block.id ===  BlockID[ModConfig.MODID + ".campfire_idle"]) {
                    tileEntity && tileEntity.selfDestroy();                
                }
            });

            Translation.addTranslation(Resource.blockResource.getLang("en_us")["tile.sakura.campfire_lit.name"],{
                zh : Resource.blockResource.getLang("zh_cn")["tile.sakura.campfire_lit.name"]
            });

            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(ModConfig.MODID + ".campfire_lit",-1,"campfire_lit");

            IDRegistry.genBlockID(ModConfig.MODID + ".pot");
            Block.createBlock(ModConfig.MODID + ".pot",[
                {
                    name:"Pot",texture: [["cauldron_top", 0]],inCreative: false
                }
            ]);

            Block.setDestroyTime(ModConfig.MODID + ".pot",999999999);
            Block.registerDropFunction(ModConfig.MODID + ".pot",function(){
                return [];
            });

            let render = new BlockModel(FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/pot" + ".json"), {}).get();
            
            BlockRenderer.enableCoordMapping(BlockID[ModConfig.MODID + ".pot"], 0, render);
            Block.setBlockShape(BlockID[ModConfig.MODID + ".pot"],{
                x:0,y:0,z:0
            },{
                x:0,y:0,z:0
            },-1);
            TileEntity.registerPrototype(BlockID[ModConfig.MODID + ".pot"],{
                tick:function(){
                    if(World.getBlock(this.x,this.y - 1,this.z)){
                        
                        if(World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[ModConfig.MODID + ".campfire_lit"] && World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[ModConfig.MODID + ".campfire_idle"]){
                            World.destroyBlock(this.x,this.y,this.z,false)
                            World.removeTileEntity(this.x,this.y,this.z);
                        }
                    }
                    
                },
                click:function(){
                    alert(Item.getName(World.getBlock(this.x,this.y - 1,this.z).id,World.getBlock(this.x,this.y - 1,this.z).data));
                    if(World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[ModConfig.MODID + ".campfire_lit"] && World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[ModConfig.MODID + ".campfire_idle"]){
                        World.destroyBlock(this.x,this.y,this.z,false)
                        World.removeTileEntity(this.x,this.y,this.z);
                        alert("error");
                    }
                }
            });
            Callback.addCallback("ItemUse",function(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, isExternal: boolean | undefined){
                if(block.id === BlockID[ModConfig.MODID + ".pot"]){
                    let tileEntity = World.getTileEntity(coords.x,coords.y - 1,coords.z);
                    if(tileEntity){
                        Game.prevent();
                        tileEntity.onItemClick(item.id,item.count,item.data,coords);
                    }
                }
            });

            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(ModConfig.MODID + ".pot",0,"pot");

            IDRegistry.genItemID(ModConfig.MODID + ".cooking_pot");
            Item.createItem(ModConfig.MODID + ".cooking_pot",Resource.itemResource.getLang("en_us")["item." + ModConfig.MODID + ".cooking_pot" + ".name"],{
                name : Resource.itemResource.getTexture(ModConfig.MODID + ".cooking_pot"),
                meta : 0
            },{
                stack : 1
            });

            Translation.addTranslation(Resource.blockResource.getLang("en_us")["item." + ModConfig.MODID + ".cooking_pot" + ".name"],{
                zh : Resource.itemResource.getLang("zh_cn")["item." + ModConfig.MODID + ".cooking_pot" + ".name"]
            });
            new Pot();
        }
    }