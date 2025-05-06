package backend.backend.service;  // lowercase 'service' is standard

import backend.backend.model.MealPlanModel;
import java.util.List;

public interface MealPlanService {
    MealPlanModel save(MealPlanModel plan);
    MealPlanModel update(Long id, MealPlanModel updated);
    void delete(Long id);
    MealPlanModel getByDay(String day);
    List<MealPlanModel> getAll();
}