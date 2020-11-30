/// <reference path = "../TileEntity/Pot.ts" /> 

namespace Sakura{
    export class Campfire{
        constructor(){
            Block.createSpecialType({	
                base: 50, rendertype: 2,translucency: 1, lightopacity: 0, lightlevel: 8
            }, "torch");

            IDRegistry.genBlockID(Main.MODID + ".campfire_idle");
            Block.createBlock(Main.MODID + ".campfire_idle",[
                {
                    name:Main.blockResource.getLang("en_us")["tile.sakura.campfire_idle.name"],textures: [["sakura_log", 0]],inCreative: true
                }
            ]);

            IDRegistry.genBlockID(Main.MODID + ".campfire_lit");
            Block.createBlock(Main.MODID + ".campfire_lit",[
                {
                    name:Main.blockResource.getLang("en_us")["tile.sakura.campfire_lit.name"],textures: [["sakura_log", 0]],inCreative: false
                }
            ],"torch");

            Translation.addTranslation(Main.blockResource.getLang("en_us")["tile.sakura.campfire_idle.name"],{
                zh : Main.blockResource.getLang("zh_cn")["tile.sakura.campfire_idle.name"]
            });

            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(Main.MODID + ".campfire_idle",-1,"campfire");
            

           

            Block.registerDropFunction(Main.MODID + ".campfire_lit",function(){
                return [[
                    BlockID[Main.MODID + ".campfire_idle"],1,0
                ]];
            });

            Callback.addCallback("DestroyBlock",function(coords: Callback.ItemUseCoordinates, block: Tile, player: number){
                let tileEntity = World.getTileEntity(coords.x,coords.y,coords.z);
                if (block.id ===  BlockID[Main.MODID + ".campfire_lit"] || block.id ===  BlockID[Main.MODID + ".campfire_idle"]) {
                    tileEntity && tileEntity.selfDestroy();                
                }
            });

            Translation.addTranslation(Main.blockResource.getLang("en_us")["tile.sakura.campfire_lit.name"],{
                zh : Main.blockResource.getLang("zh_cn")["tile.sakura.campfire_lit.name"]
            });

            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(Main.MODID + ".campfire_lit",-1,"campfire_lit");

            IDRegistry.genBlockID(Main.MODID + ".pot");
            Block.createBlock(Main.MODID + ".pot",[
                {
                    name:"Pot",textures: [["cauldron_top", 0]],inCreative: false
                }
            ]);

            Block.setDestroyTime(Main.MODID + ".pot",999999999);
            Block.registerDropFunction(Main.MODID + ".pot",function(){
                return [];
            });

            let render = new BlockModel(FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/pot" + ".json"), {}).get();
            
            BlockRenderer.enableCoordMapping(BlockID[Sakura.Main.MODID + ".pot"], 0, render);
            Block.setBlockShape(BlockID[Main.MODID + ".pot"],{
                x:0,y:0,z:0
            },{
                x:0,y:0,z:0
            },-1);
            TileEntity.registerPrototype(BlockID[Sakura.Main.MODID + ".pot"],{
                tick:function(){
                    if(World.getBlock(this.x,this.y - 1,this.z)){
                        
                        if(World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[Main.MODID + ".campfire_lit"] && World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[Main.MODID + ".campfire_idle"]){
                            World.destroyBlock(this.x,this.y,this.z,false)
                            World.removeTileEntity(this.x,this.y,this.z);
                        }
                    }
                    
                },
                click:function(){
                    alert(Item.getName(World.getBlock(this.x,this.y - 1,this.z).id,World.getBlock(this.x,this.y - 1,this.z).data));
                    if(World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[Main.MODID + ".campfire_lit"] && World.getBlock(this.x,this.y - 1,this.z).id !== BlockID[Main.MODID + ".campfire_idle"]){
                        World.destroyBlock(this.x,this.y,this.z,false)
                        World.removeTileEntity(this.x,this.y,this.z);
                        alert("error");
                    }
                }
            });
            Callback.addCallback("ItemUse",function(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, isExternal: boolean | undefined){
                if(block.id === BlockID[Main.MODID + ".pot"]){
                    let tileEntity = World.getTileEntity(coords.x,coords.y - 1,coords.z);
                    if(tileEntity){
                        Game.prevent();
                        tileEntity.onItemClick(item.id,item.count,item.data,coords);
                    }
                }
            });

            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(Main.MODID + ".pot",0,"pot");

            IDRegistry.genItemID(Main.MODID + ".cooking_pot");
            Item.createItem(Main.MODID + ".cooking_pot",Main.itemResource.getLang("en_us")["item." + Main.MODID + ".cooking_pot" + ".name"],{
                name : Main.itemResource.getTexture(Main.MODID + ".cooking_pot"),
                meta : 0
            },{
                stack : 1
            });

            Translation.addTranslation(Main.blockResource.getLang("en_us")["item." + Main.MODID + ".cooking_pot" + ".name"],{
                zh : Main.itemResource.getLang("zh_cn")["item." + Main.MODID + ".cooking_pot" + ".name"]
            });
            new Pot();
        }
    }
}