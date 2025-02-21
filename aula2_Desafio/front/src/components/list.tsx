"use client"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import edit from '../../public/image/edit.png';
import del from '../../public/image/del.png';
import { useState } from 'react';
import {ModalClose, ModalDialog, Typography } from '@mui/joy';
import Modal from '@mui/joy/Modal';

// Definir tipos para as tarefas
interface Task {
  _id: string;
  title: string;
  description: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Definir a interface para as props do componente
interface CheckboxListProps {
  items: Task[];  
}

const CheckboxList: React.FC<CheckboxListProps> = ({ items }) => {
  const [checked, setChecked] = React.useState<{ [key: string]: boolean }>({});
  const [openEdit, setOpenEdit] = useState(false);  // Estado para controlar se o modal de edição está aberto
  const [openDel, setOpenDel] = useState(false);  // Estado para controlar se o modal de exclusão está aberto
  const [currentTask, setCurrentTask] = useState<Task | null>(null);  // Armazenar a tarefa que está sendo editada ou excluída

  // Função para lidar com o clique no checkbox
  const handleToggle = (taskId: string, descriptionIndex: number) => () => {
    setChecked((prevChecked) => {
      const updatedChecked = { ...prevChecked };
      const key = `${taskId}-${descriptionIndex}`;
      updatedChecked[key] = !updatedChecked[key];
      return updatedChecked;
    });
  };

  // Função para abrir o modal de edição
  const handleEditClick = (task: Task) => {
    setCurrentTask(task);
    setOpenEdit(true);
  };

  // Função para abrir o modal de exclusão
  const handleDelClick = (task: Task) => {
    setCurrentTask(task);
    setOpenDel(true);
  };

  // Função para fechar o modal de edição
  const closeEditModal = () => setOpenEdit(false);

  // Função para fechar o modal de exclusão
  const closeDelModal = () => setOpenDel(false);

  return (
    <>
      {/* Modal de Edição */}
      {openEdit && currentTask && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>&times;</span>
            <h2>Editando: {currentTask.title}</h2>
            {/* Aqui você pode colocar o formulário para editar a tarefa */}
            <p>Formulário de edição para {currentTask.title}</p>
            <button onClick={closeEditModal}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {openDel && currentTask && (
        <Modal>
          <ModalDialog>
            <ModalClose />
            <Typography>Deseja excluir essa tarefa?</Typography>
          </ModalDialog>
        </Modal>
      )}

      {/* Lista de tarefas */}
      <div className='flex m-4 gap-6 flex-wrap'>
        {items?.map((task) => (
          <div key={task._id} className='bg-gray-200 h-72 w-64 text-black rounded flex flex-col'>
            <div className='flex w-full justify-between p-2'>
              <h3 className='m-2'>{task.title}</h3> 
              <div className='flex gap-2 items-center justify-self-end cursor-pointer'>
                <Image 
                  onClick={() => handleEditClick(task)} 
                  width={20} 
                  height={20} 
                  src={edit} 
                  alt='edit' 
                />
                <Image 
                  onClick={() => handleDelClick(task)} 
                  width={20} 
                  height={20} 
                  src={del} 
                  alt='del' 
                />
              </div>
            </div>

            {/* Lista de descrições */}
            <div className='flex-grow overflow-y-auto scrollbar'>
              <List sx={{ flexGrow: 1, bgcolor: 'background.paper' }} className="overflow-y-auto">
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
            </div>

            <div className='m-2'>
              <p>Criado em: {new Date(task.createdAt).toLocaleDateString()}</p>
              <p>Atualizado em: {new Date(task.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          text-align: center;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          cursor: pointer;
        }

        button {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default CheckboxList;
