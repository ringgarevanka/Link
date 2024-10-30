// Main Function //
// Caching data using Local Storage
let cachedData = null;
const dataKey = 'CachedData';

function getCachedData() {
  if (cachedData) {
    return Promise.resolve(cachedData);
  } else {
    const cachedDataString = localStorage.getItem(dataKey);
    if (cachedDataString) {
      cachedData = JSON.parse(cachedDataString);
      return Promise.resolve(cachedData);
    } else {
      return Promise.reject(new Error('Data not found in cache'));
    }
  }
}

function fetchAndCacheData() {
  return fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Caching data in Local Storage
      localStorage.setItem(dataKey, JSON.stringify(data));
      cachedData = data;
      return data;
    })
    .catch(error => console.error('Error fetching data:', error));
}

function updateHTMLElement(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', value);
  }
}

function displayData(data) {
  // Filling data in HTML elements
  document.title = data.title;
  updateHTMLElement('meta[name="author"]', data.author);
  updateHTMLElement('meta[name="copyright"]', data.copyright);
  updateHTMLElement('meta[name="description"]', data.description);
  updateHTMLElement('meta[property="og:description"]', data.meta.ogDescription);
  updateHTMLElement('meta[property="og:image"]', data.meta.ogImage);
  updateHTMLElement('meta[property="og:title"]', data.meta.ogTitle);
  updateHTMLElement('link[rel="apple-touch-icon"]', data.meta.appleTouchIcon);
  updateHTMLElement('link[rel="icon"]', data.meta.favicon);
  const profilePictureImg = document.querySelector('#profilePicture img');
  if (profilePictureImg) profilePictureImg.setAttribute('src', data.profilePicture);
  const userNameElem = document.getElementById('userName');
  if (userNameElem) userNameElem.innerText = data.userName;
  const hashtagElem = document.getElementById('hashtag');
  if (hashtagElem) hashtagElem.innerText = data.hashtag;

  // Fill in the data in the links section
  const linksDiv = document.getElementById('links');
  if (linksDiv) {
    linksDiv.innerHTML = ''; // Clear existing links
    data.links.forEach(link => {
      const a = document.createElement('a');
      a.className = 'link';
      a.href = link.href;
      a.target = '_blank';
      a.innerHTML = `<i class="${link.icon}">&nbsp;</i>${link.text}`;
      linksDiv.appendChild(a);
    });
  }
}

function loadData() {
  return getCachedData()
    .then(data => {
      // Display the data
      displayData(data);
    })
    .catch(() => {
      // If data is not in the cache, fetch it from the server and save it to the cache
      return fetchAndCacheData()
        .then(data => {
          // Display the data
          displayData(data);
        });
    });
}

// Load the data before displaying the page
loadData();
// End Of Main Function //

// --- //

// Additional Functions //
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


/*// Ignore Below is a test code //
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
// End of Additional Functions //