import { supabase } from "../supabase/supabaseClient";

(async () => {
    // v2: get the current session (includes user)
    const { data: { session }, error: sessErr } = await supabase.auth.getSession();
    if (sessErr) {
        console.error('Error fetching session:', sessErr);
        return;
    }

    const user = session?.user;
    if (!user) {
        // not logged in → back to login
        window.location.href = '../index.html';
        return;
    }
    // user is logged in
    document.getElementById('current-user-name').textContent = `Welcome, ${user.email}!`;

    document.getElementById('logout').onclick = async () => {
        await supabase.auth.signOut();
        window.location.href = '/index.html';
    };
})();

/*
 --- Toggle the navbar ---
*/
document.getElementById('toggleSidebarBtn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('hidden');
    content.classList.toggle('sidebar-hidden');
});

// Ensure the sidebar is initially visible on larger screens
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
        sidebar.classList.add('hidden');
        content.classList.add('sidebar-hidden');
    }
});