package backend.backend.controller;

import backend.backend.model.MealPlanModel;
import backend.backend.service.MealPlanService;  // Make sure package name is lowercase
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.NoSuchElementException;  // Added explicit import

@RestController
@RequestMapping("api/mealplan")
@CrossOrigin(origins = "http://localhost:3000")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createMealPlan(@RequestBody MealPlanModel plan) {
        try {
            MealPlanModel createdPlan = mealPlanService.save(plan);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Meal plan created successfully");
            response.put("data", createdPlan);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Error creating meal plan: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<MealPlanModel>> getAllMealPlans() {
        return ResponseEntity.ok(mealPlanService.getAll());
    }

    @GetMapping("/day/{day}")
    public ResponseEntity<?> getMealPlanByDay(@PathVariable String day) {
        MealPlanModel plan = mealPlanService.getByDay(day.toUpperCase());
        if (plan != null) {
            return ResponseEntity.ok(plan);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Meal plan not found for day: " + day);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMealPlan(@PathVariable Long id, @RequestBody MealPlanModel updatedPlan) {
        try {
            MealPlanModel plan = mealPlanService.update(id, updatedPlan);
            return ResponseEntity.ok(plan);
        } catch (NoSuchElementException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Update failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteMealPlan(@PathVariable Long id) {
        try {
            mealPlanService.delete(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Meal plan deleted successfully");
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}