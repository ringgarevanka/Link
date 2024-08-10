fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Filling data in HTML elements
        document.title = data.title;

        const authorMeta = document.querySelector('meta[name="author"]');
        if (authorMeta) authorMeta.setAttribute('content', data.author);

        const copyrightMeta = document.querySelector('meta[name="copyright"]');
        if (copyrightMeta) copyrightMeta.setAttribute('content', data.copyright);

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) descriptionMeta.setAttribute('content', data.description);

        const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescriptionMeta) ogDescriptionMeta.setAttribute('content', data.meta.ogDescription);

        const ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (ogImageMeta) ogImageMeta.setAttribute('content', data.meta.ogImage);

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta) ogTitleMeta.setAttribute('content', data.meta.ogTitle);

        const appleTouchIconLink = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleTouchIconLink) appleTouchIconLink.setAttribute('href', data.meta.appleTouchIcon);

        const faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink) faviconLink.setAttribute('href', data.meta.favicon);

        const profilePictureImg = document.querySelector('#profilePicture img');
        if (profilePictureImg) profilePictureImg.setAttribute('src', data.profilePicture);

        const userNameElem = document.getElementById('userName');
        if (userNameElem) userNameElem.innerText = data.userName;

        const hashtagElem = document.getElementById('hashtag');
        if (hashtagElem) hashtagElem.innerText = data.hashtag;

        // Fill in the data in the links section
        const linksDiv = document.getElementById('links');
        if (linksDiv) {
            data.links.forEach(link => {
                const a = document.createElement('a');
                a.className = 'link';
                a.href = link.href;
                a.target = '_blank';
                a.innerHTML = `<i class="${link.icon}">&nbsp;</i>${link.text}`;
                linksDiv.appendChild(a);
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));

// Disable right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Prevent long-click selection
document.addEventListener('mousedown', event => {
    if (event.detail > 1) {
        event.preventDefault();
    }
});

/* Replaced by css
// Prevent text selection
(function disableTextSelection() {
    document.onselectstart = () => false; // For IE
    document.onmousedown = () => false; // For other browsers
    document.onmouseup = () => false; // For other browsers
})();
*/

// Disable keyboard shortcuts for copy, cut, and paste
document.addEventListener('keydown', event => {
    const forbiddenKeys = ['c', 'v', 'x'];
    if ((event.ctrlKey || event.metaKey) && forbiddenKeys.includes(event.key)) {
        event.preventDefault();
    }
});

// Disable copy-paste actions
document.addEventListener('paste', event => event.preventDefault());


/* Ignore Below is a test code 
// Disable right-click context menu (method 1)
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Disable right-click context menu (method 2)
document.addEventListener('contextmenu', event => event.preventDefault());

// Prevent long-click selection (method 1)
document.addEventListener('mousedown', function(event) {
    if (event.detail > 1) {
        event.preventDefault();
    }
});

// Prevent long-click selection (method 2)
document.addEventListener('mousedown', event => {
    if (event.detail > 1) event.preventDefault();
});

// Prevent text selection (method 1)
document.onselectstart = () => false;

// Prevent text selection (Using JavaScript fallback) (method 2)
function disableTextSelection() {
    if (typeof document.onselectstart !== 'undefined') {
        document.onselectstart = function() {
            return false;
        };
    } else {
        document.onmousedown = function() {
            return false;
        };
        document.onmouseup = function() {
            return false;
        };
    }
}
disableTextSelection();

// Disable keyboard shortcuts for copy, cut, and paste (method 1)
document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v' || event.key === 'x')) {
        event.preventDefault();
    }
});

// Disable keyboard shortcuts for copy, cut, and paste (method 2)
const handleKeyboardShortcuts = event => {
    const forbiddenKeys = ['c', 'v', 'x'];
    if ((event.ctrlKey || event.metaKey) && forbiddenKeys.includes(event.key)) {
        event.preventDefault();
    }
};

// Disable keyboard shortcuts for copy, cut, and paste (method 3)
function handleKeyboardShortcuts(event) {
    var key = event.key || event.keyIdentifier || event.keyCode; // Fallback for older engines
    if ((event.ctrlKey || event.metaKey) && (key === 'c' || key === 'v' || key === 'x' || key === 67 || key === 86 || key === 88)) {
        event.preventDefault();
    }
}

// Disable copy-paste actions (method 1)
document.addEventListener('paste', (event) => {
    event.preventDefault();
});


// Disable copy-paste actions (method 2)
const handlePaste = event => event.preventDefault();

document.addEventListener('keydown', handleKeyboardShortcuts);
document.addEventListener('paste', handlePaste);
*/