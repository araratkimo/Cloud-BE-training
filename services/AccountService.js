const Account = require('../models/AccountModel');


class accountService {
    async createAccount (accountData) {
        let result = '';
        try {
        let doc = await Account.create(accountData);

        //result = 'create success, ' + doc
        result = 'Create success';
        }
        catch (err) {
            console.error(err);
            result = 'Create fail, ' + err;
        }

        return result;
    }

    async findAccount(mail){
        let result = '';
        try {
            let doc = await Account.findOne(mail);
            result = doc;
        }
        catch (err) {
            console.error(err);
        }

        return result;
    }

    async updateAccount (mail, accountData) {
        let result = '';
        try {
            let doc = await Account.updateOne(mail,accountData);

            result = 'Update success';
        }
        catch (err) {
            console.error(err);
            result = 'Update fail, ' + err;
        }

        return result;
    }
}

module.exports = new accountService();