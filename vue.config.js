const version = require("./package.json").version
const productName = `Redis Desktop`;
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        host: '127.0.0.1',
        port: 52916
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
