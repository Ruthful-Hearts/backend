const AdminLog = require('../models/adminLogModel');

const createAdminLog = async (logData) => {
  try {
    const adminLog = new AdminLog(logData);
    await adminLog.save();
    return adminLog;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAdminLogById = async (logId) => {
  try {
    const adminLog = await AdminLog.findById(logId).populate('admin', 'name email');
    if (!adminLog) {
      throw new Error('Admin log not found');
    }
    return adminLog;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllAdminLogs = async (filters = {}) => {
  try {
    const adminLogs = await AdminLog.find(filters).populate('admin', 'name email');
    return adminLogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAdminLogsByAction = async (action) => {
  try {
    const adminLogs = await AdminLog.find({ action }).populate('admin', 'name email');
    return adminLogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAdminLogsByAdmin = async (adminId) => {
  try {
    const adminLogs = await AdminLog.find({ admin: adminId }).populate('admin', 'name email');
    return adminLogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAdminLog = async (logId) => {
  try {
    const adminLog = await AdminLog.findByIdAndDelete(logId);
    if (!adminLog) {
      throw new Error('Admin log not found');
    }
    return adminLog;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAdminLog,
  getAdminLogById,
  getAllAdminLogs,
  getAdminLogsByAction,
  getAdminLogsByAdmin,
  deleteAdminLog,
};
