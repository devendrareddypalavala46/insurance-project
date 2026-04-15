let currentPage = "home";

function navigateTo(page) {
    currentPage = page;

    const content = document.getElementById("content-area");

    if (page === "home") {
        content.innerHTML = "<h1>Welcome Home</h1>";
    }

    else if (page === "contact") {
        fetch("/pages/contact.html")
            .then(res => res.text())
            .then(data => content.innerHTML = data);
    }

    else if (page === "createContact") {
        fetch("/pages/createContact.html")
            .then(res => res.text())
            .then(data => content.innerHTML = data);
    }

    // ✅ FIXED (lowercase)
    else if (page === "policy") {
        fetch("/pages/policy.html")
            .then(res => res.text())
            .then(data => content.innerHTML = data);
    }

    else if (page === "claim") {
        content.innerHTML = "<h1>Claim Page</h1>";
    }

    else if (page === "account") {
        content.innerHTML = "<h1>Account Page</h1>";
    }

    else if (page === "terms") {
        content.innerHTML = "<h1>Terms Page</h1>";
    }

    updateActiveMenu();
}




/* ✅ FIXED ACTIVE MENU */
function updateActiveMenu() {
    document.querySelectorAll(".sidebar li").forEach(li => {
        li.classList.remove("active");
    });

    const active = document.getElementById("nav-" + currentPage);
    if (active) {
        active.classList.add("active");
    }
}



/* ✅ Initial load */
navigateTo("home");