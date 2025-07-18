const mockEmit = jest.fn();

const mockSocket = {
  emit: mockEmit
};

export default mockSocket;
export { mockEmit };
