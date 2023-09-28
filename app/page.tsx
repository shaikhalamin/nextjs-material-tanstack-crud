"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";

import CustomerList from "@/app/components/customer/CustomerList";
import Link from "next/link";

//tanstack query
//https://www.youtube.com/watch?v=G0BmM-L5FoE&ab_channel=EricWinkDev

//mui setup
//https://www.youtube.com/watch?v=w0A08C79bgU&ab_channel=SimulShiftWeb

export default function Home() {
  return (
    <div>
      <Button variant="contained" sx={{ mt: 2 }} className="wd-150">
        <Link href="/customer/create" className="text-white text-decoration-none wd-150 py-2">Add</Link>
      </Button>
      <CustomerList />
    </div>
  );
}
