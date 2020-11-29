"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/// <reference path = "../header.ts" /> 
var Sakura;
/// <reference path = "../header.ts" /> 
(function (Sakura) {
    var ItemResource = /** @class */ (function () {
        function ItemResource(modelPath, langPath, config) {
            if (modelPath === void 0) { modelPath = __dir__ + "resources/assets/" + Sakura.Main.MODID + "/models/item/"; }
            if (langPath === void 0) { langPath = __dir__ + "resources/assets/" + Sakura.Main.MODID + "/lang/"; }
            this.modelPath = modelPath;
            this.langPath = langPath;
        }
        //请尽可能使用item的完整id作为参数，以免混乱。如需使用item去除命名空间后的id，请调用本方法。
        ItemResource.removeNamespace = function (itemId) {
            var arr = itemId.split(".");
            return arr[arr.length - 1];
        };
        ItemResource.prototype.getLang = function (lang) {
            return FileTools.ReadKeyValueFile(this.langPath + lang + ".lang", "=");
        };
        ItemResource.prototype.getModel = function (itemId) {
            return FileTools.ReadJSON(this.modelPath + ItemResource.removeNamespace(itemId) + ".json");
        };
        ItemResource.prototype.getTexture = function (id) {
            var model = this.getModel(id);
            if (!model.elements) {
                try {
                    return model.textures.layer0.split("/")[1];
                }
                catch (e) {
                    return ItemResource.removeNamespace(id);
                }
            }
            else {
                return ItemResource.removeNamespace(id);
            }
        };
        ItemResource.prototype.hasModel = function (id) {
            var model = this.getModel(id);
            try {
                return model.elements || model.parent.split(":")[0] === Sakura.Main.MODID;
            }
            catch (e) {
                return false;
            }
        };
        return ItemResource;
    }());
    Sakura.ItemResource = ItemResource;
})(Sakura || (Sakura = {}));
var Sakura;
(function (Sakura) {
    var BlockResource = /** @class */ (function (_super) {
        __extends(BlockResource, _super);
        function BlockResource(modelPath, langPath, config) {
            if (modelPath === void 0) { modelPath = __dir__ + "resources/assets/" + Sakura.Main.MODID + "/models/block/"; }
            if (langPath === void 0) { langPath = __dir__ + "resources/assets/" + Sakura.Main.MODID + "/lang/"; }
            return _super.call(this, modelPath, langPath, config) || this;
        }
        return BlockResource;
    }(Sakura.ItemResource));
    Sakura.BlockResource = BlockResource;
})(Sakura || (Sakura = {}));
/// <reference path = "../header.ts" /> 
/// <reference path = "../ResourceManager/ItemResource.ts" /> 
var Sakura;
/// <reference path = "../header.ts" /> 
/// <reference path = "../ResourceManager/ItemResource.ts" /> 
(function (Sakura) {
    var ItemBase = /** @class */ (function () {
        function ItemBase(modid, type, stack, items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                IDRegistry.genItemID(item);
                Item.createItem(item, Sakura.Main.itemResource.getLang("en_us")["item." + item + ".name"], {
                    name: Sakura.Main.itemResource.getTexture(item),
                    meta: 0
                }, {
                    stack: stack
                });
                Translation.addTranslation(Sakura.Main.itemResource.getLang("en_us")["item." + item + ".name"], {
                    zh: Sakura.Main.itemResource.getLang("zh_cn")["item." + item + ".name"]
                });
                if (Sakura.Main.itemResource.hasModel(item)) {
                    ModelHelper.loadItemModel(item, -1, Sakura.ItemResource.removeNamespace(item));
                }
            }
        }
        return ItemBase;
    }());
    Sakura.ItemBase = ItemBase;
})(Sakura || (Sakura = {}));
var Sakura;
(function (Sakura) {
    var FoodInfo = /** @class */ (function () {
        function FoodInfo(name, amount, calories, iswolffood, water, carbohydrates, fat, protein, vitamins, minerals, decayModifier, heatCapacity, cookingTemp) {
            if (iswolffood === void 0) { iswolffood = false; }
            if (water === void 0) { water = 1; }
            if (carbohydrates === void 0) { carbohydrates = 1; }
            if (fat === void 0) { fat = 0; }
            if (protein === void 0) { protein = 0; }
            if (vitamins === void 0) { vitamins = 0; }
            if (minerals === void 0) { minerals = 0; }
            if (decayModifier === void 0) { decayModifier = 1; }
            if (heatCapacity === void 0) { heatCapacity = 0; }
            if (cookingTemp === void 0) { cookingTemp = 0; }
            this.name = name;
            this.amount = amount;
            this.calories = calories;
            this.isWolfFood = iswolffood;
            //TFC-TNG FoodHandler parameters
            this.water = water;
            this.carbohydrates = carbohydrates;
            this.fat = fat;
            this.protein = protein;
            this.vitamins = vitamins;
            this.minerals = minerals;
            this.decayModifier = decayModifier;
            this.isNonDecaying = decayModifier <= 0;
            this.heatable = cookingTemp >= 0;
            this.heatCapacity = heatCapacity;
            this.cookingTemp = cookingTemp;
        }
        FoodInfo.prototype.getName = function () {
            return this.name;
        };
        FoodInfo.prototype.getCalories = function () {
            return this.calories;
        };
        return FoodInfo;
    }());
    Sakura.FoodInfo = FoodInfo;
})(Sakura || (Sakura = {}));
/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 
var Sakura;
/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 
(function (Sakura) {
    var ItemDrinkBase = /** @class */ (function (_super) {
        __extends(ItemDrinkBase, _super);
        function ItemDrinkBase(modid, type, items, effects) {
            var _this = this;
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                arr.push(items[i].getName());
            }
            _this = _super.call(this, modid, type, 1, arr) || this;
            for (var i = 0; i < items.length; i++) {
                var item = items[i].getName();
                var effectArr = [];
                for (var j = 0; j < effects[i].length; j++) {
                    effectArr.push({
                        "name": effects[i][j][0],
                        "chance": 1.0,
                        "duration": effects[i][j][1],
                        "amplifier": effects[i][j][2]
                    });
                }
                Item.setProperties(item, JSON.stringify({
                    use_animation: "eat",
                    use_duration: 32,
                    food: {
                        nutrition: items[i].getCalories(),
                        saturation_modifier: "supernatural",
                        is_meat: false,
                        using_converts_to: "item_" + ItemDrinkBase.getContainerByType(type),
                        can_always_eat: true,
                        effects: effectArr
                    }
                }));
                Item.setUseAnimation(item, 2);
                Item.setMaxUseDuration(item, 32);
            }
            return _this;
        }
        ItemDrinkBase.getContainerByType = function (con) {
            if (con === "tea") {
                return Sakura.Main.MODID + ".cup";
            }
            else {
                return false;
            }
        };
        return ItemDrinkBase;
    }(Sakura.ItemBase));
    Sakura.ItemDrinkBase = ItemDrinkBase;
})(Sakura || (Sakura = {}));
/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 
var Sakura;
/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 
(function (Sakura) {
    var ItemFoodBase = /** @class */ (function (_super) {
        __extends(ItemFoodBase, _super);
        function ItemFoodBase(modid, type, stack, items) {
            var _this = this;
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                arr.push(items[i].getName());
            }
            _this = _super.call(this, modid, type, stack, arr) || this;
            for (var i = 0; i < items.length; i++) {
                var item = items[i].getName();
                Item.setProperties(item, JSON.stringify({
                    use_animation: "eat",
                    use_duration: 32,
                    food: {
                        nutrition: items[i].getCalories(),
                        saturation_modifier: "normal",
                        is_meat: false,
                        can_always_eat: false
                    }
                }));
                Item.setUseAnimation(item, 2);
                Item.setMaxUseDuration(item, 32);
            }
            return _this;
        }
        return ItemFoodBase;
    }(Sakura.ItemBase));
    Sakura.ItemFoodBase = ItemFoodBase;
})(Sakura || (Sakura = {}));
/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./ItemDrinkBase.ts" /> 
/// <reference path = "./ItemFoodBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 
var Sakura;
/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./ItemDrinkBase.ts" /> 
/// <reference path = "./ItemFoodBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 
(function (Sakura) {
    var ItemLoader = /** @class */ (function () {
        function ItemLoader() {
            var SakuraMain = Sakura.Main;
            new Sakura.ItemBase(SakuraMain.MODID, "materials", 64, [
                SakuraMain.MODID + "." + "straw",
                SakuraMain.MODID + "." + "rice",
                SakuraMain.MODID + "." + "salt",
                SakuraMain.MODID + "." + "curry_powder",
                SakuraMain.MODID + "." + "flour",
                SakuraMain.MODID + "." + "flour_buckwheat",
                SakuraMain.MODID + "." + "dough",
                SakuraMain.MODID + "." + "dough_buckwheat",
                SakuraMain.MODID + "." + "ramen_raw",
                SakuraMain.MODID + "." + "udon_raw",
                SakuraMain.MODID + "." + "soba_raw",
                SakuraMain.MODID + "." + "curry_sauce",
                SakuraMain.MODID + "." + "tomato_sauce",
                SakuraMain.MODID + "." + "white_sauce",
                SakuraMain.MODID + "." + "tempura_batter",
                SakuraMain.MODID + "." + "chestnut_burrs",
                SakuraMain.MODID + "." + "flour_rice",
                SakuraMain.MODID + "." + "dough_rice",
                SakuraMain.MODID + "." + "peppercorn_green",
                SakuraMain.MODID + "." + "peppercorn_red",
                SakuraMain.MODID + "." + "vanilla_seeds",
                SakuraMain.MODID + "." + "vanilla",
                SakuraMain.MODID + "." + "vanilla_roast",
                SakuraMain.MODID + "." + "grape_seeds",
                SakuraMain.MODID + "." + "lumber_bamboo",
                SakuraMain.MODID + "." + "lumber_sakura",
                SakuraMain.MODID + "." + "lumber_maple",
                SakuraMain.MODID + "." + "black_pepper",
                SakuraMain.MODID + "." + "white_pepper",
                SakuraMain.MODID + "." + "miso",
                SakuraMain.MODID + "." + "breadcrumbs",
                SakuraMain.MODID + "." + "chestnut",
                SakuraMain.MODID + "." + "noodle_soup",
                SakuraMain.MODID + "." + "soysause",
                SakuraMain.MODID + "." + "seaweed",
                SakuraMain.MODID + "." + "alkaline",
                SakuraMain.MODID + "." + "yeast",
                SakuraMain.MODID + "." + "hop",
                SakuraMain.MODID + "." + "brown_rice",
                SakuraMain.MODID + "." + "green_tea_leaves",
                SakuraMain.MODID + "." + "black_tea_leaves",
                SakuraMain.MODID + "." + "earl_grey_leaves",
                SakuraMain.MODID + "." + "fruit_tea_leaves",
                SakuraMain.MODID + "." + "mocha",
                SakuraMain.MODID + "." + "rice_tea_leaves",
                SakuraMain.MODID + "." + "mint",
                SakuraMain.MODID + "." + "mint_tea_leaves",
                SakuraMain.MODID + "." + "empty_bottle",
                SakuraMain.MODID + "." + "bamboo_sunburnt",
                SakuraMain.MODID + "." + "maple_syrup",
                SakuraMain.MODID + "." + "coin",
                SakuraMain.MODID + "." + "bamboo_charcoal",
                SakuraMain.MODID + "." + "zuku",
                SakuraMain.MODID + "." + "zuku_ingot",
                SakuraMain.MODID + "." + "sagegane",
                SakuraMain.MODID + "." + "tamahagane",
                SakuraMain.MODID + "." + "steel_ingot",
                SakuraMain.MODID + "." + "pasta_raw",
            ]);
            new Sakura.ItemBase(SakuraMain.MODID, "materials", 32, [
                SakuraMain.MODID + "." + "cup"
            ]);
            new Sakura.ItemFoodBase(SakuraMain.MODID, "foodset", 64, [
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "grape", 1, 0.25, false, 4, 0.25, 0, 0, 0.5, 0, 5, 0, -1),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "maple_cookie", 3, 0.25, false, 0.75, 1, 0.1, 0, 0, 0.2, 0.8, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_bread", 5, 0.6, false, 0, 1.5, 0.5, 0, 0, 0, 0.8, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "red_bean_paste", 4, 0.25, false, 4, 0.25, 0, 0, 0.5, 0, 4, 0, -1),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "bun", 5, 0.6, false, 0, 1.5, 0.1, 0, 0, 0.2, 0.8, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "cheese", 2, 0.2, false, 3, 0, 2.5, 2, 0, 2, 2, 0, -1),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "katsu", 9, 0.6, false, 4, 0.25, 2, 1, 0, 0.5, 1.25, 0, -1),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_cooked", 4, 0.5, false, 0.5, 1.5, 0, 0, 0, 0, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_bamboo", 5, 0.6, false, 0.5, 1.5, 0, 0, 1, 0, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_fish", 7, 0.7, false, 0.5, 1.5, 0, 2, 0, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_beef", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_pork", 7, 0.7, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_mushroom", 6, 0.6, false, 0.5, 1.5, 0, 1, 0, 1, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_egg", 5, 0.6, false, 0.5, 1.5, 0.5, 1, 0, 1, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_beef_egg", 10, 1, false, 0.5, 1.5, 2.5, 3.5, 0, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_pork_egg", 9, 0.8, false, 0.5, 1.5, 2.5, 3.5, 0, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_pork_fried", 10, 1, false, 0.5, 2, 4, 4, 0, 1, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_oyako", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_oyako_fish", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "yaki_udon", 9, 0.7, false, 2.5, 1.5, 1.5, 2.5, 1, 0.5, 3.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_zaru", 6, 0.7, false, 5, 2, 0, 0.5, 0, 0.5, 3.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "onigiri", 6, 0.6, false, 0.5, 1.5, 0, 0, 0.5, 0.5, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "onigiri_bamboo", 7, 0.7, false, 0.5, 1.5, 0, 0, 1.5, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "onigiri_fish", 8, 0.7, false, 0.5, 1.5, 0, 2, 0.5, 1, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "onigiri_mushroom", 7, 0.7, false, 0.5, 1.5, 0, 0, 0, 0.5, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "onigiri_seaweed", 7, 0.7, false, 0.5, 1.5, 0, 0, 1, 1, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "onigiri_tempura", 10, 0.8, false, 0.5, 1.5, 2, 3, 0.5, 1, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "burger_raw", 2, 0.2, false, 1, 0, 2, 2.5, 0, 0, 2, 1, 200),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "burger", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "burger_dish", 10, 0.8, false, 2.5, 1, 2, 3, 1, 1, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_curry", 6, 0.6, false, 0.5, 1.5, 1, 1, 1, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_curry_katsu", 10, 0.8, false, 0.5, 2, 3, 3, 1, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_curry_burger", 10, 0.8, false, 0.5, 2, 3, 3, 1, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_curry_cheese", 8, 0.8, false, 0.5, 1.5, 2, 2, 1, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_curry_cheese_katsu", 12, 0.8, false, 0.5, 2, 3, 4, 1, 2.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_curry_cheese_burger", 12, 0.8, false, 0.5, 2, 3, 4, 1, 2.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "mashed_potato", 5, 0.6, false, 0.5, 2, 0, 0, 2, 0.5, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "mochi", 2, 0.5, false, 0.5, 2, 0, 0, 0, 0, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "mochi_toasted", 4, 0.6, false, 0.5, 2, 0, 0, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "mochi_sakura", 4, 0.6, false, 0.5, 2, 0, 0, 1, 0.5, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ohagi", 6, 0.6, false, 0.5, 3, 0.5, 0, 0, 0.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "croquette", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "natto", 2, 0.5, false, 0.5, 1, 0.5, 2, 0, 0.5, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_natto", 5, 0.6, false, 0.5, 2.5, 0.5, 2, 0, 1, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_natto_egg", 6, 0.6, false, 0.5, 2.5, 1, 3, 0, 1.5, 2.25, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "nikujaga", 8, 0.6, false, 0.5, 1, 2, 3, 1, 1, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "omurice", 8, 0.6, false, 0.5, 2, 3, 4, 2, 2, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_fried", 8, 0.6, false, 0.5, 1.5, 2, 2, 2, 2, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "hamburger", 8, 0.6, false, 0.5, 2, 2, 4, 0, 0.5, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "cheese_burger", 10, 0.8, false, 0.5, 2.5, 2.5, 5, 0, 1, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "mabodofu", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "maboqiezi", 8, 0.6, false, 1, 1, 1, 3, 2, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "chestnut_toasted", 4, 0.4, false, 0.5, 2, 0, 0, 1, 0, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soup_red_bean", 6, 0.6, false, 5, 2, 2, 2, 2, 2, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pound_cake", 5, 0.6, false, 0.5, 4, 1, 2, 1, 1, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "osuimono", 4, 0.5, false, 50, 0, 0, 0, 0, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ochazuke", 6, 0.6, false, 50, 0, 0, 2, 0, 2, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "shrimp", 2, 0.6, false, 0.5, 0, 0, 2, 0, 0.5, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "tempura", 5, 0.6, false, 0, 1, 1, 2, 0, 0.5, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "fishcake", 4, 0.6, false, 1, 2, 1, 2.5, 0, 1, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "tofu", 2, 0.4, false, 0.5, 0, 0, 2, 0, 0.5, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "tofu_fried", 4, 0.5, false, 0.5, 0.5, 1, 2, 0, 0.5, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "oden", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "dananko", 6, 0.6, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "danmitarashi", 6, 0.4, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "dansansyoku", 6, 0.6, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "eggplant_baked", 4, 0.5, false, 1, 0, 0, 0, 2, 0.5, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "fried_chicken", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "sashimi", 6, 0.6, false, 1, 0, 0, 3, 0, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "beef_stick", 8, 0.8, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "chicken_stick", 6, 0.4, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pork_stick", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ramen_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "udon_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soba_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "tamagoyaki", 6, 0.6, false, 0.5, 0.5, 1, 2, 0, 0.5, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "sushi", 5, 0.6, false, 1, 1, 0, 2, 0, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "sushi_tamago", 4, 0.6, false, 1, 1, 1, 2, 0, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "ehoumaki", 8, 0.6, false, 1, 2, 1, 3, 2, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pudding", 4, 0.4, false, 2, 2, 1, 2, 0, 0, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pudding_maple", 6, 0.6, false, 2, 3, 2, 2, 0, 0, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "rice_redbean", 6, 0.6, false, 0.5, 4, 1, 0, 0, 0.5, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "fish_bake", 8, 0.8, false, 0.5, 0.5, 0.5, 3, 0, 1, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "fries", 5, 0.6, false, 1, 2, 2, 0, 1, 1, 1, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "furofuki_daikon", 5, 0.6, false, 25, 1, 0, 2, 4, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "cabbage_roll", 4, 0.4, false, 25, 1, 0, 2, 4, 1, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "white_stew", 6, 0.6, false, 35, 2, 2, 2, 2, 2, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "fruitsalad", 6, 0.6, false, 15, 2, 0, 0, 4, 0.5, 5.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "raw_taiyaki", 2, 0.2, false, 0.5, 0.5, 0.5, 0, 0, 0, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "taiyaki", 6, 0.6, false, 0.5, 4, 2, 3, 0, 0, 1, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "lemon", 1, 0.1, false, 5, 0, 0, 0, 1, 0, 3.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "lemon_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "soda_water", 1, 0.1, false, 50, 0, 0, 0, 0, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "almond", 1, 0.1, false, 0, 0, 2, 0, 0, 0, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "blackcurrant_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "orange_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "grape_green", 2, 0.2, false, 4, 0.25, 0, 0, 0.5, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "sliced_cabbage", 2, 0.2, false, 5, 0, 0, 0, 1, 0, 2.5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "sushi_shrimp", 5, 0.6, false, 1, 1, 0, 2, 0, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "curry_omurice", 8, 0.6, false, 0.5, 2, 2, 4, 0, 0.5, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "katsu_dish", 10, 0.8, false, 0.5, 2.5, 2.5, 5, 0, 1, 3, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "croquette_dish", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pasta_tomato", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pasta_mushroom", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "pasta_whitesauce", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "egg_soft", 2, 0.6, false, 1, 2.0, 2.0, 1.5, 0.0, 1.0, 2, 1, 480),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "egg_soysauce", 4, 0.6, false, 1, 2.0, 2.0, 2, 0.0, 1.5, 1.0, 1, 480),
            ]);
            new Sakura.ItemDrinkBase(SakuraMain.MODID, "tea", [
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "black_tea", 1, 0.5, false, 50, 0, 0, 0, 1, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "green_tea", 1, 0.5, false, 50, 0, 0, 0, 1, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "milk_tea", 1, 0.5, false, 50, 0, 1, 2, 1, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "milk_green_tea", 1, 0.5, false, 50, 0, 1, 2, 1, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "earl_grey", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "milk_earl_grey", 1, 0.5, false, 50, 0, 1, 2, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "fruit_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "milk_fruit_tea", 1, 0.5, false, 50, 0, 1, 2, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "lemon_black_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "lemon_green_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "mint_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "barley_tea", 1, 0.5, false, 50, 1, 0, 0, 1, 0, 5, 0, 0),
                new Sakura.FoodInfo(SakuraMain.MODID + "." + "brown_rice_tea", 1, 0.5, false, 50, 1, 0, 0, 1, 0, 5, 0, 0),
            ], [
                [["instant_health", 1, 0]],
                [["haste", 600, 0]],
                [["instant_health", 1, 0], ["regeneration", 200, 0]],
                [["haste", 600, 0], ["regeneration", 200, 0]],
                [["water_breathing", 600, 0]],
                [["water_breathing", 1200, 1]],
                [["jump_boost", 600, 0]],
                [["jump_boost", 600, 0], ["regeneration", 200, 0]],
                [["instant_health", 1, 0], ["speed", 400, 0]],
                [["haste", 600, 0], ["speed", 400, 0]],
                [["night_vision", 600, 0]],
                [["resistance", 600, 0]],
                [["resistance", 600, 0]]
            ]);
        }
        return ItemLoader;
    }());
    Sakura.ItemLoader = ItemLoader;
})(Sakura || (Sakura = {}));
var Sakura;
(function (Sakura) {
    function deepCompare(x, y) {
        var i, l, leftChain, rightChain;
        function compare2Objects(x, y) {
            var p;
            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }
            // Compare primitives and functions.     
            // Check if both arguments link to the same object.
            // Especially useful on the step where we compare prototypes
            if (x === y) {
                return true;
            }
            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }
            // At last checking prototypes as good as we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }
            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }
            if (x.constructor !== y.constructor) {
                return false;
            }
            if (x.prototype !== y.prototype) {
                return false;
            }
            // Check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }
            // Quick checking of one object being a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }
            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
                switch (typeof (x[p])) {
                    case 'object':
                    case 'function':
                        leftChain.push(x);
                        rightChain.push(y);
                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }
                        leftChain.pop();
                        rightChain.pop();
                        break;
                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }
            return true;
        }
        if (arguments.length < 1) {
            return true; //Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }
        for (i = 1, l = arguments.length; i < l; i++) {
            leftChain = []; //Todo: this can be cached
            rightChain = [];
            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }
        return true;
    }
    Sakura.deepCompare = deepCompare;
    var Recipe = /** @class */ (function () {
        function Recipe() {
            this.map = new Map();
        }
        Recipe.prototype.sourceToResult = function (source) {
            var out = false;
            var outv;
            this.map.forEach(function (v, v1, map) {
                if (Sakura.deepCompare(v1, source)) {
                    out = true;
                    outv = v;
                }
            });
            return outv;
        };
        Recipe.prototype.resultToSource = function (result) {
            var arr = [];
            this.map.forEach(function (value, key) {
                if (deepCompare(value, result)) {
                    arr.push(key);
                }
            });
            return arr;
        };
        Recipe.prototype.register = function (source, result) {
            this.map.set(source, result);
            return this;
        };
        Recipe.prototype.hasResource = function (source) {
            var out = false;
            this.map.forEach(function (v, v1, map) {
                if (Sakura.deepCompare(v1, source)) {
                    out = true;
                }
            });
            return out;
        };
        Recipe.prototype.delete = function (source) {
            this.map.delete(source);
            return this;
        };
        return Recipe;
    }());
    Sakura.Recipe = Recipe;
    var Machine = /** @class */ (function () {
        function Machine() {
        }
        return Machine;
    }());
    Sakura.Machine = Machine;
})(Sakura || (Sakura = {}));
var ItemDictionary;
(function (ItemDictionary) {
    function compareItem(a, b) {
        if (a.id !== b.id) {
            return a.id - b.id;
        }
        else {
            return a.data - b.data;
        }
    }
    ItemDictionary.compareItem = compareItem;
    var ItemGroup = /** @class */ (function () {
        function ItemGroup() {
            this.group = new Set();
        }
        ItemGroup.prototype.add = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            for (var i = 0; i < items.length; i++) {
                this.group.add(items[i]);
            }
            return this;
        };
        ItemGroup.prototype.size = function () {
            return this.group.size;
        };
        ItemGroup.prototype.has = function (item) {
            var out = false;
            this.group.forEach(function (v, v1, set) {
                if (Sakura.deepCompare(v, item)) {
                    out = true;
                }
            });
            return out;
        };
        ItemGroup.prototype.forEach = function (callbackfn, thisArg) {
            this.group.forEach(callbackfn, thisArg);
            return this;
        };
        return ItemGroup;
    }());
    ItemDictionary.ItemGroup = ItemGroup;
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            this.dict = new Map();
        }
        Dictionary.prototype.register = function (groupName) {
            var _a;
            var items = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                items[_i - 1] = arguments[_i];
            }
            if (this.dict.has(groupName)) {
                (_a = this.dict.get(groupName)) === null || _a === void 0 ? void 0 : _a.add.apply(_a, items);
            }
            else {
                this.dict.set(groupName, new ItemGroup());
                this.register.apply(this, __spreadArrays([groupName], items));
            }
        };
        Dictionary.prototype.getGroup = function (groupName) {
            return this.dict.get(groupName);
        };
        Dictionary.prototype.hasGroup = function (groupName) {
            return this.dict.has(groupName);
        };
        Dictionary.prototype.deleteGroup = function (groupName) {
            if (this.hasGroup(groupName)) {
                this.dict.delete(groupName);
            }
            return this;
        };
        Dictionary.prototype.getGroupByItem = function (item) {
            var arr = [];
            this.dict.forEach(function (value, key, map) {
                if (value.has(item)) {
                    arr.push(value);
                }
            });
            return arr;
        };
        Dictionary.prototype.groupHasItem = function (groupName, item) {
            var _a;
            if (this.dict.has(groupName)) {
                return (_a = this.dict.get(groupName)) === null || _a === void 0 ? void 0 : _a.has(item);
            }
            else {
                return undefined;
            }
        };
        Dictionary.prototype.groupForeach = function (groupName, callbackfn, thisArg) {
            var _a;
            (_a = this.getGroup(groupName)) === null || _a === void 0 ? void 0 : _a.forEach(callbackfn, thisArg);
            return this;
        };
        return Dictionary;
    }());
    ItemDictionary.Dictionary = Dictionary;
})(ItemDictionary || (ItemDictionary = {}));
/// <reference path = "./Machine.ts" /> 
/// <reference path = "../header.ts" /> 
/// <reference path = "../Item/ItemDictionary.ts" /> 
var Sakura;
/// <reference path = "./Machine.ts" /> 
/// <reference path = "../header.ts" /> 
/// <reference path = "../Item/ItemDictionary.ts" /> 
(function (Sakura) {
    var Pot = /** @class */ (function () {
        function Pot() {
            Pot.blockId = BlockID[Sakura.Main.MODID + ".campfire_idle"];
            TileEntity.registerPrototype(Pot.blockId, Pot.tileEntityIdle);
            TileEntity.registerPrototype(BlockID[Sakura.Main.MODID + ".campfire_lit"], Pot.tileEntityLit);
            var propertyUI = {
                standart: {
                    header: { text: { text: Translation.translate(Sakura.Main.itemResource.getLang("en_us")["item." + Sakura.Main.MODID + ".cooking_pot" + ".name"]) } },
                    inventory: { standart: true },
                    background: { standart: true }
                },
                drawing: [
                    { type: "bitmap", x: 680, y: 180, bitmap: "furnace_bar_background", scale: Sakura.Main.GUI_SCALE },
                    { type: "bitmap", x: 690, y: 260, bitmap: "fire_background", scale: Sakura.Main.GUI_SCALE },
                    { type: "bitmap", x: 650, y: 80, bitmap: "liquid", scale: Sakura.Main.GUI_SCALE, }
                ],
                elements: {}
            };
            var elements = {
                "input1": { type: "slot", x: 480, y: 100, size: Sakura.Main.GUI_SCALE * 20 },
                "output": { type: "slot", x: 760, y: 200, size: Sakura.Main.GUI_SCALE * 30, onClick: function (position, container, tileEntity) {
                        Player.addItemToInventory(container.getSlot("output").id, container.getSlot("output").count, container.getSlot("output").data);
                        container.clearSlot("output");
                    }, },
                "liquidScale": { type: "scale", x: 660, y: 90, direction: 0, value: 0, bitmap: "liquid2", scale: Sakura.Main.GUI_SCALE },
                "progressScale": { type: "scale", x: 680, y: 180, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: Sakura.Main.GUI_SCALE },
                "burningScale": { type: "scale", x: 690, y: 260, direction: 1, value: 0.5, bitmap: "fire_scale", scale: Sakura.Main.GUI_SCALE },
            };
            for (var i = 0; i < 8; i++) {
                elements["input2_" + i] = { type: "slot", x: 360 + (i % 4) * 80, y: 180 + Math.floor(i / 4) * 80, size: Sakura.Main.GUI_SCALE * 20 };
            }
            propertyUI.elements = elements;
            Pot.UI = new UI.StandartWindow(propertyUI);
        }
        Pot.recipeRegister = function (source, result) {
            if (!(source[2] instanceof ItemDictionary.ItemGroup)) {
                Pot.addItemGroup([
                    [],
                    source[1],
                    source[2]
                ], [
                    source[0]
                ], result, -1);
            }
            else {
                source[2].forEach(function (value, value2, set) {
                    Pot.addItemGroup([
                        [],
                        source[1],
                        value
                    ], [
                        source[0]
                    ], result, -1);
                });
            }
            return Pot;
        };
        Pot.addItemGroup = function (output, source, result, lastIndex) {
            var arr = source[0];
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
            var value = arr[lastIndex + 1];
            var index = lastIndex + 1;
            if (value instanceof ItemDictionary.ItemGroup) {
                value.forEach(function (v, v1, set) {
                    var copy = Object.create(output[0]);
                    copy.push(v);
                    Pot.addItemGroup([
                        copy,
                        output[1],
                        output[2]
                    ], source, result, index);
                });
            }
            else {
                var copy = Object.create(output[0]);
                copy.push(value);
                Pot.addItemGroup([
                    copy,
                    output[1],
                    output[2]
                ], source, result, index);
            }
        };
        Pot.model = FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/pot" + ".json");
        Pot.tileEntityIdle = {
            defaultValues: {
                hasPot: false,
                burn: 0,
                progress: 0,
                renderLiquid: null,
                renderLiquidAmount: 0
            },
            getMaterialSlot: function (index) {
                return this.container.getSlot("input2_" + index);
            },
            setMaterialSlot: function (index, id, count, data) {
                return this.container.setSlot("input2_" + index, id, count, data);
            },
            getMaterials: function () {
                var arr = [];
                for (var i = 0; i < 8; i++) {
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
                for (var i = 0; i < 8; i++) {
                    var slot = this.getMaterialSlot(i);
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
            setTopSlot: function (id, count, data) {
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
                    this.liquidContainer = new Sakura.LiquidContainer(this, "liquidContainer");
                }
                this.render = new BlockModel(Object.create(Pot.model), {}).get();
                BlockRenderer.enableCoordMapping(BlockID[Sakura.Main.MODID + ".pot"], 0, this.render);
                this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
            },
            showLiquid: function (liquid, amount) {
                BlockRenderer.unmapAtCoords(this.x, this.y + 1, this.z);
                this.data.renderLiquid = liquid;
                var texture = liquid ? Sakura.LiquidModel.getTexture(liquid) : undefined;
                if (texture) {
                    var model = BlockRenderer.Model();
                    this.render = new BlockModel(Object.create(Pot.model), {}).get();
                    //BlockRenderer.enableCoordMapping(BlockID[Sakura.Main.MODID + ".pot"], 0, this.render);
                    model.addBox(2.25 / 16, 10 / 16 - 1, 2.25 / 16, 13.75 / 16, (10 + 4 * amount / this.liquidContainer.getLimit()) / 16 - 1, 13.75 / 16, texture);
                    this.render.addEntry(model);
                    BlockRenderer.mapAtCoords(this.x, this.y + 1, this.z, this.render);
                }
            },
            placePot: function (id, count, data) {
                if (!this.data.hasPot && World.getBlock(this.x, this.y + 1, this.z).id <= 0) {
                    if (id === ItemID[Sakura.Main.MODID + ".cooking_pot"]) {
                        World.setBlock(this.x, this.y + 1, this.z, BlockID[Sakura.Main.MODID + ".pot"], 0);
                        World.addTileEntity(this.x, this.y + 1, this.z);
                        Player.setCarriedItem(id, count - 1, data);
                        this.data.hasPot = true;
                        this.liquidContainer = new Sakura.LiquidContainer(this, "liquidContainer");
                    }
                }
            },
            destroyPot: function () {
                if (this.data.hasPot && World.getBlock(this.x, this.y + 1, this.z).id === BlockID[Sakura.Main.MODID + ".pot"]) {
                    World.destroyBlock(this.x, this.y + 1, this.z, false);
                    World.drop(this.x, this.y, this.z, ItemID[Sakura.Main.MODID + ".cooking_pot"], 1, 0);
                    BlockRenderer.unmapAtCoords(this.x, this.y + 1, this.z);
                    this.data.hasPot = false;
                }
            },
            startBurn: function () {
                this.data.burn = 800;
                //let render2 = new BlockModel(FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/campfire_lit" + ".json"), {}).get();
                World.setBlock(this.x, this.y, this.z, BlockID[Sakura.Main.MODID + ".campfire_lit"], 0);
                this.showLiquid(this.data.renderLiquid, this.data.renderLiquidAmount);
            },
            tick: function () {
                if (World.getBlock(this.x, this.y, this.z).id !== Pot.blockId && World.getBlock(this.x, this.y, this.z).id !== BlockID[Sakura.Main.MODID + ".campfire_lit"]) {
                    this.selfDestroy();
                }
                if (this.data.hasPot && World.getBlock(this.x, this.y + 1, this.z).id <= 0) {
                    World.setBlock(this.x, this.y + 1, this.z, BlockID[Sakura.Main.MODID + ".pot"], 0);
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
                    var output = this.container.getSlot("output");
                    var result = Pot.recipe.sourceToResult([
                        this.getMaterials(),
                        this.liquidContainer.hasLiquid([this.liquidContainer.getLiquid().liquid, 200]),
                        {
                            id: this.getTopSlot().id,
                            data: this.getTopSlot().data
                        }
                    ]);
                    if (output.id <= 0 || Sakura.deepCompare({
                        id: output.id,
                        data: output.data
                    }, {
                        id: result === null || result === void 0 ? void 0 : result.id,
                        data: result === null || result === void 0 ? void 0 : result.data
                    })) {
                        this.data.progress = 0;
                        this.liquidContainer.holdLiquidFromContainer(this.liquidContainer.getLiquid().liquid, 200);
                        this.container.setSlot("output", result === null || result === void 0 ? void 0 : result.id, output.count + (result === null || result === void 0 ? void 0 : result.count), result === null || result === void 0 ? void 0 : result.data);
                        this.decreaseMaterial();
                        var top = this.getTopSlot();
                        if (top.count - 1 > 0) {
                            this.setTopSlot(top.id, top.count - 1, top.data);
                        }
                        else {
                            this.container.clearSlot("input1");
                        }
                    }
                }
            },
            click: function (id, count, data) {
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
                var id = Player.getCarriedItem().id, data = Player.getCarriedItem().data, count = Player.getCarriedItem().count;
                if (this.liquidContainer) {
                    var liquidData = LiquidRegistry.getEmptyItem(id, data);
                    var fullItem = LiquidRegistry.getFullItem(id, data, this.liquidContainer.getLiquid().liquid);
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
        Pot.tileEntityLit = {
            _initialized: true
        };
        Pot.recipe = new Sakura.Recipe();
        return Pot;
    }());
    Sakura.Pot = Pot;
})(Sakura || (Sakura = {}));
/// <reference path = "../TileEntity/Pot.ts" /> 
var Sakura;
/// <reference path = "../TileEntity/Pot.ts" /> 
(function (Sakura) {
    var Campfire = /** @class */ (function () {
        function Campfire() {
            Block.createSpecialType({
                base: 50, rendertype: 2, translucency: 1, lightopacity: 0, lightlevel: 8
            }, "torch");
            IDRegistry.genBlockID(Sakura.Main.MODID + ".campfire_idle");
            Block.createBlock(Sakura.Main.MODID + ".campfire_idle", [
                {
                    name: Sakura.Main.blockResource.getLang("en_us")["tile.sakura.campfire_idle.name"], textures: [["sakura_log", 0]], inCreative: true
                }
            ]);
            IDRegistry.genBlockID(Sakura.Main.MODID + ".campfire_lit");
            Block.createBlock(Sakura.Main.MODID + ".campfire_lit", [
                {
                    name: Sakura.Main.blockResource.getLang("en_us")["tile.sakura.campfire_lit.name"], textures: [["sakura_log", 0]], inCreative: false
                }
            ], "torch");
            Translation.addTranslation(Sakura.Main.blockResource.getLang("en_us")["tile.sakura.campfire_idle.name"], {
                zh: Sakura.Main.blockResource.getLang("zh_cn")["tile.sakura.campfire_idle.name"]
            });
            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(Sakura.Main.MODID + ".campfire_idle", -1, "campfire");
            Block.registerDropFunction(Sakura.Main.MODID + ".campfire_lit", function () {
                return [[
                        BlockID[Sakura.Main.MODID + ".campfire_idle"], 1, 0
                    ]];
            });
            Callback.addCallback("DestroyBlock", function (coords, block, player) {
                var tileEntity = World.getTileEntity(coords.x, coords.y, coords.z);
                if (block.id === BlockID[Sakura.Main.MODID + ".campfire_lit"] || block.id === BlockID[Sakura.Main.MODID + ".campfire_idle"]) {
                    tileEntity && tileEntity.selfDestroy();
                }
            });
            Translation.addTranslation(Sakura.Main.blockResource.getLang("en_us")["tile.sakura.campfire_lit.name"], {
                zh: Sakura.Main.blockResource.getLang("zh_cn")["tile.sakura.campfire_lit.name"]
            });
            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(Sakura.Main.MODID + ".campfire_lit", -1, "campfire_lit");
            IDRegistry.genBlockID(Sakura.Main.MODID + ".pot");
            Block.createBlock(Sakura.Main.MODID + ".pot", [
                {
                    name: "Pot", textures: [["cauldron_top", 0]], inCreative: false
                }
            ]);
            Block.setDestroyTime(Sakura.Main.MODID + ".pot", 999999999);
            Block.registerDropFunction(Sakura.Main.MODID + ".pot", function () {
                return [];
            });
            var render = new BlockModel(FileTools.ReadJSON(__dir__ + "resources/assets/sakura/models/block/pot" + ".json"), {}).get();
            BlockRenderer.enableCoordMapping(BlockID[Sakura.Main.MODID + ".pot"], 0, render);
            Block.setBlockShape(BlockID[Sakura.Main.MODID + ".pot"], {
                x: 0, y: 0, z: 0
            }, {
                x: 0, y: 0, z: 0
            }, -1);
            TileEntity.registerPrototype(BlockID[Sakura.Main.MODID + ".pot"], {
                tick: function () {
                    if (World.getBlock(this.x, this.y - 1, this.z)) {
                        if (World.getBlock(this.x, this.y - 1, this.z).id !== BlockID[Sakura.Main.MODID + ".campfire_lit"] && World.getBlock(this.x, this.y - 1, this.z).id !== BlockID[Sakura.Main.MODID + ".campfire_idle"]) {
                            World.destroyBlock(this.x, this.y, this.z, false);
                            World.removeTileEntity(this.x, this.y, this.z);
                        }
                    }
                },
                click: function () {
                    alert(Item.getName(World.getBlock(this.x, this.y - 1, this.z).id, World.getBlock(this.x, this.y - 1, this.z).data));
                    if (World.getBlock(this.x, this.y - 1, this.z).id !== BlockID[Sakura.Main.MODID + ".campfire_lit"] && World.getBlock(this.x, this.y - 1, this.z).id !== BlockID[Sakura.Main.MODID + ".campfire_idle"]) {
                        World.destroyBlock(this.x, this.y, this.z, false);
                        World.removeTileEntity(this.x, this.y, this.z);
                        alert("error");
                    }
                }
            });
            Callback.addCallback("ItemUse", function (coords, item, block, isExternal) {
                if (block.id === BlockID[Sakura.Main.MODID + ".pot"]) {
                    var tileEntity = World.getTileEntity(coords.x, coords.y - 1, coords.z);
                    if (tileEntity) {
                        Game.prevent();
                        tileEntity.onItemClick(item.id, item.count, item.data, coords);
                    }
                }
            });
            ModelHelper.setModelDir("resources/assets/sakura/models/block/");
            ModelHelper.loadModel(Sakura.Main.MODID + ".pot", 0, "pot");
            IDRegistry.genItemID(Sakura.Main.MODID + ".cooking_pot");
            Item.createItem(Sakura.Main.MODID + ".cooking_pot", Sakura.Main.itemResource.getLang("en_us")["item." + Sakura.Main.MODID + ".cooking_pot" + ".name"], {
                name: Sakura.Main.itemResource.getTexture(Sakura.Main.MODID + ".cooking_pot"),
                meta: 0
            }, {
                stack: 1
            });
            Translation.addTranslation(Sakura.Main.blockResource.getLang("en_us")["item." + Sakura.Main.MODID + ".cooking_pot" + ".name"], {
                zh: Sakura.Main.itemResource.getLang("zh_cn")["item." + Sakura.Main.MODID + ".cooking_pot" + ".name"]
            });
            new Sakura.Pot();
        }
        return Campfire;
    }());
    Sakura.Campfire = Campfire;
})(Sakura || (Sakura = {}));
/// <reference path = "../Generation/Campfire.ts" /> 
var Sakura;
/// <reference path = "../Generation/Campfire.ts" /> 
(function (Sakura) {
    var BlockLoader = /** @class */ (function () {
        function BlockLoader() {
            IDRegistry.genBlockID(Sakura.Main.MODID + ".sakura_log");
            Block.createBlock(Sakura.Main.MODID + ".sakura_log", [
                {
                    name: Sakura.Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    textures: [["sakura_log_top", 0], ["sakura_log_top", 0], ["sakura_log", 0], ["sakura_log", 0], ["sakura_log", 0], ["sakura_log", 0]],
                    inCreative: true
                },
                {
                    name: Sakura.Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    textures: [["sakura_log", 0], ["sakura_log", 0], ["sakura_log_top", 0], ["sakura_log_top", 0], ["sakura_log", 0], ["sakura_log", 0]],
                    inCreative: false
                },
                {
                    name: Sakura.Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"],
                    textures: [["sakura_log", 0], ["sakura_log", 0], ["sakura_log", 0], ["sakura_log", 0], ["sakura_log_top", 0], ["sakura_log_top", 0]],
                    inCreative: false
                }
            ], "opaque");
            Translation.addTranslation(Sakura.Main.blockResource.getLang("en_us")["tile.sakura.sakura_log.name"], {
                zh: Sakura.Main.blockResource.getLang("zh_cn")["tile.sakura.sakura_log.name"]
            });
            Callback.addCallback("ItemUse", function (coords, item, block, isExternal) {
                if (item.id === BlockID[Sakura.Main.MODID + ".sakura_log"]) {
                    if ((coords.side === Native.BlockSide.UP || coords.side === Native.BlockSide.DOWN) && Sakura.PlayerManager.canPlaceBlock({
                        x: coords.x,
                        y: coords.y + coords.side * 2 - 1,
                        z: coords.z
                    })) {
                        World.setBlock(coords.x, coords.y + coords.side * 2 - 1, coords.z, item.id, 0);
                        Player.setCarriedItem(item.id, item.count - 1, item.data);
                    }
                    if ((coords.side === Native.BlockSide.SOUTH || coords.side === Native.BlockSide.NORTH) && Sakura.PlayerManager.canPlaceBlock({
                        x: coords.x,
                        y: coords.y,
                        z: coords.z + (coords.side - 2) * 2 - 1
                    })) {
                        World.setBlock(coords.x, coords.y, coords.z + (coords.side - 2) * 2 - 1, item.id, 1);
                        Player.setCarriedItem(item.id, item.count - 1, item.data);
                    }
                    if ((coords.side === Native.BlockSide.WEST || coords.side === Native.BlockSide.EAST) && Sakura.PlayerManager.canPlaceBlock({
                        x: coords.x + (coords.side - 4) * 2 - 1,
                        y: coords.y,
                        z: coords.z
                    })) {
                        World.setBlock(coords.x + (coords.side - 4) * 2 - 1, coords.y, coords.z, item.id, 2);
                        Player.setCarriedItem(item.id, item.count - 1, item.data);
                    }
                }
            });
            Block.registerDropFunction(Sakura.Main.MODID + ".sakura_log", function () {
                return [[
                        BlockID[Sakura.Main.MODID + ".sakura_log"], 1, 0
                    ]];
            });
            IDRegistry.genBlockID(Sakura.Main.MODID + ".sakuraleaves");
            Block.createBlock(Sakura.Main.MODID + ".sakuraleaves", [{ name: "Sakura Leaves", textures: [["sakuraleaves", 0]], inCreative: true
                }]);
            Translation.addTranslation(Sakura.Main.blockResource.getLang("en_us")["tile.sakura.sakuraleaves.name"], {
                zh: Sakura.Main.blockResource.getLang("zh_cn")["tile.sakura.sakuraleaves.name"]
            });
            new Sakura.Campfire();
        }
        return BlockLoader;
    }());
    Sakura.BlockLoader = BlockLoader;
})(Sakura || (Sakura = {}));
var Sakura;
(function (Sakura) {
    var SakuraTree = /** @class */ (function () {
        function SakuraTree() {
            this.treeObject = genAPI.tree({
                leaves: {
                    id: BlockID[Sakura.Main.MODID + ".sakuraleaves"],
                    data: 0
                },
                wood: {
                    id: BlockID[Sakura.Main.MODID + ".sakura_log"],
                    data: 0
                },
                minTreeHeight: 6
            });
        }
        return SakuraTree;
    }());
    Sakura.SakuraTree = SakuraTree;
})(Sakura || (Sakura = {}));
//import ItemResource = require("./ResourceManager/ItemResource");
/// <reference path = "./ResourceManager/ItemResource.ts" /> 
/// <reference path = "./ResourceManager/BlockResource.ts" /> 
/// <reference path = "./Item/ItemLoader.ts" /> 
/// <reference path = "./Block/BlockLoader.ts" /> 
/// <reference path = "./Item/ItemDictionary.ts" /> 
/// <reference path = "./Generation/SakuraTree.ts" /> 
/// <reference path = "./TileEntity/Pot.ts" /> 
IMPORT("BlockModelLibs");
IMPORT("genTree");
var Sakura;
(function (Sakura) {
    //declare class ItemResource;
    var Main = /** @class */ (function () {
        function Main() {
        }
        Main.getVersion = function () {
            var str = "";
            for (var i = 0; i < Main.VERSION.length - 1; i++) {
                str += Main.VERSION[i];
                str += ".";
            }
            str += Main.VERSION[Main.VERSION.length - 1];
            return str;
        };
        Main.init = function () {
            Callback.addCallback("PostLoaded", function () {
                alert("Welcome to Sakura Pocket Edition " + Main.getVersion());
            });
            Main.itemResource = new Sakura.ItemResource();
            Main.blockResource = new Sakura.BlockResource();
            Main.itemDictionary = new ItemDictionary.Dictionary();
            Main.itemLoader = new Sakura.ItemLoader();
            Main.blockLoader = new Sakura.BlockLoader();
            Callback.addCallback("PostLoaded", function () {
                new Sakura.RecipeLoader();
                //let set = new Set();
                //set.add(JSON.stringify({a:1}));
                //alert(set.has(JSON.stringify({a:1})));
            });
        };
        Main.MODID = "sakura";
        Main.NAME = "Sakura";
        Main.VERSION = [1, 0, 0];
        Main.GUI_SCALE = 3.2;
        return Main;
    }());
    Sakura.Main = Main;
})(Sakura || (Sakura = {}));
Sakura.Main.init();
var ModPlus;
(function (ModPlus) {
    var ObjectPool = /** @class */ (function () {
        function ObjectPool() {
            this.set = new Set();
        }
        ObjectPool.prototype.add = function (count) {
        };
        return ObjectPool;
    }());
    ModPlus.ObjectPool = ObjectPool;
})(ModPlus || (ModPlus = {}));
var Sakura;
(function (Sakura) {
    var LiquidModel = /** @class */ (function () {
        function LiquidModel(key, texture) {
            this.key = key;
            this.texture = texture;
        }
        LiquidModel.register = function (key, texture) {
            var liquid = new LiquidModel(key, [texture]);
            this.map.set(key, liquid);
            return liquid;
        };
        LiquidModel.getTexture = function (key) {
            var _a;
            return (_a = this.map.get(key)) === null || _a === void 0 ? void 0 : _a.texture;
        };
        LiquidModel.map = new Map();
        return LiquidModel;
    }());
    Sakura.LiquidModel = LiquidModel;
    var LiquidContainer = /** @class */ (function () {
        function LiquidContainer(tileEntity, containerId) {
            this.limit = 1000;
            this.containerId = containerId;
            this.parent = tileEntity;
            this.container = this.parent.container;
            if (!tileEntity.data[containerId]) {
                tileEntity.data[containerId] = {
                    liquid: null,
                    amount: 0
                };
            }
            this.data = tileEntity.data[this.containerId];
        }
        LiquidContainer.prototype.setLimit = function (limit) {
            this.limit = limit;
            return this;
        };
        LiquidContainer.prototype.getLimit = function () {
            return this.limit;
        };
        LiquidContainer.prototype.setLiquid = function (liquid, amount) {
            this.data.liquid = liquid;
            this.data.amount = amount > this.limit ? this.limit : amount;
            return this;
        };
        LiquidContainer.prototype.addLiquid = function (liquid, amount) {
            if (this.data.liquid && this.data.liquid !== liquid) {
                return false;
            }
            if (this.data.amount === this.limit) {
                return false;
            }
            if (!this.data.liquid) {
                this.setLiquid(liquid, amount);
                return true;
            }
            if (this.data.liquid && this.data.liquid === liquid) {
                this.data.amount = (this.data.amount + amount) > this.limit ? this.limit : (this.data.amount + amount);
                return true;
            }
            return false;
        };
        LiquidContainer.prototype.getLiquid = function () {
            return {
                liquid: this.data.liquid,
                amount: this.data.amount
            };
        };
        LiquidContainer.prototype.hasLiquid = function (liquid) {
            if (this.data.liquid === liquid[0] && this.data.amount >= liquid[1]) {
                return liquid;
            }
            return [liquid[0], 0];
        };
        LiquidContainer.prototype.holdLiquidFromContainer = function (liquid, amount) {
            if (this.data.liquid === liquid) {
                if (this.data.amount > amount) {
                    this.data.amount -= amount;
                    return true;
                }
                else if (this.data.amount === amount) {
                    this.data.amount = 0;
                    this.data.liquid = null;
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        };
        LiquidContainer.prototype.updateScale = function (scale) {
            var container = this.container;
            var size = container.getBinding(scale, "element_rect");
            if (!size) {
                return;
            }
            var texture = LiquidRegistry.getLiquidUITexture(this.data.liquid, size.width(), size.height());
            container.setBinding(scale, "texture", texture);
            container.setBinding(scale, "value", this.data.amount / this.limit);
        };
        return LiquidContainer;
    }());
    Sakura.LiquidContainer = LiquidContainer;
    LiquidModel.register("water", ["water_still", 0]);
    LiquidModel.register("lava", ["lava_still", 0]);
    LiquidModel.register("milk", ["white_bg", 0]);
})(Sakura || (Sakura = {}));
var Sakura;
(function (Sakura) {
    var PlayerManager = /** @class */ (function () {
        function PlayerManager() {
        }
        PlayerManager.canPlaceBlock = function (pos) {
            var playerPos = Player.getPosition();
            if (pos.y === Math.floor(playerPos.y) - 1 || pos.y === Math.floor(playerPos.y)) {
                if (pos.x === Math.floor(playerPos.x) || pos.x === Math.ceil(playerPos.x)) {
                    if (pos.z === Math.floor(playerPos.z) || pos.z === Math.ceil(playerPos.z)) {
                        return false;
                    }
                }
            }
            return true;
        };
        return PlayerManager;
    }());
    Sakura.PlayerManager = PlayerManager;
})(Sakura || (Sakura = {}));
/// <reference path = "../header.ts" /> 
var Sakura;
/// <reference path = "../header.ts" /> 
(function (Sakura) {
    var RecipeLoader = /** @class */ (function () {
        function RecipeLoader() {
            Sakura.Main.itemDictionary.register("cropRice", {
                id: ItemID["sakura.rice"],
                data: 0
            }, {
                id: VanillaItemID.wheat_seeds,
                data: 0
            });
            Sakura.Main.itemDictionary.register("cropSeaweed", {
                id: ItemID["sakura.seaweed"],
                data: 0
            }, {
                id: VanillaItemID.dried_kelp,
                data: 0
            });
            Sakura.Pot.recipeRegister([
                [{
                        id: ItemID["sakura.black_tea_leaves"],
                        data: 0
                    }],
                ["water", 200],
                {
                    id: ItemID["sakura.cup"],
                    data: 0
                }
            ], {
                id: ItemID["sakura.black_tea"],
                data: 0,
                count: 1
            });
        }
        return RecipeLoader;
    }());
    Sakura.RecipeLoader = RecipeLoader;
})(Sakura || (Sakura = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2J1aWxkL1Jlc291cmNlTWFuYWdlci9JdGVtUmVzb3VyY2UudHMiLCIuLi9idWlsZC9SZXNvdXJjZU1hbmFnZXIvQmxvY2tSZXNvdXJjZS50cyIsIi4uL2J1aWxkL0l0ZW0vSXRlbUJhc2UudHMiLCIuLi9idWlsZC9JdGVtL0Zvb2RJbmZvLnRzIiwiLi4vYnVpbGQvSXRlbS9JdGVtRHJpbmtCYXNlLnRzIiwiLi4vYnVpbGQvSXRlbS9JdGVtRm9vZEJhc2UudHMiLCIuLi9idWlsZC9JdGVtL0l0ZW1Mb2FkZXIudHMiLCIuLi9idWlsZC9UaWxlRW50aXR5L01hY2hpbmUudHMiLCIuLi9idWlsZC9JdGVtL0l0ZW1EaWN0aW9uYXJ5LnRzIiwiLi4vYnVpbGQvVGlsZUVudGl0eS9Qb3QudHMiLCIuLi9idWlsZC9HZW5lcmF0aW9uL0NhbXBmaXJlLnRzIiwiLi4vYnVpbGQvQmxvY2svQmxvY2tMb2FkZXIudHMiLCIuLi9idWlsZC9HZW5lcmF0aW9uL1Nha3VyYVRyZWUudHMiLCIuLi9idWlsZC9oZWFkZXIudHMiLCIuLi9idWlsZC9Nb2RQbHVzL09iamVjdFBvb2wudHMiLCIuLi9idWlsZC9OYXRpdmUvTGlxdWlkTWFuYWdlci50cyIsIi4uL2J1aWxkL05hdGl2ZS9QbGF5ZXJNYW5hZ2VyLnRzIiwiLi4vYnVpbGQvUmVjaXBlL1JlY2lwZUxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBd0M7QUFFeEMsSUFBVSxNQUFNLENBaURmO0FBbkRELHdDQUF3QztBQUV4QyxXQUFVLE1BQU07SUFDWjtRQUlJLHNCQUFZLFNBQStFLEVBQUMsUUFBdUUsRUFBQyxNQUFXO1lBQW5LLDBCQUFBLEVBQUEsWUFBbUIsT0FBTyxHQUFHLG1CQUFtQixHQUFHLE9BQUEsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlO1lBQUMseUJBQUEsRUFBQSxXQUFrQixPQUFPLEdBQUcsbUJBQW1CLEdBQUcsT0FBQSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVE7WUFDL0osSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUVELHFEQUFxRDtRQUN2Qyw0QkFBZSxHQUE3QixVQUE4QixNQUFhO1lBQ3ZDLElBQUksR0FBRyxHQUFhLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsOEJBQU8sR0FBUCxVQUFRLElBQVc7WUFDZixPQUFPLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELCtCQUFRLEdBQVIsVUFBUyxNQUFhO1lBQ2xCLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDL0YsQ0FBQztRQUVELGlDQUFVLEdBQVYsVUFBVyxFQUFTO1lBQ2hCLElBQUksS0FBSyxHQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUM7Z0JBQ2YsSUFBRztvQkFDQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7Z0JBQ0QsT0FBTSxDQUFDLEVBQUM7b0JBQ0osT0FBTyxZQUFZLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMzQzthQUNKO2lCQUNHO2dCQUNBLE9BQU8sWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzQztRQUNMLENBQUM7UUFFRCwrQkFBUSxHQUFSLFVBQVMsRUFBUztZQUNkLElBQUksS0FBSyxHQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBRztnQkFDQyxPQUFPLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3RFO1lBQ0QsT0FBTSxDQUFDLEVBQUM7Z0JBQ0osT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBL0NELElBK0NDO0lBL0NZLG1CQUFZLGVBK0N4QixDQUFBO0FBQ0wsQ0FBQyxFQWpEUyxNQUFNLEtBQU4sTUFBTSxRQWlEZjtBQ25ERCxJQUFVLE1BQU0sQ0FNZjtBQU5ELFdBQVUsTUFBTTtJQUNaO1FBQW1DLGlDQUFZO1FBQzNDLHVCQUFZLFNBQWdGLEVBQUMsUUFBdUUsRUFBQyxNQUFXO1lBQXBLLDBCQUFBLEVBQUEsWUFBbUIsT0FBTyxHQUFHLG1CQUFtQixHQUFHLE9BQUEsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0I7WUFBQyx5QkFBQSxFQUFBLFdBQWtCLE9BQU8sR0FBRyxtQkFBbUIsR0FBRyxPQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUTttQkFDaEssa0JBQU0sU0FBUyxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUM7UUFDcEMsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQUpELENBQW1DLE9BQUEsWUFBWSxHQUk5QztJQUpZLG9CQUFhLGdCQUl6QixDQUFBO0FBQ0wsQ0FBQyxFQU5TLE1BQU0sS0FBTixNQUFNLFFBTWY7QUNORCx3Q0FBd0M7QUFDeEMsOERBQThEO0FBRTlELElBQVUsTUFBTSxDQXNCZjtBQXpCRCx3Q0FBd0M7QUFDeEMsOERBQThEO0FBRTlELFdBQVUsTUFBTTtJQUNaO1FBQ0ksa0JBQVksS0FBWSxFQUFDLElBQVcsRUFBQyxLQUFZLEVBQUMsS0FBYztZQUM1RCxLQUFJLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUcsRUFBQztnQkFDdkMsSUFBSSxJQUFJLEdBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxPQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUM7b0JBQzlFLElBQUksRUFBRyxPQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDekMsSUFBSSxFQUFHLENBQUM7aUJBQ1gsRUFBQztvQkFDRSxLQUFLLEVBQUcsS0FBSztpQkFDaEIsQ0FBQyxDQUFDO2dCQUNILFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFDO29CQUNwRixFQUFFLEVBQUcsT0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQztpQkFDcEUsQ0FBQyxDQUFDO2dCQUVILElBQUcsT0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztvQkFDaEMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBQSxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3pFO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFwQlksZUFBUSxXQW9CcEIsQ0FBQTtBQUNMLENBQUMsRUF0QlMsTUFBTSxLQUFOLE1BQU0sUUFzQmY7QUN6QkQsSUFBVSxNQUFNLENBZ0RmO0FBaERELFdBQVUsTUFBTTtJQUNaO1FBa0JJLGtCQUFZLElBQVcsRUFBQyxNQUFhLEVBQUMsUUFBZSxFQUFDLFVBQXdCLEVBQUMsS0FBYyxFQUFDLGFBQXNCLEVBQUMsR0FBWSxFQUFDLE9BQWdCLEVBQUMsUUFBaUIsRUFDaEssUUFBaUIsRUFBQyxhQUFzQixFQUFDLFlBQXFCLEVBQUMsV0FBb0I7WUFEakMsMkJBQUEsRUFBQSxrQkFBd0I7WUFBQyxzQkFBQSxFQUFBLFNBQWM7WUFBQyw4QkFBQSxFQUFBLGlCQUFzQjtZQUFDLG9CQUFBLEVBQUEsT0FBWTtZQUFDLHdCQUFBLEVBQUEsV0FBZ0I7WUFBQyx5QkFBQSxFQUFBLFlBQWlCO1lBQ2hLLHlCQUFBLEVBQUEsWUFBaUI7WUFBQyw4QkFBQSxFQUFBLGlCQUFzQjtZQUFDLDZCQUFBLEVBQUEsZ0JBQXFCO1lBQUMsNEJBQUEsRUFBQSxlQUFvQjtZQUMvRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUU3QixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ3ZDLENBQUM7UUFFTSwwQkFBTyxHQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFTSw4QkFBVyxHQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUE5Q0QsSUE4Q0M7SUE5Q1ksZUFBUSxXQThDcEIsQ0FBQTtBQUNMLENBQUMsRUFoRFMsTUFBTSxLQUFOLE1BQU0sUUFnRGY7QUNoREQsd0NBQXdDO0FBQ3hDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFFekMsSUFBVSxNQUFNLENBNkNmO0FBakRELHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBRXpDLFdBQVUsTUFBTTtJQUNaO1FBQW1DLGlDQUFRO1FBVXZDLHVCQUFZLEtBQVksRUFBQyxJQUFXLEVBQUMsS0FBZ0IsRUFBQyxPQUFrQztZQUF4RixpQkFnQ0M7WUEvQkcsSUFBSSxHQUFHLEdBQVksRUFBRSxDQUFDO1lBQ3RCLEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRyxFQUFDO2dCQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsUUFBQSxrQkFBTSxLQUFLLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBQztZQUN4QixLQUFJLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUcsRUFBQztnQkFDdkMsSUFBSSxJQUFJLEdBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQyxJQUFJLFNBQVMsR0FBUyxFQUFFLENBQUM7Z0JBQ3pCLEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRyxFQUFDO29CQUM1QyxTQUFTLENBQUMsSUFBSSxDQUFDO3dCQUNYLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixRQUFRLEVBQUUsR0FBRzt3QkFDYixVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2hDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNuQyxhQUFhLEVBQUUsS0FBSztvQkFDcEIsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLElBQUksRUFBRzt3QkFDSCxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTt3QkFDN0MsbUJBQW1CLEVBQUUsY0FBYzt3QkFDbkMsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsaUJBQWlCLEVBQUUsT0FBTyxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7d0JBQ3ZELGNBQWMsRUFBRSxJQUFJO3dCQUNwQixPQUFPLEVBQUcsU0FBUztxQkFDdEI7aUJBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7YUFDN0I7O1FBQ0wsQ0FBQztRQXpDTSxnQ0FBa0IsR0FBekIsVUFBMEIsR0FBVTtZQUNoQyxJQUFHLEdBQUcsS0FBSyxLQUFLLEVBQUM7Z0JBQ2IsT0FBTyxPQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2FBQzlCO2lCQUNHO2dCQUNBLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQztRQW1DTCxvQkFBQztJQUFELENBQUMsQUEzQ0QsQ0FBbUMsT0FBQSxRQUFRLEdBMkMxQztJQTNDWSxvQkFBYSxnQkEyQ3pCLENBQUE7QUFDTCxDQUFDLEVBN0NTLE1BQU0sS0FBTixNQUFNLFFBNkNmO0FDakRELHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBRXpDLElBQVUsTUFBTSxDQTJCZjtBQS9CRCx3Q0FBd0M7QUFDeEMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUV6QyxXQUFVLE1BQU07SUFDWjtRQUFrQyxnQ0FBUTtRQUV0QyxzQkFBWSxLQUFZLEVBQUMsSUFBVyxFQUFDLEtBQVksRUFBQyxLQUFnQjtZQUFsRSxpQkFzQkM7WUFyQkcsSUFBSSxHQUFHLEdBQVksRUFBRSxDQUFDO1lBQ3RCLEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRyxFQUFDO2dCQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsUUFBQSxrQkFBTSxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsU0FBQztZQUM1QixLQUFJLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUcsRUFBQztnQkFDdkMsSUFBSSxJQUFJLEdBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVyQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNuQyxhQUFhLEVBQUUsS0FBSztvQkFDcEIsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLElBQUksRUFBRzt3QkFDSCxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTt3QkFDN0MsbUJBQW1CLEVBQUUsUUFBUTt3QkFDN0IsT0FBTyxFQUFFLEtBQUs7d0JBQ0YsY0FBYyxFQUFFLEtBQUs7cUJBQ3hCO2lCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdCOztRQUNMLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUF6QkQsQ0FBa0MsT0FBQSxRQUFRLEdBeUJ6QztJQXpCWSxtQkFBWSxlQXlCeEIsQ0FBQTtBQUNMLENBQUMsRUEzQlMsTUFBTSxLQUFOLE1BQU0sUUEyQmY7QUMvQkQsd0NBQXdDO0FBQ3hDLHlDQUF5QztBQUN6Qyw4Q0FBOEM7QUFDOUMsNkNBQTZDO0FBQzdDLHlDQUF5QztBQUV6QyxJQUFVLE1BQU0sQ0E0T2Y7QUFsUEQsd0NBQXdDO0FBQ3hDLHlDQUF5QztBQUN6Qyw4Q0FBOEM7QUFDOUMsNkNBQTZDO0FBQzdDLHlDQUF5QztBQUV6QyxXQUFVLE1BQU07SUFDWjtRQUNJO1lBQ0ksSUFBSSxVQUFVLEdBQUcsT0FBQSxJQUFJLENBQUM7WUFDdEIsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUU7Z0JBQzNDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU87Z0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU07Z0JBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU07Z0JBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU87Z0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGlCQUFpQjtnQkFDMUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTztnQkFDaEMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsaUJBQWlCO2dCQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXO2dCQUNwQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVO2dCQUNuQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVO2dCQUNuQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxhQUFhO2dCQUN0QyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxjQUFjO2dCQUN2QyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxhQUFhO2dCQUN0QyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0I7Z0JBQ3pDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGdCQUFnQjtnQkFDekMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWTtnQkFDckMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWTtnQkFDckMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsa0JBQWtCO2dCQUMzQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0I7Z0JBQ3pDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWU7Z0JBQ3hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFNBQVM7Z0JBQ2xDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWU7Z0JBQ3hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGFBQWE7Z0JBQ3RDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWU7Z0JBQ3hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWU7Z0JBQ3hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU07Z0JBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGFBQWE7Z0JBQ3RDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVU7Z0JBQ25DLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGFBQWE7Z0JBQ3RDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVU7Z0JBQ25DLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFNBQVM7Z0JBQ2xDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVU7Z0JBQ25DLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU87Z0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUs7Z0JBQzlCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVk7Z0JBQ3JDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGtCQUFrQjtnQkFDM0MsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsa0JBQWtCO2dCQUMzQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxrQkFBa0I7Z0JBQzNDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGtCQUFrQjtnQkFDM0MsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTztnQkFDaEMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsaUJBQWlCO2dCQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNO2dCQUMvQixVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxpQkFBaUI7Z0JBQzFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGlCQUFpQjtnQkFDMUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsYUFBYTtnQkFDdEMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTTtnQkFDL0IsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsaUJBQWlCO2dCQUUxQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNO2dCQUMvQixVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZO2dCQUNyQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVO2dCQUNuQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZO2dCQUNyQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxhQUFhO2dCQUN0QyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXO2FBQ3ZDLENBQUMsQ0FBQztZQUNILElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO2dCQUMzQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksT0FBQSxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUNoRDtnQkFDRCxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvRixJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDM0csSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3JHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2hHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNwRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdkcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3ZHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN6RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDekcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3RHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN0RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDOUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9HLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3hHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUMxRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUMvRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDN0YsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3RHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNuRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdkcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDM0csSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxhQUFhLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2xHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDNUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3JHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNsRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDMUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUMvRixJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDMUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzVGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNyRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDbEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3RHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzFHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNqRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDL0YsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3BHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNwRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUM5RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDMUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDM0csSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDM0csSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDOUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUMvRixJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDckcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3hHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzdHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzlHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9HLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcseUJBQXlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3BILElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3JILElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN0RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDNUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3RHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNyRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDbkcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2xHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDeEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDNUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9GLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDckcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2xHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN6RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDN0YsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzlGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDakcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzlGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUM5RixJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDL0YsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2hHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNqRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDN0YsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3JHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN6RixJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDNUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNyRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzVGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNsRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ25HLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3hHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3hHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN2RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3RHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNyRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDMUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUM3RixJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDOUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3BHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNyRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDcEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzFGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3JHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUNsRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3BHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN0RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDOUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEVBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzdGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsYUFBYSxFQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUYsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQzNGLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDckcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ2pHLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUN0RyxJQUFJLE9BQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FB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