import axios from 'axios';

const getAllToDos = async () => {
  const {data} = await axios.get('http://localhost:3001/toDo');
  return data;
};

export default getAllToDos;
