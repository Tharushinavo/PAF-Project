package backend.backend.controller;

import backend.backend.exception.UserNotFoundException;
import backend.backend.model.UserModel;
import backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserModel user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Email already registered");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            UserModel savedUser = userRepository.save(user);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("userId", savedUser.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserModel loginData) {
        UserModel user = userRepository.findByEmail(loginData.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Email not found: " + loginData.getEmail()));

        if (user.getPassword().equals(loginData.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Successful");
            response.put("id", user.getId());
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Get all users - FIXED: Changed from "/user" to "" since the base path is already "/user"
    @GetMapping("")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        List<UserModel> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public UserModel getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    // Update user
    @PutMapping("/{id}")
    public UserModel updateUser(@PathVariable Long id, @RequestBody UserModel updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFullName(updatedUser.getFullName());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(updatedUser.getPassword());
                    user.setPhone(updatedUser.getPhone());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    // Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        return "User deleted successfully!";
    }
}