const moment = require('moment');
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
    let date = new Date();
    let newDate= new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    let last_updated = moment(newDate).format('YYYY-MM-DD hh:mm:ss');

    await pool.query('UPDATE rb.supplier_map2 SET supplier=$1,last_updated=$2,updated_by=$3 WHERE vendor=$4', [supplier,last_updated,"RBUI",brand], (error, results) => {
        if (error) throw error;
        returnMessage.isError = false;
        returnMessage.message = `Successfully Updated the supplier ${brand}`;
        returnMessage.data = results.rows;
        res.status(200).json(returnMessage);
        res.end();
    })
 
}


const getUnmappedBrands = async(req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };
    await pool.query('SELECT distinct NULL, vendor AS brand, NULL, NULL FROM rb.shopify_order_item WHERE vendor not IN (SELECT vendor FROM rb.supplier_map2)', (error, results) => {
        if (error) throw error;
        returnMessage.isError = false;
        returnMessage.message = "Records found";
        returnMessage.data = results.rows;
        res.status(200).json(returnMessage);
        res.end();
    });
    
}


const updateUnmappedBrands = async (req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };

    const { brand, supplier } = req.body;

    let date = new Date();
    let newDate= new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    let last_updated = moment(newDate).format('YYYY-MM-DD hh:mm:ss');

    
    await pool.query("INSERT INTO rb.supplier_map2 (supplier,vendor,create_time,last_updated,updated_by) VALUES ($1,$2,$3,$4,$5)",[supplier,brand,last_updated,last_updated,"RBUI"], (error,results) => {
        if (error) throw error;
        returnMessage.isError = false;
        returnMessage.message = `Successfully update the Brand`;
        returnMessage.data = results.rows;
        res.status(200).json(returnMessage);
        res.end();
    })
    
}



const addSupplier = async(req,res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
    };
    const { supplier, brand} = req.body;
    let date = new Date();
    let newDate= new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    let last_updated = moment(newDate).format('YYYY-MM-DD hh:mm:ss');
    await pool.query('INSERT INTO rb.supplier_map2 (supplier,vendor,create_time,last_updated,updated_by) VALUES ($1,$2,$3,$4,$5)',[supplier,brand,last_updated,last_updated,"RBUI"], (error,results) => {
        if (error) throw error;
        returnMessage.isError = false;
        returnMessage.message = "Successfully save the Brand";
        returnMessage.data = results.rows;
        res.status(200).json(returnMessage);
        res.end();
    });

}




  

module.exports = {
    getSupplier,
    updateSupplier,
    addSupplier,
    getUnmappedBrands,
    updateUnmappedBrands
  

}