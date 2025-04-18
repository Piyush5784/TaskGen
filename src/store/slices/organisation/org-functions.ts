import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrganisations = createAsyncThunk(
  "org/fetchAllOrganisations",
  async () => {
    const response = await axios.get("/api/organisations");
    return response.data;
  },
);

export const fetchSelectedOrganisation = createAsyncThunk(
  "org/fetchSelectedOrganisation",
  async () => {
    const response = await axios.get("/api/organisations/selectedOrg");
    return response.data;
  },
);
export const fetchOrgDetails = createAsyncThunk(
  "org/fetchOrgDetails",
  async (orgId: string) => {
    const response = await axios.get(`/api/organisations/${orgId}`);
    return response.data;
  },
);

export const fetchProjects = createAsyncThunk(
  "org/fetchProjects",
  async (orgId: string) => {
    const response = await axios.get(`/api/projects?organisationId=${orgId}`);
    return response.data;
  },
);

export const fetchTasks = createAsyncThunk(
  "org/fetchTasks",
  async (projectId: string) => {
    const response = await axios.get(`/api/tasks?projectId=${projectId}`);
    return response.data;
  },
);

export async function updateOrganisation(id: String) {
  await axios.post("/api/organisations/selectedOrg", { id });
}
