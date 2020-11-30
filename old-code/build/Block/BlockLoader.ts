/// <reference path = "../Generation/Campfire.ts" /> 

namespace Sakura{
    export class BlockLoader{
        constructor(){
            IDRegistry.genBlockID(Main.MODID + ".sakura_log");
            Block.createBlock(Main.MODID + ".sakura_log",[
                {
                    name:Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    textures: [["sakura_log_top", 0],["sakura_log_top", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log", 0]],
                    inCreative: true
                },
                {
                    name:Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    textures: [["sakura_log", 0],["sakura_log", 0],["sakura_log_top", 0],["sakura_log_top", 0],["sakura_log", 0],["sakura_log", 0]],
                    inCreative: false
                },
                {
                    name:Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    textures: [["sakura_log", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log_top", 0],["sakura_log_top", 0]],
                    inCreative: false
                }
            ],"opaque");

            Translation.addTranslation(Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],{
                zh : Main.blockResource.getLang("zh_cn")["tile.sakura.sakura_log.name"]
            });
            Callback.addCallback("ItemUse",function(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, isExternal: boolean | undefined){
                if(item.id === BlockID[Main.MODID + ".sakura_log"]){
                    if((coords.side === Native.BlockSide.UP || coords.side === Native.BlockSide.DOWN) && PlayerManager.canPlaceBlock({
                        x:coords.x,
                        y:coords.y + coords.side * 2 - 1,
                        z:coords.z
                    })){
                        World.setBlock(coords.x,coords.y + coords.side * 2 - 1,coords.z,item.id,0);
                        Player.setCarriedItem(item.id,item.count - 1,item.data);
                    }
                    if((coords.side === Native.BlockSide.SOUTH || coords.side === Native.BlockSide.NORTH) && PlayerManager.canPlaceBlock({
                        x:coords.x,
                        y:coords.y,
                        z:coords.z + (coords.side - 2) * 2 - 1
                    })){
                        World.setBlock(coords.x,coords.y,coords.z + (coords.side - 2) * 2 - 1,item.id,1);
                        Player.setCarriedItem(item.id,item.count - 1,item.data);
                    }
                    if((coords.side === Native.BlockSide.WEST || coords.side === Native.BlockSide.EAST) && PlayerManager.canPlaceBlock({
                        x:coords.x + (coords.side - 4) * 2 - 1,
                        y:coords.y,
                        z:coords.z
                    })){
                        World.setBlock(coords.x + (coords.side - 4) * 2 - 1,coords.y,coords.z,item.id,2);
                        Player.setCarriedItem(item.id,item.count - 1,item.data);
                    }
                    
                }
                
            })

            Block.registerDropFunction(Main.MODID + ".sakura_log",function(){
                return [[
                    BlockID[Main.MODID + ".sakura_log"],1,0
                ]];
            });

            IDRegistry.genBlockID(Main.MODID + ".sakuraleaves");
            Block.createBlock(Main.MODID + ".sakuraleaves",[{name:"Sakura Leaves",textures: [["sakuraleaves", 0]],inCreative: true
            }]);

            Translation.addTranslation(Main.blockResource.getLang("en_us")["tile.sakura.sakuraleaves.name"],{
                zh : Main.blockResource.getLang("zh_cn")["tile.sakura.sakuraleaves.name"]
            });

            new Campfire();
        }
    }}