function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

function login(event) {
    event.preventDefault();

    const form = event.target;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Login:", email);

    fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    })
    .then(data => {
        alert("Login Success");
        form.reset();  // 🔥 clear form
        window.location.href = "/pages/index.html";
    })
    .catch(err => {
        alert("Invalid credentials ❌");
    });

}