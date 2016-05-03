
package com.wish.wishstack.client.cinderclient.v1;

import com.wish.wishstack.client.base.BaseClient;
import com.wish.wishstack.client.base.BaseConstants;
import com.wish.wishstack.client.base.BaseInfo;

public class cinderClient extends BaseClient
{
    public cinderClient()
    {
        String host = "controller";
        String port = "8776";
        String version = "v1";
        String userAgent = BaseConstants.CINDER_AGENT;

        BaseInfo baseInfo = new BaseInfo(host, port, version, userAgent);

        initClient(baseInfo);
    }

}
