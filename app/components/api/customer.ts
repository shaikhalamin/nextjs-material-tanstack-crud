import axios from "axios";
import {
  CreateCustomerFormFields,
  EditCustomerFormFields,
} from "../customer/lib/customer.helper";
import { API_URLS } from "./api-urls";

const CUSTOMERS_URL = API_URLS.customers;

export const getCustomerDetails = async (id: number) => {
  return axios.get(`${CUSTOMERS_URL}/${id}`);
};

export const getCustomerList = () => {
  return axios.get(`${CUSTOMERS_URL}`);
};

export const createCustomer = (
  customerFormFields: CreateCustomerFormFields
) => {
  return axios.post(`${CUSTOMERS_URL}`, customerFormFields, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editCustomer = (customerFormFields: EditCustomerFormFields) => {
  const { id, ...payloads } = customerFormFields;
  return axios.patch(`${CUSTOMERS_URL}/${id}`, payloads, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCustomer = (id: number) => {
  return axios.delete(`${CUSTOMERS_URL}/${id}`);
};
