/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
    id: 'websites',
    title: 'Websites',
    type: 'basic',
    icon: 'heroicons_outline:globe-alt',
    link: '/websites',
  },
  {
    id: 'billing',
    title: 'Billing',
    type: 'basic',
    icon: 'heroicons_outline:cash',
    link: '/billing',
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    type: 'basic',
    icon: 'heroicons_outline:view-grid',
    link: '/marketplace',
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'basic',
    icon: 'heroicons_outline:cog',
    link: '/settings',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    type: 'basic',
    icon: 'heroicons_outline:external-link',
    link: '/docs',
  },
  {
    id: 'support',
    title: 'Help Center',
    type: 'basic',
    icon: 'heroicons_outline:chat',
    link: '/docs',
  },
];