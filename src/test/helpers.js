const mongoose = require('mongoose');

const clearDatabase = () => {
    return new Promise ( resolver => {
        let count = 0;
        const max = Object.keys(mongoose.connection.collections).length;

        for(const i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function(){
                count++;
                if(count === max) resolver();
            });
        }
    });
};