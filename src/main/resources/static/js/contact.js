let contacts = [];

window.contacts = contacts;
window.renderContacts = renderContacts;
// 🔥 Navigate to create page
window.openCreateForm = function () {
    setTimeout(() => {
        const container = document.getElementById("formContainer");

        if (!container) {
            console.error("❌ formContainer not found");
            return;
        }

        fetch("/pages/createContact.html")
            .then(res => res.text())
            .then(html => {
                container.innerHTML = html;
                container.style.display = "block";
            });
    }, 100); // small delay
};

function searchContacts() {
    const id = document.getElementById("searchId").value.trim();
    const name = document.getElementById("searchName").value.trim();
    const email = document.getElementById("searchEmail").value.trim();

    const errorMsg = document.getElementById("errorMsg");
    errorMsg.innerText = "";

    // 🔥 Validation
    const filled = [id, name, email].filter(v => v !== "");

    if (filled.length !== 1) {
        errorMsg.innerText = "Enter any one field (ID or Name or Email)";
        return;
    }

    if (filled.length === 0) {
        errorMsg.innerText = "Please enter ID or Name or Email";
        return;
    }

    if (filled.length > 1) {
        errorMsg.innerText = "Only one field allowed";
        return;
    }

    if (id && !/^\d+$/.test(id)) {
        errorMsg.innerText = "ID must be number";
        return;
    }

    if (name && !/^[a-zA-Z\s]+$/.test(name)) {
        errorMsg.innerText = "Name must contain only letters";
        return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg.innerText = "Invalid email format";
        return;
    }



  fetch("/contact/search", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({id, name, email})
   })
    .then(res => res.json())
    .then(data => {
         contacts = Array.isArray(data) ? data : (data.content || [data]);
        renderContacts();
        // ✅ Show Clear button
     document.getElementById("clearBtn").style.display = "inline-block";
    })
   .catch(err => {
       const errorMsg = document.getElementById("errorMsg");
       errorMsg.innerText = "Search failed";
       console.error(err);
   });
}

function renderContacts(filtered = contacts) {

    const container = document.getElementById("cardContainer"); // ✅ FIXED
    const template = document.getElementById("contactTemplate");

    if (!container) {
        console.error("Container not found ❌");
        return;
    }

    container.innerHTML = "";

    filtered.forEach(c => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".card");

        // 👉 Fill data
        clone.querySelector(".c-id").innerText = c.id;
        clone.querySelector(".c-name").innerText = c.name;
        clone.querySelector(".c-email").innerText = c.email;
        clone.querySelector(".c-phone").innerText = c.phone;
        clone.querySelector(".c-address").innerText = c.address || "N/A";

        // 👉 Card click
        card.onclick = (event) => selectContact(event, card);

        // 👉 Buttons
        clone.querySelector(".edit-btn").onclick = (event) => {
            event.stopPropagation();
            editContact(c.id);
        };

        clone.querySelector(".delete-btn").onclick = (event) => {
            event.stopPropagation();
            deleteContact(c.id);
        };

        clone.querySelector(".policy-btn").onclick = (event) => {
            event.stopPropagation();
            createPolicy(c.id);
        };

        container.appendChild(clone);
    });
}

function clearResults() {

    // ❌ Clear UI cards
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    // ❌ Clear inputs (optional but recommended)
    document.getElementById("searchId").value = "";
    document.getElementById("searchName").value = "";
    document.getElementById("searchEmail").value = "";

    // ❌ Hide button again
    document.getElementById("clearBtn").style.display = "none";

    // ❌ Clear error message
    document.getElementById("errorMsg").innerText = "";
}



function selectContact(event, selectedCard) {

    event.stopPropagation();

    const confirmAction = confirm("Show only this contact?");

    if (!confirmAction) return;

    const allCards = document.querySelectorAll(".card"); // ✅ FIXED

    allCards.forEach(card => {
        if (card !== selectedCard) {
            card.style.display = "none";
        } else {
            card.classList.add("selected"); // highlight
        }
    });
}



function showPolicies() {
    navigateTo("policy");
}

function showClaims() {
    navigateTo("claim");
}

function showBalance() {
    alert("Total Account Balance: ₹" + document.getElementById("accountBalance").innerText);
}



/*

// 🔥 Update Stats
function updateStats(data = contacts) {
    document.getElementById("total").innerText = data.length;

    const withPolicy = data.filter(c => c.policy).length;
    const noPolicy = data.length - withPolicy;

    document.getElementById("withPolicy").innerText = withPolicy;
    document.getElementById("noPolicy").innerText = noPolicy;
}

// 🔥 Edit contact
function editContact(id) {
    loadPage('createContact');

    setTimeout(() => {
        fetch(`/contacts/${id}`)
            .then(res => res.json())
            .then(c => {
                document.getElementById("name").value = c.name;
                document.getElementById("email").value = c.email;
                document.getElementById("phone").value = c.phone;
                document.getElementById("address").value = c.address;
            });
    }, 300);
}
*/

/*
// 🔥 Auto load when page opens
window.onload = function () {
    loadContacts();
};
*/


/*
function loadContacts() {
    fetch("/contacts")
        .then(res => res.json())
        .then(data => {
            console.log(data); // debug

            contacts = data.content || data; // ✅ handle both cases
            renderContacts();
        })
        .catch(err => console.error(err));
}*/
