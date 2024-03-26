import { sample_data } from "../data";

export const DataService = {
  getAllData: () => {
    return sample_data;
  },
  getDataById: (id) => {
    return sample_data.find(item => item.id === id);
  }
};