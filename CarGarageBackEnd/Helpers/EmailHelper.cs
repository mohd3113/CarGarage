using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace CarGarageBackEnd.Helpers
{
    public class EmailHelper
    {
        public async Task<bool> SendEmail(string Body, string Subject, string toemail)
        {

            SmtpClient smtpClient = new SmtpClient();
            NetworkCredential basicCredential =
                new NetworkCredential("noreply_onlineapply", "ioQwxdu!uEVS");
            MailMessage message = new MailMessage();
            MailAddress fromAddress = new MailAddress("noreply_onlineapply@eul.edu.tr");
            smtpClient.Port = 587;
            smtpClient.Host = "mail.eul.edu.tr";
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = true;
            smtpClient.Credentials = basicCredential;
            message.From = fromAddress;
            message.Subject = Subject;
            message.Body = Body;
            message.IsBodyHtml = true;
            smtpClient.Timeout = 10000;
            message.To.Add(toemail);
            try
            {
                smtpClient.EnableSsl = true;
                await smtpClient.SendMailAsync(message);
                return true;
            }
            catch
            {
                return false;
            }

        }
    }
}