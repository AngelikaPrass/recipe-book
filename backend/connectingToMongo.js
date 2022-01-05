const auth = require("./auth.json").mongodb;
const mongoose = require("mongoose");
mongoose.plugin((schema) => {
    schema.options.minimize = false;
    schema.options.toJSON = {
        versionKey: false,
        transform: (doc, obj)=>{
            obj.id = obj._id;
            delete obj._id;
        }
    };
});

module.exports = mongoose.connect(`mongodb://angelika-prass:abc@${auth.host}:${auth.port}/${auth.database}`).then(()=>(mongoose));
// module.exports = mongoose.connect(`mongodb://${gacko.pl}:${27017}/${angelika-temp}`).then(()=>(mongoose));
