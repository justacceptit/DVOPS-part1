function editpage() {
    window.location.href = 'eod.html';
}
function eod(){
    var response='';
    var todaydate=new Date().toLocaleDateString('en-GB');
   // const newday=formatDateForInput(todaydate)
   // console.log("newday",newday)
   // console.log(todaydate)
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
function confirmation(){
   var usercon= window.confirm('Are you Sure? once changes are made, it cannot be reversed')
    if (usercon==true)
    eod()
else{
    
}
    
}
