import axios from 'axios';
import router from './router';
const url = "api/post";
const state = {
    token: localStorage.getItem('token') || '',
    refreshToken:localStorage.getItem('refreshToken'),
    user: {},
    status: '',
    error: null
};

const getters = {
    // isLoggedIn: function (state) {
    //     if (state.token != '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            
            let res = await axios.post(`${url}/login`, user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                const refreshToken = res.data.refreshToken;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(user));
                //localStorage.setItem('', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            console.log("coding");
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post(`${url}/register`, userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Get the user Profile
    async getProfile({
        commit
    }) {//https://bliss-life.herokuapp.com
        commit('profile_request');
        const token=localStorage.getItem('token')
        const config = {
            headers: { Authorization:token }
            };
        let res = await axios.get(`http://localhost:5000/${url}/profile`,config)
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
        commit('user_profile', res.data.user)
        return res;
    },
    // Logout the user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        await localStorage.removeItem('refreshToken');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    },
     refreshToken({ commit }, accessToken) {
        commit('refreshToken', accessToken);
      }
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user,refreshToken) {
        state.token = token
        state.refreshToken=refreshToken
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.refreshToken = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};