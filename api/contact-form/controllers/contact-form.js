'use-strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async onSaveContactForm(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services["contact-form"].create(data, { files });
        } else {
            entity = await strapi.services["contact-form"].create(ctx.request.body);
        }

        // const fromEmail = ctx.request.body.email;
        const data = ctx.request.body;

        const emailTemplate = {
            subject: 'Opunet - New message from <%= data.firstName %>',
            text: ``,
            html: `<h1>Sender details:</h1>
                    <h3>name: <%= data.firstName %> <%= data.lastName %></h3>
                    <h3>phone: <%= data.phone %> </h3>
                    <h3>email: <%= data.email %> </h3>
                    <h3>Message: </h3>
                    <p> <%= data.message %> </p>`,
        };

        await strapi.plugins.email.services.email.sendTemplatedEmail(
            {
                to: "cristianxsa15@gmail.com",
                replyTo: data.email
            },
            emailTemplate,
            {
                data,
            }
        );
        return sanitizeEntity(entity, { model: strapi.models["contact-form"] });
    },
};
