import React from 'react'
import uuid from 'react-uuid'

export const getUuid = () => {
   
   let id = uuid();

   return id;
}