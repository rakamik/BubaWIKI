// Store wiki pages in localStorage
let wikiPages = JSON.parse(localStorage.getItem('wikiPages')) || {
    'welcome': {
        title: 'Welcome to The Mystical Chronicles',
        content: document.getElementById('contentArea').innerHTML
    }
};

// Save pages to localStorage
function savePages() {
    localStorage.setItem('wikiPages', JSON.stringify(wikiPages));
}

// Create a new page
function createNewPage() {
    const title = prompt('Enter the title of your new chronicle:');
    if (!title) return;
    
    const pageId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (wikiPages[pageId]) {
        alert('A chronicle with this title already exists!');
        return;
    }
    
    wikiPages[pageId] = {
        title: title,
        content: '<p>Begin writing your tale here...</p>'
    };
    
    savePages();
    loadPage(pageId);
    showAllPages();
}

// Load a specific page
function loadPage(pageId) {
    const page = wikiPages[pageId];
    if (!page) return;
    
    document.getElementById('pageTitle').textContent = page.title;
    document.getElementById('contentArea').innerHTML = page.content;
    document.getElementById('contentArea').className = '';
    document.getElementById('editButton').textContent = 'Edit This Page';
    document.getElementById('pageList').style.display = 'none';
    document.getElementById('pageContent').style.display = 'block';
}

// Show list of all pages
function showAllPages() {
    const pageList = document.getElementById('pageList');
    const wikiPagesList = document.getElementById('wikiPages');
    const pageContent = document.getElementById('pageContent');
    
    wikiPagesList.innerHTML = '';
    
    Object.keys(wikiPages).forEach(pageId => {
        const li = document.createElement('li');
        li.textContent = wikiPages[pageId].title;
        li.onclick = () => loadPage(pageId);
        wikiPagesList.appendChild(li);
    });
    
    pageList.style.display = 'block';
    pageContent.style.display = 'none';
}

// Toggle edit mode
function toggleEdit() {
    const contentArea = document.getElementById('contentArea');
    const editButton = document.getElementById('editButton');
    
    if (contentArea.className === 'editing') {
        // Save changes
        const textarea = contentArea.querySelector('textarea');
        const pageId = document.getElementById('pageTitle').textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        wikiPages[pageId].content = textarea.value;
        contentArea.innerHTML = textarea.value;
        contentArea.className = '';
        editButton.textContent = 'Edit This Page';
        savePages();
    } else {
        // Enter edit mode
        const content = contentArea.innerHTML;
        contentArea.innerHTML = `<textarea>${content}</textarea>`;
        contentArea.className = 'editing';
        editButton.textContent = 'Save Changes';
    }
}

// Initialize the welcome page if it's the first visit
if (!localStorage.getItem('wikiPages')) {
    savePages();
}
