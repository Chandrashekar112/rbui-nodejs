const pool = require('./config');


const getSupplier = async (req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };
    await pool.query('select supplier, vendor as brand, last_updated, updated_by from rb.supplier_map2 ORDER BY supplier', (error, results) => {
        if (error) throw error;
        returnMessage.isError = false;
        returnMessage.message = "Records found";
        returnMessage.data = results.rows;
        res.status(200).json(returnMessage);
        res.end();
    });
}

const updateSupplier = async(req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };
    const brand = req.params.id;
    const { supplier } = req.body;

    console.log(req.body);
    var currentUtcTime = new Date();
    var currentDateTimeCentralTimeZone = new Date("",currentUtcTime.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    console.log(currentDateTimeCentralTimeZone);

    // await pool.query('UPDATE rb.supplier_map2 SET supplier=$1 WHERE vendor=$2', [supplier, brand], (error, results) => {
    //     if (error) throw error;
    //     returnMessage.isError = false;
    //     returnMessage.message = `Successfully Updated the supplier ${brand}`;
    //     returnMessage.data = results.rows;
    //     res.status(200).json(returnMessage);
    //     res.end();
    // })
    
}


const getUnmappedBrands = async(req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };
    await pool.query('select supplier, vendor as brand, last_updated::varchar, updated_by from rb.supplier_map2 UNION SELECT distinct NULL, vendor AS brand, NULL, NULL FROM rb.shopify_order_item WHERE vendor not IN (SELECT vendor FROM rb.supplier_map2) ORDER BY supplier', (error, results) => {
        if (error) throw error;
        returnMessage.isError = false;
        returnMessage.message = "Records found";
        returnMessage.data = results.rows;
        res.status(200).json(returnMessage);
        res.end();
    });
    
}

  

module.exports = {
    getSupplier,
    updateSupplier,
    getUnmappedBrands,
  

}