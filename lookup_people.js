
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

client.connect((error) => {
  const input = process.argv.slice(2)[0];
  if (error) {
    return console.error("Connection Error", error);
  }
  console.log("Searching...");
  client.query("SELECT * FROM famous_people WHERE (first_name = $1::text OR last_name = $1::text)", [input], (error, result) => {
    if (error) {
      return console.error("error running query", error);
    };
    console.log(`Found ${result.rows.length} person(s) by the name ${input}:`);
    console.log(`- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate.toString().substring(4, 15)}'`);

    client.end();
  });
});