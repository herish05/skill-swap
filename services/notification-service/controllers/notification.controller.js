import Notification from "../models/notification.model.js";

/**
 * Create a new Notification
 */

export const healthCheck = async (req, res) => {
  try {
    res.json({ message: "Notification-service is running" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Notification-services health is not good" });
  }
};

export const createNotification = async (req, res) => {
  const { userId, type, title, message, metadata } = req.body;

  const notification = await Notification.create({
    userId,
    type,
    title,
    message,
    metadata,
  });

  res.status(201).json(notification);
};

export const getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  const notifications = await Notification.find({ userId }).sort({
    createdAt: -1,
  });

  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true },
  );

  res.json(notification);
};


export const getUnReadCount = async(req,res)=>{
    const {userId} = req.params;
    const count = await Notification.countDocuments({
        userId,
        isRead:false
    });
    res.json({unreadCount:count})
}