export default class Tools {
    randomNum(minNum: number, maxNum:number):number {
        switch (arguments.length) {
            case 1:
                return Math.round(Math.random() * minNum + 1);
                break;
            case 2:
                return Math.round(Math.random() * (maxNum - minNum + 1) + minNum);
                break;
            default:
                return 0;
                break;
        }
    }

    /**
     * 返回随机物品
     * 
     * @param {{
     *         id:number,
     *         data:number,
     *         count:[min:number,max:number],
     *         probability:number
     *     }[]} obj 
     * @returns 
     * 
     * @memberOf Tools
     */
    randomDrop(obj:{
        id:number,
        data:number,
        count:[min:number,max:number],
        probability:number
    }[]) {
        let drops = [];
        obj.forEach((array)=>{
            if (Math.random() >= array.probability) {
                drops.push([array.id,this.randomNum(array.count[0],array.count[1]),array.data])
            }
        });
        return drops;
    }
}

