
package com.wish.wishstack.rpc.restclient;

import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;

import org.apache.http.Header;
import org.apache.http.client.HttpClient;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicHeader;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

/**
 * 此处封装一个Rest类型的httpclient请求，
 * 其中使用PoolingHttpClientConnectionManager自定义httpclient来支持池化请求，提高性能
 * 
 * @author ttx
 * @since 2016年1月19日 下午3:09:01
 */
@Component
@Lazy(false)
public class RestHttpClient
{

    // 单例模式，定义私有的构造函数
    private RestHttpClient()
    {
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(RestHttpClient.class);

    private static RestTemplate restTemplate;

    private static int maxTotal = 1000;

    private static int maxPerRoute = 1000;

    static
    {
        try
        {
            // 长连接保持30秒
            PoolingHttpClientConnectionManager pollingConnectionManager = new PoolingHttpClientConnectionManager(30,
                    TimeUnit.SECONDS);

            // 整个连接池的并发
            pollingConnectionManager.setMaxTotal(maxTotal);

            // 整个主机的并发
            pollingConnectionManager.setDefaultMaxPerRoute(maxPerRoute);

            HttpClientBuilder httpClientBuilder = HttpClients.custom();
            httpClientBuilder.setConnectionManager(pollingConnectionManager);

            // 重试次数，默认是3次，没有开启
            httpClientBuilder.setRetryHandler(new DefaultHttpRequestRetryHandler(2, true));
            // 保持长连接配置，需要在头添加Keep-Alive
            httpClientBuilder.setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy());

            // 设置http头信息
            List<Header> headers = new ArrayList<Header>();
            headers.add(new BasicHeader("Accept-Encoding", "gzip,deflate"));
            headers.add(new BasicHeader("Accept-Language", "zh-CN"));
            headers.add(new BasicHeader("Connection", "Keep-Alive"));

            httpClientBuilder.setDefaultHeaders(headers);

            // HttpClientBuilder ttpClientBuilder = HttpClientBuilder.create();
            SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy()
            {
                public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException
                {
                    return true;
                }
            }).build();
            httpClientBuilder.setSSLContext(sslContext);

            HostnameVerifier hostnameVerifier = NoopHostnameVerifier.INSTANCE;

            SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(sslContext, hostnameVerifier);
            Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory> create()
                    .register("http", PlainConnectionSocketFactory.getSocketFactory())
                    .register("https", sslSocketFactory).build();

            PoolingHttpClientConnectionManager connMgr = new PoolingHttpClientConnectionManager(socketFactoryRegistry);

            httpClientBuilder.setConnectionManager(connMgr);

            CloseableHttpClient httpClient = httpClientBuilder.build();

            // httpClient连接配置，底层是配置RequestConfig
            HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(
                    httpClient);
            // 添加转换器(设置http 头为MediaType
            // "application/json"(该文件中的new也可以使用spring依赖注入方式实现)
            List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
            messageConverters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
            messageConverters.add(new FormHttpMessageConverter());
            messageConverters.add(new MappingJackson2HttpMessageConverter());

            restTemplate = new RestTemplate();// 此处如果走https则使用new
                                              // RestTemplate(new
                                              // HttpComponentsClientHttpRequestFactory())

            restTemplate.setRequestFactory(clientHttpRequestFactory);
            restTemplate.setMessageConverters(messageConverters);
            restTemplate.setErrorHandler(new DefaultResponseErrorHandler());
        } catch (KeyManagementException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (KeyStoreException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        LOGGER.info("RestClient初始化完成");
    }

    @PostConstruct
    public static RestTemplate getClient()
    {
        return restTemplate;
    }

}
