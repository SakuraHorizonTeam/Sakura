import Item from "../Item/Item"

export default function compareItem(a:Item,b:Item):number{
    if(a.id !== b.id){
        return a.id - b.id;
    }
    else{
        return a.data - b.data;
    }
}
