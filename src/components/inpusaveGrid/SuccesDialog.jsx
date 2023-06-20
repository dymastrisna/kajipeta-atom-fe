import { Dialog, DialogTitle } from "@mui/material";
import React from "react";

function SuccesDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Succesfull</DialogTitle>
    </Dialog>
  );
}

export default SuccesDialog;
