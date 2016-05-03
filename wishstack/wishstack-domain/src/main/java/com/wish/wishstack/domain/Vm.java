package com.wish.wishstack.domain;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import com.wish.wishstack.customEnum.VmStates;
import com.wish.wishstack.domain.base.BaseDomain;

/**
 * 虚拟机实体类
 * @author ttx
 * @since 2016年1月21日 上午11:24:43
 */
public class Vm extends BaseDomain {
	private static final long serialVersionUID = 1L;
	//nova 底层原生字段
	private VmStates status;
	private String hostId;
	private String keyName;
	private String metadata;
	private String accessIPv4;
	private String accessIPv6;
	
	//自定义实体新字段(底层创建虚拟机需要此字段)
	private String imageId;//JSONField格式化对应字段为imageRef
	private String flavorId;//JSONField格式化对应字段为flavorRef
	private List<JSONObject> networks;//保存flavorId
	
	//JSONObject对象字段
	private JSONObject addresses;
	private JSONObject image;
	private JSONObject flavor;
	
	//List<JSONObject>对象字段
	private List<JSONObject> links;
	private List<JSONObject> security_groups;
	
	//与底层nova返回不一致，需要别名的字段
	private String configDrive;
	private String userId;
	private String tenantId;
	
	//扩展字段
	private String OsExtSrvAttrHost;
	private String OsDcfDiskConfig;
	private String OsExtAZAvailability_zone;
	private String OsExtSrvAttrHypervisorHostname;
	private String OsExtSrvAttrInstanceName;
	private String OsExtStsPowerState;
	private String OsExtStsVmState;
	private Date OsSrvUsgLaunchedAt;
	private List<JSONObject> OsExtendedVolumesVolumesAttached;
	
	public VmStates getStatus() {
		return status;
	}
	public void setStatus(VmStates status) {
		this.status = status;
	}
	public String getHostId() {
		return hostId;
	}
	public void setHostId(String hostId) {
		this.hostId = hostId;
	}
	public String getKeyName() {
		return keyName;
	}
	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}
	public String getMetadata() {
		return metadata;
	}
	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}
	public String getAccessIPv4() {
		return accessIPv4;
	}
	public void setAccessIPv4(String accessIPv4) {
		this.accessIPv4 = accessIPv4;
	}
	public String getAccessIPv6() {
		return accessIPv6;
	}
	public void setAccessIPv6(String accessIPv6) {
		this.accessIPv6 = accessIPv6;
	}
	public JSONObject getAddresses() {
		return addresses;
	}
	public void setAddresses(JSONObject addresses) {
		this.addresses = addresses;
	}
	public JSONObject getImage() {
		return image;
	}
	public void setImage(JSONObject image) {
		this.image = image;
	}
	public JSONObject getFlavor() {
		return flavor;
	}
	public void setFlavor(JSONObject flavor) {
		this.flavor = flavor;
	}
	public List<JSONObject> getLinks() {
		return links;
	}
	public void setLinks(List<JSONObject> links) {
		this.links = links;
	}
	public List<JSONObject> getSecurity_groups() {
		return security_groups;
	}
	public void setSecurity_groups(List<JSONObject> security_groups) {
		this.security_groups = security_groups;
	}
	

	public String getConfigDrive() {
		return configDrive;
	}
	@JSONField(name="config_drive")
	public void setConfigDrive(String configDrive) {
		this.configDrive = configDrive;
	}
	public String getUserId() {
		return userId;
	}
	@JSONField(name="user_id")
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTenantId() {
		return tenantId;
	}
	@JSONField(name="tenant_id")
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	public String getOsExtSrvAttrHost() {
		return OsExtSrvAttrHost;
	}
	@JSONField(name="OS-EXT-SRV-ATTR:host")
	public void setOsExtSrvAttrHost(String osExtSrvAttrHost) {
		OsExtSrvAttrHost = osExtSrvAttrHost;
	}
	public String getOsDcfDiskConfig() {
		return OsDcfDiskConfig;
	}
	@JSONField(name="OS-DCF:diskConfig")
	public void setOsDcfDiskConfig(String osDcfDiskConfig) {
		OsDcfDiskConfig = osDcfDiskConfig;
	}
	public String getOsExtAZAvailability_zone() {
		return OsExtAZAvailability_zone;
	}
	@JSONField(name="OS-EXT-AZ:availability_zone")
	public void setOsExtAZAvailability_zone(String osExtAZAvailability_zone) {
		OsExtAZAvailability_zone = osExtAZAvailability_zone;
	}
	public String getOsExtSrvAttrHypervisorHostname() {
		return OsExtSrvAttrHypervisorHostname;
	}
	@JSONField(name="OS-EXT-SRV-ATTR:hypervisor_hostname")
	public void setOsExtSrvAttrHypervisorHostname(
			String osExtSrvAttrHypervisorHostname) {
		OsExtSrvAttrHypervisorHostname = osExtSrvAttrHypervisorHostname;
	}
	public String getOsExtSrvAttrInstanceName() {
		return OsExtSrvAttrInstanceName;
	}
	@JSONField(name="OS-EXT-SRV-ATTR:instance_name")
	public void setOsExtSrvAttrInstanceName(String osExtSrvAttrInstanceName) {
		OsExtSrvAttrInstanceName = osExtSrvAttrInstanceName;
	}
	public String getOsExtStsPowerState() {
		return OsExtStsPowerState;
	}
	@JSONField(name="OS-EXT-STS:power_state")
	public void setOsExtStsPowerState(String osExtStsPowerState) {
		OsExtStsPowerState = osExtStsPowerState;
	}
	public String getOsExtStsVmState() {
		return OsExtStsVmState;
	}
	@JSONField(name="OS-EXT-STS:vm_state")
	public void setOsExtStsVmState(String osExtStsVmState) {
		OsExtStsVmState = osExtStsVmState;
	}
	public Date getOsSrvUsgLaunchedAt() {
		return OsSrvUsgLaunchedAt;
	}
	@JSONField(name="OS-SRV-USG:launched_at")
	public void setOsSrvUsgLaunchedAt(Date osSrvUsgLaunchedAt) {
		OsSrvUsgLaunchedAt = osSrvUsgLaunchedAt;
	}
	public List<JSONObject> getOsExtendedVolumesVolumesAttached() {
		return OsExtendedVolumesVolumesAttached;
	}
	@JSONField(name="os-extended-volumes:volumes_attached")
	public void setOsExtendedVolumesVolumesAttached(
			List<JSONObject> osExtendedVolumesVolumesAttached) {
		OsExtendedVolumesVolumesAttached = osExtendedVolumesVolumesAttached;
	}
	
	public List<JSONObject> getNetworks() {
		return networks;
	}
	public void setNetworks(List<JSONObject> networks) {
		this.networks = networks;
	}
	@JSONField(name="imageRef")
	public String getImageId() {
		if(StringUtils.isEmpty(imageId) && image != null){
			return image.getString("id");
		}
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	@JSONField(name="flavorRef")
	public String getFlavorId() {
		if(StringUtils.isEmpty(flavorId) && flavor != null){
			return flavor.getString("id");
		}
		return flavorId;
	}
	public void setFlavorId(String flavorId) {
		this.flavorId = flavorId;
	}
	@Override
	public String toString() {
		return "Vm [status=" + status + ", hostId=" + hostId + ", keyName="
				+ keyName + ", metadata=" + metadata + ", accessIPv4="
				+ accessIPv4 + ", accessIPv6=" + accessIPv6 + ", imageId="
				+ imageId + ", flavorId=" + flavorId + ", networks=" + networks
				+ ", addresses=" + addresses + ", image=" + image + ", flavor="
				+ flavor + ", links=" + links + ", security_groups="
				+ security_groups + ", configDrive=" + configDrive
				+ ", userId=" + userId + ", tenantId=" + tenantId
				+ ", OsExtSrvAttrHost=" + OsExtSrvAttrHost
				+ ", OsDcfDiskConfig=" + OsDcfDiskConfig
				+ ", OsExtAZAvailability_zone=" + OsExtAZAvailability_zone
				+ ", OsExtSrvAttrHypervisorHostname="
				+ OsExtSrvAttrHypervisorHostname
				+ ", OsExtSrvAttrInstanceName=" + OsExtSrvAttrInstanceName
				+ ", OsExtStsPowerState=" + OsExtStsPowerState
				+ ", OsExtStsVmState=" + OsExtStsVmState
				+ ", OsSrvUsgLaunchedAt=" + OsSrvUsgLaunchedAt
				+ ", OsExtendedVolumesVolumesAttached="
				+ OsExtendedVolumesVolumesAttached + "]";
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