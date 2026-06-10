const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath = '';

    switch (file.fieldname) {
      case 'idProofImg':
        folderPath = 'public/assets/member/idProof/';
        break;
      default:
        folderPath = 'public/assets/others/';
    }

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload.fields([
  { name: 'idProofImg', maxCount: 1 },
]);