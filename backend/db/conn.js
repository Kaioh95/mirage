require("dotenv").config()
const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function main(){
    await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.mz4iw0j.mongodb.net/fstDatabase?retryWrites=true&w=majority`
    )
    console.log('Conectou ao Banco de Dados!')
}

main().catch((err) => console.log(err))

module.exports = mongoose
