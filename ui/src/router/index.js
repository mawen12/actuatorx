import { createRouter, createWebHashHistory } from 'vue-router'
import BeansPage from '@/pages/beans/BeansPage.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layout/AppLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'Connect',
                    component: () => import('@/pages/connect/ConnectPage.vue'),
                },
                {
                    path: 'health',
                    name: 'Health',
                    component: () => import('@/pages/health/HealthPage.vue'),
                },
                {
                    path: 'metrics',
                    name: 'Metric',
                    component: () => import('@/pages/metrics/MetricsPage.vue'),
                },
                {
                    path: 'info',
                    name: 'Info',
                    component: () => import('@/pages/info/InfoPage.vue'),
                },
                {
                    path: 'env',
                    name: 'Env',
                    component: () => import('@/pages/env/EnvPage.vue'),
                },
                {
                    path: 'beans',
                    name: 'Beans',
                    component: () => import('@/pages/beans/BeansPage.vue'),
                    // component: BeansPage,
                },
                {
                    path: 'conditions',
                    name: 'Conditions',
                    component: () => import('@/pages/conditions/ConditionsPage.vue'),
                },
                {
                    path: 'configprops',
                    name: 'Configprops',
                    component: () => import('@/pages/configprops/ConfigpropsPage.vue'),
                },
                {
                    path: 'caches',
                    name: 'Caches',
                    component: () => import('@/pages/caches/CachesPage.vue'),
                },
                {
                    path: 'loggers',
                    name: 'Loggers',
                    component: () => import('@/pages/loggers/LoggersPage.vue'),
                },
                {
                    path: 'mappings',
                    name: 'Mappings',
                    component: () => import('@/pages/mappings/MappingsPage.vue'),
                },
                {
                    path: 'httpexchanges',
                    name: 'Http Exchanges',
                    component: () => import('@/pages/httpexchanges/HttpExchangesPage.vue'),
                },
                {
                    path: 'logfile',
                    name: 'Logfile',
                    component: () => import('@/pages/logfile/LogfilePage.vue'),
                },
                {
                    path: 'scheduled-tasks',
                    name: 'Scheduled Tasks',
                    component: () => import('@/pages/scheduled-tasks/ScheduledTasksPage.vue'),
                },
                {
                    path: 'threaddump',
                    name: 'Thread Dump',
                    component: () => import('@/pages/threaddump/ThreaddumpPage.vue'),
                }
            ],
        },
    ],
})

export default router
