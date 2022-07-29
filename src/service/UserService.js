import http from "../http-common";
const getAll = () => {
  return http.get(`/`);
};
const get = userLoginId => {
  return http.get(`/${userLoginId}`);
};
const create = data => {
  return http.post("/", data);
};
const update = (userLoginId,userName, data) => {
  return http.put(`/${userLoginId}/${userName}`, data);
};
const remove = userLoginId => {
  return http.delete(`/${userLoginId}`);
};
/* any other service or queries or sorting or features which you want to add
const removeAll = () => {
  return http.delete(`/tutorials`);
};
const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};*/
const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  //removeAll,
  //findByTitle
  //you can add more actions here
};
export default UserService;