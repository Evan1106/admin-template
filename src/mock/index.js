import Mock from 'mockjs'

// 导入 模擬假數據的包
import { Random } from 'mockjs'

// 創建自定義 Mock 函数
Random.extend({
  // 自定義函數名: function 函数
  status: function() {
    const arr = [ '結案', '急件', '接洽中', '待聯絡']
    return this.pick(arr)
  }
})

// 獲取商品列表
Mock.mock('/api/goodslist', 'get', {
  status: 200,
  message: '獲取商品列表成功！',
  'data|5-10': [
    {
      id: '@increment(1)',      // 自增的Id值
      // 'id|+1': 0,            // 这也是在模擬一個自增長的 Id 值
      company_name: '@cword(2, 8)',     // 隨機生成中文字符串
      contacter: '@cname',
      phone: '@natural(100000000, 999999999)',
      GUI_number:'@natural(100000000, 999999999)',
      status: '@status()',
      isCheck: false,
      email: '@email',
      domain: '@domain',
      date: '@date',
      desc: '@csentence(5)',

    }
  ]
})

// edit data
Mock.mock('/api/editgoods', 'post', function(option) {
  // 这里的 option 是請求相關的參數
  console.log(option)
  // 如果需要在返回的对象中再使用mock的語法，则需要再使用Mock.mock
  return Mock.mock({
    status: 200,
    message: '@cword(2,5)'
  })
})

//delete data
Mock.mock('/api/deletegoods', 'delete', function(option) {
  // 这里的 option 是請求相關的參數
  console.log(option)
  
})

// 根據ID獲取商品信息
Mock.mock(/\/api\/getgoods/, 'get', function(option) {
  console.log(option)
  
  // 通過 正則 的 .exec() 函数，从字符串中提取需要的數據
  //   const res = /\/api\/getgoods/(\d+)/.exec(option.url)
  
  // 也可以通過字符串的split方法獲取id
  // const urlId = option.url.split('/')[3]
  
  return Mock.mock({
    data: {
    //   id: res[1] - 0,
      // id: urlId,
      // 这里的@fruit()是前面自定义的mock函数
      name: '@fruit()',
      price: 2,
      count: 199,
      img: '@dataImage(78x78)',
    },
    status: 200,
    message: '獲取商品成功！'
  })
})

// 登入，此地址與login登入地址對應
Mock.mock('/login','post', (param)=>{  
  let state=0;
  let body = JSON.parse(param.body);
  console.log(param)
  let data;
  //模擬用户名和密碼都是 admin
  if( body.username=='admin' && body.password=='admin'){
      state = 1;
      data = Mock.mock({
          "token": "@guid()",  //模擬token
          "name": "@cname",    //隨機生成中文名字
      });
  }
  return{
      "state":state,
      "vData":data
  }
});

//退出
Mock.mock('/logout','post', ()=>{
  return { state:0 }
});


const { asyncRoutes, constantRoutes } = require('./role/routes')

const routes = [...constantRoutes, ...asyncRoutes]

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

//getRoutes
Mock.mock('/vue-element-admin/routes','get', ()=>{
  return { code:200, data:routes }
});
//getRoles
Mock.mock('/vue-element-admin/roles','get', ()=>{
  return { code:200, data:roles }
});