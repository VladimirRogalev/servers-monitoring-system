
## Description

A project for monitoring the status of web servers with support for HTTP, HTTPS, FTP and SSH protocols.
Monitoring is performed automatically every minute. When the server status changes to "non-working", an email notification is sent.



## Functionality

- Adding, editing, deleting and viewing servers
- Protocol support: **HTTP, HTTPS, FTP, SSH**
- CRON monitoring with a frequency of 1 time per minute
- The history of all requests is saved in the database
- Email notification in case of server failure
- REST API
- PostgresSQL support

## Install and run

Clone the project:

```bash
git clone https://github.com/VladimirRogalev/servers-monitoring-system.git
cd servers-monitoring-system
```
## Project setup

```bash
$ npm install
```

## Create a .env file and specify environment variables

## Example .env

#Database
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=user
- DB_PASS=pass
- DB_NAME=servers_monitoring

#SMTP
- SMTP_HOST=smtp.ethereal.email
- SMTP_PORT=587
- SMTP_USER=user_user
- SMTP_PASS=pass_pass

#Alert email
- ALERT_EMAIL=email@email.com

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
