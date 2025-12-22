import Page from "./page";
import { inventory } from "../data/inventory";

class InventoryPage extends Page {


    get inventoryItemNames(){
        return $$('.inventory_item_name');
    }

    //Metodo para obtener el nombre de un item por indice
    async getItemName(index:number){
        return this.inventoryItemNames[index].getText();
    }

    //Metodo para obtener el boton "Add to Cart" dinamicamente
    async getAddButton(index:number){
        const buttonName = inventory.items[index].addButton;
        return $(`//button[@name="${buttonName}"]`);
    }

    //Metodo para hacer click en Add to cart
    async addItem(index:number){
        const btn = await this.getAddButton(index);
        await btn.click();
    }

    //Metodo para obtener el boton Remove automaticamente
    async getRemoveButton(index:number){
        const buttonName = inventory.items[index].removeButton;
        return $(`//button[@name="${buttonName}"]`);
    }

    //Metodo para remover un item
    async removeItem(index:number){
        const btn = await this.getRemoveButton(index);
        await btn.click();
    }
    
}

export default new InventoryPage();

    


