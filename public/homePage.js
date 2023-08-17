const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
    }
});

const ratesBoard = new RatesBoard();
function fetchCurrencyRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable(); 
            ratesBoard.fillTable(response.data); 
        }
    });
}
fetchCurrencyRates(); 
setInterval(fetchCurrencyRates, 60000); 

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); 
            moneyManager.setMessage(true, "Деньги успешно добавлены");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); 
            moneyManager.setMessage(true, "Конвертация выполнена успешно");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); 
            moneyManager.setMessage(true, "Перевод выполнен успешно");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен в избранное");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

favoritesWidget.removeUserCallback = id => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь удален из избранного");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};
