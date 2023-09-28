"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Typography,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CUSTOMER_DETAILS,
  CUSTOMER_LIST,
  Customer,
  EditCustomerFormFields,
  customerEditSchema,
  setCustomerEditForm,
} from "@/app/components/customer/lib/customer.helper";
import { getErrorMessage } from "../lib/form.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editCustomer, getCustomerDetails } from "../api/customer";
import { AxiosError } from "axios";

type FormProps = {
  id: string;
};

const EditForm: React.FC<FormProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditCustomerFormFields>({
    resolver: yupResolver(customerEditSchema),
    mode: "onTouched",
  });
  const errorMessage = getErrorMessage(errors);
  const { push } = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(editCustomer);

  const onSubmit = (data: EditCustomerFormFields) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CUSTOMER_LIST] });
        alert("Customer info updated successfully");
        push("/");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const errors = error.response?.data?.errors;

          if (Object.keys(errors).length > 0) {
            for (const [key, value] of Object.entries(errors)) {
              console.log(`${key}: ${typeof value}`);
            }
          }
        } else {
          console.log(error);
        }
        alert("An error occured while creating the customer");
      },
    });
  };

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useQuery({
    queryKey: [CUSTOMER_DETAILS],
    queryFn: async () => {
      const { data } = await getCustomerDetails(+id as number);
      return data.data as Customer;
    },
  });

  useEffect(() => {
    if (!isFetching && data) {
      setCustomerEditForm(data, setValue);
    }
  }, [isFetching, data, setValue]);

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
      <CssBaseline />
      <div>
        <Typography
          component="h1"
          align="center"
          variant="h5"
          sx={{ mt: 2, mb: 3 }}
        >
          Customer Info Edit
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                {...register("name")}
                variant="standard"
                focused
                required
                fullWidth
                error={errorMessage("name") ? true : false}
                helperText={errorMessage("name") && errorMessage("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                focused
                {...register("email")}
                variant="standard"
                required
                fullWidth
                error={errorMessage("email") ? true : false}
                helperText={errorMessage("email") && errorMessage("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone"
                label="Phone"
                focused
                {...register("phone")}
                variant="standard"
                fullWidth
                error={errorMessage("phone") ? true : false}
                helperText={errorMessage("phone") && errorMessage("phone")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                required
                variant="standard"
                label="Comment"
                focused
                {...register("comment")}
                InputProps={{
                  inputComponent: TextareaAutosize,
                  rows: 6,
                }}
                error={errorMessage("comment") ? true : false}
                helperText={errorMessage("comment") && errorMessage("comment")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 3 }}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditForm;
