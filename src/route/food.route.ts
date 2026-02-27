import express from "express";
import { StatusCodes } from "http-status-codes";
import { FoodService } from "services/food.service";

const router = express.Router();
const foodService = new FoodService();

/**
 * Get all available food
 */
router.get("/", async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();
    res.status(StatusCodes.OK).json(foods);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

/**
 * Add a new food item
 */
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const food = await foodService.addFood({ name, description, price });
    res.status(StatusCodes.CREATED).json(food);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

/**
 * Update food availability
 */
router.patch("/:id/availability", async (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  try {
    const updatedFood = await foodService.updateAvailability(id, isAvailable);
    res.status(StatusCodes.OK).json(updatedFood);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

export default router;