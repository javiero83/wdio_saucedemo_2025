import Page from "./page";
import { inventory } from "../data/inventory";

class InventoryPage extends Page {
    //crear un getter para obtener los nombres de los productos
    get inventoryItemNames(){
        return $$('.inventory_item_name');
    }
}