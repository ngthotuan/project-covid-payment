const bcrypt = require('bcrypt');
const { accountService, clientService } = require('../services');

const getPayment = async (req, res, next) => {
    const { clientId, amount, description, redirect, dataCallback } = req.query;
    try {
        let client = null;
        let err = null;
        let success = false;

        if (!clientId || !amount || !description || !redirect) {
            err = 'Yêu cầu không hợp lệ';
        } else {
            client = await clientService.findByClientId(clientId);
            if (!client) {
                err = 'Yêu cầu không hợp lệ';
            } else {
                const account = req.user;
                const newBalance = account.balance - amount;
                if (newBalance < 0) {
                    err =
                        'Số dư không đủ. Vui lòng nạp thêm tiền vào tài khoản';
                } else {
                    await accountService.updateBalance(account.id, newBalance);
                    success = true;
                }
            }
        }

        const cancelUrl = `${redirect}?cancel=true`;
        let successUrl = `${redirect}?success=false`;
        if (client != null) {
            const code = bcrypt.hashSync(client.client_secret, 8);
            successUrl = `${redirect}?success=true&amount=${amount}&dataCallback=${dataCallback}&code=${code}`;
        }
        res.render('payment', {
            title: 'Thanh toán dịch vụ',
            success,
            err,
            app: client,
            amount,
            description,
            cancelUrl,
            successUrl,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getPayment,
};
