// Loading data from a JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Filling data in HTML elements
        document.title = data.title;
        document.querySelector('meta[name="author"]').content = data.author;
        document.querySelector('meta[name="copyright"]').content = data.copyright;
        document.querySelector('meta[name="description"]').content = data.description;
        document.querySelector('meta[property="og:description"]').content = data.meta.ogDescription;
        document.querySelector('meta[property="og:image"]').content = data.meta.ogImage;
        document.querySelector('meta[property="og:title"]').content = data.meta.ogTitle;
        document.querySelector('link[rel="apple-touch-icon"]').href = data.meta.appleTouchIcon;
        document.querySelector('link[rel="icon"]').href = data.meta.favicon;
        document.querySelector('#profilePicture img').src = data.profilePicture;
        document.getElementById('userName').innerText = data.userName;
        document.getElementById('hashtag').innerText = data.hashtag;
        // Fill in the data in the links section
        const linksDiv = document.getElementById('links');
        data.links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'link';
            a.href = link.href;
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}">&nbsp;</i>${link.text}`;
            linksDiv.appendChild(a);
        });
    })
    .catch(error => console.error('Error:', error));