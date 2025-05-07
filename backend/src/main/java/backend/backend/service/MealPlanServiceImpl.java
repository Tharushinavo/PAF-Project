package backend.backend.service;  // lowercase 'service' is standard

import backend.backend.model.MealPlanModel;
import backend.backend.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;  // Added missing annotation

import java.util.List;
import java.util.NoSuchElementException;  // Correct import for NoSuchElementException

@Service  // This annotation is required for Spring to detect this as a service bean
public class MealPlanServiceImpl implements MealPlanService {
    @Autowired
    private MealPlanRepository mealPlanRepository;  // Variable name matches usage below

    @Override
    public MealPlanModel save(MealPlanModel plan) {
        return mealPlanRepository.save(plan);  // Fixed variable name
    }

    @Override
    public MealPlanModel update(Long id, MealPlanModel updated) {
        MealPlanModel existing = mealPlanRepository.findById(id)  // Fixed variable name
                .orElseThrow(() -> new NoSuchElementException("Meal plan not found with ID " + id));

        existing.setBreakfast(updated.getBreakfast());
        existing.setLunch(updated.getLunch());
        existing.setDinner(updated.getDinner());
        existing.setDayOfWeek(updated.getDayOfWeek());

        return mealPlanRepository.save(existing);  // Fixed variable name
    }

    @Override
    public void delete(Long id) {
        if (!mealPlanRepository.existsById(id)) {  // Fixed variable name
            throw new NoSuchElementException("Meal plan not found with ID " + id);
        }
        mealPlanRepository.deleteById(id);  // Fixed variable name
    }

    @Override
    public MealPlanModel getByDay(String day) {
        return mealPlanRepository.findByDayOfWeek(day).orElse(null);  // Fixed variable name
    }

    @Override
    public List<MealPlanModel> getAll() {
        return mealPlanRepository.findAll();  // Fixed variable name
    }

    @Override
    public MealPlanModel getByDayOfWeek(String upperCase) {
        return null;
    }
}