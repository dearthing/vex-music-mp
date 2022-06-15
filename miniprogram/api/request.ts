import { getToken, removeToken, setToken } from "../utils/auth"

// const baseUrl = "https://vex-music-1991904-1312352195.ap-shanghai.run.tcloudbase.com"
const baseUrl = "http://localhost:8080"

export const get = (uri: string) => {
    wx.showLoading({
        title: '加载中'
    })
    return new Promise<any>((resolve, reject)=>{
        wx.request({
            url: baseUrl + uri,
            method: 'GET',
            success: (res)=>{
                if (res.statusCode === 401) {
                    //token过期也会走401这个错误
                    removeToken() 
                    const currentPages = getCurrentPages()
                    const currentRoute = currentPages[currentPages.length - 1].route
                    // 如果当前路由就是首页就不需要跳转到首页了
                    if (currentRoute !== 'pages/login/index') {
                        wx.navigateTo({
                            url : `/pages/login/index`
                        })
                    }
                    // todo 同时声明错误类型
                    wx.showToast({
                        title : "用户未登录",
                        icon : "error"
                    })
                }
                
                resolve(res.data);
            },
            fail: reject,
            complete: ()=>{
                wx.hideLoading()
            }
        })
    })
}

export const post = (uri: string, data: object) => {
    wx.showLoading({
        title: '加载中'
    })
    return new Promise<any>((resolve, reject)=>{
        wx.request({
            url: baseUrl + uri,
            data,
            method: 'POST',
            success: (res)=>{
                if (res.statusCode === 401) {
                    //token过期也会走401这个错误
                    removeToken() 
                    const currentPages = getCurrentPages()
                    const currentRoute = currentPages[currentPages.length - 1].route
                    // 如果当前路由就是首页就不需要跳转到首页了
                    if (currentRoute !== 'pages/login/index') {
                        wx.navigateTo({
                            url : `/pages/login/index`
                        })
                    }
                    // todo 同时声明错误类型
                    wx.showToast({
                        title : "用户未登录",
                        icon : "error"
                    })
                }
                // 把token放在storage
                _handleToken(res.header);
                resolve(res.data);
            },
            fail: reject,
            complete: ()=>{
                wx.hideLoading()
            }
        })
    })
}


const _handleToken = (header : any) => {
    const token = header['Authorization'] || null
    // 如果从后端拿到的token和浏览器存的token一样就不会走setToken
    // 否则setToken
    if(token && getToken() !== token) {
        setToken(token);
        const currentPages = getCurrentPages()
        console.log(currentPages);
        wx.navigateBack();
    }
}