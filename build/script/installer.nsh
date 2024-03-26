!define PRODUCT_UNINST_ROOT_KEY "HKLM"
!define PRODUCT_DIR_REGKEY "Software\redis-desktop"
!define DIR "D:\Redis Desktop"

; 初始化安装位置
!macro customInit
    ; 读取上一次安装路径
    ReadRegStr $R0 ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_DIR_REGKEY}" "InstallLocation"
    StrCmp $R0 "" 0 +3
    StrCpy $INSTDIR "${DIR}"
    Goto +2
    StrCpy $INSTDIR $R0
    SetOutPath $INSTDIR
    SetOverwrite try
!macroend

; 安装完成写注册表
!macro customInstall
	WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_DIR_REGKEY}" "InstallLocation" "$INSTDIR"
!macroend

; 卸载成功删注册表
!macro customUnInstall
    DeleteRegKey ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_DIR_REGKEY}"
!macroend