import axios from 'axios'

export const AddSchedule = (para) => axios.post('/api/schedule', para);

export const UpdateSchedule = (para) => axios.put('/api/schedule', para);

export const DeleteSchedule = (id) => axios.delete(`/api/schedule/${id}`);

export const GetScheduleById = (id) => axios.get(`/api/schedule/${id}`);

export const GetScheduleList = (para) => {
    return axios.get('/api/schedule/list', { params: para });
};

export const UpdateDefaultSchedule = (para) => axios.put('/api/schedule/modifyWeekly', para);

export const GetConselorScheduleById = (id) => axios.get(`/api/schedule/counselorSchedule?id=${id}`);

export const GetSupervisorScheduleById = (id) => axios.get(`/api/schedule/supervisorSchedule?id=${id}`);
