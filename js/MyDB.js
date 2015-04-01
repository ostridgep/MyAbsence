

function convertDate(dt){
var fdt="";
	fdt = dt.substring(0,4)+"-"+dt.substring(4,6)+"-"+dt.substring(6,9)+dt.substring(9,11)+":"+dt.substring(11,13);

return fdt;
}




function opMessage(msg){



	opLog(msg);


}
function prepLogMessage(msg){

nowd=getDate();
nowt=getTime();
dtstamp=nowd+nowt;


return('INSERT INTO LogFile (datestamp , type, message ) VALUES ("'+dtstamp+'","I","'+ msg+'")');

}
function opLog(msg){

nowd=getDate();
nowt=getTime();
dtstamp=nowd+nowt;


var sqlstatement='INSERT INTO LogFile (datestamp , type, message ) VALUES ("'+dtstamp+'","I","'+ msg+'");';
	if (localStorage.Trace=='ON'){
		html5sql.process(sqlstatement,
						 function(){
							 //alert("Success Creating Tables");
						 },
						 function(error, statement){
							 window.console&&console.log("Error: " + error.message + " when processing " + statement);
						 }        
				);

	}
}

function databaseExists(){

	html5sql.process(
		["SELECT * FROM sqlite_master WHERE type='table';"],
		function(transaction, results, rowsArray){
			if( rowsArray.length > 10) {
				//alert("Database Existsh");
				return(true);
				}
			//alert("Database does not exist")
			return(false);

		},
		 function(error, statement){
			 window.console&&console.log("Error: " + error.message + " when processing " + statement);
			 return(false);
		 }   
	);
	
}	

function CreateUser(muser,vehiclereg, u, p, employeeid){
	
	opMessage("Creating User "+muser+":"+vehiclereg+":"+u+":"+p+":"+employeeid);

	html5sql.process("INSERT INTO MyUserDets (mobileuser , vehiclereg, user, password ,employeeid) VALUES ('"+muser+"','" +vehiclereg+"','" +u+"','" +p+"','" + employeeid+"');",
	 function(){
		//alert("User Created");
	 },
	 function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
	 }        
	);

}
function ChangeUserPW(muser, u, p){

	opMessage("Changing Password for User "+muser);
	html5sql.process("UPDATE MyUserDets set password = '"+p+"' Where user = '"+u+"';",
	 function(){
		 //alert("Success dropping Tables");
	 },
	 function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
	 }        
	);


}
function getURLParameters(paramName) 
{
        var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }

}
function validateUser(u, p){
var wait = true;
var retVal= false;
	opMessage("Changing Password for User "+u);
	html5sql.process("SELECT * from MyUserDets where user = '"+u+"' and password =  '"+p+"'",
	 function(transaction, results, rowsArray){
			if( rowsArray.length > 0) {
			retval = true;
			wait = false;
			//alert("hh")
			}else{
			wait = false;
			}
		
	 },
	 function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
		wait = false;
	 }        
	);
while(wait == true){
}
return(retVal);

}
function validateUserExists(u,p){

	opMessage("Checking for User "+u);
	html5sql.process("SELECT * from MyUserDets where user = '"+u+"' ",
	 function(transaction, results, rowsArray){
			if( rowsArray.length < 1) {
			return(2);
			}else if (rowsArray[0].password!=p){
			return(1);
			}else {
			return(0);
			}
		
	 },
	 function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
		return(2);
	 }        
	);
return(2);

}


function createConfig(type,value)
{

	html5sql.process("INSERT INTO Config (type , value) VALUES ("+
					 "'"+type+"',"+value+");",
	 function(){
		 
	 },
	 function(error, statement){
		opMessage("Error: " + error.message + " when createNotification processing " + statement);
	 }        
	);
}



//*************************************************************************************************************************
//
//  Create Database Tables
//
//*************************************************************************************************************************
function createTables() { 




	//opMessage("Creating The Tables");	
        
		sqlstatement='CREATE TABLE IF NOT EXISTS Config     			( id integer primary key autoincrement, type TEXT,  value INTEGER);'+
					 'CREATE TABLE IF NOT EXISTS Absence		     	( id integer primary key autoincrement, type TEXT,  start TEXT, end TEXT, days INTEGER, used TEXT, description TEXT);';
		html5sql.process(sqlstatement,
						 function(){
							
							emptyTables();
							
							
						 },
						 function(error, statement){
							 opMessage("Error: " + error.message + " when creating tables " + statement);
							
							 
						 }        
				);


}
//*************************************************************************************************************************
//
//  Delete all Tables
//
//*************************************************************************************************************************
function dropTables() { 


		sqlstatement=	'DROP VIEW IF EXISTS Config;'+
						'DROP TABLE IF EXISTS Absence;';

						html5sql.process(sqlstatement,
						 function(){
							 //alert("Success dropping Tables");
						 },
						 function(error, statement){
							
						 }        
				);
}
function emptyTables() { 
	

		sqlstatement=	'DELETE FROM  Config;'+
						'DELETE FROM  Absence;';
						
						

						html5sql.process(sqlstatement,
						 function(){
							createConfig("HOLIDAY",0);
							createConfig("SICK",0);
						 },
						 function(error, statement){
							 
							 opMessage("Error: " + error.message + " when delete processing " + statement);
						 }        
				);
}
function resetTables() { 
	var sqlstatement="";

	
		sqlstatement=	'DELETE FROM  Config;'+
						'DELETE FROM  Absence;';

					html5sql.process(sqlstatement,
					 function(){
					 },
					 function(error, statement){
						 opMessage("Error: " + error.message + " when delete processing " + statement);
					 }        
			);
}

function createDB(){

		createTables();

		


}	

