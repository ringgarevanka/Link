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
    document.querySelector('meta[name="author"]').setAttribute('content', data.author);
    document.querySelector('meta[name="copyright"]').setAttribute('content', data.copyright);
    document.querySelector('meta[name="description"]').setAttribute('content', data.description);
    document.querySelector('meta[property="og:description"]').setAttribute('content', data.meta.ogDescription);
    document.querySelector('meta[property="og:image"]').setAttribute('content', data.meta.ogImage);
    document.querySelector('meta[property="og:title"]').setAttribute('content', data.meta.ogTitle);
    document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', data.meta.appleTouchIcon);
    document.querySelector('link[rel="icon"]').setAttribute('href', data.meta.favicon);
    document.querySelector('#profilePicture img').setAttribute('src', data.profilePicture);
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
    .
catch (error => console.error('Error fetching data:', error));