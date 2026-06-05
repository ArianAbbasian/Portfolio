import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  i18nDir: './i18n',
});

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);