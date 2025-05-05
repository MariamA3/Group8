const { getById, getModel, deleteModel } = require('../src/utils/helpers/controllerHelpers');

describe('controllerHelpers', () => {
  let mockReq, mockRes, mockModel;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getModel', () => {
    it('should return all items (positive case)', async () => {
      mockModel = { find: jest.fn().mockResolvedValue([{ title: 'Test Study' }]) };
      mockReq = {};
      await getModel(mockModel, mockReq, mockRes, 'Study');
      expect(mockModel.find).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ study: [{ title: 'Test Study' }] });
    });

    it('should handle database error (negative case)', async () => {
      mockModel = { find: jest.fn().mockRejectedValue(new Error('DB fail')) };
      mockReq = {};
      await getModel(mockModel, mockReq, mockRes, 'Study');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('Error finding Study') }));
    });
  });

  describe('getById', () => {
    it('should return an item by id (positive case)', async () => {
      const item = { title: 'AI Study' };
      mockModel = { findById: jest.fn().mockResolvedValue(item) };
      mockReq = { params: { id: '123' } };
      await getById(mockModel, mockReq, mockRes, 'Study');
      expect(mockModel.findById).toHaveBeenCalledWith('123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ study: item });
    });

    it('should return 404 if item not found (edge case)', async () => {
      mockModel = { findById: jest.fn().mockResolvedValue(null) };
      mockReq = { params: { id: 'not_found' } };
      await getById(mockModel, mockReq, mockRes, 'Study');
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('should handle error in getById (negative case)', async () => {
      mockModel = { findById: jest.fn().mockRejectedValue(new Error('findById fail')) };
      mockReq = { params: { id: 'error' } };
      await getById(mockModel, mockReq, mockRes, 'Study');
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteModel', () => {
    it('should delete an item (positive case)', async () => {
      const deletedItem = { title: 'To Delete' };
      mockModel = { findByIdAndDelete: jest.fn().mockResolvedValue(deletedItem) };
      mockReq = { params: { id: 'delete123' } };
      await deleteModel(mockModel, mockReq, mockRes, 'Study');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Study deleted' });
    });

    it('should return 404 if nothing is deleted (edge case)', async () => {
      mockModel = { findByIdAndDelete: jest.fn().mockResolvedValue(null) };
      mockReq = { params: { id: 'badid' } };
      await deleteModel(mockModel, mockReq, mockRes, 'Study');
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('should handle error in deleteModel (negative case)', async () => {
      mockModel = { findByIdAndDelete: jest.fn().mockRejectedValue(new Error('fail')) };
      mockReq = { params: { id: 'err' } };
      await deleteModel(mockModel, mockReq, mockRes, 'Study');
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});