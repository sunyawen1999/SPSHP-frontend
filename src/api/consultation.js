import axios from 'axios'

export const AddCounsel = (para) => axios.post('/api/counsel', para);

export const UpdateCounsel = (para) => axios.put('/api/counsel', para);

export const DeleteCounsel = (id) => axios.delete(`/api/counsel/${id}`);

export const GetCounselById = (id) => axios.get(`/api/counsel/${id}`);

export const GetCounselList = (para) => {
    return axios.get('/api/counsel/list', { params: para });
};

export const GetCounselByCounselor = (id) => axios.get(`/api/counsel/counselor/${id}`);