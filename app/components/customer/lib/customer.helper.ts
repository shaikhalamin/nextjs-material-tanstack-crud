import * as yup from "yup";

export const CUSTOMER_LIST = "customer_list";
export const CUSTOMER_DETAILS = "customer_details";
export const CREATE_CUSTOMER = "create_customer";

export type Customer = {
  id: number;
  client_id: string;
  name: string;
  email: string;
  phone?: string;
  comment: string;
};

export type CreateCustomerFormFields = {
  name: string;
  email: string;
  phone?: string;
  comment: string;
};

export type EditCustomerFormFields = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  comment: string;
};

const customerBaseSchema = {
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().optional(),
  comment: yup
    .string()
    .min(1, "Comment is required")
    .max(1000)
    .required("Comment is required"),
};

export const customerCreateSchema = yup
  .object({
    ...customerBaseSchema,
  })
  .required();

export const customerEditSchema = yup
  .object({
    id: yup.number().required("Id is required"),
    ...customerBaseSchema,
  })
  .required();

export const setCustomerEditForm = (
  customer: Customer,
  setValue: CallableFunction
) => {
  setValue("id", customer.id);
  setValue("name", customer.name);
  setValue("email", customer.email);
  setValue("phone", customer.phone);
  setValue("comment", customer.comment);
};
