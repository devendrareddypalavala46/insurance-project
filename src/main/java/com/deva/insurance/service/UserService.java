package com.deva.insurance.service;

import com.deva.insurance.entity.User;
import com.deva.insurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register user
    public User registerUser(User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with this email");
        }

        return userRepository.save(user);
    }

    // Login validation
    public User login(String email, String password) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User existingUser = userRepository.findByEmail(email)
                .orElse(null);

        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }

        if (!encoder.matches(password, existingUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return existingUser;
    }

    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Generate 6-digit OTP
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        // For now just print (later send email)
        System.out.println("OTP: " + otp);

        return "OTP sent successfully";
    }



    public Boolean verifyOtp(String email, String otp){

        Optional<User> userEmail = userRepository.findByEmail(email);

        if (userEmail.isEmpty()) {
            return false;
        }

        User user = userEmail.get();

        // Check OTP
        if (!otp.equals(user.getOtp())) {
            return false;
        }

        // Optional: OTP expiry check (5 mins)
        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return false;
        }

        return true;

    }



    public User resetPassword(String email, String newPassword) {


            User user = userRepository.findByEmail(email).orElse(null);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            if (user == null) {
                throw new RuntimeException("User not found");
            }

            user.setPassword(encoder.encode(newPassword));

            // clear OTP after use
            user.setOtp(null);
            user.setOtpExpiry(null);
       // user.setPassword(encoder.encode(newPassword));
       return userRepository.save(user);
    }

}