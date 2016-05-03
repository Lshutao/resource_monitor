package com.wish.wishstack.rpc.restclient;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class HttpResponseEntity<T> {
	
	public HttpResponseEntity(String responseDataJson, HttpStatus statusCode){
		this.responseDataJson = responseDataJson;
		this.statusCode = statusCode;
	}
	
	private  String responseDataJson;
	
	private  HttpStatus statusCode;
	
	@SuppressWarnings("unchecked")
	public T toDomain(Class<?> domainCls, String responseKey){
		JSONObject jSONObject = JSONObject.parseObject(responseDataJson);
		String responseDataJson = jSONObject.getString(responseKey);
		return (T) JSON.parseObject(responseDataJson, domainCls);
	}
	
	@SuppressWarnings("unchecked")
	public List<T> toDomainList(Class<?> domainCls, String responseKey){
		JSONObject jSONObject = JSONObject.parseObject(responseDataJson);
		String responseDataJson = jSONObject.getString(responseKey);
		return (List<T>) JSON.parseObject(responseDataJson, domainCls);
	}

	public String getResponseDataJson() {
		return responseDataJson;
	}

	public void setResponseDataJson(String responseDataJson) {
		this.responseDataJson = responseDataJson;
	}

	public HttpStatus getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(HttpStatus statusCode) {
		this.statusCode = statusCode;
	}
}
