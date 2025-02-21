"use client"

import Image from "next/image";
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import { DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
import settings from '../../../public/image/settings.png'
import TaskCardList from "@/components/list";  

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); // Usando um array vazio como valor inicial

  useEffect(() => {
    fetch('http://localhost:8080/api/task')
      .then(response => response.json())  
      .then(data => setData(data))  // Guardando os dados de tarefas no estado
      .catch(error => console.error('Erro ao fazer a requisição:', error));
  }, []); 

  return (
    <>
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
          <h1 className="text-3xl font-extrabold m-6 text-black">20 de fevereiro de 2025</h1> 
          <TaskCardList items={data} />
        </div>
      </div>
    </>
  );
}
