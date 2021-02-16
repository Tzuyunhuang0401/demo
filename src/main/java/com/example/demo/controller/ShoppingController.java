package com.example.demo.controller;


import cn.hutool.core.util.IdUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Item;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Shopping;
import com.example.demo.service.IItemService;
import com.example.demo.service.IShoppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author hzy
 * @since 2020-11-16
 */
@RestController
@RequestMapping("/shopping")
public class ShoppingController {
    @Autowired
    IShoppingService shoppingService;
    @Autowired
    IItemService iItemService;
    @RequestMapping(value = "/change",method = RequestMethod.POST)
    public String addshoping(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("uuid");
        String shoppingitem =request.getParameter("shoppingitem");
        String discount=request.getParameter("discount");
        String money =request.getParameter("money");
        QueryWrapper<Shopping> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("uuid",userid);
        List<Shopping> shoppings =shoppingService.list(queryWrapper);
        if (shoppings.isEmpty()){
            Shopping shopping =new Shopping();
            shopping.setDiscount(discount);
            shopping.setShoplist(shoppingitem);
            shopping.setUuid(userid);
            shopping.setMoney(money);
            shoppingService.save(shopping);
            result.put("status","success");
        }
        else {
            Shopping shopping =new Shopping();
            shopping.setDiscount(discount);
            shopping.setShoplist(shoppingitem);
            shopping.setMoney(money);
            shoppingService.update(shopping,queryWrapper);
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/clear",method = RequestMethod.POST)
    public String clearshoping(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("uuid");
        Shopping shopping =new Shopping();
        shopping.setDiscount("");
        shopping.setShoplist("");
        shopping.setMoney("");
        QueryWrapper<Shopping> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("uuid",userid);
        boolean status = shoppingService.update(shopping,queryWrapper);
        if (status){
            result.put("status","success");
        }
        else {
            result.put("status","false");
        }
        return result.toString();
    }
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    public String getshoping(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("uuid");
        QueryWrapper<Shopping> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("uuid",userid);
        List<Shopping> shoppings =shoppingService.list(queryWrapper);
        if (shoppings.isEmpty()){
            result.put("status","此人暂无购物车");
        }
        for (Shopping shopping : shoppings){
            result.put("shoplist",shopping.getShoplist());
            result.put("discount",shopping.getDiscount());
            result.put("money",shopping.getMoney());
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/getdetail",method = RequestMethod.POST)
    public String getdetailshoping(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        JSONObject result =new JSONObject();
        JSONArray jsonArray =new JSONArray();
        String userid =request.getParameter("uuid");
        QueryWrapper<Shopping> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("uuid",userid);
        List<Shopping> shoppings =shoppingService.list(queryWrapper);
        if (shoppings.isEmpty()){
            result.put("status","此人暂无购物车");
        }
        else {
            for (Shopping shopping : shoppings){
                String list=shopping.getShoplist();
                JSONArray jsonArray1=JSONArray.parseArray(list);
                System.out.println(jsonArray1);
                if (jsonArray1==null||jsonArray1.toString()==""){
                    result.put("status","此人暂未添加商品");
                }else {
                    for (int i=0;i<jsonArray1.size();i++){
                        QueryWrapper<Item> queryWrapper1=new QueryWrapper<>();
                        queryWrapper1.eq("cid",jsonArray1.get(i));
                        List<Item> items=iItemService.list(queryWrapper1);
                        for (Item item :items){
                            JSONObject jsonObject=new JSONObject();
                            jsonObject.put("cate",item.getCate());
                            jsonObject.put("cid",item.getCid());
                            jsonObject.put("name",item.getName());
                            jsonObject.put("price",item.getPrice());
                            result.put("data",jsonArray);
                            jsonArray.add(jsonObject);
                        }
                    }
                }
               /* String[] array=list.split(",");
                for (int i=0;i<array.length;i++){
                    QueryWrapper<Item> queryWrapper1=new QueryWrapper<>();
                    queryWrapper1.eq("cid",array[i]);
                    List<Item> items=iItemService.list(queryWrapper1);
                    for (Item item :items){
                        JSONObject jsonObject=new JSONObject();
                        jsonObject.put("cate",item.getCate());
                        jsonObject.put("cid",item.getCid());
                        jsonObject.put("name",item.getName());
                        jsonObject.put("price",item.getPrice());
                        result.put("data",jsonArray);
                        jsonArray.add(jsonObject);
                    }
                }*/
            }
            result.put("status","success");
            result.put("data",jsonArray);
        }
        return result.toString();
    }

}
