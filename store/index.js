export const state = () => ({
  loading: false,
})

export const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
}
export const actions = {
  toggleLoading({ state, commit }, loading = false) {
    window.console.log(loading)
    commit('SET_LOADING', loading)
  },
}

export const getters = {
  loading: (state) => state.loading,
}
