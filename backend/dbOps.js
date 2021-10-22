const sql=require("mysql")

const connectDBANDRunQuiries =async ()=>
{

    var con=sql.createConnection(
        {
            host:"localhost",
            user:"root",
            password:"",
            database:"chatapp"
        }
    )
    
    con.connect(function(err)
    {
        if(err)
        {
               console.log("Not Connected to Database"); 
        }
        else{

            //ChooseApiANDSendResponse
                console.log("Connected to Databasen in DBOPs");
        }
    })

    

}

module.exports=connectDBANDRunQuiries();