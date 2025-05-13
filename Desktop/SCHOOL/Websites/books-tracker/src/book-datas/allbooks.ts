import { defineStore } from "pinia";
import { supabase } from "../supabase/supabaseClient";

type Book = {
    id: string;
    name: string;
    author: string;
    readCount: number;
    comment: string;
}

export const useAllBooksStore = defineStore("allBooks", {
    state: () => ({
        books: [] as Book[],
        loading: false,
    }),

    actions: {
        async fetchBooks() {
            this.loading = true;
            const { data, error } = await supabase
                .from("book")
                .select("*");

            if(error) { 
                console.error("Failed to fetch books:", error);
            } else {
                this.books = data as Book[];
            }

            this.loading = false;
        },

        async addBook(
            book_name: string,
            book_author: string,
            read_count: number,
            comment: string
        ) {
            const { data, error } = await supabase
                .from("book")
                .insert([{
                    book_name,
                    book_author,
                    read_count,
                    comment
                }]);
            
            if(error) {
                console.error("Failed to add book:", error);
            } else if (data) {
                this.books.push(data[0] as Book);
            }
        },

        async editBook(
            id: string,
            new_book_name: string,
            new_author: string,
            new_read_count: number,
            new_comment: string
        ) {
           const { data, error } = await supabase
            .from("book")
            .update({
                book_name: new_book_name,
                book_author: new_author,
                read_count: new_read_count,
                comment: new_comment,
            })
            .eq("id", id);

            if (error) {
                console.error("Failed to edit book:", error);
            } else if (data) {
                this.books = this.books.map((book) =>
                  book.id === id ? (data[0] as Book) : book
                );
            }
        },

        async deleteBook(id: string) {
            const { error } = await supabase
                .from("book")
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Failed to delete book:", error);
            } else {
                this.books = this.books.filter((book) => book.id !== id);
            }
        },

        
    },
});
