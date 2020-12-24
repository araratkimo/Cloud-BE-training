const AccountServices = require('../services/AccountService');

class accountController {

    // Get Account Data
    async getAccountData(ctx, next) {
    
        let mail = ctx.request.query;

        if (!mail) {
            throw new InvalidQueryError();
        }

        const Account = await AccountServices.findAccount(mail);

        if (Account) {
            ctx.body = Account;
        }
        else{
            ctx.body = 'Can not find this account';
        }

    }   
    
    // Create New Account
    async newAccountData(ctx, next) {
     
        let data = ctx.request.body;

        if (!data) {
            throw new InvalidQueryError();
        }

        const Account = await AccountServices.findAccount({mail: data.mail});

        if (Account) {
            ctx.body = 'Account already exists';
        }
        else{
            const result = await AccountServices.createAccount(data);
            ctx.body = result;
        }
     
    }   
    
    // Update Account Data
    async updateAccountData(ctx, next) {
     
        let mail = ctx.request.query;
        let data = ctx.request.body;

        if (!data||!mail) {
            throw new InvalidQueryError();
        }

        const Account = await AccountServices.findAccount(mail);

        if (Account) {
            const result = await AccountServices.updateAccount(mail,data);
            ctx.body = result;
        }
        else{
            //const result = await AccountServices.createAccount(data)
            //ctx.body = result
            
            ctx.body = 'Can not find this account,please create account first';
        }     
    }    

    // Upload  Avatat
    async uploadAvatar(ctx, next) {
        let mail = ctx.request.query;
        let filepath = ctx.req.file.path;

        if (!filepath||!mail) {
            throw new InvalidQueryError();
        }

        const Account = await AccountServices.findAccount(mail);

        if (Account) {
            
            const AvatarData = {
                mail:mail.mail,
                avatar: filepath,
            }


            const result = await AccountServices.updateAccount(mail,AvatarData);
            ctx.body = result;
        }
        else{

            ctx.body = 'Can not find this account,please create account first';
        }
    }
}

module.exports = new accountController();



