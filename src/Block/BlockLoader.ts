import { Campfire } from "../Generation/Campfire";
import ModConfig from "../ModConfig/ModConfig";
import PlayerManager from "../Native/PlayerManager";
import Resource from "../Resource/Resource";

    export default class BlockLoader{
        constructor(){
            IDRegistry.genBlockID(ModConfig.MODID + ".sakura_log");
            Block.createBlock(ModConfig.MODID + ".sakura_log",[
                {
                    name:Resource.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    texture: [["sakura_log_top", 0],["sakura_log_top", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log", 0]],
                    inCreative: true
                },
                {
                    name:Resource.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    texture: [["sakura_log", 0],["sakura_log", 0],["sakura_log_top", 0],["sakura_log_top", 0],["sakura_log", 0],["sakura_log", 0]],
                    inCreative: false
                },
                {
                    name:Resource.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    texture: [["sakura_log", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log", 0],["sakura_log_top", 0],["sakura_log_top", 0]],
                    inCreative: false
                }
            ],"opaque");

            Translation.addTranslation(Resource.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],{
                zh : Resource.blockResource.getLang("zh_cn")["tile.sakura.sakura_log.name"]
            });
            Callback.addCallback("ItemUse",function(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, isExternal: boolean | undefined){
                if(item.id === BlockID[ModConfig.MODID + ".sakura_log"]){
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

            Block.registerDropFunction(ModConfig.MODID + ".sakura_log",function(){
                return [[
                    BlockID[ModConfig.MODID + ".sakura_log"],1,0
                ]];
            });

            IDRegistry.genBlockID(ModConfig.MODID + ".sakuraleaves");
            Block.createBlock(ModConfig.MODID + ".sakuraleaves",[{name:"Sakura Leaves",texture: [["sakuraleaves", 0]],inCreative: true
            }]);

            Translation.addTranslation(Resource.blockResource.getLang("en_us")["tile.sakura.sakuraleaves.name"],{
                zh : Resource.blockResource.getLang("zh_cn")["tile.sakura.sakuraleaves.name"]
            });

            new Campfire();
        }
    }