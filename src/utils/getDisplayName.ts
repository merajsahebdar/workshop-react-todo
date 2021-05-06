import { ComponentType } from 'react';

/**
 * Get Display Name of HOC Target Component
 *
 * @param {ComponentType} Component
 */
export function getDisplayName(Component: ComponentType<any>, hocName: string) {
  return `${hocName}(${Component.displayName || Component.name || 'Component'})`;
}
