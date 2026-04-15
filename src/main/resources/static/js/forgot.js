let userEmail = "";
let timerInterval = null; // 🔥 global

function sendOtp(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("email").value;
    const error = document.getElementById("emailError");

    if (!email) {
        error.innerText = "Please enter email";
        return;
    }

    error.innerText = "";

    fetch("/user/forgotPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
    .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.text();
    })
    .then(() => {
        alert("OTP sent successfully ✅");

        document.getElementById("sendOtpBtn").innerText = "OTP Sent ✅";
        document.getElementById("sendOtpBtn").disabled = true;
        document.getElementById("email").disabled = true;

        document.getElementById("otpSection").style.display = "block";
        document.getElementById("email").style.display = "block";

        startOtpTimer();
    })
    .catch(err => {
        error.innerText = err.message;
    });
}


function startOtpTimer() {

    // 🔥 clear old timer if exists
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    let timeLeft = 30;

    const timerText = document.getElementById("timerText");
    const verifyBtn = document.querySelector("#otpSection button");
    const resendBtn = document.getElementById("resendBtn");

    timerInterval = setInterval(() => {
        timeLeft--;

        timerText.innerText = "Valid for " + timeLeft + " sec";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            verifyBtn.style.display = "none";
            resendBtn.style.display = "block";

            timerText.innerText = "OTP expired ❌";
        }
    }, 1000);
}


function resendOtp() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    document.getElementById("resendBtn").style.display = "none";
    document.querySelector("#otpSection button").style.display = "block";

    sendOtp();
}




function verifyOtp() {
    const otp = document.getElementById("otp").value;
    const email = document.getElementById("email").value;
    const error = document.getElementById("otpError");

    if (!otp) {
        error.innerText = "Please enter OTP";
        return;
    }

    error.innerText = "";

    fetch("/user/verifyOtp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
    })
    .then(res => {
        if (!res.ok) throw new Error("Invalid or expired OTP");
        return res.text();
    })
    .then(() => {
        alert("OTP verified successfully ✅");

        // ✅ STOP TIMER
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        // ✅ Clear timer UI
        const timerText = document.getElementById("timerText");
        if (timerText) timerText.innerText = "";

        // ✅ Disable OTP input
        document.getElementById("otp").disabled = true;

         document.getElementById("verifyOtp").disabled = true;

         document.getElementById("verifyOtp").style.display = "block";

        // ✅ Show Reset Password section
        const step3 = document.getElementById("step3");
        if (step3) step3.style.display = "block";


    })
    .catch(err => {

        alert(err.message); // ✅ clean alert

        error.innerText = err.message;

        // 🔥 clear input
        document.getElementById("otp").value = "";

        // 🔥 STOP TIMER
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        // 🔥 clear timer UI
        const timerText = document.getElementById("timerText");
        if (timerText) timerText.innerText = "";

        document.getElementById("otp").focus();
    });
}












function resetPassword() {
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMsg = document.getElementById("passwordError"); // optional span/div

    // 🔴 Check passwords match
    if (newPassword !== confirmPassword) {
        if (errorMsg) {
            errorMsg.innerText = "Passwords do not match ❌";
        } else {
            alert("Passwords do not match ❌");
        }
        return; // STOP API CALL
    }

    // ✅ Clear error if matched
    if (errorMsg) errorMsg.innerText = "";

    // 🔥 Call API only if passwords match
    fetch("/user/resetPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email,newPassword })
    })
    .then(res => {
        if (!res.ok) throw new Error("Invalid OTP or error");
        return res.text();
    })
    .then(() => {
        alert("Password reset successful ✅");
        window.location.href = "/pages/login.html";
    })
    .catch(err => alert(err.message));
}