import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { CREATED, INTERNAL_SERVER, BAD_REQUEST, OK } from "../../const.js";

const model = initModels(sequelize);

const likeRestaurant = async (req, res) => {
  try {
    const { userId, resId } = req.body;

    const existingLike = await model.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });

    if (existingLike) {
      return res.status(BAD_REQUEST).json({
        message: "Restaurant already liked by this user.",
      });
    }

    const newLike = await model.like_res.create({
      user_id: userId,
      res_id: resId,
      date_like: new Date(),
    });

    return res.status(CREATED).json(newLike);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

const unlikeRestaurant = async (req, res) => {
  try {
    const { userId, resId } = req.body;

    const like = await model.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });

    if (!like) {
      return res.status(BAD_REQUEST).json({
        message: "Like not found.",
      });
    }

    await like.destroy();
    res.status(OK).json({
      message: "Restaurant unliked successfully.",
    });
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

const getLikesByRestaurant = async (req, res) => {
  try {
    const { resId } = req.params;

    const likes = await model.like_res.findAll({
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

    res.status(OK).json(likes);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

const getLikesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const likes = await model.like_res.findAll({
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

    res.status(OK).json(likes);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({
      message: error.message,
    });
  }
};

export {
  likeRestaurant,
  unlikeRestaurant,
  getLikesByRestaurant,
  getLikesByUser,
};
