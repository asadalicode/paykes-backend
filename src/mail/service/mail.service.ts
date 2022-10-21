import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {
    }
    async sendAdminComplaint(user: User) {
        await this.mailerService.sendMail({
            to: 'asad.ali1010101@GMAIL.COM',
            // from: `"${user.name}" <Paykes@gmail.com>`, // override default from
            subject: 'Complaint',
            template: './complaint', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: user.name,
                email: user.email,
                topic: user.topic,
                subTopic: user.subTopic,
                description: user.description
            },
        })
    }
}
