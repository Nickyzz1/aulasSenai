"use client"

import Image from "next/image";
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import { Checkbox, DialogTitle, FormControlLabel, FormGroup, Input, Modal, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import settings from '../../../public/image/settings.png'
import TaskCardList from "@/components/list";  
import plus from '../../../public/image/plus.png'
import { Box, ModalDialog, Typography } from "@mui/joy";
import Sheet from '@mui/joy/Sheet';
import { CheckCircleOutlined } from "@mui/icons-material";

export default function Home() {

  // estados
  const [open, setOpen] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); 


  const [inputs, setInputs] = useState<string[]>([]); // Definindo 
  const handleAddInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setInputs([...inputs, '']); // Adicionar uma nova entrada ao pressionar Enter
    }

  // get data
  useEffect(() => {
    fetch('http://localhost:8080/api/task')
      .then(response => response.json())  
      .then(data => setData(data))  // Guardando os dados de tarefas no estado
      .catch(error => console.error('Erro ao fazer a requisição:', error));
  }, []); 

  return (
    <>
    {/* modal */}
    {openAddModal &&(

      <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
      
        {/* modal title */}
        <Typography component="h2" id="modal-title" evel="h4" textColor="inherit" sx={{ fontWeight: 'lg', mb: 1 }}>
        Adicionar tarefa
        </Typography>

        {/* campos */}

        <TextField
          label="Título"
          id="standard-size-normal"
          defaultValue=""
          variant="standard"
          color="secondary"
        />

        <h1 className="my-6" >Adicione tarefas abaixo</h1>
        <FormGroup>

        <FormGroup>
        {inputs.map((input, index) => (
          <div key={index} className="flex mb-2">
            <FormControlLabel control={<Checkbox defaultChecked />} label="" />
            <Input
              placeholder="Digite a tarefa"
              value={input}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index] = e.target.value;
                setInputs(newInputs);
              }}
              onKeyDown={handleAddInput} 
            />
          </div>
        ))}
      </FormGroup>
        </FormGroup>
        
      </Sheet>
      </Modal>

    )}
    {/* main content */}
      <div className="flex h-screen gap-3 p-6 bg-gray-50">
        <div className="bg-gray-200 rounded-lg w-4/12 flex items-center flex-col">
          <div className="flex items-center">
            <p className="text-3xl font-extrabold m-6 text-black ">Menu</p>
            <Image width={200} height={200} alt="setting icons" src={settings} className="w-6 h-6 cursor-pointer" onClick={() => setOpen(true)} />
          </div>
          <input className="rounded-md p-2 w-11/12" type="text" placeholder="Search"/>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <ModalClose/>
            <DialogTitle>Acount</DialogTitle>
            <DialogTitle>Theme</DialogTitle>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogTitle>Help</DialogTitle>
          </Drawer>
        </div>

        <div className="bg-gray-300 rounded-lg w-full">

          <div className="w-full flex  items-center justify-between p-4" >
            <h1 className="text-3xl font-extrabold m-6 text-black">20 de fevereiro de 2025</h1>
            <Image className="cursor-pointer" width={50} height={50} alt="plus" src={plus} onClick={ event => {setOpenAddModal(true)}}></Image>
          </div>

          <TaskCardList items={data} />
          
        </div>
      </div>
    </>
  );
}}
