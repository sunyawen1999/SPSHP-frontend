import axios from 'axios'

export const AddSupervisor = (para) => axios.post('/api/supervisor', para);

export const UpdateSupervisor = (para) => axios.put('/api/supervisor', para);

export const DeleteSupervisor = (id) => axios.delete(`/api/supervisor/${id}`);

export const GetSupervisorById = (id) => axios.get(`/api/supervisor/${id}`);

export const GetSupervisorList = (para) => {
    return axios.get('/api/supervisor/list', { params: para });
};

export const combineCounselor = (para) => axios.put('/api/supervisor/combine', para);