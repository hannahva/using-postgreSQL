
const pg = require("pg");
const settings = require("./settings");
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const printPerson = (result) => {
  console.log(`Found ${result.rows.length} person(s) by the name ${process.argv.slice(2)[0]}:`);
};

const printPeople = (result) => {
  result.rows.forEach((result) => {
      console.log(`- ${result.id}: ${result.first_name} ${result.last_name}, born '${result.birthdate.toString().substring(4, 15)}'`);
    });
};


client.connect((error) => {
  if (error) {
    return console.error("Connection Error", error);
  }
  console.log("Searching...");
  client.query("SELECT * FROM famous_people WHERE (first_name = $1::text OR last_name = $1::text)", [process.argv.slice(2)[0]], (error, result) => {
    if (error) {
      return console.error("error running query", error);
    };
    printPerson(result);
    printPeople(result);
    client.end();
  });
});
