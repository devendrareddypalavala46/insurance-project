
function closeForm() {
    document.getElementById("formContainer").style.display = "none";
}


function saveContact() {

       const name = document.getElementById("name").value.trim();
       const email = document.getElementById("email").value.trim();
       const phone = document.getElementById("phone").value.trim();
       const address = document.getElementById("address").value.trim();

       // ✅ Validation
       if (!name || !email || !phone || !address) {
           alert("All fields are required!");
           return;
       }

       // Optional extra validation
       if (!email.includes("@")) {
           alert("Enter valid email");
           return;
       }

  const contact = { name,email,phone,address };


    fetch("/contact/createContact", {   // ✅ FIXED HERE
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }
        return res.json();
    })
    .then(data => {
        alert("Contact created successfully ✅");
       //window.location.href = "/pages/index.html";
        window.contacts.unshift(data); // add to list
           window.renderContacts();       // re-render full list

           closeForm();

    })
    .catch(err => {
        alert("Error creating contact ❌");
        console.error(err);
    });

}