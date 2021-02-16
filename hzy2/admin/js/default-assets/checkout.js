var money=getQueryVariable("count");
var uuid=localStorage.getItem("uuid");
var shoppingitem=localStorage.getItem("shoppingitem");
$.post("http://127.0.0.1:25564/shopping/getdetail",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.data);
    }
    else{
        console.log("状态:"+datas.status)
    }
});
function innerHTMl(data){
    var json = eval(data);
    $("#cartbox").empty();
    $("#shopcount").text(parseInt(money)+"元");
    for(var i=0; i<json.length; i++) 
    {
        var str=`<li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
            <div class="checkout-thumb mb-10">
                <img src="../assets/images/${json[i].cid}.jpg" alt="Product">
            </div>
            <h6 class="mb-0 font-14">${json[i].name}</h6>
        </div>
        <span>${json[i].price}元</span>
    </li>`
        $("#cartbox").append(str);
    }
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
function addzd(element){
    $.post("http://127.0.0.1:25564/payment/add",
{
    uuid:uuid,
    money:money,
    info:shoppingitem

},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        alert("结算并支付成功！")
        localStorage.setItem("shoppingitem","")
        localStorage.setItem("money","")
        $("#datatable tbody").empty();
        $("#allfeiyong").text('$0');
        $("#subtotal").text('$0');
        $.post("http://127.0.0.1:25564/shopping/clear",
    {
        uuid:uuid,
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
        }
        else{
            alert("状态:"+datas.status)
        }
    });
    }
    else{
        console.log("状态:"+datas.status)
    }
});
}