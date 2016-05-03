package com.wish.wishstack.client.novaclient.v2;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.math.RandomUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.alibaba.fastjson.JSONObject;
import com.wish.wishstack.common.JsonUtils;
import com.wish.wishstack.domain.Vm;

/**
 * 所有针对虚拟机的操作全部放在此类
 * @author ttx
 * @since 2016年1月18日 下午2:20:28
 */
public class VmManage {
	private static NovaClient novaClient = new NovaClient();
	private String baseUrl;
	private static Map<String, Object>  urlVariables = new HashMap<String, Object>();
	
	// 此处用于初始化NovaClient里面的默认参数
	public VmManage(){
		baseUrl = novaClient.getBaseUrl();
		urlVariables.put("tenantId", "ddbfc32fc5004faf939860295a98e6ff");
		novaClient.addHeadsToRequest(Collections.singletonMap("X-Auth-Token", "41f0f8b88a0e467a965e3c8e0486804f"));
	}
	
	/**
	 * 创建虚拟机（其他参数类似--max-count目前没有考虑 ）
	 * @param vmName
	 * @param FlavorId
	 * @param ImageId
	 * @param netId
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 上午11:01:47
	 */
	public Vm create(String vmName, String FlavorId, String ImageId, String netId){
		String url = this.baseUrl + "/{tenantId}/servers";
		
		Vm vmObj = new Vm();
		vmObj.setName(vmName);
		vmObj.setFlavorId(FlavorId);
		vmObj.setImageId(ImageId);
		JSONObject netJsonObj = new JSONObject();
		netJsonObj.put("uuid", netId);
		vmObj.setNetworks(Collections.singletonList(netJsonObj));
		HttpEntity<String> httpEntityBody = JsonUtils.toJsonBody(vmObj, "server");
		
		ResponseEntity<String> responseEntity = novaClient.post(url, httpEntityBody, urlVariables);
		
		String jsonData = responseEntity.getBody();
		if(responseEntity.getStatusCode().equals(HttpStatus.ACCEPTED) && jsonData != null){
			Vm vm = JsonUtils.toDomain(jsonData, Vm.class, "server");
			return vm;
		}else{
			return null;
		}
	}
	
	/**
	 * 根据id获取虚拟机信息
	 * @param id
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 上午11:02:52
	 */
	public void update(String id, String newName){
		String url = this.baseUrl + "/{tenantId}/servers/{vmId}";
		urlVariables.put("vmId", id);
		Vm vmObj = new Vm();
		vmObj.setName(newName);
		HttpEntity<String> httpEntityBody = JsonUtils.toJsonBody(vmObj, "server");	
		novaClient.put(url, httpEntityBody, urlVariables);
	}
	
	/**
	 * 根据id获取虚拟机信息
	 * @param id
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 上午11:02:52
	 */
	public Vm get(String id){
		String url = this.baseUrl + "/{tenantId}/servers/{vmId}";
		urlVariables.put("vmId", id);
		
		ResponseEntity<String> responseEntity = novaClient.get(url, urlVariables);
		
		String jsonData = responseEntity.getBody();
		if(responseEntity.getStatusCode().equals(HttpStatus.OK) && jsonData != null){
			Vm vm = JsonUtils.toDomain(jsonData, Vm.class, "server");
			return vm;
		}else{
			return null;
		}
	}
	
	
	/**
	 * 获取虚拟机列表
	 * @return
	 * @author ttx
	 * @since 2016年1月28日 上午11:04:20
	 */
	public List<Vm> list(){
		String url = this.baseUrl + "/{tenantId}/servers/detail";
		
		ResponseEntity<String> responseEntity = novaClient.get(url, urlVariables);
		
		String jsonData = responseEntity.getBody();
		if(responseEntity.getStatusCode().equals(HttpStatus.OK) && jsonData != null){
			List<Vm> vms = JsonUtils.toDomainList(jsonData, Vm.class, "servers");
			return vms;
		}else{
			return null;
		}
	}
	
	/**
	 * 根据id删除对应虚拟机
	 * @param id
	 * @author ttx
	 * @since 2016年1月28日 上午11:04:34
	 */
	public void delete(String id){
		String url = this.baseUrl + "/{tenantId}/servers/{vmId}";
		urlVariables.put("vmId", id);
		novaClient.delete(url, urlVariables);
	}
	
	
	
	/**
	 * 此处为针对虚拟机操作的实例代码
	 * @param args
	 * @author ttx
	 * @since 2016年1月29日 下午1:28:34
	 */
	public static void main(String[] args) {
		//以下为对虚拟机的增删查改操作
		
		VmManage vmManage = new VmManage();
		
		
		
		Vm vm = vmManage.get("2f6cdd22-c107-49ce-8a5b-88bca0a82208");

		System.out.println("虚拟机get操作结果：" + vm);
		
		vmManage.update("2f6cdd22-c107-49ce-8a5b-88bca0a82208", "new-name");

		
		vm = vmManage.create("vm-" + RandomUtils.nextInt(100), "1", "240fd495-fb2f-442b-a74c-dc990f3b4f59", "4c676ea1-06a6-4235-8326-6c88aaf7fb15");;
		System.out.println("虚拟机create操作结果：" + vm);
		
		
		vmManage.delete(vm.getId());
		System.out.println("虚拟机 [ id = " + vm.getId() + "+] delete SUCCESS!!!");

		List<Vm> vmList = vmManage.list();
		System.out.println("虚拟机list操作结果：" + vmList);
		
		
		//使用通用方法发送增删查改等http请求
		String url = novaClient.getBaseUrl() + "/{tenantId}/servers";
		Map<String, String> urlVariables = new HashMap<String, String>();
		urlVariables.put("tenantId", "ddbfc32fc5004faf939860295a98e6ff");

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("name", "test-vm");
		jsonObject.put("flavorRef", 1);
		jsonObject.put("imageRef", "240fd495-fb2f-442b-a74c-dc990f3b4f59");
		jsonObject.put("networks", Collections.singletonList(Collections.singletonMap("uuid", "4c676ea1-06a6-4235-8326-6c88aaf7fb15")));
		JSONObject jsonBody = new JSONObject();
		jsonBody.put("server", jsonObject);
		
		HttpEntity<JSONObject> httpEntityBody = new HttpEntity<JSONObject>(jsonBody);

		
		ResponseEntity<String> responseEntity  = novaClient.exchange(url, HttpMethod.POST, httpEntityBody, urlVariables);
		System.out.println(responseEntity.getBody());
		

	}
}
