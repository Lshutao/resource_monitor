
package com.wish.wishstack.client.base;

import java.util.HashMap;
import java.util.Map;

public class BaseInfo
{
    /**
     * URL字段
     */
    private String protocol;
    private String host;
    private String port;
    private String version;

    /**
     * 消息头字段
     */
    private String userAgent;
    private String accept;
    private String contentType;

    /**
     * 默认构造函数
     */
    public BaseInfo()
    {
    }

    /**
     * 构造函数
     * 
     * @param protocol
     * @param host
     * @param port
     * @param version
     * @param userAgent
     */
    public BaseInfo(String host,String port,String version,String userAgent)
    {
        this.host = host;
        this.port = port;
        this.version = version;
        this.userAgent = userAgent;

        this.protocol = BaseConstants.DEFAULT_PROTOCOL;
        this.accept = BaseConstants.DEFAULT_ACCEPT;
        this.contentType = BaseConstants.DEFAULT_CONTENT_TYPE;
    }

    public String getProtocol()
    {
        return protocol;
    }

    public void setProtocol(String protocol)
    {
        this.protocol = protocol;
    }

    public String getHost()
    {
        return host;
    }

    public void setHost(String host)
    {
        this.host = host;
    }

    public String getPort()
    {
        return port;
    }

    public void setPort(String port)
    {
        this.port = port;
    }

    public String getVersion()
    {
        return version;
    }

    public void setVersion(String version)
    {
        this.version = version;
    }

    public String getUserAgent()
    {
        return userAgent;
    }

    public void setUserAgent(String userAgent)
    {
        this.userAgent = userAgent;
    }

    public String getAccept()
    {
        return accept;
    }

    public void setAccept(String accept)
    {
        this.accept = accept;
    }

    public String getContentType()
    {
        return contentType;
    }

    public void setContentType(String contentType)
    {
        this.contentType = contentType;
    }

    public Map<String, String> getHeadersMap()
    {
        Map<String, String> headersMap = new HashMap<String, String>();
        headersMap.put(BaseConstants.USER_AGENT, userAgent);
        headersMap.put(BaseConstants.ACCEPT, accept);
        headersMap.put(BaseConstants.CONTENT_TYPE, contentType);

        return headersMap;
    }

    public String getBaseUrl()
    {
        String baseUrl = protocol + "://" + host + ":" + port + "/" + version;

        return baseUrl;
    }
}
