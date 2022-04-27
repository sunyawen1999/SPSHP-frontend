import axios from 'axios'

export const AddCounsel = (para) => axios.post('/api/counsel', para);

export const UpdateCounsel = (para) => axios.put('/api/counsel', para);

export const DeleteCounsel = (id) => axios.delete(`/api/counsel/${id}`);

export const GetCounselById = (id) => axios.get(`/api/counsel/${id}`);

export const GetCounselList = (para) => {
    return axios.get('/api/counsel/list', { params: para });
};


export const GetCounselByCounselor = (para) => {
    return axios.get('/api/counsel/counselor', { params: para });
};

export const GetCounselWeekAll = () => axios.get('/api/counsel/weekAll');

export const GetCounselTodayAll = () => axios.get('/api/counsel/todayAll');

export const GetCounselTodaySum = () => axios.get('/api/counsel/todaySum');

