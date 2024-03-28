const version = require("./package.json").version;
const path = require('path');
const productName = `Redis Desktop`;
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        host: '127.0.0.1',
        port: 52916
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(path.join(__dirname, 'src/icon'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.join(__dirname, 'src/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon:[name]'
            })
            .end()
    },
    pluginOptions: {
        electronBuilder: {
            customFileProtocol: "./",
            chainWebpackMainProcess: (config) => {
                config.output.filename('background.js');
            },
            nodeIntegration: true,
            builderOptions: {
                appId: "com.yyx.redisdesktop",
                productName: `${productName}`,
                copyright: "杨永鑫<3271310698@qq.com>",
                directories: {
                    output: "releases",
                    buildResources: "build/license"
                },
                extraResources: [
                    {
                        from: "./extraResources/script.json",
                        to: "../data/script.json"
                    }
                ],
                win: {
                    icon: "build/icon/logo.ico",
                    target: "nsis"
                },
                nsis: {
                    oneClick: false,
                    perMachine: true,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: true,
                    installerIcon: "build/icon/logo.ico",
                    uninstallerIcon: "build/icon/logo.ico",
                    installerHeaderIcon: "build/icon/logo.ico",
                    uninstallDisplayName: `${productName} V${version}`,
                    include: "build/script/installer.nsh",
                    artifactName: `redis-desktop-Setup-${version}.exe`,
                    deleteAppDataOnUninstall: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: false,
                    shortcutName: `${productName}`
                }
            }
        }
    }
}
