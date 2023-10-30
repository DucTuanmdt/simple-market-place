import { createSlice } from "@reduxjs/toolkit";

const PAGE_SIZE = 18;

const initialState = {
  selectedFilters: {},
  catalogList: [],
  isLoading: false,
  isLoadMore: false,
  error: null,
  page: 1,
  hasMoreResult: true,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    catalogActionStart: (state) => {
      state.isLoading = true;
      state.isLoadMore = true;
      state.error = null;
    },
    loadMoreStart: (state) => {
      state.isLoadMore = true;
      state.error = null;
    },

    catalogActionSuccess: (state) => {
      state.isLoading = false;
      state.isLoadMore = false;
      state.error = null;
    },

    catalogActionFailed: (state, action) => {
      state.isLoading = false;
      state.isLoadMore = false;
      state.error = action.payload;
    },

    setCatalogList: (state, action) => {
      state.catalogList = action.payload;

      if (action.payload.length < PAGE_SIZE) {
        state.hasMoreResult = false;
      } else {
        state.hasMoreResult = true;
      }
    },

    addCatalogList: (state, action) => {
      state.catalogList.push(...action.payload);

      if (action.payload.length < PAGE_SIZE) {
        state.hasMoreResult = false;
      } else {
        state.hasMoreResult = true;
      }
    },

    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },

    selectFilter: (state, action) => {
      const { name, value } = action.payload;
      state.selectedFilters[name] = value;
    },

    selectFilters: (state, action) => {
      const filters = action.payload;

      if (filters.length > 0) {
        filters.forEach((item) => {
          const { name, value } = item;
          state.selectedFilters[name] = value;
        });
      }
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    deselectFilter: (state, action) => {
      const { name } = action.payload;
      state.selectedFilters[name] = null;
    },
    resetCatalog: (state) => {
      state.selectedFilters = {};
      state.page = 1;
      state.hasMoreResult = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCatalogList,
  setCatalogList,
  setSelectedFilters,
  selectFilter,
  selectFilters,
  deselectFilter,
  catalogActionStart,
  catalogActionFailed,
  catalogActionSuccess,
  setPage,
  loadMoreStart,
  resetCatalog,
} = catalogSlice.actions;

export default catalogSlice.reducer;
