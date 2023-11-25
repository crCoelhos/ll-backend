const db = require('../models');
const RoomType = db.RoomType;

async function createRoomType(req, res) {
  try {
    const { typeName, description } = req.body;
    const roomType = await RoomType.create({
      typeName,
      description,
    });
    res.status(201).json(roomType);
  } catch (err) {
    console.error('Erro no createRoomType:', err, req.body);
    res.status(500).json({ message: 'Ocorreu um erro interno.' });
  }
}

async function getAllRoomTypes(req, res) {
  try {
    const roomTypes = await RoomType.findAll();
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getRoomTypeById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ message: 'Você não passou o id no parâmetro' });
    }
    const roomType = await RoomType.findByPk(id);
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateRoomTypeById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({ message: 'Você não passou o id no parâmetro' });
    }

    const roomTypeToUpdate = await RoomType.findByPk(id);
    if (!roomTypeToUpdate) {
      res.json({ message: 'Tipo de sala não encontrado' });
    }

    const roomType = req.body;

    await RoomType.update(roomType, {
      where: { id: id },
    });
    return res.status(200).json({ message: 'Tipo de sala atualizado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteRoomTypeById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({ message: 'Você não passou o id no parâmetro' });
    }

    const roomType = await RoomType.findByPk(id);
    if (roomType) {
      await roomType.destroy();
      res.status(204).json({ message: 'Tipo de sala excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Tipo de sala não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomTypeById,
  deleteRoomTypeById,
};
