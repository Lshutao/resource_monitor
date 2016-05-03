package com.wish.wishstack.domain;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import com.wish.wishstack.domain.base.BaseDomain;


/**
 * Flavor实例类
 * @author ttx
 * @since 2016年1月26日 下午1:54:27
 */
public class Flavor extends BaseDomain {
	private static final long serialVersionUID = 1L;
	//nova 底层原生字段
	private Integer ram;
	private Integer vcpus;
	private Integer swap;
	private Integer disk;
	

	//List<JSONObject>对象字段
	private List<JSONObject> links;
	
	//与底层返回不一致，需要别名的字段
	private Long rxtxFactor;
	
	//扩展字段
	private Boolean OsFlvDidabledDisabled;
	private Boolean OsFlavorAccessIsPublic;
	private Integer OsFlvExtDataEphemeral;

	public Integer getRam() {
		return ram;
	}
	public void setRam(Integer ram) {
		this.ram = ram;
	}
	public Integer getVcpus() {
		return vcpus;
	}
	public void setVcpus(Integer vcpus) {
		this.vcpus = vcpus;
	}
	public Integer getSwap() {
		return swap;
	}
	public void setSwap(Integer swap) {
		this.swap = swap;
	}
	public Integer getDisk() {
		return disk;
	}
	public void setDisk(Integer disk) {
		this.disk = disk;
	}
	public List<JSONObject> getLinks() {
		return links;
	}
	public void setLinks(List<JSONObject> links) {
		this.links = links;
	}
	public Long getRxtxFactor() {
		return rxtxFactor;
	}
	
	@JSONField(name="rxtx_factor")
	public void setRxtxFactor(Long rxtxFactor) {
		this.rxtxFactor = rxtxFactor;
	}
	public Boolean getOsFlvDidabledDisabled() {
		return OsFlvDidabledDisabled;
	}
	
	@JSONField(name="OS-FLV-DISABLED:disabled")
	public void setOsFlvDidabledDisabled(Boolean osFlvDidabledDisabled) {
		OsFlvDidabledDisabled = osFlvDidabledDisabled;
	}
	public Boolean getOsFlavorAccessIsPublic() {
		return OsFlavorAccessIsPublic;
	}
	
	@JSONField(name="os-flavor-access:is_public")
	public void setOsFlavorAccessIsPublic(Boolean osFlavorAccessIsPublic) {
		OsFlavorAccessIsPublic = osFlavorAccessIsPublic;
	}
	public Integer getOsFlvExtDataEphemeral() {
		return OsFlvExtDataEphemeral;
	}
	
	@JSONField(name="OS-FLV-EXT-DATA:ephemeral")
	public void setOsFlvExtDataEphemeral(Integer osFlvExtDataEphemeral) {
		OsFlvExtDataEphemeral = osFlvExtDataEphemeral;
	}
	@Override
	public String toString() {
		return "Flavor [ram=" + ram + ", vcpus=" + vcpus + ", swap=" + swap
				+ ", disk=" + disk + ", links=" + links + ", rxtxFactor="
				+ rxtxFactor + ", OsFlvDidabledDisabled="
				+ OsFlvDidabledDisabled + ", OsFlavorAccessIsPublic="
				+ OsFlavorAccessIsPublic + ", OsFlvExtDataEphemeral="
				+ OsFlvExtDataEphemeral + "]";
	}

	

}


/**
 * nova返回虚拟机json示例
 * @author ttx
 * @since 2016年1月21日 上午11:24:43
 */
/*{
	"flavor": {
		"name": "m1.tiny",
		"links": [{
			"href": "http://controller:8774/v2/ddbfc32fc5004faf939860295a98e6ff/flavors/1",
			"rel": "self"
		},
		{
			"href": "http://controller:8774/ddbfc32fc5004faf939860295a98e6ff/flavors/1",
			"rel": "bookmark"
		}],
		"ram": 512,
		"OS-FLV-DISABLED:disabled": false,
		"vcpus": 1,
		"swap": "",
		"os-flavor-access:is_public": true,
		"rxtx_factor": 1.0,
		"OS-FLV-EXT-DATA:ephemeral": 0,
		"disk": 1,
		"id": "1"
	}
}*/