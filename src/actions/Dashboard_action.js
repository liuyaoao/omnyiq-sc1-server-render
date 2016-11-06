export const DEVICE_INFORMATION = 'DEVICE_INFORMATION';//记录当前路由设备信息
export const DASHBOARD_SPEEDS = 'DASHBOARD_SPEEDS';//记录当前设备速度信息
export const CONNECT_DIVICES = 'CONNECT_DIVICES';//记录连接路由的设备信息
export function setCurDeviceInfo(curDeviceInfo) {
    return {
        type: DEVICE_INFORMATION,
        curDeviceInfo
    }
}

export function setDashboardSpeeds(dashboardSpeedsState) {
    return {
        type: DASHBOARD_SPEEDS,
        dashboardSpeedsState
    }
}

export function setConnectDivives(connectDivivesState) {
    return {
        type: CONNECT_DIVICES,
        connectDivivesState
    }
}
