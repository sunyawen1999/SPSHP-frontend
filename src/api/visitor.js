import axios from 'axios'

export const AddCustomer = (para) => axios.post('/api/customer', para);

export const UpdateCustomer = (para) => axios.put('/api/customer', para);

export const DeleteCustomer = (id) => axios.delete(`/api/customer/${id}`);

export const GetCustomerById = (id) => axios.get(`/api/customer/${id}`);

export const GetCustomerList = (para) => {
    return axios.get('/api/customer/list', { params: para });
};