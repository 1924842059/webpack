class MyPlugin {
    constructor({ filename }) {
        this.filename = filename;
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap('MyPlugin', (compilation) => {
            /**
               compiler.hooks.emit.tap('FileListPlugin', (compilation)=>{
            let assets = compilation.assets;
             */
            compilation.hooks.processAssets.tap(
                {
                    name: 'MyPlugin',
                    stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                    //添加额外资源阶段
                },//webpack5的emit新形式
                (assets) => {
                    let content = `##  文件名    资源大小 \r\n`;
                    Object.entries(assets).forEach(([filename, source]) => {
                        content += `- ${filename}    ${source.size()}\r\n`;
                    });

                    assets[this.filename] = {
                        source() {
                            return content;
                        },
                        size() {
                            return content.length;
                        },
                    };
                }
            );
        });
    }
}

module.exports = MyPlugin;
