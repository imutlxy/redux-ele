const menuBar = {
    menu_bar_file: 'File',
    menu_bar_file_new: 'New',
    menu_bar_file_open: 'Open',
    menu_bar_file_import: 'Import Settings',
    menu_bar_file_export: 'Export Settings',
    menu_bar_file_save: 'Save',
    menu_bar_file_save_as: 'Save As',
    menu_bar_file_download: 'Download Design',
    menu_bar_edit: 'Edit',
    menu_bar_edit_undo: 'Undo',
    menu_bar_edit_redo: 'Redo',
    menu_bar_edit_cut: 'Cut',
    menu_bar_edit_copy: 'Copy',
    menu_bar_edit_paste: 'Paste',
    menu_bar_edit_del: 'Del',
    menu_bar_view: 'View',
    menu_bar_view_fullscreen: 'Fullscreen',
    menu_bar_view_only_show_workspace: 'Only Show WorkSpace',
    menu_bar_view_show_toolbar: 'Show Toolbar',
    menu_bar_view_show_side_bar: 'Show SideBar',
    menu_bar_tool: 'Tool',
    menu_bar_tool_log: 'Log Monitor',
    menu_bar_tool_model: 'Model Editor',
    menu_bar_help: 'Help',
    menu_bar_help_doc: 'Help Doc',
    menu_bar_help_lectures: 'Quick Start',
    menu_bar_help_shortcut: 'Keymap Reference',
    menu_bar_help_daily_tip: 'Tip of the Day',
    menu_bar_help_change_log: 'Update Log',
    menu_bar_help_contact: 'Contact Us',
    menu_bar_help_about: 'About',
    menu_bar_help_cog: 'Settings'
};
const toolBar = {
    tool_bar_file_open: 'Open',
    tool_bar_file_save: 'Save',
    tool_bar_edit_undo: 'Undo',
    tool_bar_edit_redo: 'Redo',
    tool_bar_edit_cut: 'Cut',
    tool_bar_edit_copy: 'Copy',
    tool_bar_edit_paste: 'Paste',
    tool_bar_edit_del: 'Delete',
    tool_bar_edit_go: 'Go to',
    tool_bar_edit_clear: 'Empty Workspace',
    tool_bar_tool_log: 'Log Monitor',
    tool_bar_tool_model: 'Model Editor'
};
const sideBar = {
    side_bar_root_cView: 'Component View',
    side_bar_root_outline: 'Outline View'
};
//远程协助
const remote = {
    userId: 'User ID :',
    requestHelp: 'Request remote assistance',
    idChange: 'User Id changes',
    idChangeInfo: 'Id changed to',
    idRepeat: 'User Id duplicated',
    idRepeatInfoH: 'The user Id ',
    idRepeatInfoE: 'already exists, please re-enter',
    welcome: 'Welcome:',
    modify: 'Rename',
    helpButtonText: 'Remote Assistance',
    endButtonText: 'Terminate Assistance',
    host: 'User',
    peer: 'The other user',
    requestAlert: 'Request Alert',
    selectUsers: 'Please check the user to request',
    requestFailure: 'Request Failed',
    inOtherRoom: 'The requested user is in other assistance',
    acceptRequest: 'The user has accepted the remote assistance request!',
    acceptInfo: 'Has received a remote assistance request! You are already in the same chat room',
    peerRefusal: 'The other user rejects the remote assistance request!',
    peerRefusalInfo: 'Refused to provide remote assistance!',
    hostEndHelp: 'You have terminated the remote assistance!',
    hostEndHelpMessage: 'You have terminated the remote assistance and left the chat room',
    peerEnd: 'Remote assistance has been terminated!',
    peerEndInfo: 'Has terminated the remote assistance and left the chat room',
    hostQuitHelp: 'You have given up requests for remote assistance!',
    hostQuitHelpMessage: 'You have given up requests for remote assistance!',
    hostRequestHelp: 'You are asking for remote assistance!',
    hostRequestHelpMH: 'You are requesting a remote user',
    hostRequestHelpME: 'Assistance! Please wait ...',
    refuseQuit: 'You have quit opting out of remote assistance!',
    chooseToHelp: 'Select the user to request for help',
    confirmToHelp: 'Confirm remote assistance',
    confirmToHelpInfo: 'Confirm to assist remote users: ',
    confirmToHelpNote: 'Please note: When you confirm remote assistance, your designer\'s current status will be synchronized with the status of the remote requester. After the remote assistance is terminated, your designer\'s status will automatically be restored to the origin status.',
    endHelp: 'Confirm to terminate remote assistance',
    endHelpMH: 'Confirm the termination with the peer user ',
    endHelpME: 'between remote assistance',
    allSelectedButton: 'Select All',
    saveStore: 'Save Assistance Changes',
    saveOption: 'Please confirm whether to save the contents which changes at assistance?',
    groupMessage: 'Group Message',
    group: 'Group ',
    groupDestroy: 'has been disbanded',
    leaveGroup: 'has leaved the group',
    searchAlert: 'Search Alert',
    searchContentNull: 'Search content can not be empty!',
    searchContentIllegal: 'The search contains illegal characters!',
    searchResultNull: 'No related users found!',
    dataModelDisabled: 'The Remote Assistance Status currently does not support synchronous updates for the Data model operation log!',
    refreshUserList: 'Refresh the online user',
    remoteWarning: '( Friendly Tip: Currently only support the operation under the editing function! )',
    connectClose: 'Sorry, the WebSocket connection is disconnect, remote assistance will be closed.',
    socketConnectError: 'The remote server was in error and the WebSocket was disconnected',
    remoteAlert: 'Assistance Alert',
    chooseToEnd: 'Please select the user to terminate'
};
//文件下新建选项的数据
const operate = {
    operate_tips: 'Operation tips',
    operate_content: 'After you click OK, you will open the new tab to manipulate the data in the workspace!',
    operate_clear_workspace_content: 'When you click OK, the data of your previous workspace will be lost!'
};
//工具栏下模型数据编辑器选项的数据
const modalEditor = {
    modalEditor_title: 'Model data editor',
    modalEditor_verify: 'Verify the json file',
    modalEditor_error_title: 'Error message',
    modalEditor_error_content: 'JSON are noncompliance with requirements',
    modalEditor_import_success_tip: 'Configuration file imported successfully!',
    modalEditor_apply_success_tip: 'Model data apply successfully!',
    modalEditor_apply_success_tip2: 'The configuration file was imported successfully',
    modalEditor_not_modified_tip: 'Modal data hasn\'t be modified',
    modalEditor_apply_warning: 'Note: After saved, the modal data will take effect immediately!',
    modalEditor_apply_warning2: 'Note: After import, only the configuration file will take effect immediately'
};
//文件下打开选项的数据
const openFile = {
    open_title: 'Open',
    local_files: 'Local files',
    more_data: 'More...',
    loading: 'loading',
    unable_get_data: 'Unable to get remote history data temporarily',
    import_success_tip: 'The configuration file was imported successfully',
    import_error_type_title: 'The file type error',
    import_error_type_content: 'Please select the correct configuration file',
    import_error_title: 'The file type is wrong',
    import_error_content: 'Please select the correct profile'
};
//文件下保存选项的数据
const saveFile = {
    save_title: 'Save',
    save_as_title: 'Save As',
    download_design_title: 'Download Design',
    save_tip: 'Save the current design to the server',
    save_as_tip: 'Save a copy of the current design to the server, and then switch to the copy',
    download_design_tip: 'Save the current design locally',
    file_name: 'File name:',
    file_name_placeholder: 'optional',
    file_name_server: 'My design',
    select_all: 'Select all',
    export_error_title: 'There was an error in the exporting configuration data',
    export_error_content: 'There is an error in the configuration data. Please revise in the model editor.',
    export_error_confirm: 'Got it',
    export_success_tip: 'The file has been saved successfully',
    export_error_tip: 'File save failed',
    in_remote: 'In remote assistance, you can not open the file',
    export_settings_success_tip: 'The configuration file was saved successfully'
};

const inputSearch = {
    placeholder: 'Enter search content please',
    searchPrompt: 'Search warning'
};

const componentTip = {
    no_component_load: 'There is no components to be loaded',
    no_match_component: 'No components matches'
};

const shortcuts = {
    you_pressed: 'You pressed ',
    shortcuts: ' shortcuts'
};
//大纲视图select选择器
const select = {
    tree: 'TreeNodes display',
    noTree: 'Graphic display'
};

const auth = {
    login_prompt: 'You are already not signed in, so most functionality are not available. Would you like to sign in?',
    stay_here: 'Stay here',
    jump: 'Sign in'
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
