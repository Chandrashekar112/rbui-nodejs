const pool = require("../modules/pool");

const getOrders = async (req, res) => {
  await pool.connect(function (err) {
    if (err) throw err;
    pool.query("SELECT * FROM rb.order limit 5", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });
  //   res.end(data);
};

module.exports = {
  getOrders,
};
