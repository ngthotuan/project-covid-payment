const { accountService, clientService } = require('../services');

const getPayment = async (req, res, next) => {
    const { clientId, amount, description, redirect } = req.query;
    try {
        const client = await clientService.findByClientId(clientId);
        if (!client) {
            return res.status(404).json({
                message: 'Client not found',
            });
        }
        const cancelUrl = `${redirect || client.redirect_url}?cancel=true`;
        res.render('payment', {
            title: 'Payment',
            app: client,
            amount,
            description,
            cancelUrl,
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
    getPayment,
};
