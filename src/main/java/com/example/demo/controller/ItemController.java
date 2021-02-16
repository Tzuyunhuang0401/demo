package com.example.demo.controller;


import cn.hutool.core.lang.UUID;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Item;
import com.example.demo.service.IItemService;
import com.sun.corba.se.spi.ior.IORTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
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
@RequestMapping("/item")
public class ItemController {
    @Autowired
    IItemService iItemService;
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    public String getitem(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Item> queryWrapper =new QueryWrapper<Item>();
        queryWrapper.eq("cate",request.getParameter("cate"));
        List<Item> items =iItemService.list(queryWrapper);
        JSONObject result=new JSONObject();
        JSONArray jsonArray =new JSONArray();
        if (items.isEmpty()){
            result.put("status","无这个类别的产品");
        }
        for (Item item:items){
            result.put("status","success");
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("cate",item.getCate());
            jsonObject.put("cid",item.getCid());
            jsonObject.put("name",item.getName());
            jsonObject.put("price",item.getPrice());
            jsonObject.put("des",item.getDescription());
            result.put("data",jsonArray);
            jsonArray.add(jsonObject);
        }
        return result.toString();
    }
    @RequestMapping(value = "/search",method = RequestMethod.POST)
    public String search(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Item> queryWrapper =new QueryWrapper<Item>();
        queryWrapper.eq("cate",request.getParameter("cate"));
        String lowprice=request.getParameter("lowprice").replaceAll("\\$","");
        String highprice=request.getParameter("highprice").replaceAll("\\$","");
        int low=Integer.parseInt(lowprice);
        int high=Integer.parseInt(highprice);
        System.out.println(low);
        System.out.println(request.getParameter("cate"));
        System.out.println(high);
        List<Item> items =iItemService.list(queryWrapper);
        JSONObject result=new JSONObject();
        JSONArray jsonArray =new JSONArray();
        if (items.isEmpty()){
            result.put("status","无这个类别的产品");
        }
        else {
            for (Item item:items){
                int price=Integer.parseInt(item.getPrice());
                System.out.println(price);
                if (price>=low&price<=high){
                    JSONObject jsonObject=new JSONObject();
                    jsonObject.put("cate",item.getCate());
                    jsonObject.put("cid",item.getCid());
                    jsonObject.put("name",item.getName());
                    jsonObject.put("price",item.getPrice());
                    jsonObject.put("des",item.getDescription());
                    result.put("data",jsonArray);
                    jsonArray.add(jsonObject);
                }
            }
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/del",method = RequestMethod.POST)
    public String delitem(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Item> queryWrapper =new QueryWrapper<Item>();
        queryWrapper.eq("cid",request.getParameter("cid"));
        boolean status= iItemService.remove(queryWrapper);
        JSONObject result=new JSONObject();
        if (status){
            result.put("status","success");
        }
        else {
            result.put("status","false");
        }
        return result.toString();
    }
    @RequestMapping(value = "/change",method = RequestMethod.POST)
    public String change(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Item> queryWrapper =new QueryWrapper<Item>();
        queryWrapper.eq("cid",request.getParameter("cid"));
        List<Item> items =iItemService.list(queryWrapper);
        JSONObject result=new JSONObject();
        if (items.isEmpty()){
            result.put("status","无这个类别的产品");
        }
        else {
            Item item1=new Item();
            item1.setPrice(request.getParameter("price"));
            iItemService.update(item1,queryWrapper);
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/getsp",method = RequestMethod.POST)
    public String spgetitem(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Item> queryWrapper =new QueryWrapper<Item>();
        queryWrapper.eq("cate",request.getParameter("cate"));
        queryWrapper.like("name",request.getParameter("like"));
        List<Item> items =iItemService.list(queryWrapper);
        JSONObject result=new JSONObject();
        JSONArray jsonArray =new JSONArray();
        if (items.isEmpty()){
            result.put("status","无这个类别的产品");
        }
        for (Item item:items){
            result.put("status","success");
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("cate",item.getCate());
            jsonObject.put("cid",item.getCid());
            jsonObject.put("name",item.getName());
            jsonObject.put("price",item.getPrice());
            jsonObject.put("des",item.getDescription());
            result.put("data",jsonArray);
            jsonArray.add(jsonObject);
        }
        return result.toString();
    }
    @RequestMapping(value = "/getcid",method = RequestMethod.POST)
    public String getitemcid(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Item> queryWrapper =new QueryWrapper<Item>();
        queryWrapper.eq("cid",request.getParameter("cid"));
        List<Item> items =iItemService.list(queryWrapper);
        JSONObject result=new JSONObject();
        if (items.isEmpty()){
            result.put("status","无这个类别的产品");
        }
        for (Item item:items){
            result.put("status","success");
            result.put("cate",item.getCate());
            result.put("cid",item.getCid());
            result.put("name",item.getName());
            result.put("price",item.getPrice());
            result.put("description",item.getDescription());
        }
        return result.toString();
    }
    @RequestMapping(value = "/getall",method = RequestMethod.POST)
    public String getitemall(HttpServletRequest request, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        List<Item> items =iItemService.list();
        JSONObject result=new JSONObject();
        JSONArray jsonArray =new JSONArray();
        if (items.isEmpty()){
            result.put("status","无产品");
        }
        for (Item item:items){
            result.put("status","success");
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("cate",item.getCate());
            jsonObject.put("cid",item.getCid());
            jsonObject.put("name",item.getName());
            jsonObject.put("price",item.getPrice());
            result.put("data",jsonArray);
            jsonArray.add(jsonObject);
        }
        return result.toString();
    }
    @RequestMapping(value = "/add",method =  {RequestMethod.POST})
    @ResponseBody
    @CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
    public String uploadimg(HttpServletRequest request,@RequestParam("file") MultipartFile file) throws Exception{
        JSONObject result =new JSONObject();
        String name =request.getParameter("name");
        String price =request.getParameter("price");
        String cid= UUID.randomUUID().toString().replaceAll("-","");
        String cate=request.getParameter("cate");
        String des=request.getParameter("des");
        if (file.isEmpty()) {
            result.put("status","false");
            return result.toString();
        }else{
            String fileName = cid+".jpg";
            String filepath = getUploadPath();
            File localFile = new File(filepath);
            if(!localFile .exists()) {
                localFile.mkdirs();
            }
            String path = filepath+fileName;
            try {
                File server_file = new File(path);
                file.transferTo(server_file);
                Item item=new Item();
                item.setCid(cid);
                item.setCate(cate);
                item.setDescription(des);
                item.setName(name);item.setPrice(price);
                iItemService.save(item);
                result.put("status","success");
            } catch (Exception e) {
                System.out.println("上传异常");
                result.put("status","false");
            }
        }
        System.out.println(result.toString());
        return result.toString();
    }
    private String getUploadPath() {
        String os = System.getProperty("os.name");
        if (os.toLowerCase().startsWith("win")) {
            String path=System.getProperty("user.dir");
            return path+"\\hzy2\\assets\\images\\";
        } else {
            return "/home/test/upload/img/";
        }
    }
}
