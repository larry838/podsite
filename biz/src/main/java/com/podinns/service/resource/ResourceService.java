package com.podinns.service.resource;

import com.podinns.model.resource.ResourceEntity;
import java.util.List;
import java.util.Map;

public interface ResourceService{

	/**
	 * 自定义方法
	 * 获取用户ID对应的资源信息
	 * @param userId
	 * @return
	 */
	public List<ResourceEntity> findResourcesByUserId(int userId);

	/**
	 * 自定义方法
	 * 获取用户ID对应的资源菜单信息
	 * @param userId
	 * @return
	 */
	public List<ResourceEntity> findResourcesMenuByUserId(int userId);
	/**
	 * 
	 * @param parameter
	 * @return
	 */
	public List<ResourceEntity> queryListByPage(Map<String, Object> parameter);
	/**
	 * 
	 * @param name
	 * @return
	 */
	public ResourceEntity findByName(String name);
	/**
	 * 
	 * @param id
	 * @return
	 */
	public ResourceEntity findById(Long id);
	/**
	 * 
	 * @param resourceEntity
	 * @return
	 */
	public int update(ResourceEntity resourceEntity);
    /**
     * 
     * @param roleIds
     * @return
     */
    public int deleteBatchById(List<Long> roleIds);
    /**
     * 
     * @param parameter
     * @return
     */
    public List<ResourceEntity> queryResourceList(Map<String, Object> parameter);
    /**
     * 
     * @param resourceEntity
     * @return
     */
    public int insert(ResourceEntity resourceEntity);
}
