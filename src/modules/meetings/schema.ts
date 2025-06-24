import { z } from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  agentId: z.string().min(2, { message: "Agent is required" }),
  // Added for typescript, remove it later after resolving typescript issue.
  // instructions: z.string().min(2, { message: "Instruction is required" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
