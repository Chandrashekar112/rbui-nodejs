const Pool = require("pg").Pool;

const pool = new Pool({
  user: "reservebar-master",
  host: "reservebar-master.cosesp8bmzst.us-west-2.redshift.amazonaws.com",
  database: "reservebar-master",
  password: "0$sd^e2ivN!9xP!MO4Mr",
  port: 5439,
});

module.exports = pool;
