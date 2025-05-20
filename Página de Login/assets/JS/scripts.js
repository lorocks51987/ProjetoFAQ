document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector(".wrapper");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");
    const closeBtn = document.querySelector(".icon-close");

    registerLink.addEventListener("click", () => {
        wrapper.classList.add("active");
    });

    loginLink.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });

    closeBtn.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });
});