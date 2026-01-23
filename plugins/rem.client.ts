export default defineNuxtPlugin((nuxtApp) => {
    // 核心方法：根据屏幕宽度设置html类名
    const handleResize = () => {
        let mobileWidth=768;
        let bodyWidth = document.documentElement.getBoundingClientRect().width; // 当前窗口的宽度
        // 获取html根元素
        const htmlElement = document.documentElement
        // 移除旧的类名（避免重复添加）
        htmlElement.classList.remove('mobile', 'pc')

        // 判断屏幕宽度并添加对应类名
        if (bodyWidth < mobileWidth) {
            htmlElement.classList.add('mobile')
        } else {
            htmlElement.classList.add('pc')
        }
        //全局定义变量，表示是否是移动端
        (window as any).isMobile = bodyWidth <= mobileWidth;
    }

    nuxtApp.hook('app:mounted', () => {
        console.log('Nuxt 应用已挂载，执行类名设置')
        handleResize()

        window.addEventListener("resize", function () {
            setTimeout(function () {
                handleResize();
            }, 100)
        })

        // 可选：页面跳转/卸载时移除监听（防止内存泄漏）
        nuxtApp.hook('app:unmounted', () => {
            window.removeEventListener('resize', handleResize)
        })
    })

})

