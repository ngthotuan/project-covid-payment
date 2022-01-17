const { accountService, clientService } = require('../services');

const pay = async (req, res, next) => {
    const { clientId, amount, description, redirect } = req.query;
    console.log(req.query);
    try {
        const client = await clientService.findByClientId(clientId);
        console.log(client);
        if (!client) {
            return res.status(404).json({
                message: 'Client not found',
            });
        }
        res.render('payment', {
            title: 'Payment',
            client,
            amount,
            description,
            redirect,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
    // else {
    //     const account = req.user;
    //     const newBalance = account.balance - amount;
    //     if (newBalance < 0) {
    //         req.flash('err_msg', 'Insufficient balance');
    //     } else {
    //         await accountService.updateBalance(account.id, newBalance);
    //         const redirectUrl = redirect || client.redirect_url;
    //         res.redirect(redirectUrl);
    //     }
    // }
};

module.exports = {
    pay,
};
