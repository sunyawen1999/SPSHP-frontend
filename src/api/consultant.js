import axios from 'axios'

export const AddCounselor = (para) => axios.post('/api/counselor', para);

export const UpdateCounselor = (para) => axios.put('/api/Counselor', para);

export const DeleteCounselor = (id) => axios.delete(`/api/Counselor/${id}`);

export const GetCounselorById = (id) => axios.get(`/api/counselor/${id}`);

export const GetCounselorList = (para) => {
    return axios.get('/api/counselor/list', { params: para });
};