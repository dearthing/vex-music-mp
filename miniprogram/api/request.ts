const baseUrl = "https://vex-music-1991904-1312352195.ap-shanghai.run.tcloudbase.com"

export const get = (uri: string) => {
    wx.showLoading({
        title: '加载中'
    })
    return new Promise((resolve, reject)=>{
        wx.request({
            url: baseUrl + uri,
            method: 'GET',
            success: (res)=>{
                resolve(res)
            },
            fail: reject,
            complete: ()=>{
                wx.hideLoading()
            }
        })
    })
}