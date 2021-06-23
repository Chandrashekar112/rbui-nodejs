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

const getUnmappedBrands = async (req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };
    await pool.query('SELECT distinct NULL, vendor AS brand, NULL, NULL FROM rb.product WHERE vendor not IN (SELECT vendor FROM rb.supplier_map2)', (error, results) => {
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
    getUnmappedBrands
}