import {create } from "zustand";
import { axiosInstance } from "../libs/axios";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:5000";
export const useAuthStore = create((set, get) =>({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isLogging: false,
    isUpdateProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async()=>{
        set({isCheckingAuth: true});
        try {
            const response =  await axiosInstance.get('/check/user');
            set({authUser: response.data.data});
            get().connectSocket();
        } catch (error) {
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
        }
    },

    loginUser: async (data) =>{
        set({isLogging: true});
        try {
            const response = await axiosInstance.post('/validate/login',data);
            set({authUser: response.data});
            get().connectSocket();
        } catch (error) {
            set({authUser: null});
        }finally{
            set({isLogging: false})
        }
    },
    signupUser: async (data) =>{
        set({isSigningUp: true});
        try {
            const response = await axiosInstance.post('/validate/signup',data);
            set({authUser: response.data});
            get().connectSocket();
        } catch (error) {
            set({authUser: null});
        }finally{
            set({isSigningUp: false})
        }
    },
    logout: async () =>{
        set({isLogging: true});
        try {
            const response = await axiosInstance.get('/validate/logout');
            get().disconnectSocket();
            set({authUser: null});
        } catch (error) {
            console.log(error);
        }finally{
            set({isLogging: false})
        }
    },
    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get()?.socket?.connected) return;
        console.log(authUser)
        const socket = io(BASE_URL,{ query:{
            userId: authUser?._id
        }});
        console.log(socket);
        socket.connect();
        socket.on('getOnlineUsers', (userIds)=>{
            set({onlineUsers: userIds || []})
            console.log(userIds)
        })
        set({socket})
    },
    disconnectSocket: () =>{
        if(get().socket.connected){
            get().socket.disconnect();
        }
    }

}));