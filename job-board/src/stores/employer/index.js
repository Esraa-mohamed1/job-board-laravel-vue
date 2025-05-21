import { employerService } from '@/api/employerApi';

export default {
  namespaced: true,
  
  state: {
    employers: [],
    currentEmployer: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_EMPLOYERS(state, employers) {
      state.employers = employers;
    },
    SET_CURRENT_EMPLOYER(state, employer) {
      state.currentEmployer = employer;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchEmployers({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await employerService.getAll();
        commit('SET_EMPLOYERS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch employers');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchEmployerById({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        const response = await employerService.getById(id);
        commit('SET_CURRENT_EMPLOYER', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch employer');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createEmployer({ commit }, data) {
      commit('SET_LOADING', true);
      try {
        const response = await employerService.create(data);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to create employer');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updateEmployer({ commit }, { id, data }) {
      commit('SET_LOADING', true);
      try {
        const response = await employerService.update(id, data);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update employer');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async deleteEmployer({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await employerService.delete(id);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to delete employer');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    getEmployers: state => state.employers,
    getCurrentEmployer: state => state.currentEmployer,
    isLoading: state => state.loading,
    getError: state => state.error
  }
}; 