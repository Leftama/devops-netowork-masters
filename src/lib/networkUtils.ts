/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SubnetResult {
  mask: string;
  hostBits: number;
  usableHosts: number;
  networkAddress: string;
  broadcastAddress: string;
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  try {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => p < 0 || p > 255)) return null;
    if (cidr < 0 || cidr > 32) return null;

    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    
    const networkNum = (ipNum & mask) >>> 0;
    const broadcastNum = (networkNum | ~mask) >>> 0;
    
    const numToIp = (n: number) => [
      (n >>> 24) & 0xff,
      (n >>> 16) & 0xff,
      (n >>> 8) & 0xff,
      n & 0xff
    ].join('.');

    const maskIp = numToIp(mask);
    const hostBits = 32 - cidr;
    const usableHosts = cidr >= 31 ? 0 : Math.pow(2, hostBits) - 2;

    return {
      mask: maskIp,
      hostBits,
      usableHosts: Math.max(0, usableHosts),
      networkAddress: numToIp(networkNum),
      broadcastAddress: numToIp(broadcastNum)
    };
  } catch (e) {
    return null;
  }
}

export const CIDR_REFERENCE = [
  { cidr: 8, mask: '255.0.0.0', hosts: '16,777,214' },
  { cidr: 16, mask: '255.255.0.0', hosts: '65,534' },
  { cidr: 20, mask: '255.255.240.0', hosts: '4,094' },
  { cidr: 24, mask: '255.255.255.0', hosts: '254' },
  { cidr: 28, mask: '255.255.255.240', hosts: '14' },
  { cidr: 30, mask: '255.255.255.252', hosts: '2' },
];
