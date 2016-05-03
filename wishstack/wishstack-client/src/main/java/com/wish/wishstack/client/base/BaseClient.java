
package com.wish.wishstack.client.base;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import com.wish.wishstack.rpc.restclient.CustomHeadsInterceptor;
import com.wish.wishstack.rpc.restclient.RestHttpClient;

/**
 * BaseClient封装Http请求的客户端（包括put/post/list/delete等）
 * 
 * @author ttx
 */
public abstract class BaseClient
{
    private RestTemplate restTemplate;
    private Class<String> responseType = String.class;
    private BaseInfo baseInfo;

    /**
     * initClient 初始化baseclient
     *
     * @param baseInfo
     */
    public void initClient(BaseInfo baseInfo)
    {
        this.baseInfo = baseInfo;

        restTemplate = RestHttpClient.getClient();

        addHeadsToRequest(baseInfo.getHeadersMap());
    }

    /**
     * 添加heads参数 在http 请求头中
     * 
     * @param headersMap
     * @author ttx
     */
    public void addHeadsToRequest(Map<String, String> headersMap)
    {
        CustomHeadsInterceptor customHeadsInterceptor = new CustomHeadsInterceptor();
        customHeadsInterceptor.setHeadersMap(headersMap);
        restTemplate.setInterceptors(Collections.singletonList((ClientHttpRequestInterceptor)customHeadsInterceptor));
    }

    /**
     * getBaseUrl
     *
     * @return String
     */
    public String getBaseUrl()
    {
        return baseInfo.getBaseUrl();
    }

    /**
     * get请求
     * 
     * @param url
     * @param urlVariables
     * @return
     * @author ttx
     * @since 2016年1月28日 下午2:30:17
     */
    public ResponseEntity<String> get(String url, Map<String, ?> urlVariables)
    {
        return restTemplate.getForEntity(url, responseType, urlVariables);
    }

    /**
     * put请求
     * 
     * @param url
     * @param request
     * @param urlVariables
     * @return
     * @author ttx
     */
    public ResponseEntity<String> put(String url, Object request, Map<String, ?> urlVariables)
    {
        ResponseEntity<String> responseEntity = new ResponseEntity<String>("put success!!!", HttpStatus.OK);
        try
        {
            restTemplate.put(url, request, urlVariables);
        } catch (Exception e)
        {
            responseEntity = new ResponseEntity<String>(e.toString(), HttpStatus.EXPECTATION_FAILED);
        }
        return responseEntity;
    }

    /**
     * post请求
     * 
     * @param url
     * @param request
     * @param urlVariables
     * @return
     * @author ttx
     * @since 2016年1月28日 下午2:30:31
     */
    public ResponseEntity<String> post(String url, Object request, Map<String, ?> urlVariables)
    {
        return restTemplate.postForEntity(url, request, responseType, urlVariables);
    }

    /**
     * delete 请求
     * 
     * @param url
     * @param urlVariables
     * @return
     * @author ttx
     */
    public ResponseEntity<String> delete(String url, Map<String, ?> urlVariables)
    {
        ResponseEntity<String> responseEntity = new ResponseEntity<String>("Delete success!!!", HttpStatus.OK);
        try
        {
            restTemplate.delete(url, urlVariables);
        } catch (Exception e)
        {
            responseEntity = new ResponseEntity<String>(e.toString(), HttpStatus.EXPECTATION_FAILED);
        }
        return responseEntity;
    }

    /**
     * 通用请求，支持post、get、put、delete、head等请求
     * 
     * @param url
     * @param httpMethod
     * @param httpEntityBody
     * @param urlVariables
     * @return
     * @author ttx
     */
    public ResponseEntity<String> exchange(String url, HttpMethod httpMethod, HttpEntity<?> httpEntityBody,
            Map<String, ?> urlVariables)
    {
        return restTemplate.exchange(url, httpMethod, httpEntityBody, responseType, urlVariables);
    }
}
