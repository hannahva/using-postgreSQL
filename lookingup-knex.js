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

const printPerson = (result) => {
  console.log(`Found ${result.length} person(s) by the name ${process.argv.slice(2)[0]}:`);
};

const printPeople = (result) => {
  result.forEach((result) => {
      console.log(`- ${result.id}: ${result.first_name} ${result.last_name}, born '${result.birthdate.toString().substring(4, 15)}'`);
    });
};


knex.select().from('famous_people').asCallback((error, result) => {
  if (error) {
    return console.error("Connection Error", error);
  }
  console.log("Searching...");
  knex.select().from('famous_people').where(function(){
    this.where('first_name', process.argv.slice(2)[0]).orWhere('last_name', process.argv.slice(2)[0])
  }).asCallback((error, result) => {
    if (error) {
      return console.error("error running query", error);
    }
    printPerson(result);
    printPeople(result);
    knex.destroy();
  });
});
