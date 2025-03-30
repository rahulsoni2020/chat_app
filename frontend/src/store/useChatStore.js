import { axiosInstance } from "../libs/axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
const useChatStore = create((set, get)=>({
    messages: [],
    users: [],
    onlineUser: [],
    isMessagesLoading: false,
    isUserLoading: false,
    selectedUser :null,
    setSelectedUser:(data)=>{
        if(!data){
            const {unsubscribeToMessages} = get();
            unsubscribeToMessages();
        }
        set({selectedUser: data});
    },
    getUsers: async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get('/auth/user/list');

            set({users: res.data.users});
        } catch (error) {
        }finally{
            set({isUserLoading:false});
        }
    },
    getUserMessages: async(senderId) => {
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/auth/message/${senderId}`);
            set({messages: res.data.data});
        } catch (error) {
            console.log(error)
        }finally{
            set({isMessagesLoading:false});
        }
    },
    sendUserMessage: async(data)=>{
        set({isMessagesLoading:true});
        const {selectedUser,messages} = get();
        try {
            const res = await axiosInstance.post(`/auth/message/send/${selectedUser._id}`,data);
            set({messages: [...messages, res.data.data]});
        } catch (error) {
            console.log(error)
        }finally{
            set({isMessagesLoading:false});
        }
    },
    subscribeToMessages: ()=>{
        const {selectedUser, messages} = get();
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (message)=>{
            console.log('message', message)
            set({messages: [...messages, message]});
        })
    },
    unsubscribeToMessages: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    }
}))

export default useChatStore;