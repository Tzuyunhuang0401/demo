package com.example.demo.controller;


import cn.hutool.core.util.IdUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Shopping;
import com.example.demo.entity.User;
import com.example.demo.service.IUserService;
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
@RequestMapping("/user")
public class UserController {
    @Autowired
    IUserService userService;
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("username");
        String password =request.getParameter("password");
        QueryWrapper<User> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("username",userid);
        queryWrapper.eq("password",password);
        List<User> users =userService.list(queryWrapper);
        if (users.isEmpty()){
            result.put("status","账户密码错误");
        }
        else {
            for (User user : users){
                String uuid = user.getUuid();
                String role =user.getRole();
                result.put("uuid",uuid);
                result.put("role",role);
            }
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public String addaccount(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("username");
        String password =request.getParameter("password");
        String role =request.getParameter("role");
        String question =request.getParameter("question");
        String answer =request.getParameter("answer");
        User user = new User();
        user.setPassword(password);
        user.setUsername(userid);
        user.setUuid(IdUtil.objectId());
        user.setRole(role);
        user.setAnswer(answer);
        user.setQuestion(question);
        userService.save(user);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    public String getuser(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        JSONArray jsonArray=new JSONArray();
        response.addHeader("Access-Control-Allow-Origin","*");
        List<User> users=userService.list();
        for (User user:users){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("uuid",user.getUuid());
            jsonObject.put("username",user.getUsername());
            jsonObject.put("role",user.getRole());
            jsonArray.add(jsonObject);
        }
        result.put("data",jsonArray);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/check",method = RequestMethod.POST)
    public String checkpassword(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        JSONArray jsonArray=new JSONArray();
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("username",request.getParameter("username"));
        queryWrapper.eq("question",request.getParameter("question"));
        queryWrapper.eq("answer",request.getParameter("answer"));
        List<User> users=userService.list(queryWrapper);
        if (users.isEmpty()){
            result.put("status","密保问题与用户不一致或答案错误");
        }
        else {
            User user=new User();
            user.setPassword(request.getParameter("password"));
            userService.update(user,queryWrapper);
            result.put("status","success");
        }
        return result.toString();
    }
    @RequestMapping(value = "/remove",method = RequestMethod.POST)
    public String remove(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        JSONArray jsonArray=new JSONArray();
        response.addHeader("Access-Control-Allow-Origin","*");
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("uuid",request.getParameter("uuid"));
        boolean check =userService.remove(queryWrapper);
        if (check){
            result.put("status","success");
        }
        else {
            result.put("status","无此用户");
        }
        return result.toString();
    }
}
