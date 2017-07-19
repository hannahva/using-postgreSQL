const settings = require("./settings");
const knex = require("knex")({
  client: "pg",
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname
  }
});

knex.insert({
  first_name: process.argv.slice(2)[0],
  last_name: process.argv.slice(2)[1],
  birthdate: process.argv.slice(2)[2]
}).into("famous_people").then(() => {
  console.log("Successfully added");
})
.finally(() => {
  knex.destroy();
});