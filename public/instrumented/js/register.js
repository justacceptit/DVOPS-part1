function cov_12vb9jgd40(){var path="C:\\Users\\user\\OneDrive - Temasek Polytechnic\\Desktop\\devops\\DVOPS-part1\\public\\js\\register.js";var hash="1b1adb51aba50aa466d84f9b4487905646d57e83";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"C:\\Users\\user\\OneDrive - Temasek Polytechnic\\Desktop\\devops\\DVOPS-part1\\public\\js\\register.js",statementMap:{"0":{start:{line:2,column:17},end:{line:2,column:19}},"1":{start:{line:3,column:17},end:{line:3,column:29}},"2":{start:{line:4,column:2},end:{line:4,column:56}},"3":{start:{line:5,column:2},end:{line:5,column:64}},"4":{start:{line:6,column:2},end:{line:6,column:58}},"5":{start:{line:8,column:2},end:{line:11,column:3}},"6":{start:{line:9,column:6},end:{line:9,column:78}},"7":{start:{line:10,column:6},end:{line:10,column:13}},"8":{start:{line:13,column:16},end:{line:13,column:36}},"9":{start:{line:14,column:2},end:{line:14,column:42}},"10":{start:{line:15,column:2},end:{line:15,column:63}},"11":{start:{line:16,column:2},end:{line:30,column:2}},"12":{start:{line:17,column:4},end:{line:29,column:5}},"13":{start:{line:18,column:8},end:{line:18,column:52}},"14":{start:{line:20,column:8},end:{line:24,column:9}},"15":{start:{line:21,column:12},end:{line:21,column:48}},"16":{start:{line:23,column:12},end:{line:23,column:82}},"17":{start:{line:26,column:8},end:{line:26,column:56}},"18":{start:{line:27,column:8},end:{line:27,column:59}},"19":{start:{line:32,column:2},end:{line:32,column:41}}},fnMap:{"0":{name:"register",decl:{start:{line:1,column:9},end:{line:1,column:17}},loc:{start:{line:1,column:20},end:{line:33,column:1}},line:1},"1":{name:"(anonymous_1)",decl:{start:{line:16,column:19},end:{line:16,column:20}},loc:{start:{line:16,column:31},end:{line:30,column:1}},line:16}},branchMap:{"0":{loc:{start:{line:8,column:2},end:{line:11,column:3}},type:"if",locations:[{start:{line:8,column:2},end:{line:11,column:3}},{start:{line:8,column:2},end:{line:11,column:3}}],line:8},"1":{loc:{start:{line:8,column:6},end:{line:8,column:76}},type:"binary-expr",locations:[{start:{line:8,column:6},end:{line:8,column:25}},{start:{line:8,column:29},end:{line:8,column:52}},{start:{line:8,column:56},end:{line:8,column:76}}],line:8},"2":{loc:{start:{line:20,column:8},end:{line:24,column:9}},type:"if",locations:[{start:{line:20,column:8},end:{line:24,column:9}},{start:{line:20,column:8},end:{line:24,column:9}}],line:20}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},f:{"0":0,"1":0},b:{"0":[0,0],"1":[0,0,0],"2":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"1b1adb51aba50aa466d84f9b4487905646d57e83"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_12vb9jgd40=function(){return actualCoverage;};}return actualCoverage;}cov_12vb9jgd40();function register(){cov_12vb9jgd40().f[0]++;var response=(cov_12vb9jgd40().s[0]++,"");var jsonData=(cov_12vb9jgd40().s[1]++,new Object());cov_12vb9jgd40().s[2]++;jsonData.name=document.getElementById("name").value;cov_12vb9jgd40().s[3]++;jsonData.password=document.getElementById("password").value;cov_12vb9jgd40().s[4]++;jsonData.level=document.getElementById("level").value;cov_12vb9jgd40().s[5]++;if((cov_12vb9jgd40().b[1][0]++,jsonData.name=="")||(cov_12vb9jgd40().b[1][1]++,jsonData.password=="")||(cov_12vb9jgd40().b[1][2]++,jsonData.level=="")){cov_12vb9jgd40().b[0][0]++;cov_12vb9jgd40().s[6]++;document.getElementById("error").innerHTML='All fields are required!';cov_12vb9jgd40().s[7]++;return;}else{cov_12vb9jgd40().b[0][1]++;}var request=(cov_12vb9jgd40().s[8]++,new XMLHttpRequest());cov_12vb9jgd40().s[9]++;request.open("POST","/register",true);cov_12vb9jgd40().s[10]++;request.setRequestHeader('Content-Type','application/json');cov_12vb9jgd40().s[11]++;request.onload=function(){cov_12vb9jgd40().f[1]++;cov_12vb9jgd40().s[12]++;try{cov_12vb9jgd40().s[13]++;response=JSON.parse(request.responseText);cov_12vb9jgd40().s[14]++;if(response.message===undefined){cov_12vb9jgd40().b[2][0]++;cov_12vb9jgd40().s[15]++;window.location.href='index.html';}else{cov_12vb9jgd40().b[2][1]++;cov_12vb9jgd40().s[16]++;document.getElementById("error").innerHTML='Authentication failed!';}}catch(error){cov_12vb9jgd40().s[17]++;console.error('Error parsing response:',error);cov_12vb9jgd40().s[18]++;console.log('Raw response:',request.responseText);// Handle the error appropriately, e.g., display an error message
}};cov_12vb9jgd40().s[19]++;request.send(JSON.stringify(jsonData));}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTJ2YjlqZ2Q0MCIsImFjdHVhbENvdmVyYWdlIiwicmVnaXN0ZXIiLCJmIiwicmVzcG9uc2UiLCJzIiwianNvbkRhdGEiLCJPYmplY3QiLCJuYW1lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwicGFzc3dvcmQiLCJsZXZlbCIsImIiLCJpbm5lckhUTUwiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ubG9hZCIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIm1lc3NhZ2UiLCJ1bmRlZmluZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzZW5kIiwic3RyaW5naWZ5Il0sInNvdXJjZXMiOlsicmVnaXN0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgdmFyIHJlc3BvbnNlID0gXCJcIjtcclxuICB2YXIganNvbkRhdGEgPSBuZXcgT2JqZWN0KCk7XHJcbiAganNvbkRhdGEubmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZVwiKS52YWx1ZTtcclxuICBqc29uRGF0YS5wYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XHJcbiAganNvbkRhdGEubGV2ZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxldmVsXCIpLnZhbHVlO1xyXG5cclxuICBpZiAoanNvbkRhdGEubmFtZSA9PSBcIlwiIHx8IGpzb25EYXRhLnBhc3N3b3JkID09IFwiXCIgfHwganNvbkRhdGEubGV2ZWwgPT0gXCJcIikge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9ICdBbGwgZmllbGRzIGFyZSByZXF1aXJlZCEnO1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgXCIvcmVnaXN0ZXJcIiwgdHJ1ZSk7XHJcbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2UubWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2luZGV4Lmh0bWwnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JcIikuaW5uZXJIVE1MID0gJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCEnO1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyByZXNwb25zZTonLCBlcnJvcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JhdyByZXNwb25zZTonLCByZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBlcnJvciBhcHByb3ByaWF0ZWx5LCBlLmcuLCBkaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2VcclxuICAgIH1cclxufTtcclxuXHJcbiAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KGpzb25EYXRhKSk7XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoid3pGQWVZO0FBQUFBLGNBQUEsU0FBQUEsQ0FBQSxTQUFBQyxjQUFBLFdBQUFBLGNBQUEsRUFBQUQsY0FBQSxHQWZaLFFBQVMsQ0FBQUUsUUFBUUEsQ0FBQSxDQUFHLENBQUFGLGNB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