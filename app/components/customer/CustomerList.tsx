import React, { SyntheticEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CUSTOMER_LIST, Customer } from "./lib/customer.helper";
import { deleteCustomer, getCustomerList } from "../api/customer";
import { useRouter } from "next/navigation";

const CustomerList = () => {
  const { push } = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: [CUSTOMER_LIST],
    queryFn: async () => {
      const { data } = await getCustomerList();
      const customer = data?.data?.data as Customer[];
      return customer;
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_LIST] });
    },
    onError: () => {
      alert("Customer delete error. Something went wrong");
    },
  });

  const handleDeleteItem = (e: SyntheticEvent, customerId: number) => {
    e.preventDefault();
    const check = confirm("Are sure want to delete?");
    if (check) {
      mutate(customerId);
    }
  };

  if (isLoading) return <div>Loading.....</div>;

  if (isError) return <div>Something went wrong !</div>;

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650, mt: 4 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Client_id</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Comment</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell align="left">{customer.client_id}</TableCell>
                <TableCell align="left">{customer.email}</TableCell>
                <TableCell align="left">{customer.phone}</TableCell>
                <TableCell align="left">{customer.name}</TableCell>
                <TableCell align="left">{customer.comment}</TableCell>
                <TableCell align="left">
                  <span
                    onClick={() => {
                      push(`/customer/edit/${customer.id}`);
                    }}
                    className="py-2 px-2 pointer"
                  >
                    <EditIcon color="primary" />
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span
                    onClick={(e) => {
                      handleDeleteItem(e, customer.id);
                    }}
                    className="py-2 px-2 pointer"
                  >
                    <DeleteRoundedIcon color="error" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomerList;
