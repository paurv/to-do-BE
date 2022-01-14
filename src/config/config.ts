//======================================
//  Port
//======================================
process.env.PORT = process.env.PORT || (8888).toString();

//======================================
//  Entorno
//======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================================
//  Token expire date
//======================================
process.env.EXP_TOKEN = (60 * 60 * 24 * 20).toString();

//======================================
//  Auth seed
//======================================
process.env.SEED = process.env.SEED || 'this-is-the-development-seed';

//======================================
//  DB
//======================================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/ToDoDB';
} else {
    urlDB = process.env.MONGODB_URI;
}

process.env.URLDB = urlDB;