import type coord from "../services/coordinate.service"

let dataList: coord[] = []

export const getDataList = (): coord[] => {
    return dataList
}

export const setDataList = (list: coord[]): void => {
    dataList = list
}