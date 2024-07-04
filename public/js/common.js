const toggleContent = (node) => {
    const content = node.querySelector(".content");
    const icon = node.querySelector(".open-close i");
    
    if (content.classList.contains("open")) {
        content.classList.remove("open");
        icon.classList.remove("fa-square-minus");
        icon.classList.add("fa-square-plus");
        return;
    }
    content.classList.add("open");
    icon.classList.remove("fa-square-plus");
    icon.classList.add("fa-square-minus");
}

for (let element of document.querySelectorAll(".content-title")) {
    element.addEventListener("click", () => toggleContent(element.parentNode));
}

for (let element of document.querySelectorAll(".content-description")) {
    element.addEventListener("click", () => toggleContent(element.parentNode));
}