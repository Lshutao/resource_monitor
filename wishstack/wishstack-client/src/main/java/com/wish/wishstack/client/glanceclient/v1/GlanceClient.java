
package com.wish.wishstack.client.glanceclient.v1;

import com.wish.wishstack.client.base.BaseClient;
import com.wish.wishstack.client.base.BaseConstants;
import com.wish.wishstack.client.base.BaseInfo;

public class GlanceClient extends BaseClient
{
    public GlanceClient()
    {
        String host = "controller";
        String port = "5000";
        String version = "v2.0";
        String userAgent = BaseConstants.GLANCE_AGENT;

        BaseInfo baseInfo = new BaseInfo(host, port, version, userAgent);

        initClient(baseInfo);
    }
}
