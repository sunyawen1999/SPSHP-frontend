import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: () => import('../views/404.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '',
        hidden: true,
        children: [
            { path: '/userPage', component: () => import('../views/user/userPage'), name: '个人主页' },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '',
        hidden: true,
        children: [
            { path: '/resetPassword', component: () => import('../views/user/resetPassword'), name: '修改密码' },
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '',
        meta: 'task',
        iconCls: 'el-icon-receiving',
        children: [
            {
                path: '/firstPage',
                component: () => import('../views/fileManage/firstPage'), name: '首页', meta: 'firstPage'
            },
            {
                path: '/consultationRecords',
                component: () => import('../views/fileManage/consultationRecords'), name: '咨询记录', meta: 'consultationRecords'
            },
            {
                path: '/schedule',
                component: () => import('../views/fileManage/schedule'), name: '排班表', meta: 'schedule'
            },
            {
                path: '/consultantManagement',
                component: () => import('../views/fileManage/consultantManagement'), name: '咨询师管理', meta: 'consultantManagement'
            },
            {
                path: '/superviseManagement',
                component: () => import('../views/fileManage/superviseManagement'), name: '督导管理', meta: 'superviseManagement'
            },
            {
                path: '/helpRecord',
                component: () => import('../views/fileManage/helpRecord'), name: '求助记录', meta: 'helpRecord'
            },
            {
                path: '/visitorManagement',
                component: () => import('../views/fileManage/visitorManagement'), name: '访客管理', meta: 'visitorManagement'
            },
            /* {
                path: '/taskList',
                component: () => import('../views/fileManage/taskList'), name: '任务列表', meta: 'taskList'
            },
            { path: '/taskList/publishTask', component: () => import('../views/fileManage/publishTask'), name: '发布任务', hidden: true },
            { path: '/taskList/taskDetail', component: () => import('../views/fileManage/taskDetail'), name: '任务详情', hidden: true },
            { path: '/taskList/taskEdit', component: () => import('../views/fileManage/taskEdit'), name: '任务编辑', hidden: true },
            { path: '/transactionMonitoring', component: () => import('../views/fileManage/transactionMonitoring'), name: '交易实时监控', meta: 'transactionMonitoring' },
            { path: '/transactionMonitoring/newMonitoringGraph', component: () => import('../views/fileManage/newMonitoringGraph'), name: '新增监控图形', hidden: true},
            { path: '/transactionMonitoring/graph', component: () => import('../views/fileManage/graph'), name: '监控图形', hidden: true},
            { path: '/transactionMonitoring/newDataTable', component: () => import('../views/fileManage/newDataTable'), name: '新增数据表格', hidden: true},
            { path: '/transactionMonitoring/dataTable', component: () => import('../views/fileManage/dataTable'), name: '数据表格', hidden: true},
            { path: '/personalSetting', component: () => import('../views/roleManage/personalSetting'), name: '个人设置' },
            { path: '/workerInfo/workerDetail', component: () => import('../views/roleManage/workerDetail'), name: '员工详情', hidden: true },
            { path: '/taskListCalendar', component: () => import('../views/fileManage/taskListCalendar'), name: '任务列表', hidden: true }, */
        ]
    },
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        name: '',
        meta: '员工管理权限管理',
        iconCls: 'el-icon-user',
        children: [
            //{ path: '/userManage', component: () => import('../views/fileManage/userManage'), name: '用户管理', meta: 'userManage' },
            // { path: '/roleInfo', component: () => import('../views/roleManage/roleInfo'), name: '职务管理' },
            //{ path: '/permissionInfo', component: () => import('../views/roleManage/permissionInfo'), name: '权限管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        sessionStorage.removeItem("user");
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user && to.path != "/login") {
        next({ path: "/login" });
    } else {
        next();
    }
});

export default router
