"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import ResponsiveDialog from "@/components/responsive-dialog";
import isEmpty from "lodash/isEmpty";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/user-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {isEmpty(data) && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings, Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );

  // return (
  //   <div>
  //     <ResponsiveDialog
  //       title="Responsive test"
  //       description="Responsive description"
  //       open={false}
  //       onOpenChange={() => {}}
  //     >
  //       <Button>Some action</Button>
  //     </ResponsiveDialog>

  //     {JSON.stringify(data, null, 2)}
  //   </div>
  // );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds..."
    />
  );
};

export const AgentViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  );
};
