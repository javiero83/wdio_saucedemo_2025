import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import { users } from "../data/users";
//import { inventory } from "../data/inventory";


describe('Inventory Suite', ()=>{
    
    it('Add first product to cart', async  ()=>{
        await loginPage.open();
        await loginPage.login(users.validUser.username, users.validUser.password);

        await inventoryPage.addItem(0);

        const removedBtn = await inventoryPage.getRemoveButton(0);
        expect(await removedBtn.getText()).toEqual('Remove');
    })
})