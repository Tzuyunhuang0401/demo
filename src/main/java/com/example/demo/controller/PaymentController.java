package com.example.demo.controller;


import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.IdUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.entity.Payment;
import com.example.demo.service.IPaymentService;
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
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    IPaymentService paymentService;
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public String createpay(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("uuid");
        String paymoney =request.getParameter("money");
        String paycheck ="未完成";
        String pid =IdUtil.objectId();
        Payment payment =new Payment();
        payment.setMoney(paymoney);
        payment.setPay(paycheck);
        payment.setUuid(userid);
        payment.setPid(pid);
        payment.setTime(DateUtil.now());
        payment.setInfo(request.getParameter("info"));
        paymentService.save(payment);
        result.put("status","success");
        result.put("pid",pid);
        return result.toString();
    }
    @RequestMapping(value = "/del",method = RequestMethod.POST)
    public String delpay(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String pid =request.getParameter("pid");
        QueryWrapper<Payment> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("pid",pid);
        paymentService.remove(queryWrapper);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    public String getpay(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("uuid");
        QueryWrapper<Payment> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("uuid",userid);
        List<Payment> payments=paymentService.list(queryWrapper);
        JSONArray jsonArray =new JSONArray();
        for (Payment payment:payments){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("money",payment.getMoney());
            jsonObject.put("pay",payment.getPay());
            jsonObject.put("date",payment.getTime());
            jsonObject.put("pid",payment.getPid());
            jsonObject.put("uuid",payment.getUuid());
            result.put("data",jsonArray);
            jsonArray.add(jsonObject);
        }
        result.put("data",jsonArray);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/detail",method = RequestMethod.POST)
    public String getdetail(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String pid =request.getParameter("pid");

        QueryWrapper<Payment> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("pid",pid);
        List<Payment> payments=paymentService.list(queryWrapper);
        JSONArray jsonArray =new JSONArray();
        for (Payment payment:payments){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("money",payment.getMoney());
            jsonObject.put("pay",payment.getPay());
            jsonObject.put("date",payment.getTime());
            jsonObject.put("pid",payment.getPid());
            jsonObject.put("uuid",payment.getUuid());
            result.put("data",jsonArray);
            jsonArray.add(jsonObject);
        }
        result.put("data",jsonArray);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public String updatepay(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String pid =request.getParameter("pid");
        String status=request.getParameter("pay");
        Payment payment=new Payment();
        payment.setPay(status);
        QueryWrapper<Payment> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("pid",pid);
        paymentService.update(payment,queryWrapper);
        result.put("status","success");
        return result.toString();
    }
    @RequestMapping(value = "/getall",method = RequestMethod.POST)
    public String getallpay(HttpServletRequest request, HttpServletResponse response){
        JSONObject result =new JSONObject();
        response.addHeader("Access-Control-Allow-Origin","*");
        String userid =request.getParameter("uuid");
        List<Payment> payments=paymentService.list();
        JSONArray jsonArray =new JSONArray();
        for (Payment payment:payments){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("money",payment.getMoney());
            jsonObject.put("pay",payment.getPay());
            jsonObject.put("date",payment.getTime());
            jsonObject.put("pid",payment.getPid());
            jsonObject.put("uuid",payment.getUuid());
            result.put("data",jsonArray);
            jsonArray.add(jsonObject);
        }
        result.put("data",jsonArray);
        result.put("status","success");
        return result.toString();
    }
}
