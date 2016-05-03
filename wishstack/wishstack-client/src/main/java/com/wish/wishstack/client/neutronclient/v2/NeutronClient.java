
package com.wish.wishstack.client.neutronclient.v2;

import com.wish.wishstack.client.base.BaseClient;
import com.wish.wishstack.client.base.BaseConstants;
import com.wish.wishstack.client.base.BaseInfo;

public class NeutronClient extends BaseClient
{
    public NeutronClient()
    {
        String host = "controller";
        String port = "9696";
        String version = "v2.0";
        String userAgent = BaseConstants.NEUTRON_AGENT;

        BaseInfo baseInfo = new BaseInfo(host, port, version, userAgent);

        initClient(baseInfo);
    }
}
