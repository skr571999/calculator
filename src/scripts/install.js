let deferredPrompt;
const btnAdd = document.querySelector('.checkBtn');

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('../sw.js');

            console.log('[Install] SW reg. successful, Scope: ', reg.scope);
        } catch (error) {
            console.log('ServiceWorker registration failed: ', error);
        }
    } else {
        console.log('[Install] Browser does not support SW');
    }
};

window.addEventListener('load', () => {
    registerServiceWorker();
});

// For prompting the install banner
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    console.log('[Install] Btn displayed');
    btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    console.log('[Install] Btn hide');
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('[Install] User accepted the A2HS prompt');
        } else {
            console.log('[Install] User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});
