const themeToggleButton = document.getElementById("themeToggle");
const svgIcon = document.getElementById("themeIcon");
const body = document.body;
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const moonPath = "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z";
const sunPath = "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z";

function changeSvg(isDark) {
    if(isDark) {
        svgIcon.firstChild.setAttribute("d", sunPath);
    } else {
        svgIcon.firstChild.setAttribute("d", moonPath);
    }
}

// Remove no transitions after load
window.addEventListener('load', () => {
    const nodes = document.querySelectorAll('.null-transition');
    nodes.forEach(element => {
        element.classList.remove('null-transition');
    });
});

// Sets initial color
body.classList.add("null-transition");
if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    changeSvg(true);

} else if(localStorage.getItem('theme') === 'light' || !userPrefersDark.matches) {
    body.classList.remove('dark');
    changeSvg(false);

} else {
    body.classList.add('dark');
    changeSvg(true);

}

// Listener when browser changes color scheme
userPrefersDark.addEventListener('change', e => {
    if (e.matches) {
        localStorage.setItem('theme', 'dark');
        body.classList.add('dark');
        changeSvg(true);
    } else {
        localStorage.setItem('theme', 'light');
        body.classList.remove('dark');
        changeSvg(false);

    }
});

// Listener when theme button is pressed
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        changeSvg(true);
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
        changeSvg(false);
    }
});