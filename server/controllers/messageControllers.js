const Message = require('../db/models/Message');

exports.createMessage = async (req, res) => {
  const { order_id, sender_id, message } = req.body;
  
  try {
    const msg = await Message.create(order_id, sender_id, message);
    res.send(msg);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.viewConvo = async (req, res) => {
  const { order_id } = req.params;

  try {
    const conversation = await Message.listConvo(order_id);
    res.send(conversation);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};