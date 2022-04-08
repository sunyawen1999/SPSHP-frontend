import axios from 'axios'

export const AddCounselor = (para) => axios.post('/api/counselor', para);

export const UpdateCounselor = (para) => axios.put('/api/counselor', para);

export const DeleteCounselor = (id) => axios.delete(`/api/counselor/${id}`);

export const GetCounselorById = (id) => axios.get(`/api/counselor/${id}`);

export const GetCounselorList = (para) => {
    return axios.get('/api/counselor/list', { params: para });
};

export const combineRequest = (para) => axios.put('/api/counselor/combine', para);
