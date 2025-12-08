import LoginPage from "../pageobjects/login.page";
import {users} from "../data/users";
import {messages} from '../data/messages';
import {inventory} from '../data/inventory';

describe('Login Page Suite', ()=>{


    it('Validate valid Login', async()=>{
        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        expect(await $('.app_logo').getText()).toEqual(messages.inventory.logo);
    })

    it('Validate first product displayed', async()=>{
        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        const itemName = (await $$('.inventory_item_name'))[0];
        expect(await itemName.getText()).toEqual(inventory.items[0].name)

    })

    it('Wait for display USERNAME', async()=>{
        await LoginPage.open();
        await LoginPage.userNameInput.waitForDisplayed();
        await LoginPage.userNameInput.setValue(users.validUser.username);
    
    })

    it('Selector avanzado', async()=>{
        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        const itemAddbtn = await $(`//button[@name="${inventory.items[0].addButton}"]`);
        await itemAddbtn.click()

        expect(await $(`//button[@name="${inventory.items[0].removeButton}"]`).getText()).toEqual('Remove');

    })
}

)