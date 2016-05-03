package com.wish.wishstack.common;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpEntity;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class JsonUtils {

	/**
	 * 将底层返回的json格式数据，转换成domian 对象
	 * @param jsonData
	 * @param domainCls
	 * @param responseKey
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 下午1:44:58
	 */
	@SuppressWarnings("unchecked")
	public static <T> T toDomain(String jsonData, Class<?> domainCls, String responseKey){
		JSONObject jSONObject = JSONObject.parseObject(jsonData);
		String responseDataJson = jSONObject.getString(responseKey);
		return (T) JSON.parseObject(responseDataJson, domainCls);
	}
	
	/**
	 * 将底层返回的json格式数据，转换成domian List对象
	 * @param jsonData
	 * @param domainCls
	 * @param responseKey
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 下午1:44:16
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> toDomainList(String jsonData, Class<?> domainCls, String responseKey){
		JSONObject jSONObject = JSONObject.parseObject(jsonData);
		String responseDataJson = jSONObject.getString(responseKey);
		return (List<T>) JSON.parseArray(responseDataJson, domainCls);
	}
	
	/**
	 * 将domain对象封装成带responseKey的HttpEntity对象
	 * @param domainObj
	 * @param responseKey ex：server、servers、flavor、flavors等
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 下午1:43:10
	 */
	public static HttpEntity<String> toJsonBody(Object domainObj, String responseKey){
		String JsonBody = JSON.toJSONString(Collections.singletonMap(responseKey, domainObj));
		HttpEntity<String> httpEntityBody = new HttpEntity<String>(JsonBody);
		return httpEntityBody;
	}
}
