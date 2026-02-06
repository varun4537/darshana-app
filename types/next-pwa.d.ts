declare module 'next-pwa' {
    import { NextConfig } from 'next';

    interface PWAConfig {
        dest?: string;
        disable?: boolean;
        register?: boolean;
        scope?: string;
        sw?: string;
        publicExcludes?: string[];
        buildExcludes?: string[];
        fallbacks?: {
            [key: string]: string;
        };
        cacheOnFrontEndNav?: boolean;
        aggressiveFrontEndNavCaching?: boolean;
        reloadOnOnline?: boolean;
        customWorkerDir?: string;
        dir?: string;
        skipWaiting?: boolean;
        runtimeCaching?: any[];
    }

    export default function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
}
