var uuid=localStorage.getItem("uuid")
var shoppingitem=localStorage.getItem("shoppingitem");
if (shoppingitem == null|shoppingitem ==''){
    var shoppingitem =new Array();
}
else {
    shoppingitem=JSON.parse(shoppingitem)
}
var money=0
$.post("http://127.0.0.1:25564/item/get",
{
    cate:'GPU',
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setgpu(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
$.post("http://127.0.0.1:25564/item/get",
{
    cate:'RAM',
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setram(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
$.post("http://127.0.0.1:25564/item/get",
{
    cate:'PSU',
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setpsu(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
$.post("http://127.0.0.1:25564/item/get",
{
    cate:'FAN',
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setfan(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
$.post("http://127.0.0.1:25564/item/get",
{
    cate:'DISK',
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setdisk(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
$.post("http://127.0.0.1:25564/item/get",
{
    cate:'CASE',
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setcase(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
function choosemb(element){
    localStorage.setItem("cpucate",$("#inputcpulb").val())
    $.post("http://127.0.0.1:25564/item/getsp",
{
    cate:'motherboard',
    like:localStorage.getItem("cpucate"),
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setmb(datas.data)
        $.post("http://127.0.0.1:25564/item/getsp",
{
    cate:'CPU',
    like:localStorage.getItem("cpucate"),
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data)
        setcpu(datas.data)
    }
    else{
        alert("状态:"+datas.status)
    }
});
    }
    else{
        alert("状态:"+datas.status)
    }
});
}
function setfan(data){
var json=eval(data)
$("#fanbox tbody").empty();
for(var i=0; i<json.length; i++) {
    var str=`<tr>
    <td>${i+1}</td>
    <td>${json[i].name}</td>
    <td>${json[i].price}</td>
    <td>${json[i].des}</td>
    <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getfan(this)">选择</button></td>
    </tr>`
    $("#fanbox tbody").append(str)
}
}
function setcase(data){
    var json=eval(data)
    $("#casebox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getcase(this)">选择</button></td>
        </tr>`
        $("#casebox tbody").append(str)
    }
    }
function setdisk(data){
    var json=eval(data)
    $("#diskbox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getdisk(this)">选择</button></td>
        </tr>`
        $("#diskbox tbody").append(str)
    }
    }
function setmb(data){
    var json=eval(data)
    $("#mbbox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getmb(this)">选择</button></td>
        </tr>`
        $("#mbbox tbody").append(str)
    }
    }
function setram(data){
    var json=eval(data)
    $("#rambox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getram(this)">选择</button></td>
        </tr>`
        $("#rambox tbody").append(str)
    }
    }
function setpsu(data){
var json=eval(data)
$("#psubox tbody").empty();
for(var i=0; i<json.length; i++) {
    var str=`<tr>
    <td>${i+1}</td>
    <td>${json[i].name}</td>
    <td>${json[i].price}</td>
    <td>${json[i].des}</td>
    <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getpsu(this)">选择</button></td>
    </tr>`
    $("#psubox tbody").append(str)
}
}
function setgpu(data){
    var json=eval(data)
    $("#gpubox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getgpu(this)">选择</button></td>
        </tr>`
        $("#gpubox tbody").append(str)
    }
    }
function setcpu(data){
    var json=eval(data)
    $("#cpubox tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" onclick="getcpu(this)">选择</button></td>
        </tr>`
        $("#cpubox tbody").append(str)
    }
    }
function getmb(element){
    localStorage.setItem("mb",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
    console.log(money)
}
function getcpu(element){
    localStorage.setItem("cpu",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    console.log(money)
    alert("选择成功")
}
function getgpu(element){
    localStorage.setItem("gpu",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
}
function getram(element){
    localStorage.setItem("ram",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
}
function getpsu(element){
    localStorage.setItem("psu",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
}
function getfan(element){
    localStorage.setItem("fan",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
}
function getdisk(element){
    localStorage.setItem("disk",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
}
function getcase(element){
    localStorage.setItem("case",$(element).attr("cid"))
    money=parseInt(money)+parseInt($(element).attr("money"))
    alert("选择成功")
}
function checkchoose(element){
    shoppingitem.push(localStorage.getItem("mb"))
    shoppingitem.push(localStorage.getItem("cpu"))
    shoppingitem.push(localStorage.getItem("gpu"))
    shoppingitem.push(localStorage.getItem("ram"))
    shoppingitem.push(localStorage.getItem("psu"))
    shoppingitem.push(localStorage.getItem("fan"))
    shoppingitem.push(localStorage.getItem("disk"))
    shoppingitem.push(localStorage.getItem("case"))
    localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
    localStorage.setItem("money",money)
    $.post("http://127.0.0.1:25564/shopping/change",
    {
        uuid:uuid,
        shoppingitem:JSON.stringify(shoppingitem),
        discount:'1',
        money:money,
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
            window.location.href="checkout.html?count="+money
        }
        else{
            console.log("状态:"+datas.status)
        }
    });
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
};
function logout(element){
    localStorage.setItem("uuid","")
}
function choosezj(element) {
    $.post("http://127.0.0.1:25564/item/search",
        {
            cate:'PC',
            lowprice:$("#price1").val(),
            highprice:$("#price2").val(),
        },
        function(data,status){
            var datas=JSON.parse(data);
            if(datas.status == "success"){
                console.log(data);
                setzj(datas.data);
            }
            else{
                console.log("状态:"+datas.status)
            }
        });
}
function setzj(data){
    var json=eval(data)
    $("#choosezj tbody").empty();
    for(var i=0; i<json.length; i++) {
        var str=`<tr>
        <td>${i+1}</td>
        <td>${json[i].name}</td>
        <td>${json[i].price}</td>
        <td>${json[i].des}</td>
        <td><button type="button" class="btn btn-primary" cid="${json[i].cid}" money="${json[i].price}" cname="${json[i].name}" onclick="setzj2(this)">选择</button></td>
        </tr>`
        $("#choosezj tbody").append(str)
    }
}
function setzj2(element) {
    let name=$(element).attr("cname")
    if (name=='整机一号'){
        shoppingitem.splice(0,shoppingitem.length);
        shoppingitem.push('a72e2a47bae14095a09df4c416dcc69f')
        shoppingitem.push('a8dee1e0e479b411')
        shoppingitem.push('c5e2a8a7979940958e92489377d30ea5')
        shoppingitem.push('9b03f6b9d1e34eaea47990fd9f81d4c7')
        shoppingitem.push('63c2e2aac0d64829aa1a6fdad809fdac')
        shoppingitem.push('5b8f4babNb29198a5')
        shoppingitem.push('34ae22a196824f5e8edd9788643dbb35')
        shoppingitem.push('613b8ca68cad42d297ce66384ea98b0c')
        localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
        localStorage.setItem("money",5000)
    }
else if (name=='整机二号'){
        shoppingitem.splice(0,shoppingitem.length);
        shoppingitem.push('a72e2a47bae14095a09df4c416dcc69f')
        shoppingitem.push('737d12f911ff4367878eae45c2f8f05f')
        shoppingitem.push('c5e2a8a7979940958e92489377d30ea5')
        shoppingitem.push('96e7f22e2a5b96e6')
        shoppingitem.push('63c2e2aac0d64829aa1a6fdad809fdac')
        shoppingitem.push('96e2d94061994d6fb38416ba60e37cf9')
        shoppingitem.push('34ae22a196824f5e8edd9788643dbb35')
        shoppingitem.push('a3ee65cea32047e89a0ebfa9100c8b32')
        localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
        localStorage.setItem("money",10000)
    }
    else if (name=='整机三号'){
        shoppingitem.splice(0,shoppingitem.length);
        shoppingitem.push('9e42e05bda5e891d')
        shoppingitem.push('9da4e5bae7339fb0')
        shoppingitem.push('062b0c503309f0ea')
        shoppingitem.push('6b78c03c14514220bfe9bc6a38055ad5')
        shoppingitem.push('efb96e728fc34f84ae1f1eb189330254')
        shoppingitem.push('5b8f4babNb29198a5')
        shoppingitem.push('5b76c4feNfe9d9da9')
        shoppingitem.push('3c4c0c5480fe89c1')
        localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
        localStorage.setItem("money",15000)
    }
    else if (name=='整机四号'){
        shoppingitem.splice(0,shoppingitem.length);
        shoppingitem.push('97748ee525d849f796c30097f3c6159f')
        shoppingitem.push('08bce150e495432484c789a0a3d54478')
        shoppingitem.push('c5e2a8a7979940958e92489377d30ea5')
        shoppingitem.push('96e7f22e2a5b96e6')
        shoppingitem.push('63c2e2aac0d64829aa1a6fdad809fdac')
        shoppingitem.push('96e2d94061994d6fb38416ba60e37cf9')
        shoppingitem.push('34ae22a196824f5e8edd9788643dbb35')
        shoppingitem.push('a3ee65cea32047e89a0ebfa9100c8b32')
        localStorage.setItem("shoppingitem",JSON.stringify(shoppingitem))
        localStorage.setItem("money",20000)
    }
    $.post("http://127.0.0.1:25564/shopping/change",
        {
            uuid:uuid,
            shoppingitem:JSON.stringify(shoppingitem),
            discount:'1',
            money:localStorage.getItem("money"),
        },
        function(data,status){
            var datas=JSON.parse(data);
            if(datas.status == "success"){
                console.log(data);
                window.location.href="checkout.html?count="+localStorage.getItem("money")
            }
            else{
                console.log("状态:"+datas.status)
            }
        });
}