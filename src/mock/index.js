import Mock from 'mockjs'

// 导入 模拟假数据的包
import { Random } from 'mockjs'

// 创建自定义 Mock 函数
Random.extend({
  // 自定义函数名: function 函数
  status: function() {
    const arr = ['已完成', '急件', '接洽中', '待聯絡']
    return this.pick(arr)
  }
})

// 获取商品列表
Mock.mock('/api/goodslist', 'get', {
  status: 200,
  message: '获取商品列表成功！',
  'data|5-10': [
    {
      id: '@increment(1)',      // 自增的Id值
      // 'id|+1': 0,            // 这也是在模拟一个自增长的 Id 值
      company_name: '@cword(2, 8)',     // 随机生成中文字符串
      contacter: '@cname',
      phone: '@natural(100000000, 999999999)',
      GUI_number:'@natural(100000000, 999999999)',
      status: '@status()',

    }
  ]
})

// edit data
Mock.mock('/api/editgoods', 'post', function(GUI_number) {
  // 这里的 option 是请求相关的参数
  console.log(GUI_number)
  // 如果需要在返回的对象中再使用mock的语法，则需要再使用Mock.mock
  return Mock.mock({
    status: 200,
    message: '@cword(2,5)'
  })
})

// 根据Id获取商品信息
Mock.mock(/\/api\/getgoods/, 'get', function(option) {
  console.log(option)
  
  // 通过 正则 的 .exec() 函数，从字符串中提取需要的数据
//   const res = /\/api\/getgoods/(\d+)/.exec(option.url)
  
  // 也可以通过字符串的split方法获取id
  // const urlId = option.url.split('/')[3]
  
  return Mock.mock({
    data: {
    //   id: res[1] - 0,
      // id: urlId,
      // 这里的@fruit()是前面自定义的mock函数
      name: '@fruit()',
      price: 2,
      count: 199,
      img: '@dataImage(78x78)'
    },
    status: 200,
    message: '获取商品成功！'
  })
})

// 登录，此地址与login登录地址对应
Mock.mock('/login','post', (param)=>{  
  let state=0;
  let body = JSON.parse(param.body);
  console.log(param)
  let data;
  //模拟用户名和密码都是 admin
  if(body.username=='admin'&&body.password=='admin'){
      state=1;
      data = Mock.mock({
          "token": "@guid()",//模拟token
          "name": "@cname",//随机生成中文名字
      });
  }
  return{
      "state":state,
      "vData":data
  }
});

//退出
Mock.mock('/logout','post', ()=>{
  return {state:1}
});