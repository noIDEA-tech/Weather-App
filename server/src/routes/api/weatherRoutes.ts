import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try { 
    // TODO: GET weather data from city name
    const cityName = req.body.cityName;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }
 // TODO: save city to search history
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});
// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    return res.json(history);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch search history'});       
  }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    return res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;
