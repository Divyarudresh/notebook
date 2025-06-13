(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const d="/api";let u=[],c=null;const p=document.getElementById("notes-container"),m=document.getElementById("note-form"),E=document.getElementById("noteForm"),v=document.getElementById("form-title"),h=document.getElementById("noteId"),a=document.getElementById("noteTitle"),f=document.getElementById("noteContent"),b=document.getElementById("alert-container");document.addEventListener("DOMContentLoaded",()=>{y(),N()});function N(){E.addEventListener("submit",T)}async function y(){try{u=await(await fetch(`${d}/notes`)).json(),L()}catch(t){i("Error loading notes","danger"),console.error("Error loading notes:",t)}}function L(){if(u.length===0){p.innerHTML=`
            <div class="text-center text-muted">
                <i class="bi bi-journal-x" style="font-size: 3rem;"></i>
                <p class="mt-2">No notes yet. Create your first note!</p>
            </div>
        `;return}p.innerHTML=u.map(t=>`
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h5 class="card-title">${g(t.title)}</h5>
                        <p class="card-text">${g(t.content)}</p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> 
                            Last updated: ${x(t.updated_at)}
                        </small>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" onclick="editNote(${t.id})">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteNote(${t.id})">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("")}function I(){c=null,v.textContent="Create New Note",h.value="",a.value="",f.value="",m.style.display="block",a.focus()}function C(t){const e=u.find(r=>r.id===t);e&&(c=t,v.textContent="Edit Note",h.value=t,a.value=e.title,f.value=e.content,m.style.display="block",a.focus())}function w(){m.style.display="none",c=null}async function T(t){t.preventDefault();const e=a.value.trim(),r=f.value.trim();if(!e||!r){i("Please fill in all fields","warning");return}try{const s=c?`${d}/notes/${c}`:`${d}/notes`,o=await fetch(s,{method:c?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e,content:r})});if(o.ok)i(c?"Note updated successfully!":"Note created successfully!","success"),w(),y();else{const l=await o.json();i(l.error||"An error occurred","danger")}}catch(s){i("Network error occurred","danger"),console.error("Error saving note:",s)}}async function $(t){if(confirm("Are you sure you want to delete this note?"))try{const e=await fetch(`${d}/notes/${t}`,{method:"DELETE"});if(e.ok)i("Note deleted successfully!","success"),y();else{const r=await e.json();i(r.error||"An error occurred","danger")}}catch(e){i("Network error occurred","danger"),console.error("Error deleting note:",e)}}function i(t,e){const r=`
        <div class="alert alert-${e} alert-dismissible fade show" role="alert">
            ${t}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;b.innerHTML=r,e==="success"&&setTimeout(()=>{const s=b.querySelector(".alert");s&&new bootstrap.Alert(s).close()},3e3)}function g(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function x(t){const e=new Date(t);return e.toLocaleDateString()+" "+e.toLocaleTimeString()}window.showCreateForm=I;window.editNote=C;window.deleteNote=$;window.hideForm=w;
