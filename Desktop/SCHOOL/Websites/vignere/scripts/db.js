import { supabase } from "../supabase/supabaseClient";

// get all the books from supabase
async function getBooks() {
    const { data, error } = await supabase
        .from('book')
        .select('*');

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Book:', data);
    }
}

// get all the auth.user.email from supabase
async function getUserEmails() {
    const { user_emails, error } = await supabase
        .from('auth.users')
        .select('email');
    if (error) {
        console.error('Error:', error);
        alert('Error:', error);
        return null;
    } else {
        return user_emails;
    }   
}

// get the profiles from supabase
async function getProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Error:', error);
        alert('Error:', error);
        return null;
    } else {
        return data;
    }    
}



// find out if the user is a first timer
async function isNewUser(email) {
    const profiles = getProfiles();
    
    if (!profiles) {
        console.error('Empty Profiles!');
    } else {
        return (profiles.find(profile => profile.email === email) ? true : false);
    }
}

async function createUser(email) {
    const { data, error } = await supabase
    
}



document.getElementById('getBtn').addEventListener('click', getUsers);
