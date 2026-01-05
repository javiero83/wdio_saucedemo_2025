import LoginPage from "../../pageobjects/login.page";
import {users} from "../../data/users";
import {messages} from '../../data/messages';
import {inventory} from '../../data/inventory';
import allureReport from '@wdio/allure-reporter';

describe('Login Page Suite', ()=>{


    it('Validate valid Login', async()=>{
        allureReport.addSeverity('critical');
        allureReport.addFeature('MAR-1010, Login');

        allureReport.addStep('Login with valid user');
        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        
        allureReport.addStep('Validate inventory page loaded');
        expect(await $('.app_logo').getText()).toEqual(messages.inventory.logo);
    })

    it('Validate first product displayed', async()=>{
        allureReport.addFeature('MAR-1010, Login');

        await LoginPage.open();
        await LoginPage.login(users.validUser.username, users.validUser.password);

        const itemName = (await $$('.inventory_item_name'))[0];
        expect(await itemName.getText()).toEqual(inventory.items[0].name)

    })

    it('Wait for display USERNAME', async()=>{
        allureReport.addFeature('MAR-1011, Display');

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