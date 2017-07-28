/**
 * TODO: 待整理，拆分
 */
const menuBar = {
    menu_bar_file: '文件',
    menu_bar_file_new: '新建',
    menu_bar_file_open: '打开',
    menu_bar_file_import: '导入配置',
    menu_bar_file_export: '导出配置',
    menu_bar_file_save: '保存',
    menu_bar_file_save_as: '另存为',
    menu_bar_file_download: '下载设计',
    menu_bar_edit: '编辑',
    menu_bar_edit_undo: '撤销',
    menu_bar_edit_redo: '重做',
    menu_bar_edit_cut: '剪切',
    menu_bar_edit_copy: '复制',
    menu_bar_edit_paste: '粘贴',
    menu_bar_edit_del: '删除',
    menu_bar_view: '视图',
    menu_bar_view_fullscreen: '全屏模式',
    menu_bar_view_only_show_workspace: '只显示工作区',
    menu_bar_view_show_toolbar: '显示工具栏',
    menu_bar_view_show_side_bar: '显示侧边栏',
    menu_bar_tool: '工具',
    menu_bar_tool_log: '模型操作日志',
    menu_bar_tool_model: '模型数据编辑器',
    menu_bar_help: '帮助',
    menu_bar_help_doc: '帮助文档',
    menu_bar_help_lectures: '入门教程',
    menu_bar_help_shortcut: '热键索引',
    menu_bar_help_daily_tip: '每日技巧',
    menu_bar_help_change_log: '更新日志',
    menu_bar_help_contact: '联系我们',
    menu_bar_help_about: '关于',
    menu_bar_help_cog: '设置'
};
const toolBar = {
    tool_bar_file_open: '打开',
    tool_bar_file_save: '保存',
    tool_bar_edit_undo: '撤销',
    tool_bar_edit_redo: '重做',
    tool_bar_edit_cut: '剪切',
    tool_bar_edit_copy: '复制',
    tool_bar_edit_paste: '粘贴',
    tool_bar_edit_del: '删除',
    tool_bar_edit_go: '定位到',
    tool_bar_edit_clear: '清空工作区',
    tool_bar_tool_log: '模型操作日志',
    tool_bar_tool_model: '模型数据编辑器'
};
const sideBar = {
    side_bar_root_cView: '组件视图',
    side_bar_root_outline: '大纲视图'
};
// 远程协助数据
const remote = {
    userId: '用户ID :',
    requestHelp: '请求远程协助',
    idChange: '用户 Id 更改',
    idChangeInfo: '的 Id 变更为',
    idRepeat: '用户 Id 重复',
    idRepeatInfoH: '您更改的用户 Id ',
    idRepeatInfoE: '已存在，请重新输入',
    welcome: '欢迎你 :',
    modify: '修改',
    helpButtonText: '远程协助',
    endButtonText: '终止协助',
    host: '用户',
    peer: '对方用户',
    requestAlert: '请求提示',
    selectUsers: '请勾选用户进行请求',
    requestFailure: '请求协助失败',
    inOtherRoom: '被请求的用户正在其他协助中',
    acceptRequest: '对方用户已接受远程协助请求!',
    acceptInfo: '已接受远程协助请求! 你们已经在同一个聊天室',
    peerRefusal: '对方用户拒绝远程协助请求!',
    peerRefusalInfo: '拒绝提供远程协助!',
    hostEndHelp: '你已经终止远程协助!',
    hostEndHelpMessage: '你已经终止远程协助, 已离开群组',
    peerEnd: '已经终止远程协助!',
    peerEndInfo: '已经终止远程协助, 已离开群组',
    hostQuitHelp: '你已放弃请求远程协助!',
    hostQuitHelpMessage: '你已放弃请求远程协助!',
    hostRequestHelp: '你正在请求远程协助!',
    hostRequestHelpMH: '你正在请求远程用户',
    hostRequestHelpME: '协助! 请稍候……',
    refuseQuit: '你已放弃退出远程协助!',
    chooseToHelp: '选择用户求助',
    confirmToHelp: '确认远程协助',
    confirmToHelpInfo: '确认协助远程用户: ',
    confirmToHelpNote: '请注意：当你确认进行远程协助，你的设计器当前状态将会与远程求助者当前状态同步。本次远程协助终止之后，将会自动恢复远程协助之前的设计器状态。',
    endHelp: '确认终止远程协助',
    endHelpMH: '确认终止与对端用户 ',
    endHelpME: '之间的远程协助',
    allSelectedButton: '全选',
    saveStore: '保存协助内容',
    saveOption: '请确认是否保存协助时修改的内容？',
    groupMessage: '群组消息',
    group: '群组',
    groupDestroy: '已经解散',
    leaveGroup: '已经退出群组',
    searchAlert: '搜索提示',
    searchContentNull: '搜索内容不能为空',
    searchContentIllegal: '搜索内容中含有非法字符',
    searchResultNull: '没有搜到相关用户',
    dataModelDisabled: '当前远程协助状态，暂不支持数据模型操作日志的同步更新!',
    refreshUserList: '刷新在线用户',
    remoteWarning: '( 友情提示：当前只能支持编辑功能下的操作! )',
    connectClose: '远程服务器出错，远程协助已断开',
    socketConnectError: '远程服务器出错，WebSocket已断开',
    remoteAlert: '协助提示',
    chooseToEnd: '请选择要终止的用户'
};
//文件下新建选项的数据
const operate = {
    operate_tips: '操作提示',
    operate_content: '点击确认后，将会打开新的标签页新增一个设计。',
    operate_clear_workspace_content: '点击确认后，您当前的工作区内容将被全部清空。'
};
//工具栏下模型数据编辑器选项的数据
const modalEditor = {
    modalEditor_title: '数据模型编辑器',
    modalEditor_verify: '验证JSON文件',
    modalEditor_error_title: '错误提示',
    modalEditor_error_content: 'JSON文件不符合Schema验证',
    modalEditor_import_success_tip: '配置文件导入成功',
    modalEditor_apply_success_tip: '模型数据应用成功',
    modalEditor_apply_success_tip2: '配置文件导入成功',
    modalEditor_not_modified_tip: '未修改模型数据',
    modalEditor_apply_warning: '请注意：保存后，将会立即应用刚刚编辑的模型数据！',
    modalEditor_apply_warning2: '请注意：导入后，刚刚的配置文件会立即生效！'
};
//文件下打开选项的数据
const openFile = {
    open_title: '打开',
    local_files: '本地文件',
    more_data: '查看更多数据',
    loading: '加载中',
    unable_get_data: '暂时无法获取到远程历史数据',
    import_success_tip: '配置文件导入成功',
    import_error_type_title: '文件类型错误',
    import_error_type_content: '请选择正确的配置文件',
    import_error_title: '导入的配置文件出错',
    import_error_content: '配置文件数据存在错误，请在编辑器中进行修改。'
};
//文件下保存选项的数据
const saveFile = {
    save_title: '保存',
    save_as_title: '另存为',
    download_design_title: '下载设计',
    save_tip: '将当前设计保存到服务器（如果已存在，则进行重命名）',
    save_as_tip: '将当前设计另存一份保存到服务器（成功后切换到新设计）',
    download_design_tip: '将设计保存到本地',
    file_name: '文件名:',
    file_name_placeholder: '选填',
    file_name_server: '我的设计',
    select_all: '全选',
    export_error_title: '导出的配置文件出错',
    export_error_content: '文件数据存在错误，请在编辑器中进行修改。',
    export_error_confirm: '知道了',
    export_success_tip: '文件保存成功',
    export_error_tip: '文件保存失败',
    in_remote: '正在远程协助中，不能打开文件',
    export_settings_success_tip: '配置文件保存成功'
};

//搜索框提示内容
const inputSearch = {
    placeholder: '请输入搜索内容',
    searchPrompt: '搜索提示'
};

const componentTip = {
    no_component_load: '没有需要加载的组件',
    no_match_component: '没有匹配的组件'
};

const shortcuts = {
    you_pressed: '您按下了',
    shortcuts: '快捷键'
};
//大纲视图select选择器
const select = {
    tree: '节点视图',
    noTree: '平面视图'
};

const auth = {
    login_prompt: '您尚未登录，部分功能无法正常使用，是否先去登录一下？',
    stay_here: '留在当前页面',
    jump: '去登录'
};

export default {
    menuBar,
    toolBar,
    sideBar,
    remote,
    operate,
    modalEditor,
    openFile,
    saveFile,
    inputSearch,
    componentTip,
    shortcuts,
    select,
    auth
};
