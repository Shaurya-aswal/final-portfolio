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



