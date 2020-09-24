/********************************************************************************** 
 * WEB422 –Assignment1* 
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy. 
 *  No part of this assignment has been copied manually or electronically from any other source* 
 *  (including web sites) or distributed to other students.*
 *  *  Name: Harmanpreet Kaur   Student ID:   103725198     Date: 25 Sptember 2020
 * *Heroku Link: _______________________________________________________________*
 * ********************************************************************************/



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://admin:admin@123@cluster0.8rtnf.mongodb.net/<dbname>?retryWrites=true&w=majority");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)

app.post('/api/sales', async (req, res) => {
    try {
        let newData = await myData.addNewSale(req.body);
        res.status(200).send({ message: newData });
    } catch (error) {
        res.status(400).send({ message: "FAILED, please try again" });
    }
});

// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )

app.get('/api/sales', async (req, res) => {
    try {
        let allData = await myData.getAllSales(req.query.page, req.query.perPage);
        res.status(200).send({ message: 'SUCCESS', data: allData });
    } catch (error) {
        res.status(400).send({ message: "FAILED, please try again" });
    }
});

// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)

app.get('/api/sales/:id', async (req, res) => {
    try {
        let data = await myData.getSaleById(req.params.id);
        res.status(200).send({ message: 'SUCCESS', data });
    } catch (error) {
        res.status(400).send({ message: "FAILED, please try again" });
    }
});

// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)

app.put('/api/sales/:id', async (req, res) => {
    try {
        let updatedData = await myData.updateSaleById(req.body, req.params.id);
        res.status(200).send({ message: updatedData });
    } catch (error) {
        res.status(400).send({ message: "FAILED, please try again" });
    }
});

// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)

app.delete('/api/sales/:id', async (req, res) => {
    try {
        let deletedData = await myData.deleteSaleById(req.params.id);
        res.status(200).send({ message: deletedData });
    } catch (error) {
        res.status(400).send({ message: "FAILED, please try again" });
    }
});

// ************* Initialize the Service & Start the Server

myData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

