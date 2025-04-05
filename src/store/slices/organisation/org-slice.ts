import { Organisations, Projects, Tasks } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllOrganisations,
  fetchOrgDetails,
  fetchProjects,
  fetchSelectedOrganisation,
  fetchTasks,
} from "./org-functions";

interface OrgState {
  selectedOrg: Organisations | null;
  selectedProject: Projects | null;
  organisations: Organisations[] | null;
  projects: Projects[];
  tasks: Tasks[];
  loading: boolean;
  error: string | null;
}

const initialState: OrgState = {
  selectedOrg: null,
  selectedProject: null,
  organisations: null,
  projects: [],
  tasks: [],
  loading: false,
  error: null,
};

const orgSlice = createSlice({
  name: "organisations",
  initialState,
  reducers: {
    selectOrganization: (state, action: PayloadAction<Organisations>) => {
      state.selectedOrg = action.payload;
      state.projects = [];
      state.tasks = [];
    },
    selectProject: (state, action: PayloadAction<Projects>) => {
      state.selectedProject = action.payload;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all organisations
      .addCase(fetchAllOrganisations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllOrganisations.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; data: Organisations[] }>
        ) => {
          state.loading = false;
          state.organisations = action.payload.data || [];
        }
      )
      .addCase(fetchAllOrganisations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load organisations";
      })

      // Fetch selected organisation
      .addCase(fetchSelectedOrganisation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSelectedOrganisation.fulfilled,
        (
          state,
          action: PayloadAction<{
            success: boolean;
            data: Organisations;
            projects: Projects[];
          }>
        ) => {
          state.loading = false;
          state.selectedOrg = action.payload.data || null;
          state.projects = action.payload.projects || [];
        }
      )
      .addCase(fetchSelectedOrganisation.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to load selected organisation";
      })

      // Fetch organisation details
      .addCase(fetchOrgDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrgDetails.fulfilled,
        (state, action: PayloadAction<Organisations>) => {
          state.loading = false;
          const updatedOrg = action.payload;
          state.organisations =
            state.organisations?.map((org) =>
              org.id === updatedOrg.id ? updatedOrg : org
            ) || [];
        }
      )
      .addCase(fetchOrgDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch organisation details";
      })

      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProjects.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; data: Projects[] }>
        ) => {
          state.loading = false;
          state.projects = action.payload.data || [];
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load projects";
      })

      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<Tasks[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      });
  },
});

export const { selectOrganization, selectProject } = orgSlice.actions;
export default orgSlice.reducer;
