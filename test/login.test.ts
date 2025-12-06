import LoginPage from "../pageobjects/login.page";
import users from "../data/users.json";

describe('Login Page Suite', ()=>{


    it('Validate valid Login', async()=>{
        await LoginPage.open();
        await LoginPage.login(users.validUser.username,users.validUser.password);

        expect(await $('.app_logo').getText()).toEqual('Swag Labs');
    })

    it('Validate first product displayed', async()=>{
        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        const itemName = (await $$('.inventory_item_name'))[0];
        expect(await itemName.getText()).toEqual('Sauce Labs Backpack')

    })

    it('Wait for display USERNAME', async()=>{
        await LoginPage.open();
        await LoginPage.userNameInput.waitForDisplayed();
        await LoginPage.userNameInput.setValue(users.validUser.username);
    
    })

    it('Selector avanzado', async()=>{
        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        const itemAddbtn = await $('//button[@name="add-to-cart-sauce-labs-backpack"]');
        await itemAddbtn.click()

        expect(await $('//button[@name="remove-sauce-labs-backpack"]').getText()).toEqual('Remove');

    })
}

)