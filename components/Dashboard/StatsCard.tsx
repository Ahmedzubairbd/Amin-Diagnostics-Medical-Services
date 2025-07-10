import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export default function StatsCard({ title, value, change, icon, trend = 'neutral' }: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</CardTitle>
        <div className="text-blue-600 p-2 bg-blue-50 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor()} bg-gray-50 px-2 py-1 rounded-full w-fit`}>
            {trend !== 'neutral' && <TrendIcon className="w-4 h-4" />}
            <span>{change > 0 ? '+' : ''}{change}%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}