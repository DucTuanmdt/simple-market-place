import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setCatalogList,
  addCatalogList,
  catalogActionSuccess,
  catalogActionStart,
  catalogActionFailed,
  setPage,
  loadMoreStart,
} from "./catalogSlice";
import { catalogService } from "../../services";

export const searchCatalog = createAsyncThunk(
  "catalog/search",
  async (_arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(catalogActionStart());
      const state = thunkAPI.getState().catalog;

      const response = await catalogService.searchCatalog(
        state.selectedFilters
      );

      if (response.error) {
        return thunkAPI.dispatch(catalogActionFailed(response.error));
      }

      if (response.data) {
        thunkAPI.dispatch(catalogActionSuccess());
        thunkAPI.dispatch(setCatalogList(response.data));
      }
    } catch (error) {
      // Dispatching the authActionFailure action with the error as payload
      thunkAPI.dispatch(catalogActionFailed("Somer errors occurred"));
    }
  }
);

export const loadMoreCatalog = createAsyncThunk(
  "catalog/loadMore",
  async (_arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(loadMoreStart());
      const state = thunkAPI.getState().catalog;

      const response = await catalogService.searchCatalog({
        ...state.selectedFilters,
        page: state.page + 1,
      });

      if (response.error) {
        return thunkAPI.dispatch(catalogActionFailed(response.error));
      }

      if (response.data) {
        thunkAPI.dispatch(catalogActionSuccess());
        thunkAPI.dispatch(setPage(state.page + 1));
        thunkAPI.dispatch(addCatalogList(response.data));
      }
    } catch (error) {
      // Dispatching the authActionFailure action with the error as payload
      thunkAPI.dispatch(catalogActionFailed("Somer errors occurred"));
    }
  }
);
