import {
    ADD_USER,
  RETRIEVE_USER,
  UPDATE_USER,
  DELETE_USER,
  
} 
from "./type";
import  UserService from "../service/UserService";
//we are creating action objects so that they can be dispatched to the store
//addUser --dispatch object from where -
// when we  bindActionCreators -- destructured object of diff vars and functions and to that we are tying the dispatch
//useDispatch hook , which will give us the constant of dispatch

export const addUser = ({userLoginId,userName,password,firstName,lastName,contact,email}) => async (dispatch) => {
  try {
    //first the call to back end server is happening
    //data of user type and we receive server response

    const res = await UserService.create({ userLoginId,userName,password,firstName,lastName,contact,email });
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const retrieveUser = () => async (dispatch) => {
  try {
    const res = await UserService.getAll();
    dispatch({
      type: RETRIEVE_USER,
      payload:res.data,
    });
   
  
}
catch(err){return Promise.reject(err);}};


export const updateUser = (userLoginId, data) => async (dispatch) => {
  try {
    const res = await UserService.update(userLoginId, data);
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const  deleteUser = (userLoginId) => async (dispatch) => {
  try {
    await UserService.remove(userLoginId);
    dispatch({
      type: DELETE_USER,
      payload: { userLoginId },
    });
  } catch (err) {
    console.log(err);
  }
};