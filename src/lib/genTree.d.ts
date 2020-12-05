declare namespace genAPI {
    class rand{
        static nextInt():number;
    }
    class minecraft{
        static isAir(block:Tile):boolean;
        static isLeaves(block:Tile):boolean;
        static isWood(block:Tile):boolean;
        static canGrowInto(block:Tile):undefined;
        static canSuistainPlant(block:Tile):boolean;
        static up(position:Vector,offSet:number):Vector;
        static foliageCoordinates();
    }
    class Tree{
        getLeaves():Tile;
        getWood():Tile;
        getMinTreeHeight():number;
        generate(pos:Vector):boolean;
    }
    interface TreeProperty{
        leaves:Tile,
        wood:Tile,
        minTreeHeight:number
    }
    function tree(tree:TreeProperty):Tree;
}