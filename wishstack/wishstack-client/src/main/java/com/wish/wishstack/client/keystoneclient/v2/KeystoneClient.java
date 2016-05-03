
package com.wish.wishstack.client.keystoneclient.v2;

import com.wish.wishstack.client.base.BaseClient;
import com.wish.wishstack.client.base.BaseConstants;
import com.wish.wishstack.client.base.BaseInfo;

public class KeystoneClient extends BaseClient
{
    public KeystoneClient()
    {
        String host = "controller";
        String port = "5000";
        String version = "v2.0";
        String userAgent = BaseConstants.KEYSTONE_AGENT;

        BaseInfo baseInfo = new BaseInfo(host, port, version, userAgent);

        initClient(baseInfo);
    }
}
