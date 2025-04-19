import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// DELETE /images/:imgName
router.delete('/:imgName', (req, res) => {
  const { imgName } = req.params;

  // Construct the full path to the image
  const imagePath = path.join(process.cwd(), 'images', imgName);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('❌ Error deleting image:', err.message);
      return res.status(500).json({ message: 'Failed to delete image' });
    }

    console.log(`🗑️ Deleted image: ${imgName}`);
    res.json({ message: 'Image deleted successfully' });
  });
});

export default router;
