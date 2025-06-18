import ResponsiveDialog from "@/components/responsive-dialog";
import React from "react";
import { AgentForm } from "./agent-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Agent"
      description="Create a new Agent"
    >
        <AgentForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
    </ResponsiveDialog>
  );
};
