const jsonwebtoken = require('jsonwebtoken');

const { accountService, clientService } = require('../services');

const getPayment = async (req, res, next) => {
    const { clientId, amount, description, redirect } = req.query;
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
                if (req.user.balance < +amount) {
                    err =
                        'Số dư không đủ. Vui lòng nạp thêm tiền vào tài khoản';
                } else {
                    success = true;
                }
            }
        }

        const cancelUrl = `${redirect}?cancel=true`;
        res.render('payment/invoice', {
            title: 'Thanh toán dịch vụ',
            success,
            err,
            app: client,
            amount,
            description,
            cancelUrl,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const postPayment = async (req, res, next) => {
    const { clientId, amount, redirect, dataCallback } = req.query;
    try {
        const client = await clientService.findByClientId(clientId);
        const { id, balance } = req.user;
        const newBalance = balance - amount;
        if (newBalance < 0) {
            return res.render('payment/success', {
                title: 'Thanh toán thất bại',
                msg: 'Số dư không đủ, vui lòng nạp thêm tiền vào tài khoản',
            });
        } else {
            await accountService.payment(id, +amount);
            await accountService.updateMasterBalance(+amount);
            const token = jsonwebtoken.sign(
                {
                    amount,
                    dataCallback,
                },
                client.client_secret,
            );

            const redirectUrl = `${redirect}?success=true&token=${token}`;
            return res.render('payment/success', {
                title: 'Thanh toán thành công',
                redirectUrl,
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getPayment,
    postPayment,
};
