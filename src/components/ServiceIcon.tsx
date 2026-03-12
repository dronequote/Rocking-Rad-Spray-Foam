import {
  Wind, Shield, Home, Warehouse, Building2,
  Thermometer, Volume2, DollarSign, Droplets, Target,
  FileCheck, Cog, Zap, ShieldCheck, Users, Clock
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Wind, Shield, Home, Warehouse, Building2,
  Thermometer, Volume2, DollarSign, Droplets, Target,
  FileCheck, Cog, Zap, ShieldCheck, Users, Clock,
};

interface Props {
  name: string;
  size?: number;
  className?: string;
}

export default function ServiceIcon({ name, size = 24, className = '' }: Props) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
