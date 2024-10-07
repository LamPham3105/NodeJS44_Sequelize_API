// controllers/RateResController.js
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { CREATED, BAD_REQUEST, INTERNAL_SERVER, OK } from "../../const.js";

const model = initModels(sequelize);

const addRate = async (req, res) => {
  try {
    const { userId, resId, amount } = req.body;

    const existingRate = await model.rate_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });

    if (existingRate) {
      return res.status(BAD_REQUEST).json({
        message: "User already rated by this restaurant.",
      });
    }

    const rate = await model.rate_res.create({
      user_id: userId,
      res_id: resId,
      amount,
      date_rate: new Date(),
    });

    res.status(CREATED).json(rate);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

const getRatesByRestaurant = async (req, res) => {
  try {
    const { resId } = req.params;

    const rates = await model.rate_res.findAll({
      where: {
        res_id: resId,
      },
      include: [
        {
          model: model.user,
          as: "user",
          attributes: ["user_id", "full_name", "email"],
        },
      ],
    });
    res.status(OK).json(rates);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

const getRatesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const rates = await model.rate_res.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: model.restaurant,
          as: "re",
          attributes: ["res_id", "res_name", "image", "desc"],
        },
      ],
    });
    res.status(OK).json(rates);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

export { addRate, getRatesByRestaurant, getRatesByUser };
