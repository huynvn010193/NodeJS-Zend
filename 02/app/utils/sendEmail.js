const nodeMailer = require("nodemailer");
const systemConfig = require(__path_configs + "system");

const sendEmail = async () => {
  var transport = nodemailer.createTransport({
    host: systemConfig.STMP_HOST,
    port: systemConfig.STMP_PORT,
    auth: {
      user: systemConfig.STMP_EMAIL,
      pass: systemConfig.STMP_PASSWORD,
    },
  });
};
