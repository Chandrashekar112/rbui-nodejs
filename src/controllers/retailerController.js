const pool = require("../modules/pool");

const getRetailer = async (req, res) => {
  const returnMessage = {
    isError: true,
    data: null,
    message: "Error occured",
  };

  await pool.connect(function (err) {
    if (err) throw err;
    pool.query("SELECT * FROM rb.retailer_setting", (error, results) => {
      if (error) {
        throw error;
      }
      returnMessage.isError = false;
      returnMessage.message = "Records found";
      returnMessage.data = results.rows;
      res.status(200).json(returnMessage);
    });
  });
};

// const filterRetailer = async (req, res) => {
//   const returnMessage = {
//     isError: true,
//     data: null,
//     message: "Error occured",
//   };

//   let company_id = parseInt(req.params.company_id);
//   await pool.connect(function (err) {
//     if (err) throw err;
//     pool.query(
//       "SELECT * FROM rb.retailer_setting WHERE company_id =$1",
//       [company_id],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         returnMessage.isError = false;
//         returnMessage.message = "Records found";
//         returnMessage.data = results.rows;
//         res.status(200).json(returnMessage);
//       }
//     );
//   });
// };

// select * from rb.retailer_setting where company_id=128450 OR retailer_state='CT';

module.exports = {
  getRetailer,
};
