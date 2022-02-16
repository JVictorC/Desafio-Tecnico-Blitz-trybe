import axios from 'axios';
import iToDoCreate from '../models/toDoCreate';
import iToDo from '../models/toDoInterface';

const createToDoController = async (newToDo: iToDoCreate): Promise<iToDo | void> => {
  try {
    const {data} = await axios.post('http://localhost:3001/toDo', newToDo);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default createToDoController;
