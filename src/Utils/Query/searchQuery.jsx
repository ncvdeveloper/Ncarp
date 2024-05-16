export const searchQuery= (data,searchKey,searchText,searchFrom)=>{
    return data?.filter((user) =>searchKey.some((key)=>user[key]?.toLowerCase().includes(searchText)));
}

export const searchQueryForPopulateID= (data,searchKey,searchText)=>{
    return data?.filter((user) =>searchKey.some((key)=> user?.user_id?.email?.toLowerCase().includes(searchText)));
}

