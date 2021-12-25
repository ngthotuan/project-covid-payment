const fs = require('fs');

module.exports = {
    removeFile: (path) => {
        try {
            fs.unlinkSync(path);
            console.log(`${path} removed`);
        } catch (err) {
            console.error(err.message);
        }
    },
    removeFiles: (paths) => {
        paths.forEach((path) => {
            try {
                fs.unlinkSync(path);
                console.log(`${path} removed`);
            } catch (err) {
                console.error(err.message);
            }
        });
    },
};
