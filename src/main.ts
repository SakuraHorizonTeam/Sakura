import ModConfig from "./ModConfig/ModConfig"
import ItemLoader from "./Item/ItemLoader";
import BlockLoader from "./Block/BlockLoader";
import RecipeLoader from "./Recipe/RecipeLoader";


IMPORT("BlockModelLibs");
IMPORT("genTree");
export default class Main {
    public static itemLoader: ItemLoader;
    public static blockLoader: BlockLoader;

    public static init(): void {
        Callback.addCallback("PostLoaded", function () {
            alert("Welcome to Sakura Pocket Edition " + ModConfig.getVersion());
        });
        Main.itemLoader = new ItemLoader();
        Main.blockLoader = new BlockLoader();
        Callback.addCallback("PostLoaded", function () {
            new RecipeLoader();

            //let set = new Set();
            //set.add(JSON.stringify({a:1}));
            //alert(set.has(JSON.stringify({a:1})));
        });
    }
}

Main.init();
