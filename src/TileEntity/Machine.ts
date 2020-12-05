import Recipe from "./Recipe";

export default class Machine{
        static blockId : number;
        static tileEntity : TileEntity.TileEntityPrototype;
        static recipe : Recipe<any,any>;
        static UI? :  UI.IWindow;
}
