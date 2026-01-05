const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath = '';

    switch (file.fieldname) {
      case 'profile_photo':
        folderPath = 'public/assets/images/employee/profilePhoto/';
        break;
      case 'aadhar_card':
        folderPath = 'public/assets/images/employee/aadharcard/';
        break;
      case 'pan_card':
        folderPath = 'public/assets/images/employee/pancard/';
        break;
      default:
        folderPath = 'public/assets/images/employee/others/';
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
  { name: 'profile_photo', maxCount: 1 },
  { name: 'aadhar_card', maxCount: 1 },
  { name: 'pan_card', maxCount: 1 },
]);
