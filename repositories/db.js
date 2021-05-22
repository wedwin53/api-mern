import mongoose from 'mongoose';
import config from 'config';

const data_base = config.get('data_base');

async function DBConnection() {
        try {
            await mongoose.connect(data_base.mongo_uri, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log('Mongo conected');
        } catch (err) {
            process.exit(1);
        }
}

export default DBConnection; 