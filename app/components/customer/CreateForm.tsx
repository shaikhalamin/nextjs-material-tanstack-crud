"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  CUSTOMER_LIST,
  CreateCustomerFormFields,
  customerCreateSchema,
} from "@/app/components/customer/lib/customer.helper";
import { getErrorMessage } from "../lib/form.helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../api/customer";

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCustomerFormFields>({
    resolver: yupResolver(customerCreateSchema),
    mode: "onTouched",
  });
  const errorMessage = getErrorMessage(errors);
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createCustomer);

  const onSubmit = (data: CreateCustomerFormFields) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CUSTOMER_LIST] });
        alert("Customer created successfully");
        push("/");
      },
      onError: (response) => {
        alert("An error occured while creating the customer");
        console.log(response);
      },
    });
  };

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
          Customer Info
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                {...register("name")}
                variant="outlined"
                required
                fullWidth
                autoFocus
                error={errorMessage("name") ? true : false}
                helperText={errorMessage("name") && errorMessage("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                {...register("email")}
                variant="outlined"
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
                {...register("phone")}
                variant="outlined"
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
                label="Comment"
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
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateForm;
