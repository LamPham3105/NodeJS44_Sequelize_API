import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { CREATED, INTERNAL_SERVER, OK } from "../../const.js";

const model = initModels(sequelize);

const addOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount, code, arr_sub_id } = req.body;

    const order = await model.order.create({
      user_id,
      food_id,
      amount,
      code,
      arr_sub_id,
    });
    res.status(CREATED).json(order);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await model.order.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: model.food,
          as: "food",
          attributes: ["food_id", "food_name", "image", "price", "desc"],
        },
      ],
    });
    res.status(OK).json(orders);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

export { addOrder, getOrdersByUser };
