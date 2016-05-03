package com.wish.wishstack.rpc.restclient;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

/**
 * 此类用来动态为RestTemplete添加heads参数
 *      如果没有特殊的heads参数需要添加则直接使用默认CustomHeadsInterceptor即可
 * @author ttx
 * @since 2016年1月20日 上午10:58:26
 */
public class CustomHeadsInterceptor implements ClientHttpRequestInterceptor{

	public Map<String, String> headersMap = new HashMap<String, String>();
	
	@Override
	public ClientHttpResponse intercept(HttpRequest request, byte[] body,
			ClientHttpRequestExecution execution) throws IOException {

		HttpHeaders headers = request.getHeaders();
		
		//此处为默认为json格式，若需要修改则直接将headersMap里Accept替换掉即可
		headers.add("Accept", "application/json");
		headers.add("Content-Type", "application/json");
		
		for(Map.Entry<String, String> entry: headersMap.entrySet()){
			headers.add(entry.getKey(), entry.getValue());
		}
        return execution.execute(request, body);
	}

	public Map<String, String> getHeadersMap() {
		return headersMap;
	}

	public void setHeadersMap(Map<String, String> headersMap) {
		this.headersMap = headersMap;
	}
}
