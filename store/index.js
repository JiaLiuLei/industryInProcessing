import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        userinfo:"",
		broadcast: {}
    },
    mutations:{
        setUserInfo(state, res){
			state.userinfo = res
		},
		setBroadcast(state, payload){
			state.broadcast = payload;
		}
    },
	actions:{
		userinfo({commit}, res){
			commit('setUserInfo', res);
		},
		broadcastMessage({commit}, payload){
			commit('setBroadcast', payload);
		}
	}
});
export default store