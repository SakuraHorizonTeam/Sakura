export default class ModConfig{
    public static readonly MODID: string = "sakura";
    public static readonly NAME: string = "Sakura";
    public static readonly VERSION: number[] = [1, 0, 0];
    public static readonly GUI_SCALE = 3.2;
    public static getVersion(): string {
        let str: string = "";
        for (let i: number = 0; i < this.VERSION.length - 1; i++) {
            str += this.VERSION[i];
            str += ".";
        }
        str += this.VERSION[this.VERSION.length - 1];
        return str;
    }
    
}