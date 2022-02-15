import axios from 'axios';
import iToDoCreate from '../models/toDoCreate';
import iToDo from '../models/toDoInterface';

const createToDoController = async (newToDo: iToDoCreate): Promise<iToDo> => {
  const {data} = await axios.post('http://localhost:3001/toDo/createToDo', {body: newToDo});
  return data;
};

export default createToDoController;
