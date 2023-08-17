'use strict';

const userForm = new UserForm();
const apiConnector = ApiConnector; 

userForm.loginFormCallback = function(data) {
    apiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error); 
        }
    });
};

userForm.registerFormCallback = function(data) {
    apiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error); 
        }
    });
};

logoutButton.action = function() {
    apiConnector.logout(response => {
        if (response.success) {
            location.reload(); 
        }
    });
};