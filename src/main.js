const API_BASE = '/api';

let notes = [];
let editingNoteId = null;

// DOM Elements
const notesContainer = document.getElementById('notes-container');
const noteForm = document.getElementById('note-form');
const noteFormElement = document.getElementById('noteForm');
const formTitle = document.getElementById('form-title');
const noteIdInput = document.getElementById('noteId');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const alertContainer = document.getElementById('alert-container');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    setupEventListeners();
});

function setupEventListeners() {
    noteFormElement.addEventListener('submit', handleFormSubmit);
}

async function loadNotes() {
    try {
        const response = await fetch(`${API_BASE}/notes`);
        notes = await response.json();
        renderNotes();
    } catch (error) {
        showAlert('Error loading notes', 'danger');
        console.error('Error loading notes:', error);
    }
}

function renderNotes() {
    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="text-center text-muted">
                <i class="bi bi-journal-x" style="font-size: 3rem;"></i>
                <p class="mt-2">No notes yet. Create your first note!</p>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = notes.map(note => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h5 class="card-title">${escapeHtml(note.title)}</h5>
                        <p class="card-text">${escapeHtml(note.content)}</p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> 
                            Last updated: ${formatDate(note.updated_at)}
                        </small>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" onclick="editNote(${note.id})">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteNote(${note.id})">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function showCreateForm() {
    editingNoteId = null;
    formTitle.textContent = 'Create New Note';
    noteIdInput.value = '';
    noteTitleInput.value = '';
    noteContentInput.value = '';
    noteForm.style.display = 'block';
    noteTitleInput.focus();
}

function editNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    editingNoteId = id;
    formTitle.textContent = 'Edit Note';
    noteIdInput.value = id;
    noteTitleInput.value = note.title;
    noteContentInput.value = note.content;
    noteForm.style.display = 'block';
    noteTitleInput.focus();
}

function hideForm() {
    noteForm.style.display = 'none';
    editingNoteId = null;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    
    if (!title || !content) {
        showAlert('Please fill in all fields', 'warning');
        return;
    }

    try {
        const url = editingNoteId ? `${API_BASE}/notes/${editingNoteId}` : `${API_BASE}/notes`;
        const method = editingNoteId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            const message = editingNoteId ? 'Note updated successfully!' : 'Note created successfully!';
            showAlert(message, 'success');
            hideForm();
            loadNotes();
        } else {
            const error = await response.json();
            showAlert(error.error || 'An error occurred', 'danger');
        }
    } catch (error) {
        showAlert('Network error occurred', 'danger');
        console.error('Error saving note:', error);
    }
}

async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/notes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            showAlert('Note deleted successfully!', 'success');
            loadNotes();
        } else {
            const error = await response.json();
            showAlert(error.error || 'An error occurred', 'danger');
        }
    } catch (error) {
        showAlert('Network error occurred', 'danger');
        console.error('Error deleting note:', error);
    }
}

function showAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.innerHTML = alertHtml;
    
    // Auto-dismiss success alerts after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            const alert = alertContainer.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 3000);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Make functions globally available
window.showCreateForm = showCreateForm;
window.editNote = editNote;
window.deleteNote = deleteNote;
window.hideForm = hideForm;