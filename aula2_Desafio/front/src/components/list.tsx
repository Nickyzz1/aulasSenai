import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

interface Task {
  _id: string;
  title: string;
  description: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CheckboxListProps {
  items: Task[];  // Array de objetos Task
}

const CheckboxList: React.FC<CheckboxListProps> = ({ items }) => {
  const [checked, setChecked] = React.useState<{ [key: string]: boolean }>({});

  // Função para lidar com o clique no checkbox
  const handleToggle = (taskId: string, descriptionIndex: number) => () => {
    setChecked((prevChecked) => {
      const updatedChecked = { ...prevChecked };
      const key = `${taskId}-${descriptionIndex}`; // Criar chave única para cada checkbox
      updatedChecked[key] = !updatedChecked[key]; // Alterna o estado do checkbox
      return updatedChecked;
    });
  };

  return (
    <div className='flex m-4 gap-6 flex-wrap'>
      {items?.map((task) => (
        <div key={task._id} className='bg-gray-200 w-64 rounded overflow-auto flex flex-col'>
          <h3 className='m-2'>{task.title}</h3> {/* Exibindo o título da tarefa */}
          
          {/* Lista de descrições */}
          <List sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            {task.description?.map((desc, index) => {
              const key = `${task._id}-${index}`;

              return (
                <ListItem key={key} disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(task._id, index)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked[key] || false}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={desc} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Dados adicionais */}
          <div className='m-2'>
            <p>Criado em: {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>Atualizado em: {new Date(task.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
