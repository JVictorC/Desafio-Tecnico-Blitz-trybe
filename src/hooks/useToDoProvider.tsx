import {useContext} from 'react';
import toDoContext from '../context/toDoProvider';


const useToDoProvider = () => useContext(toDoContext);

export default useToDoProvider;
