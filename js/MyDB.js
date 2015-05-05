

function convertDate(dt){
var fdt="";
	fdt = dt.substring(0,4)+"-"+dt.substring(4,6)+"-"+dt.substring(6,9)+dt.substring(9,11)+":"+dt.substring(11,13);

return fdt;
}








function CreateConfigRecord(type,val){
	
	

	html5sql.process("INSERT INTO Config (type , value) VALUES ('"+type+"',"  + val+");",
	 function(){
		if (type=="SICK"){
			
			location.reload();
		}
	 },
	 function(error, statement){
	
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
							CreateConfigRecord("HOLIDAY",0);
							CreateConfigRecord("SICK",0);
							
							
							
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

