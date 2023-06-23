import { Box } from "@mui/system";
import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import {
  DeleteApplications,
  GetApplications,
  UpdateStatus,
} from "../services/ApplicationService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dropdown } from "../components/Dropdown";
import Button from "../components/Button";
import { Columns } from "./GridData";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// const StatusOptions = ["Applied", "InProgress", "Rejected"];
const StatusOptions = [
  "Applied",
  "Online Assessment",
  "Interview",
  "Rejected",
  "Selected",
];
const DateOptions = ["All", "Today", "Past Week", "Past Month"];

export const Applications = () => {
  // const [alert, setAlert] = useState(false);
  // const [alertMsg, setAlertMsg] = useState("");
  // const [sev, setSev] = useState("error");
  // const handleClose = () => {
  //   setAlert(false);
  // };
  let [data, setData] = useState([]);
  let [displayData, setDisplayData] = useState([]);
  let [status, setstatus] = useState("");
  let [dateFilter, setDateFilter] = useState("");
  let [searchQuery, setSearchQuery] = useState("");
  let [rowSelectionModel, setRowSelectionModel] = useState("");
  const [element, setElement] = useState("");

  useEffect(() => {}, data);

  //function for search click button
  const onSearchClicked = () => {
    if (searchQuery === "") setDisplayData(data);
    else {
      setDisplayData(
        data.filter((item) =>
          item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  //function to delete applications
  const onDeleteClicked = async () => {
    const response = await DeleteApplications(rowSelectionModel);
    fetchData();
  };

  //function to change status
  const statusChanged = useCallback(async (newRow) => {
    const response = await UpdateStatus({
      _id: newRow._id,
      status: newRow.status,
    });
    if (response.status === 200) {
      return newRow;
    }
  });

  const onStatusFilterChanged = (status) => {
    setstatus(status);
    if (status !== "")
      setDisplayData(data.filter((item) => item.status === status));
  };

  const onDateFilterChanged = (dateRange) => {
    setDateFilter(dateRange);
    if (dateFilter !== "") {
      const currentDate = new Date();
      let previousDate = new Date();
      let numDays = 0;

      if (dateRange === "Past Week") numDays = 7;
      else if (dateRange === "Past Month") numDays = 31;
      else if (dateRange === "Today") numDays = 1;

      previousDate.setDate(currentDate.getDate() - numDays);
      //console.log(previousDate);
      setDisplayData(
        data.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            Date.parse(itemDate) >= Date.parse(previousDate) &&
            Date.parse(itemDate) <= Date.parse(currentDate)
          );
        })
      );
      if (dateRange === "All") setDisplayData(data);
    }
  };

  //function to fetch rows from database
  const fetchData = async (e) => {
    const response = await GetApplications();
    let dataArray = [];

    response.map((item) => {
      item["id"] = item._id;
      item["date"] = new Date(item.createdAt).toLocaleDateString();
      dataArray.push(item);
    });
    setData(dataArray);
    setDisplayData(dataArray);
  };

  //useEffect to call fetch data function
  useEffect(() => {
    fetchData();
  }, []);

  //return to display applications page
  return (
    <div className="overflow-scroll flex bg-purple-50">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="px-12 xl:px-32 py-8  text-xl flex flex-col md:flex-row justify-between items-center">
          <h1 className="font-bold text-md xl:text-3xl">My Applications</h1>
          <a href="/new-application">
            <Button btnText="Add New Application" />
          </a>
        </div>
        <div className="w-full px-12 2xl:px-32 flex flex-col justify-center drop-shadow-xl items-center space-y-4">
          <div className="w-full flex justify-start items-center  space-x-2 sm:space-x-6">
            <input
              className=" p-3 flex-1 rounded-md border-[2px] border-solid border-primary"
              placeholder="What are you looking for?"
              type="text"
              onChange={(e) => {
                setElement(e.target.value);
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearchClicked();
              }}
            />
            <button
              className="lg:w-64  max-w-[250px]  p-3 rounded-md border-[2px] border-solid border-primary bg-primary text-white text-[0px] sm:text-lg"
              onClick={onSearchClicked}
            >
              <SearchIcon />
              Search
            </button>
          </div>
          <div className="w-full flex justify-start items-center space-x-2 sm:space-x-6 ">
            <div className="flex-1">
              <Dropdown
                options={StatusOptions}
                OnSelectionChange={onStatusFilterChanged}
                name="Status"
              />
            </div>
            <div className="flex-1">
              <Dropdown
                OnSelectionChange={onDateFilterChanged}
                options={DateOptions}
                name="Date"
              />
            </div>
            <button
              className="lg:w-64  max-w-[250px] flex-[0.75] p-3 rounded-md border-[2px] border-solid border-primary bg-primary text-white text-[0px] sm:text-lg"
              onClick={onDeleteClicked}
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
        </div>

        <div className="p-8 2xl:px-24 w-full flex justify-center ">
          <Box sx={{ height: 500, width: "70vw" }}>
            <DataGrid
              rows={displayData}
              columns={Columns}
              processRowUpdate={statusChanged}
              slots={{ toolbar: GridToolbar }}
              experimentalFeatures={{ newEditingApi: true }}
              onProcessRowUpdateError={(err) => {
                console.log(err);
              }}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
};
