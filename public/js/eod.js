function editpage() {
    window.location.href = 'eod.html';
}
function formatDateForInput(dateString) {//headscratcher.2
    console.log("iso?",dateString)
    if (dateString == 'Invalid Date') {
        console.log('no')
        return '';
    }
    const parts = dateString.split('/');
    if (parts.length === 3) {
        // Ensure that the date string is in the format "dd/MM/yyyy"
        const formattedDate = parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
        return formattedDate;
    }
 
    //console.log('date',dateString)
    if(!dateString==''){
        const dateobjt = new Date(dateString)//it didnt work when done in one line
        const dateformat = dateobjt.toLocaleDateString('en-GB');//Uk locale parameters
        //console.log(dateformat);
        jsonData.date = dateformat;
    
    }
}
function eod(){
    var response='';
    var todaydate=new Date().toLocaleDateString();
    const newday=formatDateForInput(todaydate)
    console.log("newday",newday)
    console.log(todaydate)
    var request=new XMLHttpRequest();
    request.open('PUT','/eod',true);
    request.setRequestHeader('Content-Type','application/json');

    request.onload=function(){
        
        response =JSON.parse(request.responseText);
        if(response.message=='End of day'){
            document.getElementById("eodMessage").innerHTML = 'End of day!';
            document.getElementById("eodMessage").setAttribute("class", "text-success");
           
        }
        if(response.message=='no on has timed in'){
            document.getElementById("eodMessage").innerHTML = 'No one has timed in yet !';
            document.getElementById("eodMessage").setAttribute("class", "text-danger");
           
        }
    };
    request.send();
}
