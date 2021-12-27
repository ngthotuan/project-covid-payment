const { sequelize } = require('../db');
const { ProductModel, ImageModel } = require('../models')(sequelize);
const path = require('path');
const { file } = require('../utils');
const { ProductConstant } = require('../constants');

const findAll = () => ProductModel.findAll();

const create = (product) => ProductModel.create(product, { include: 'images' });

const findById = (id) => ProductModel.findByPk(id, { include: ['images'] });

const update = async (id, data) => {
    const { name, amount, unit, imagePaths, imageIds, files } = data;
    const product = await ProductModel.findByPk(id, { include: ['images'] });
    product.update({
        name,
        amount,
        unit,
    });
    //await product.save();
    // update image
    let oldImages = [];
    if (imagePaths) {
        if (typeof imagePaths === 'string') {
            oldImages.push(imagePaths);
        } else {
            oldImages = imagePaths;
        }
    }

    const deleteImages = product.images.filter((image) => {
        return !oldImages.includes(image.path);
    });
    await Promise.all(
        deleteImages.map((image) => {
            file.removeFile(
                path.join(ProductConstant.PRODUCT_IMAGE_PATH, image.path),
            );
            return image.destroy();
        }),
    );
    const newImages = files.map((file) => {
        return {
            path: file.path,
            product_id: product.id,
        };
    });
    await ImageModel.bulkCreate(newImages);
};

const remove = async (id) => {
    const product = await ProductModel.findByPk(id, { include: 'images' });
    await product.destroy();
    file.removeFiles(
        product.images.map((image) =>
            path.join(ProductConstant.PRODUCT_IMAGE_PATH, image.path),
        ),
    );
};
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
};
