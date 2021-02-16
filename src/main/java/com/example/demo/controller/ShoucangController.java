package com.example.demo.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Item;
import com.example.demo.entity.Shoucang;
import com.example.demo.service.IItemService;
import com.example.demo.service.IShoucangService;
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
 * @since 2020-11-28
 */
@RestController
@RequestMapping("/shoucang")
public class ShoucangController {
    @Autowired
    IShoucangService shoucangService;
    @Autowired
    IItemService iItemService;
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    public String getshoucang(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Shoucang> queryWrapper =new QueryWrapper<Shoucang>();
        queryWrapper.eq("uuid",request.getParameter("uuid"));
        JSONObject result=new JSONObject();
        JSONArray jsonArray=new JSONArray();
        List<Shoucang> shoucangs=shoucangService.list(queryWrapper);
        System.out.println(shoucangs);
        if (shoucangs.isEmpty()){
            result.put("status","此人无收藏");
        }
        else {
            for (Shoucang shoucang:shoucangs){
                String cid =shoucang.getCid();
                System.out.println(cid);
                QueryWrapper<Item> queryWrapper1=new QueryWrapper<Item>();
                queryWrapper1.eq("cid",cid);
                List<Item> items=iItemService.list(queryWrapper1);
                for (Item item:items){
                    JSONObject jsonObject=new JSONObject();
                    jsonObject.put("cid",item.getCid());
                    jsonObject.put("price",item.getPrice());
                    jsonObject.put("name",item.getName());
                    jsonObject.put("cate",item.getCate());
                    jsonObject.put("des",item.getDescription());
                    jsonArray.add(jsonObject);
                }
            }
            result.put("data",jsonArray);
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public String addshoucang(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        JSONObject result=new JSONObject();
        Shoucang shoucang=new Shoucang();
        shoucang.setUuid(request.getParameter("uuid"));
        shoucang.setCid(request.getParameter("cid"));
        shoucangService.save(shoucang);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/del",method = RequestMethod.POST)
    public String delshoucang(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        JSONObject result=new JSONObject();
        QueryWrapper<Shoucang> queryWrapper=new QueryWrapper<Shoucang>();
        queryWrapper.eq("uuid",request.getParameter("uuid"));
        queryWrapper.eq("cid",request.getParameter("cid"));
        shoucangService.remove(queryWrapper);
        result.put("status","success");
        return result.toString();
    }
}
