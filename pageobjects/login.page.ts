import Page from "./page";

class LoginPage extends Page{
    //--- SELECTORES
    get userNameInput(){
        return $('#user-name');
    }
    get passwordInput(){
        return $('#password');
    }
    get loginButton(){
        return $('#login-button');
    }


    // ACCIONES
    async login(username:string, password:string){
        await this.userNameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    // METODO OPEN
open() {
    return super.open('https://saucedemo.com');
}
}

export default new LoginPage();