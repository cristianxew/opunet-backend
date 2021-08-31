module.exports = ({ env }) => ({
    // ...
    upload: {
        provider: 'cloudinary',
        providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
        },
    },
    email: {
        provider: 'sendgrid',
        providerOptions: {
            apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
            defaultFrom: 'cristianleonaredo@hotmail.com',
            defaultReplyTo: 'cristianleonaredo@hotmail.com',
            testAddress: 'cristianleonaredo@hotmail.com',
        },
    },
    // ...
});