import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import * as productService from "../services/product.service.js";
export const find = async (req, res) => {
  try {
    console.log(req.user);
    const products = await productService.find();
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: products,
    });
  } catch (error) {
    return res.status(HttpStatusConstant.BAD_REQUEST).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};
