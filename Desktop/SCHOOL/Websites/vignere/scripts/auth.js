import { supabase } from '../supabase/supabaseClient';

//
// — LOGIN HANDLER —
//
const loginForm    = document.getElementById('login-form');
const loginStatus  = document.getElementById('login-status');

loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginStatus.textContent = '…logging in…';

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        if(error.message == 'Email not confirmed') {
            loginStatus.innerHTML = 'Email not confirmed: <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Gmail.com</a>';
        } else {
            loginStatus.textContent = error.message;
        }
    } else {
        window.location.href = '../src/dashboard.html';
    }
});

//
// — REGISTER HANDLER —
//
const registerForm   = document.getElementById('register-form');
const registerStatus = document.getElementById('register-status');

registerForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email    = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    registerStatus.textContent = '…creating account…';

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        registerStatus.textContent = error.message;
    } else {
        registerStatus.innerHTML = 
            'Success! Check your email for confirmation link: <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Gmail.com</a>';
    }
});

//
// — FORM TOGGLE LINKS —
//
const showRegister = document.getElementById('show-register');
const showLogin    = document.getElementById('show-login');

showRegister.addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

showLogin.addEventListener('click', e => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});
