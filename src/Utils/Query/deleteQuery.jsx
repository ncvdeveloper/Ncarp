export const deleteQuery= (data,user_id)=>{
    return data?.filter((user) =>user.id!=user_id);
}

