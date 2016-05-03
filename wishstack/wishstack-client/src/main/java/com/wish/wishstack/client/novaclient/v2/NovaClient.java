
package com.wish.wishstack.client.novaclient.v2;

import com.wish.wishstack.client.base.BaseClient;
import com.wish.wishstack.client.base.BaseConstants;
import com.wish.wishstack.client.base.BaseInfo;

/**
 * 指定Novaclient的必要信息
 */
public class NovaClient extends BaseClient
{
    public NovaClient()
    {
        // 可扩展为配置文件读取，实现动态更新参与的功能。
        String host = "172.31.2.14";
        String port = "8774";
        String version = "v2";
        String userAgent = BaseConstants.NOVA_AGENT;

        BaseInfo baseInfo = new BaseInfo(host, port, version, userAgent);

        initClient(baseInfo);
    }
}
