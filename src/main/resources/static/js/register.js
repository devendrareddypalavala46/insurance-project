 console.log("🔥 CALLING API");

function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

function register(event) {
    event.preventDefault();

  const form = event.target;

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const agree = document.getElementById("agree").checked;


    if (!agree) {
        alert("Please accept Terms");
        return;
    }

    const user = {
        firstName,
        lastName,
        email,
        password
    };

    console.log("Sending to API:", user);

   fetch("/user/register", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(user)
   })
   .then(async response => {

       if (!response.ok) {
           let errorMessage = "Registration failed";

           try {
               const data = await response.json();
               errorMessage = data.message || data.error || JSON.stringify(data);
           } catch {
               errorMessage = await response.text();
           }

           throw new Error(errorMessage);
       }

       return response.json();
   })
   .then(() => {
       alert("Registered Successfully ✅");
        window.location.replace("/pages/login.html");
      // document.getElementById("registerForm").reset();
   })
   .catch(error => {
       console.error("❌ Error:", error);
       alert(error.message);
   });
}