import axios from 'axios'

// 
const airOpendata = axios.create({
    baseURL: 'https://data.epa.gov.tw',
})

// 取得各地數據 API
export const getAirData = (data = {}) => airOpendata.get('/api/v1/aqx_p_432?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&format=json', data)