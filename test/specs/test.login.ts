

describe('Login Page Suite', ()=>{
    it('Validate valid Login', async()=>{
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        expect(await $('.app_logo').getText()).toEqual('Swag Labs');
    })

    it('Validate first product displayed', async()=>{
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const itemName = (await $$('.inventory_item_name'))[0];
        expect(await itemName.getText()).toEqual('Sauce Labs Backpack')

    })

    it('Wait for display USERNAME', async()=>{
        await browser.url('https://www.saucedemo.com')
        await $('#user-name').waitForDisplayed();
        await $('#user-name').setValue('standard_user');

    })

    it('Selector avanzado', async()=>{
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const itemAddbtn = await $('//button[@name="add-to-cart-sauce-labs-backpack"]');
        await itemAddbtn.click()

        expect(await $('//button[@name="remove-sauce-labs-backpack"]').getText()).toEqual('Remove');

    })
}

)