import axios from 'axios'

// 这里主要展示拦截器
export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    // 实例的基本配置
    baseURL: 'http://123.207.32.32:8000/',
    timeout: 5000
  })
  // 2.axios拦截器
  // 拦截请求
  instance.interceptors.request.use(
    config => {
      console.log(config);
      // 这里就是将请求拦截掉，这里可以做一下的事，可以更多
      // 1.config中一些数据不符合要求，可以在此拦截更改

      // 2.每一次请求时，都希望在页面中显示一个正在请求的图标

      // 3.在某些网络请求中必须携带一些特殊的信息

      // 注意点：当我们在这里将请求拦截掉，做其他事件，做完后必须将请求内容return出去，不然在外面使用的时候接收不到请求内容
      return config
    }, err => {
      console.log(err);
    }
  )
  
  // 响应拦截
  // 响应拦截其实就是拦截请求结果
  instance.interceptors.response.use(
    res => {
      // 这里就是将请求结果拦截成功后需要做的事
      // console.log(res);
      // 注意：在对结果进行其他操作后要将请求结果返回，不然在使用请求结果的时候，拿不到数据，得到的结果将是一个undefined
      // 在结果中，真正能够用到的只有data，所以在这里返回的时候可以将请求结果全部返回，也可以只返回一个data，
      // return res
      return res.data // 一般都是返回这个
    },
    err => {
      // console.log(err);
      return err
    }
  )

  // 3.使用实例,发送真正的请求
  // 这里是因为instance的内部返回的就是一个Promise，所以这里可以直接return
  return instance(config)
}