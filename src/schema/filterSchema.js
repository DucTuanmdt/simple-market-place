const filterSchema = {
  category: {
    filterName: "category",
    items: [
      {
        label: "Beginer Drone",
        value: "beginer_drone",
      },
      {
        label: "Best Seller",
        value: "best_seller",
      },
      {
        label: "Long Range",
        value: "long_range",
      },
      {
        label: "Mini Drone",
        value: "mini_drone",
      },
    ],
  },
  rating: {
    filterName: "rating",
    items: [
      {
        label: "1",
        value: 1,
        advanceValues: [
          { name: "rating_gte", value: 1 },
          { name: "rating_lte", value: 1.9 },
        ],
      },
      {
        label: "2",
        value: 2,
        advanceValues: [
          { name: "rating_gte", value: 2 },
          { name: "rating_lte", value: 2.9 },
        ],
      },
      {
        label: "3",
        value: 3,
        advanceValues: [
          { name: "rating_gte", value: 3 },
          { name: "rating_lte", value: 3.9 },
        ],
      },
      {
        label: "4",
        value: 4,
        advanceValues: [
          { name: "rating_gte", value: 4 },
          { name: "rating_lte", value: 4.9 },
        ],
      },
      {
        label: "5",
        value: 5,
        advanceValues: [
          { name: "rating_gte", value: 4.9 },
          { name: "rating_lte", value: 5 },
        ],
      },
    ],
  },
  cameraResolution: {
    filterName: "cameraResolution",
    items: [
      {
        label: "720p",
        value: "720p",
      },
      {
        label: "1080p",
        value: "1080p",
      },
      {
        label: "4K",
        value: "4K",
      },
      {
        label: "8K",
        value: "8K",
      },
    ],
  },
  advancedFeatures: {
    filterName: "advancedFeatures",
    items: [
      {
        label: "GPS",
        value: "gps",
        advanceValues: [{ name: "hasGps", value: true }],
      },
      {
        label: "Foldable",
        value: "foldable",
        advanceValues: [{ name: "foldable", value: true }],
      },

      {
        label: "Sensors",
        value: "sensors",
        advanceValues: [{ name: "foldable", value: true }],
      },
    ],
  },
  price: {
    filterName: "price",
    rule: {
      min: 0,
      max: 5000,
    },
  },
  sortBy: {
    filterName: "sortBy",
    items: [
      {
        label: "Most popular",
        value: "soldCount",
      },
      {
        label: "Lowest price",
        value: "price",
      },

      {
        label: "Highest price",
        value: "price",
        order: "desc",
      },
      {
        label: "Light weight",
        value: "weight",
      },
    ],
  },
};

export default filterSchema;
