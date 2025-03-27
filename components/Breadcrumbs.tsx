import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export default function Breadcrumbspage({ paths }) {
  return (
    <>
      <h3>
        <Breadcrumbs aria-label="breadcrumb">
          {paths.map((item: any) => (
            <Link href="/">
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>
      </h3>
    </>
  );
}
