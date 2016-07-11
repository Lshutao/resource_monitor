package com.wish.wishstack.dao.support;

import java.util.List;

import org.apache.ibatis.annotations.Param;


/**
 * dao基类接口
 * @ClassName: BaseDao
 * @Description: TODO
 * @author mcl
 * @date 2015年11月5日 下午2:51:58
 * @param <T>
 */
public interface BaseDao<T>{
	
	/**
	 * 根据整型id查询实体信息
	 * @Title: selectByPrimaryKey
	 * @author mcl
	 * @Description: TODO
	 * @param 整型id
	 * @return 实体信息
	 * @throws
	 */
	public T selectByPrimaryKey(Integer id);
	
	/**
	 * 根据字符id查询实体信息
	 * @Title: selectByPrimaryKey
	 * @author mcl
	 * @Description: TODO
	 * @param 字符id
	 * @return 实体信息
	 * @throws
	 */
	public T selectByPrimaryKey(String id);

	/**
	 * 根据字符数组获取实体集合
	 * @Title: selectByPrimaryKeys
	 * @author mcl
	 * @Description: TODO
	 * @param 字符数组
	 * @return 实体集合
	 * @throws
	 */
	public List<T> selectByPrimaryKeys(String[] ids);
	
	/**
	 * 根据整型数组获取实体集合
	 * @Title: selectByPrimaryKeys
	 * @author mcl
	 * @Description: TODO
	 * @param 整型数组
	 * @return 实体集合
	 * @throws
	 */
	public List<T> selectByPrimaryKeys(Integer[] ids);

	/**
	 * 根据实体参数获取分页集合
	 * @Title: selectPage
	 * @author mcl
	 * @Description: TODO
	 * @param 实体数据
	 * @return 实体集合
	 * @throws
	 */
	public List<T> selectPage(T entity);
	
	/**
	 * 根据实体参数获取实体集合
	 * @Title: selectAll
	 * @author mcl
	 * @Description: TODO
	 * @param 实体数据
	 * @return 实体集合
	 * @throws
	 */
	public List<T> selectAll(T entity);
	
	/**
	 * 获取实体集合
	 * @Title: selectAll
	 * @author mcl
	 * @Description: TODO
	 * @return 实体集合
	 * @throws
	 */
	public List<T> selectAll();
	
	/**
	 * 获取实体总数
	 * @Title: selectCount
	 * @author mcl
	 * @Description: TODO
	 * @return 实体总数
	 * @throws
	 */
	public int selectCount();
	
	/**
	 * 根据实体数据获取实体总数
	 * @Title: selectCount
	 * @author mcl
	 * @Description: TODO
	 * @param 实体数据
	 * @return 符合条件的实体总数
	 * @throws
	 */
	public int selectCount(T entity);

	/**
	 * 插入实体数据
	 * @Title: insert
	 * @author mcl
	 * @Description: TODO
	 * @param 实体数据
	 * @return 插入成功数据的条数
	 * @throws
	 */
	public int insert(T entity);

	/**
	 * 批量插入实体数据
	 * @Title: insertBatch
	 * @author mcl
	 * @Description: TODO
	 * @param 实体集合
	 * @return 插入成功数据的条数
	 * @throws
	 */
	public int insertBatch(final List<T> entities);

	/**
	 * 根据字符id删除实体信息
	 * @Title: deleteByPrimaryKey
	 * @author mcl
	 * @Description: TODO
	 * @param 字符id
	 * @return 删除成功数据的条数
	 * @throws
	 */
	public int deleteByPrimaryKey(@Param("id") String id);
	
	/**
	 * 根据整形id删除实体信息
	 * @Title: deleteByPrimaryKey
	 * @author mcl
	 * @Description: TODO
	 * @param 整型id
	 * @return 删除成功数据的条数
	 * @throws
	 */
	public int deleteByPrimaryKey(@Param("id") Integer id);
	
	/**
	 * 根据实体数据删除实体信息
	 * @Title: deleteByPrimaryKey
	 * @author mcl
	 * @Description: TODO
	 * @param 实体数据
	 * @return 删除成功数据的条数
	 * @throws
	 */
	public int deleteByPrimaryKey(T entity);

	/**
	 * 批量删除实体数据
	 * @Title: deleteBatch
	 * @author mcl
	 * @Description: TODO
	 * @param 字符数组
	 * @return 删除成功数据的条数
	 * @throws
	 */
	public int deleteBatch(final Integer[] ids);
	
	/**
	 * 批量删除实体数据
	 * @Title: deleteBatch
	 * @author mcl
	 * @Description: TODO
	 * @param 整型数组
	 * @return 删除成功数据的条数
	 * @throws
	 */
	public int deleteBatch(final String[] ids);

	/**
	 * 更新实体数据
	 * @Title: update
	 * @author mcl
	 * @Description: TODO
	 * @param 实体数据
	 * @return 更新成功数据的条数
	 * @throws
	 */
	public int update(T entity);

	/**
	 * 批量更新实体数据
	 * @Title: updateBatch
	 * @author mcl
	 * @Description: TODO
	 * @param 实体集合
	 * @return 更新成功数据的条数
	 * @throws
	 */
	public int updateBatch(final List<T> entites);
	
	/**
	 * 查询符合条件的实体集合
	 * @Title: getAllByCondition
	 * @author mcl
	 * @Description: TODO
	 * @param 字符串
	 * @return 实体集合
	 * @throws
	 */
	public List<T> getAllByCondition(String str);
	
	/**
	 * 查询符合条件的实体集合
	 * @Title: getAllByCondition
	 * @author mcl
	 * @Description: TODO
	 * @param 整型数据
	 * @return 实体集合
	 * @throws
	 */
	public List<T> getAllByCondition(int integer);
}
