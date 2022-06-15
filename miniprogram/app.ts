import { getToken } from "./utils/auth";

// app.ts
App({
  globalData: {},
  _isLoginPage() {
    const currentPages = getCurrentPages()
    console.log(currentPages)
    return false;
  },
  onShow() {
    if (!getToken()) {    
      wx.navigateTo({
        url: 'pages/login/index'
      })
    }
  },
//   onLaunch() {
//       const token = wx.getStorageSync('token') || null
//       // 如果token为空则放到login,其实就是给一个页面栈
//       // 如果token不为空则啥也不做
//       if (!token) {
//           wx.navigateTo({
//               url: 'pages/login/index'
//           })
//       }
//   }
})