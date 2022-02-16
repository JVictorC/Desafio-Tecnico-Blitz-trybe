import axios from 'axios';

const deleteToDoController = async (id: string): Promise<object | void> => {
  try {
    const {data} = await axios.delete(`http://localhost:3001/toDo/${id}`);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default deleteToDoController;
