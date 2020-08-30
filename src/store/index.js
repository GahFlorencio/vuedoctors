import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    is_doctor: !!sessionStorage.getItem("is_doctor") || false,
    token: sessionStorage.getItem("token") || "",
    user_name: sessionStorage.getItem("name") || "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    is_doctor(state, is_doctor) {
      state.is_doctor = is_doctor;
    },
    user_name(state, user_name) {
      state.user_name = user_name;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.is_doctor = false;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://mazzafc.api.test/api/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.session_id;
            sessionStorage.setItem("token", token);
            commit("auth_success", token);
            commit("is_doctor", resp.data.is_doctor);
            sessionStorage.setItem("is_doctor", resp.data.is_doctor);
            commit("user_name", resp.data.name);
            sessionStorage.setItem("user_name", resp.data.name);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            sessionStorage.removeItem("token");
            reject(err);
          });
      });
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://mazzafc.api.test/api/users",
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
            is_doctor: user.selected,
            crm: user.crm,
          },
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.session_id;
            sessionStorage.setItem("token", token);
            commit("auth_success", token);
            commit("is_doctor", resp.data.is_doctor);
            sessionStorage.setItem("is_doctor", resp.data.is_doctor);
            commit("user_name", resp.data.name);
            sessionStorage.setItem("user_name", resp.data.name);
            resolve(resp);
            router.push("/");
          })
          .catch((err) => {
            commit("auth_error", err);
            sessionStorage.removeItem("token");
            reject(err);
          });
      });
    },
    create_patient({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://mazzafc.api.test/api/users",
          data: {
            name: user.name,
            email: user.email,
            password: "secret",
            is_doctor: false,
            crm: null
          },
          method: "POST",
        }).then((resp) => resp).catch((err) => {
          commit("auth_error", err);
          reject(err);
        });
      });
    },

    logout({ commit }, token) {
      return new Promise(() => {
        commit("auth_request");
        axios({
          url: `http://mazzafc.api.test/api/logout/${token}`,
          method: "PUT",
        })
          .then(() => {
            commit("logout");

            sessionStorage.clear();
          })
          .catch((err) => {
            commit("auth_error", err);
            sessionStorage.clear();
          });
      });
    },
    valid({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `http://mazzafc.api.test/api/valid/${sessionStorage.getItem(
            "token"
          ) || ""}`,
          method: "GET",
        })
          .then((resp) => {
            sessionStorage.setItem(
              "token",
              sessionStorage.getItem("token") || ""
            );
            const success = resp.data.success;
            if (!!success === false) {
              router.push("/login");
            }
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
  },
  modules: {},
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
