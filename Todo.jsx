import { Box, Button, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
//일부러 업데이트 남겨놧으니 한번 해볼것
//MUI 컴포넌튼에 Dialog를 한번 써본다면 너무나 훌룡
function Todo({todo}) {
    const queryClient = useQueryClient()

    const handleDelete=()=>{
        delmute.mutate()
    }

    const delTodo= async()=>{
        const response= await axios.delete(`http://localhost:8080/todos/${todo.todoId}`)
        return response.data
    }

    const delmute = useMutation({
        mutationFn: delTodo,
        onSuccess: () => {
          // 리스트 가져오는 쿼리가 무효다 다시 가져와라
          queryClient.invalidateQueries({ queryKey: ['todos'] })//무효화하다  
        },
      })
    
    return (
        <Box display={"flex"} sx={{"justifyContent":"space-between"}}>
            <Typography variant='h2'>
                {todo.todoTitle}
            </Typography>
            <Button variant='outlined' onClick={handleDelete}>삭제</Button>
        </Box>

    )
}

export default Todo