import server from '../server/index'
import { queryParams, postParams } from '../utils/params'

// 注册
export const registerApi = (params: any) => {
  return server.post('/register', {
    username: params.username,
    password: params.password
  })
}

// 登录
export const loginApi = (params: any) => {
  return server.post('login', {
    username: params.username,
    password: params.password
  })
}

// 查看所有用户
export const queryAllUsersApi = () => {
  return server.get('query_all_users')
}

// 检查当前用户
export const getCurrentUser = () => {
  return server.get('current_user')
}

// 创建群组
export const createGroup = (params: any) => {
  return server.post('create_group', params)
}

// 查询所有群组
export const queryAllGroups = () => {
  return server.get('query_all_groups')
}

// 查询群信息
export const queryGroup = (params: any) => {
  return server.post('query_group', params)
}

// // 删除一条群消息
// export const deleteGroupMessage = (params) => {
//   console.log('测试删除', params)
//   return server.post('delete_group_message', params)
// }

// 查询用户所有文件
export const queryCloudData = (params: any) => {
  return server.get(`query_clound_data${queryParams(params)}`)
}

// 创建文件
export const createFolder = (params: any) => {
  return server.post('create_clound_data_folder', params)
}

// 下载文件
export const downloadCloudFile = (params: any) => {
  return server.get(`download_clound_file${queryParams(params)}`, {
    responseType: 'blob'
  })
}

// 删除文件或文件夹
export const deleteCloudFile = (params: any) => {
  return server.delete(`delete_cloud_file`, {
    data: postParams(params)
  })
}

// 查看video
export const getVideo = (params: any) => {
  return server.get(`video${queryParams(params)}`, {
    responseType: 'blob'
  })
}

// 磁力下载
export const linkDownLoad = (params: any) => {
  return server.post('magnet_link_download', params)
}

// 创建文件夹
// export const createCloudFolder = (id: any) => {
//   return server.get(`create_clound_folder?userid=${id}`)
// }

// 更新后台
export const updateBackend = () => {
  return server.post('update_backend')
}
