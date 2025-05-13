import { supabase } from "../supabase/supabaseClient";

export const addBook = async (
    book_name: string,
    book_author: string,
    read_count: number,
    comment: string
) => {
    const { data , error } = await supabase
        .from("book")
        .insert([{ 
            book_name, 
            book_author, 
            read_count, 
            comment }]);
    if(error) console.error("Adding failed", error);
    else console.log("Added", data);
}

export const editBook = async (
    id: string,
    new_book_name: string,
    new_author: string,
    new_read_count: number,
    new_comment: string
) => {
    const { data , error } = await supabase
    .from("book")
    .update({
        book_name: new_book_name, 
        book_author: new_author, 
        read_count: new_read_count, 
        comment: new_comment
        })
    .eq("id", id);

    if(error) console.error("Edit failed: ", error.message);
    else console.log("Updated Book: ", data);
}

export const deleteBook = async (id: string) => {
    const { data, error } = await supabase
    .from("book")
    .delete()
    .eq("id", id);

    if(error) console.error("Delete failed: ", error.message);
    else console.log("Deleted Book: ", data);
}