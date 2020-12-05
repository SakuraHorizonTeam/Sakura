import ModConfig from "../ModConfig/ModConfig";
import LiquidContainer from "../Native/LiquidContainer";
import LiquidModel from "../Native/LiquidModel";
import Resource from "../Resource/Resource";
import deepCompare from "../Tools/deepCompare";
import Machine from "./Machine";
import Recipe from "./Recipe";

export default class Pot implements Machine {
    static blockId: number;

    static UI: UI.IWindow;

    static model = FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/pot" + ".json");
    static tileEntityIdle: TileEntity.TileEntityPrototype = {
        defaultValues: {
            hasPot: false,
            burn: 0,
            progress: 0,
            renderLiquid: null,
            renderLiquidAmount: 0
        },

        getMaterialSlot: function (index: number) {
            return this.container.getSlot("input2_" + index);
        },
        setMaterialSlot: function (index: number, id: number, count: number, data: number) {
            return this.container.setSlot("input2_" + index, id, count, data);
        },
        getMaterials: function () {
            let arr: ItemDictionary.Item[] = [];
            for (let i = 0; i < 8; i++) {
                if (this.getMaterialSlot(i).id > 0) {
                    arr.push({
                        id: this.getMaterialSlot(i).id,
                        data: this.getMaterialSlot(i).data
                    });
                }
                arr.sort(function (a, b) {
                    return ItemDictionary.compareItem(a, b);
                });
            }
            return arr;
        },
        decreaseMaterial: function () {
            for (let i = 0; i < 8; i++) {
                let slot = this.getMaterialSlot(i);
                if (slot.id > 0) {
                    if (slot.count - 1 > 0) {
                        this.setMaterialSlot(i, slot.id, slot.count - 1, slot.data);
                    }
                    else {
                        this.container.clearSlot("input2_" + i);
                    }
                }
            }
        },
        getTopSlot: function () {
            return this.container.getSlot("input1");
        },
        setTopSlot: function (id: number, count: number, data: number) {
            return this.container.setSlot("input1", id, count, data);
        },
        judgeRecipe: function () {
            return Pot.recipe.hasResource([
                this.getMaterials(),
                this.liquidContainer.hasLiquid([this.liquidContainer.getLiquid().liquid, 200]),
                {
                    id: this.getTopSlot().id,
                    data: this.getTopSlot().data
                }
            ]);
        },
        init: function () {
            if (this.data.hasPot) {
                this.liquidContainer = new LiquidContainer(this, "liquidContainer");
            }

            this.render = new BlockModel(Object.create(Pot.model), {}).get();

            BlockRenderer.enableCoordMapping(BlockID[ModConfig.MODID + ".pot"], 0, this.render);
            this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);

        },

        showLiquid: function (liquid: string, amount: number) {
            BlockRenderer.unmapAtCoords(this.x, this.y + 1, this.z);
            this.data.renderLiquid = liquid;
            let texture = liquid ? LiquidModel.getTexture(liquid) : undefined;
            if (texture) {

                let model = new BlockRenderer.Model();
                this.render = new BlockModel(Object.create(Pot.model), {}).get();
                //BlockRenderer.enableCoordMapping(BlockID[Sakura.ModConfig.MODID + ".pot"], 0, this.render);
                model.addBox(2.25 / 16, 10 / 16 - 1, 2.25 / 16, 13.75 / 16, (10 + 4 * amount / this.liquidContainer.getLimit()) / 16 - 1, 13.75 / 16, texture);
                this.render.addEntry(model);

                BlockRenderer.mapAtCoords(this.x, this.y + 1, this.z, this.render);
            }
        },

        placePot: function (id: number, count: number, data: number) {
            if (!this.data.hasPot && World.getBlock(this.x, this.y + 1, this.z).id <= 0) {
                if (id === ItemID[ModConfig.MODID + ".cooking_pot"]) {
                    World.setBlock(this.x, this.y + 1, this.z, BlockID[ModConfig.MODID + ".pot"], 0);
                    World.addTileEntity(this.x, this.y + 1, this.z);

                    Player.setCarriedItem(id, count - 1, data);



                    this.data.hasPot = true;
                    this.liquidContainer = new LiquidContainer(this, "liquidContainer");
                }
            }
        },

        destroyPot: function () {
            if (this.data.hasPot && World.getBlock(this.x, this.y + 1, this.z).id === BlockID[ModConfig.MODID + ".pot"]) {
                World.destroyBlock(this.x, this.y + 1, this.z, false);
                World.drop(this.x, this.y, this.z, ItemID[ModConfig.MODID + ".cooking_pot"], 1, 0);
                BlockRenderer.unmapAtCoords(this.x, this.y + 1, this.z);
                this.data.hasPot = false;
            }
        },

        startBurn: function () {
            this.data.burn = 800;
            //let render2 = new BlockModel(FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/campfire_lit" + ".json"), {}).get();
            World.setBlock(this.x, this.y, this.z, BlockID[ModConfig.MODID + ".campfire_lit"], 0);
            this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
        },

        tick: function () {
            if (World.getBlock(this.x, this.y, this.z).id !== Pot.blockId && World.getBlock(this.x, this.y, this.z).id !== BlockID[ModConfig.MODID + ".campfire_lit"]) {
                this.selfDestroy();
            }
            if (this.data.hasPot && World.getBlock(this.x, this.y + 1, this.z).id <= 0) {
                World.setBlock(this.x, this.y + 1, this.z, BlockID[ModConfig.MODID + ".pot"], 0);
                World.addTileEntity(this.x, this.y + 1, this.z);
            }
            if (this.data.burn > 0) {
                this.data.burn--;
            }
            if (this.data.burn === 1) {
                World.setBlock(this.x, this.y, this.z, Pot.blockId, 0);
                this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
            }
            if (this.data.hasPot) {
                this.liquidContainer.updateScale("liquidScale");
                this.container.setScale("burningScale", this.data.burn / 800);
            }
            if (this.liquidContainer && this.liquidContainer.getLiquid()) {
                if (this.data.renderLiquidAmount !== this.liquidContainer.getLiquid().amount && this.data.renderLiquid !== this.liquidContainer.getLiquid().liquid) {
                    this.data.renderLiquidAmount = this.liquidContainer.getLiquid().amount;
                    this.data.renderLiquid = this.liquidContainer.getLiquid().liquid;
                    this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
                }
                if (this.data.renderLiquid !== this.liquidContainer.getLiquid().liquid) {
                    this.data.renderLiquid = this.liquidContainer.getLiquid().liquid;
                    this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
                }
                if (this.data.renderLiquidAmount !== this.liquidContainer.getLiquid().amount) {
                    this.data.renderLiquidAmount = this.liquidContainer.getLiquid().amount;
                    this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
                }
            }
            else {
                this.data.renderLiquid = null;
                this.data.renderLiquidAmount = 0;
            }
            this.container.setScale("progressScale", this.data.progress / 100);
            if (this.data.progress !== 0 && this.data.burn <= 0) {
                this.data.progress = 0;
            }
            if (this.data.progress !== 0 && !this.judgeRecipe()) {
                this.data.progress = 0;
            }
            if (this.data.progress < 100 && this.judgeRecipe()) {
                this.data.progress++;
            }
            if (this.data.progress === 100 && this.judgeRecipe()) {
                let output = this.container.getSlot("output");
                let result = Pot.recipe.sourceToResult([
                    this.getMaterials(),
                    this.liquidContainer.hasLiquid([this.liquidContainer.getLiquid().liquid, 200]),
                    {
                        id: this.getTopSlot().id,
                        data: this.getTopSlot().data
                    }
                ]);
                if (output.id <= 0 || deepCompare({
                    id: output.id,
                    data: output.data
                }, {
                    id: result?.id,
                    data: result?.data
                })) {
                    this.data.progress = 0;
                    this.liquidContainer.holdLiquidFromContainer(this.liquidContainer.getLiquid().liquid, 200);
                    this.container.setSlot("output", result?.id, output.count + result?.count, result?.data);
                    this.decreaseMaterial();
                    let top = this.getTopSlot();
                    if (top.count - 1 > 0) {
                        this.setTopSlot(top.id, top.count - 1, top.data);
                    }
                    else {
                        this.container.clearSlot("input1");
                    }
                }
            }
        },

        click: function (id: number, count: number, data: number) {
            //Game.message(JSON.stringify(this.data));
            Game.prevent();
            //alert(this.judgeRecipe());
            //alert(Item.getName(this.getMaterialSlot(7).id,this.getMaterialSlot(7).data));
        },

        destroy: function () {
            return true;
        },

        selfDestroy: function () {
            this.destroyPot();
            this.destroy = function () {
                return false;
            };
            TileEntity.destroyTileEntity(this);
        },

        getGuiScreen: function () {
            let id = Player.getCarriedItem().id, data = Player.getCarriedItem().data, count = Player.getCarriedItem().count;
            if (this.liquidContainer) {
                let liquidData = LiquidRegistry.getEmptyItem(id, data);
                let fullItem = LiquidRegistry.getFullItem(id, data, this.liquidContainer.getLiquid().liquid);

                if (this.data.hasPot && liquidData) {
                    if (this.liquidContainer.addLiquid(liquidData.liquid, 200)) {
                        Game.prevent();
                        if (count === 1) {
                            Player.setCarriedItem(liquidData.id, 1, liquidData.data);
                        }
                        else {
                            Player.setCarriedItem(id, count - 1, data);
                            Player.addItemToInventory(liquidData.id, 1, liquidData.data);
                        }
                        return;
                    }
                }

                if (fullItem) {
                    if (this.liquidContainer.holdLiquidFromContainer(this.liquidContainer.getLiquid().liquid, 200)) {
                        Game.prevent();
                        if (count === 1) {
                            Player.setCarriedItem(fullItem.id, 1, fullItem.data);
                        }
                        else {
                            Player.setCarriedItem(id, count - 1, data);
                            Player.addItemToInventory(fullItem.id, 1, fullItem.data);
                        }
                        return;
                    }
                }
            }


            if (this.data.hasPot && id !== VanillaItemID.flint_and_steel) {
                return Pot.UI;
            }

            if (id === VanillaItemID.flint_and_steel) {
                Game.prevent();
                Player.setCarriedItem(VanillaItemID.flint_and_steel, data >= Item.getMaxDamage(id) ? count - 1 : count, data + 1);
                this.startBurn();
            }
            this.placePot(id, count, data);
        }
    };

    static tileEntityLit: TileEntity.TileEntityPrototype = {
        _initialized: true
    };
    static recipe: Recipe<
        [
            ItemDictionary.Item[],//原料槽
            [string, number],//流体
            ItemDictionary.Item//上方原料格子
        ],
        ItemInstance//结果
    > = new Recipe<
        [
            ItemDictionary.Item[],//原料槽
            [string, number],//流体
            ItemDictionary.Item//上方原料格子
        ],
        ItemInstance//结果
    >();

    static recipeRegister(
        source: [
            (ItemDictionary.Item | ItemDictionary.ItemGroup)[],//原料槽
            [string, number],//流体
            ItemDictionary.Item | ItemDictionary.ItemGroup//上方原料格子
        ],
        result: ItemInstance
    ): Pot {
        if (!(source[2] instanceof ItemDictionary.ItemGroup)) {
            Pot.addItemGroup(
                [
                    [],
                    source[1],
                    source[2]
                ],
                [
                    source[0]
                ],
                result,
                -1
            );
        }
        else {
            source[2].forEach(function (value: ItemDictionary.Item, value2: ItemDictionary.Item, set: Set<ItemDictionary.Item>) {
                Pot.addItemGroup(
                    [
                        [],
                        source[1],
                        value
                    ],
                    [
                        source[0]
                    ],
                    result,
                    -1
                );
            });
        }
        return Pot;
    }

    private static addItemGroup(
        output: [
            ItemDictionary.Item[],//原料槽
            [string, number],//流体
            ItemDictionary.Item//上方原料格子
        ],
        source: [
            (ItemDictionary.Item | ItemDictionary.ItemGroup)[]//原料槽
        ],
        result: ItemInstance,
        lastIndex: number
    ) {
        let arr: (ItemDictionary.Item | ItemDictionary.ItemGroup)[] = source[0];
        if (lastIndex + 1 >= arr.length) {
            this.recipe.register([
                output[0].sort(function (a, b) {
                    return ItemDictionary.compareItem(a, b);
                }),
                output[1],
                output[2]
            ], result);
            return;
        }
        let value = arr[lastIndex + 1];
        let index = lastIndex + 1;

        if (value instanceof ItemDictionary.ItemGroup) {

            value.forEach(function (v, v1, set) {
                let copy: ItemDictionary.Item[] = Object.create(output[0]);
                copy.push(v);

                Pot.addItemGroup(
                    [
                        copy,
                        output[1],
                        output[2]
                    ],
                    source,
                    result,
                    index
                );
            });

        }
        else {
            let copy: ItemDictionary.Item[] = Object.create(output[0]);
            copy.push(value);

            Pot.addItemGroup(
                [
                    copy,
                    output[1],
                    output[2]
                ],
                source,
                result,
                index
            );
        }
    }
    constructor() {
        Pot.blockId = BlockID[ModConfig.MODID + ".campfire_idle"];
        TileEntity.registerPrototype(Pot.blockId, Pot.tileEntityIdle);
        TileEntity.registerPrototype(BlockID[ModConfig.MODID + ".campfire_lit"], Pot.tileEntityLit);
        let propertyUI = {
            standart: {
                header: { text: { text: Translation.translate(Resource.itemResource.getLang("en_us")["item." + ModConfig.MODID + ".cooking_pot" + ".name"]) } },
                inventory: { standart: true },
                background: { standart: true }
            },
            // 报错：类型不匹配
            // drawing: [
            //     { type: "bitmap", x: 680, y: 180, bitmap: "furnace_bar_background", scale: ModConfig.GUI_SCALE },
            //     { type: "bitmap", x: 690, y: 260, bitmap: "fire_background", scale: ModConfig.GUI_SCALE },
            //     { type: "bitmap", x: 650, y: 80, bitmap: "liquid", scale: ModConfig.GUI_SCALE, }
            // ],

            elements: {

            }
        };

        let elements: any = {
            "input1": { type: "slot", x: 480, y: 100, size: ModConfig.GUI_SCALE * 20 },
            "output": {
                type: "slot", x: 760, y: 200, size: ModConfig.GUI_SCALE * 30, onClick: function (position: BlockPosition, container: UI.Container, tileEntity: TileEntity) {//如果定义，就设定短按事件
                    Player.addItemToInventory(container.getSlot("output").id, container.getSlot("output").count, container.getSlot("output").data);
                    container.clearSlot("output");
                },
            },
            "liquidScale": { type: "scale", x: 660, y: 90, direction: 0, value: 0, bitmap: "liquid2", scale: ModConfig.GUI_SCALE },
            "progressScale": { type: "scale", x: 680, y: 180, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: ModConfig.GUI_SCALE },
            "burningScale": { type: "scale", x: 690, y: 260, direction: 1, value: 0.5, bitmap: "fire_scale", scale: ModConfig.GUI_SCALE },
        };

        for (let i = 0; i < 8; i++) {
            elements["input2_" + i] = { type: "slot", x: 360 + (i % 4) * 80, y: 180 + Math.floor(i / 4) * 80, size: ModConfig.GUI_SCALE * 20 };
        }

        propertyUI.elements = elements;

        Pot.UI = new UI.StandartWindow(propertyUI);
    }
}