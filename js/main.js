document.addEventListener('DOMContentLoaded', () => {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const projects = document.querySelectorAll('.project');
    let lastX = 0;
    let lastY = 0;
    
    projects.forEach(project => {
        const hoverImage = project.querySelector('.hover-image');
        const imageUrl = project.dataset.image;
        const title = project.querySelector('.project-title');
        
        hoverImage.style.backgroundImage = `url(${imageUrl})`;
        
        // Magnetic effect on project titles
        title.addEventListener('mousemove', (e) => {
            const rect = title.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.1;
            const deltaY = (y - centerY) * 0.1;
            
            title.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            cursor.style.transform = 'scale(2)';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.transform = 'translate(0, 0)';
            cursor.style.transform = 'scale(1)';
        });
        
        project.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate movement speed for stretching effect
            const speedX = Math.abs(mouseX - lastX);
            const speedY = Math.abs(mouseY - lastY);
            
            // Calculate skew based on mouse movement direction
            const skewX = (mouseX - lastX) * 0.2;
            const skewY = (mouseY - lastY) * 0.2;
            
            // Calculate stretch based on speed
            const scaleX = 1 + speedX * 0.003;
            const scaleY = 1 + speedY * 0.003;
            
            // Add slight rotation based on position
            const rotation = ((mouseX / window.innerWidth) - 0.5) * 10;
            
            hoverImage.style.left = mouseX + 'px';
            hoverImage.style.top = mouseY + 'px';
            hoverImage.style.transform = `
                translate(-50%, -50%) 
                skew(${skewX}deg, ${skewY}deg) 
                scale(${scaleX}, ${scaleY})
                rotate(${rotation}deg)
            `;
            
            lastX = mouseX;
            lastY = mouseY;
        });
        
        project.addEventListener('mouseleave', () => {
            hoverImage.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project");
    const hoverVideo = document.createElement("video");
    hoverVideo.classList.add("hover-video");
    hoverVideo.setAttribute("autoplay", true);
    hoverVideo.setAttribute("loop", true);
    hoverVideo.setAttribute("muted", true);
    document.body.appendChild(hoverVideo);
  
    let activeProject = null;
  
    // Function to check if the device is a tablet or phone
    function isMobileOrTablet() {
      return window.innerWidth <= 1024; // Adjust breakpoint as needed
    }
  
    // Track cursor position (for desktop only)
    if (!isMobileOrTablet()) {
      document.addEventListener("mousemove", function (e) {
        if (activeProject) {
          const x = e.clientX;
          const y = e.clientY;
          hoverVideo.style.left = `${x}px`;
          hoverVideo.style.top = `${y}px`;
        }
      });
    }
  
    // Handle project clicks
    projects.forEach((project) => {
      project.addEventListener("click", function (e) {
        // Remove active class from all other projects
        projects.forEach((p) => p.classList.remove("active"));
  
        // Add active class to the clicked project
        this.classList.add("active");
        activeProject = this;
  
        // Set hover video source (for desktop only)
        if (!isMobileOrTablet()) {
          const videoUrl = this.getAttribute("data-video-url");
          hoverVideo.setAttribute("src", videoUrl);
  
          // Position hover video at cursor location
          const x = e.clientX;
          const y = e.clientY;
          hoverVideo.style.left = `${x}px`;
          hoverVideo.style.top = `${y}px`;
          hoverVideo.style.opacity = "1";
          hoverVideo.style.transform = "translate(-50%, -50%) scale(1)";
        }
  
        // Open GitHub repository (for tablets and phones only)
        if (isMobileOrTablet()) {
          const githubUrl = this.getAttribute("data-github-url");
          if (githubUrl) {
            window.open(githubUrl, "_blank");
          }
        }
      });
    });
  
    // Close hover video when clicking outside (for desktop only)
    if (!isMobileOrTablet()) {
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".project")) {
          projects.forEach((p) => p.classList.remove("active"));
          hoverVideo.style.opacity = "0";
          hoverVideo.style.transform = "translate(-50%, -50%) scale(0.8)";
          hoverVideo.removeAttribute("src"); // Stop the video
          activeProject = null;
        }
      });
    }
  });