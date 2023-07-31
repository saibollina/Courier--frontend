import db from "../models/index.js";
import Sequelize from "sequelize";
import { Op }  from "sequelize" ;
const User = db.user;
const Order = db.order;
const Customer= db.customer;

export const getAdminStats = async (req, res) => {
    const orderCount = await Order.count();
    const ordersDeliveredCount = await Order.count(
      {
        where: {
          status: 'Delivered',
        }
      }
    ) 
    const deliveredInTimeCount = await Order.count(
      {
        where: {
          status: 'Delivered',
          deliveredInTime: 'Yes'
        }
      }
    );
  
    const notDeleiveredInTime = await Order.count(
      {
        where: {
          status: 'Delivered',
          deliveredInTime: 'NO'
        }
      }
    );
  
  
    const usersByRole = await User.findAll({
      group: ['role'],
      attributes: [
        'role',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'number_of_users'],
      ]
    });

    const numberOfCustomers = await Customer.count()
  
    res.send({ ordersDeliveredCount:ordersDeliveredCount,numberOfCustomers:numberOfCustomers,usersByRole: usersByRole, orderCount: orderCount, successRate: (deliveredInTimeCount * 100) / (ordersDeliveredCount), failureRate: (notDeleiveredInTime *100)/ordersDeliveredCount });
  }

export const getDeliveryPersonStats = async(req,res) =>{
  const userId = req.params.id;
  const ordersAssigend = await Order.count({
    where: {
      pickedUpBy: userId,
    }
  })
  const ordersDelivered = await Order.count({
    where:{
      pickedUpBy: userId,
      status: "Delivered"
    }
  })
  const ordersInProgress = await Order.count({
    where:{
      pickedUpBy: userId,
      status: {
        [Op.or]: ["Dp-assigned", "Picked-Up"]
      }
    }
  })
  const ordersInTimeDelivered = await Order.count({
    where:{
      pickedUpBy: userId,
      deliveredInTime: "Yes",
      status: {
        [Op.or]: ["Delivered"]
      }
    }
  })
  const ordersOutTimeDelivered = await Order.count({
    where:{
      pickedUpBy: userId,
      deliveredInTime: "NO",
      status: {
        [Op.or]: ["Delivered"]
      }
    }
  })
  const totalBonusEarned = await Order.sum('bonus', { where: { pickedUpBy: userId} })
  const currentDate = new Date();


    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
  const pastWeekOrders = await Order.findAll({
    attributes: [
      [Sequelize.fn("date", Sequelize.col("dropTime")), "date"],
      [
        Sequelize.literal(
          `COUNT(CASE WHEN deliveredInTime = 'YES' THEN 1 ELSE NULL END)`
        ),
        "onTimeCount",
      ],
      [
        Sequelize.literal(
          `COUNT(CASE WHEN deliveredInTime = 'NO' THEN 1 ELSE NULL END)`
        ),
        "notOnTimeCount",
      ],
    ],
    where: {
      dropTime: {
        [Op.between]: [sevenDaysAgo, currentDate],
      },
      pickedUpBy: userId,
      status: "Delivered"
    },
    group: [Sequelize.fn("date", Sequelize.col("dropTime"))],
  });
  res.send({ordersAssigend, ordersDelivered, ordersInProgress, totalBonusEarned, pastWeekOrders, ordersOutTimeDelivered,ordersInTimeDelivered})
}
export const getClerkStats = async(req,res) =>{
  const userId = req.params.id;
  const ordersPlaced = await Order.count({
    where: {
      orderedBy: userId,
    }
  })
  const ordersDelivered = await Order.count({
    where:{
      orderedBy: userId,
      status: "Delivered"
    }
  })
  const ordersInProgress = await Order.count({
    where:{
      orderedBy: userId,
      status: {
        [Op.or]: ["Dp-assigned", "Picked-Up","Order-placed"]
      }
    }
  })

  const currentDate = new Date();


    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
  const pastWeekOrders = await Order.findAll({
    attributes: [
      [Sequelize.fn('DATE', Sequelize.col('orderPlacedTime')), 'day'], // Use DATE() function for date extraction
      [Sequelize.fn('count', '*'), 'orderCount']
    ],
    where: {
      orderedBy: userId,
      orderPlacedTime: {
        [Op.between]: [sevenDaysAgo, currentDate]
      },
    },
    group: 'day',
    raw: true,
    order: Sequelize.literal('day ASC')
  });;
  res.send({ordersPlaced: ordersPlaced, ordersDelivered, ordersInProgress, pastWeekOrders})
}