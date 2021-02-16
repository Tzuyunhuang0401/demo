package com.example.demo.controller;


import cn.hutool.core.lang.UUID;
import cn.hutool.core.util.IdUtil;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Item;
import com.example.demo.entity.User;
import com.example.demo.entity.Userinfo;
import com.example.demo.service.IUserinfoService;
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
@RequestMapping("/userinfo")
public class UserinfoController {
    @Autowired
    IUserinfoService userinfoService;
    @RequestMapping(value = "/change",method = RequestMethod.POST)
    public String addinfo(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Userinfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uuid",request.getParameter("uuid"));
        List<Userinfo> userinfos = userinfoService.list(queryWrapper);
        if (userinfos.isEmpty()){
            String name =request.getParameter("name");
            String email =request.getParameter("email");
            String phone =request.getParameter("phone");
            String address =request.getParameter("address");
            String uuid =request.getParameter("uuid");
            Userinfo userinfo =new Userinfo();
            userinfo.setAddress(address);
            userinfo.setEmail(email);
            userinfo.setName(name);
            userinfo.setPhone(phone);
            userinfo.setUuid(uuid);
            userinfoService.save(userinfo);
            result.put("status","success");
        }
        else {
            String name =request.getParameter("name");
            String email =request.getParameter("email");
            String phone =request.getParameter("phone");
            String address =request.getParameter("address");
            Userinfo userinfo =new Userinfo();
            userinfo.setAddress(address);
            userinfo.setEmail(email);
            userinfo.setName(name);
            userinfo.setPhone(phone);
            userinfoService.update(userinfo,queryWrapper);
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    public String getinfo(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<Userinfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uuid",request.getParameter("uuid"));
        List<Userinfo> userinfos = userinfoService.list(queryWrapper);
        if (userinfos.isEmpty()){
            result.put("status","此用户暂无个人信息，请添加");
        }
        else {
            for (Userinfo userinfo:userinfos){
                result.put("name",userinfo.getName());
                result.put("email",userinfo.getEmail());
                result.put("phone",userinfo.getPhone());
                result.put("address",userinfo.getAddress());
                result.put("uuid",userinfo.getUuid());
                result.put("status","success");
            }
        }
        return result.toString();
    }
    @RequestMapping(value = "/img",method =  {RequestMethod.POST})
    @ResponseBody
    @CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
    public String uploadimg(HttpServletRequest request,@RequestParam("file") MultipartFile file) throws Exception{
        JSONObject result =new JSONObject();
        String uuid= request.getParameter("uuid");
        if (file.isEmpty()) {
            result.put("status","false");
            return result.toString();
        }else{
            String fileName = uuid+".jpg";
            String filepath = getUploadPath();
            File localFile = new File(filepath);
            if(!localFile .exists()) {
                localFile.mkdirs();
            }
            String path = filepath+fileName;
            try {
                File server_file = new File(path);
                file.transferTo(server_file);
            } catch (Exception e) {
                System.out.println("上传异常");
                result.put("status","false");
            }
            result.put("status","success");
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
