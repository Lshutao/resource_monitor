package com.wish.wishstack.domain;

import java.util.Map;

import com.alibaba.fastjson.annotation.JSONField;
import com.wish.wishstack.customEnum.VmStates;
import com.wish.wishstack.domain.base.BaseDomain;

/**
 * 虚拟机实体类
 * @author ttx
 * @since 2016年1月21日 上午11:24:43
 */
public class VmTest extends BaseDomain {
	private String osExtSrvAttrHost;


	@JSONField(name="OS-EXT-STS:task_state")
	public String getOsExtSrvAttrHost() {
		return osExtSrvAttrHost;
	}
	@JSONField(name="OS-EXT-STS:task_state")
	public void setOsExtSrvAttrHost(String osExtSrvAttrHost) {
		this.osExtSrvAttrHost = osExtSrvAttrHost;
	}
}


/**
 * nova返回虚拟机json示例
 * @author ttx
 * @since 2016年1月21日 上午11:24:43
 */
/*{
	"status": "ACTIVE",
	"updated": "2016-01-19T05:56:47Z",
	"hostId": "1b469f9d9f5935d1b7dd283095678ebf3b75c408464e897a461dd1b7",
	"OS-EXT-SRV-ATTR:host": "localhost.localdomain",
	"addresses": {
		"demo-net": [{
			"OS-EXT-IPS-MAC:mac_addr": "fa:16:3e:c0:6a:21",
			"version": 4,
			"addr": "192.168.1.16",
			"OS-EXT-IPS:type": "fixed"
		}]
	},
	"links": [{
		"href": "http://controller:8774/v2/ddbfc32fc5004faf939860295a98e6ff/servers/baa20b2d-19ed-4e1a-ad5a-08dc6be86a9d",
		"rel": "self"
	},
	{
		"href": "http://controller:8774/ddbfc32fc5004faf939860295a98e6ff/servers/baa20b2d-19ed-4e1a-ad5a-08dc6be86a9d",
		"rel": "bookmark"
	}],
	"key_name": null,
	"image": {
		"id": "240fd495-fb2f-442b-a74c-dc990f3b4f59",
		"links": [{
			"href": "http://controller:8774/ddbfc32fc5004faf939860295a98e6ff/images/240fd495-fb2f-442b-a74c-dc990f3b4f59",
			"rel": "bookmark"
		}]
	},
	"OS-EXT-STS:task_state": null,
	"OS-EXT-STS:vm_state": "active",
	"OS-EXT-SRV-ATTR:instance_name": "instance-0000000e",
	"OS-SRV-USG:launched_at": "2016-01-19T05:56:47.000000",
	"OS-EXT-SRV-ATTR:hypervisor_hostname": "localhost.localdomain",
	"flavor": {
		"id": "1",
		"links": [{
			"href": "http://controller:8774/ddbfc32fc5004faf939860295a98e6ff/flavors/1",
			"rel": "bookmark"
		}]
	},
	"id": "baa20b2d-19ed-4e1a-ad5a-08dc6be86a9d",
	"security_groups": [{
		"name": "default"
	}],
	"OS-SRV-USG:terminated_at": null,
	"OS-EXT-AZ:availability_zone": "nova",
	"user_id": "a27489ffff684405bca973beea435a51",
	"name": "test2",
	"created": "2016-01-19T05:55:11Z",
	"tenant_id": "ddbfc32fc5004faf939860295a98e6ff",
	"OS-DCF:diskConfig": "AUTO",
	"os-extended-volumes:volumes_attached": [],
	"accessIPv4": "",
	"accessIPv6": "",
	"progress": 0,
	"OS-EXT-STS:power_state": 1,
	"config_drive": "",
	"metadata": {
		
	}
}*/