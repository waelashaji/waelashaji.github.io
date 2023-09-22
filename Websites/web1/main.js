let elements = document.querySelectorAll(".fs90");    
let speed=200;

elements.forEach(element => {
    const animate = () => {
        const value = +element.getAttribute('v');
        const data = +element.innerHTML;


        const time = speed/value;
        
        if (data<value) {
            element.innerHTML = Math.ceil(data + time);
            
            if (value <29 || value < 55)
                setTimeout(animate, 100);
            else
                setTimeout(animate, 1);

        }
        else {
            if(value<29 || value<55) element.innerHTML = value + "k";  
            else element.innerHTML = value + "+";  
        }
    }
    window.addEventListener('scroll',()=>{
        if(window.scrollY>1680)
            animate()
    })

});


window.addEventListener('scroll', ()=>{
    var target =  document.getElementById("header");
    console.log(window.scrollY)
    if(window.scrollY > 80){
        target.classList.add("scroll")
    } else{
        target.classList.remove("scroll")
        
    }

})

