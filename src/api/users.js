import axios from 'axios'

export const UpdateUser = (para) => axios.put('/api/users', para);

export const GetUserById = (id) => axios.get(`/api/users/${id}`);

export const DeleteUser = (id) => axios.delete(`/api/users/${id}`);

export const AddUser = (para) => axios.post('/api/users/create', para);

export const GetUsersList = (para) => {
    return axios.get('/api/users/list', { params: para });
};

export const GetUsersListBySearchCondition = (para) => {
    return axios.get('/api/users/listBySearchCondition', { params: para });
};

export const UserMe = () => axios.get('/api/users/me');

export const EditPassword = (oldPassword, newPassword) => axios.put(`/api/users/password?oldPassword=${oldPassword}&newPassword=${newPassword}`);

export const ResetPassword = (id) => axios.put(`/api/users/reset_password?id=${id}`);
