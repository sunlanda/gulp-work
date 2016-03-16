#gulp工作流使用简析


###安装顺序
    > npm install gulp --save-dev
    > npm install gulp-less gulp-css-base64 --save-dev
    > npm install gulp-concat gulp-uglify gulp-cssnano gulp-htmlmin --save-dev
    > npm install browser-sync --save-dev

###开始项目
    > npm  init 初始化项目
    > 依次建立文件夹如:
        > src>scripts/styles/images
        > dist>scripts/styles/images
    > 新建gulpfile.js(名称固定)
        > 依次require一下插件包
        > task执行src(书写规范可见npm文档)
        > 加载html css js img 后写watch事件       
>可能会出现的问题(小模块pipe环节最后加上刷新方法)

       ```
       .pipe(browserSync.reload(
            {stream:true}
            ));
        ```

>可能会出现的问题(browser-sync中更改默认localhost路径) 

        ```
         browserSync({
                server: {
                    baseDir: ['dist']
                }
        ```

###附注
    > 请记得区分开发环境和生产环境
    > 多使用cmd测试小模块
    > npm是个神奇的地方 
