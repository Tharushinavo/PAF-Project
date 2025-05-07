package backend.backend.repository;

import backend.backend.model.MealPlanModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlanModel, Long> {

    //
    /**
     * Find a meal plan by day of week
     * @param dayOfWeek day of week (e.g., "MONDAY", "TUESDAY")
     * @return Optional containing the meal plan if found
     */
    Optional<MealPlanModel> findByDayOfWeek(String dayOfWeek);

    /**
     * Check if a meal plan exists for a specific day
     * @param dayOfWeek day of week
     * @return true if exists, false otherwise
     */
    boolean existsByDayOfWeek(String dayOfWeek);
}