document.getElementById('addProject').addEventListener('click', () => {
    let projectName = prompt("Enter project name:");
    if (projectName) {
      chrome.storage.sync.get('projects', function(data) {
        let projects = data.projects || [];
        projects.push(projectName);
        chrome.storage.sync.set({projects: projects}, function() {
          alert('Project added to TagStorm!');
          displayProjects();
        });
      });
    }
  });
  
  function displayProjects() {
    chrome.storage.sync.get('projects', function(data) {
      let projects = data.projects || [];
      let projectsDiv = document.getElementById('projects');
      projectsDiv.innerHTML = '';
      projects.forEach(project => {
        let projectDiv = document.createElement('div');
        projectDiv.innerText = project;
        projectsDiv.appendChild(projectDiv);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', displayProjects);
  