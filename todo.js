const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
/* function for when you add task when click*/
function addTask(){
    if (inputBox.value === ''){   /* if no task is added, the alert will be given*/
        alert("You must add task!");
    }
    else {  /* if task is added....*/
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        /* span so you can show 'x' delete sign*/
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span); /*to display it as span*/
    }
    /* clear input box after adding text*/
    inputBox.value = "";
    saveData();

}
/* to create events that will toggle check class when clicked through */
listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

/* For data not be lost when refreshing the page. Save data*/
function  saveData(){
    localStorage.setItem("data", listContainer.innerHTML); 
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// Function to and add confetti
function addConfetti() {
    /*create a canvas element */
    let canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);

    /* canvas content */
    let ctx = canvas.getContext("2d");
    
    /*canvas size to match window */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /* Create confetti particles */
    let particles = [];
    for(let i = 0; i < 200; i++){
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5,
            color:getRandomColor()
        });
    }

    /* Animation loop */
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.hight);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0,Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            /*Confetti falling speed*/
            particle.y += 5;
            
            if (particle.y > canvas.height) {
                particle.y = 0;
            }
        });
        requestAnimationFrame(animate);
    }
    /*Start animation*/
    animate();
}
/*Generate random color*/
function getRandomColor() {
    let letters = "0123456789ABCEDFG";
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    returncolor;
}