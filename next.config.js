/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/proxy-image',
                destination: 'http://images.unsplash.com/photo-1690200371608-1b8b6a43d973?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5Mjk3MDI2NA&ixlib=rb-4.0.3&q=80&w=500'
            }
        ];
    },
    swcMinify: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.slingacademy.com',
                port: '',
                pathname: '/public/sample-blog-posts/**',
            },
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
                port: '',
                pathname: '/media/**',
            },
        ],
    },
};

module.exports = nextConfig;

// module.exports = {
//     async rewrites() {
//         return [
//             {
//                 source: 'proxy-image',
//                 destination: 'https://random.imagecdn.app/500/150',
//             },
//         ];
//     },
// };
