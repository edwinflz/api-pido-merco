const container = require('./src/startup/container');
const server = container.resolve('app');
const db = container.resolve("db");


server
  .start()
  .then(async () => {
    await db.sequelize.sync();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
