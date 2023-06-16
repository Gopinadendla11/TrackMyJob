import LaunchIcon from "@mui/icons-material/Launch";
export const Columns = [
  {
    field: "companyName",
    headerName: "Company name",
    flex: 1,
    minWidth: 100,
    renderHeader: () => <strong>{"Company Name"}</strong>,
  },
  {
    field: "jobRole",
    headerName: "Job Role",
    flex: 1.5,
    minWidth: 150,
    renderHeader: () => <strong>{"Job Role"}</strong>,
  },
  {
    field: "jobPortal",
    headerName: "Job Portal",
    flex: 1,
    minWidth: 100,
    renderHeader: () => <strong>{"Job Portal"}</strong>,
  },
  {
    field: "date",
    headerName: "Applied On",
    flex: 1,
    minWidth: 100,
    renderHeader: () => <strong>{"Applied On"}</strong>,
  },
  {
    field: "status",
    // headerName: "Status",
    type: "singleSelect",
    valueOptions: [
      "Applied",
      "Online Assessment",
      "Interview",
      "Rejected",
      "Selected",
    ],
    flex: 1,
    editable: true,
    minWidth: 100,
    renderHeader: () => <strong>{"Status"}</strong>,
  },
  {
    field: "jobLink",
    headerName: "Job Link",
    flex: 0.5,
    minWidth: 100,
    renderHeader: () => <strong>{"Job Link"}</strong>,
    renderCell: (params) => {
      return (
        <a href={params.row.jobLink} target="_blank">
          <LaunchIcon></LaunchIcon>
        </a>
      );
    },
  },
];
