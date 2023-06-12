const dbConnection = require('../db');
const { connect } = require('../routes/contactRoutes');

const createContact=async(req,res,next)=>{
    const  {data_store,...remain}=req.body;
    if(data_store==="CRM"){
        const response = await fetch(process.env.CRM_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Token token=${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: remain })
        });
        const data = await response.json();
        res.send({
            id: data.contact.id,
            first_name: data.contact.first_name,
            last_name: data.contact.last_name,
            email: data.contact.email,
            mobile_number: data.contact.mobile_number
        });        
    }
    else{
        
        const connect  = dbConnection.dbConnection()
        connect.query('INSERT INTO test (first_name,last_name,mobile_number,email) VALUES (?,?,?,?)',[remain.first_name,remain.last_name,parseInt(remain.mobile_number),remain.email],(err,rows,fields)=>{
            if(!err){
                res.send('Inserted Successfully');
            }
            else console.log(err);
        });
    }
}

const getContactByID = async(req,res,next)=>{
    const  {data_store,id}=req.body;
    console.log(req.body)
    if (data_store === "CRM") {
        const response = await fetch(`${process.env.CRM_URL}/${id}?include=sales_accounts`, {
            method: 'GET',
            headers: {
                'Authorization': `Token token=${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.send({
            id: data.contact.id,
            first_name: data.contact.first_name,
            last_name: data.contact.last_name,
            email: data.contact.email,
            mobile_number: data.contact.mobile_number
        });
    } else {
        const connect  = dbConnection.dbConnection()
        connect.query('SELECT * FROM test WHERE id = ?',[id],(err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }
            else console.log(err);
        });
    }
}


const updateContact =async(req,res,next)=>{
    const { data_store, id, email, mobile_number } = req.body;
if (data_store === "CRM") {
    const response = await fetch(`${process.env.CRM_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Token token=${process.env.API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact: {
                mobile_number: mobile_number,
                email: email,
                custom_field: { cf_is_active: false }
            }
        })
    });
    const data = await response.json();
    res.send({
        id: data.contact.id,
        first_name: data.contact.first_name,
        last_name: data.contact.last_name,
        email: data.contact.email,
        mobile_number: data.contact.mobile_number
    });
    } else {
        res.send({
            message:"Sorry I dont have experience with MYSQL"
        })
    }
}

const delteContact=async(req,res,next)=>{
    const { data_store, id } = req.body;
    if (data_store === "CRM") {
        const response = await fetch(`${process.env.CRM_URL}/${id}?include=sales_accounts`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token token=${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            res.send("Deleted contact");
        } else {
            res.send("error occurred");
        }
    } else {
        const connect  = dbConnection.dbConnection()
        connect.query('DELETE FROM test WHERE id = ?',[id],(err,rows,fields)=>{
            if(!err){
                res.send('Deleted Successfully');
            }
            else console.log(err);
        });
    }
}

exports.createContact = createContact
exports.getContactByID=getContactByID
exports.updateContact=updateContact
exports.delteContact=delteContact