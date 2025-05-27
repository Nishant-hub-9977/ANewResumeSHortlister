import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string | number;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <div className="card p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          
          {trend && (
            <div className="mt-1 flex items-center">
              {trend.direction === 'up' ? (
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              ) : trend.direction === 'down' ? (
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              
              <span
                className={`text-xs font-medium ${
                  trend.direction === 'up'
                    ? 'text-green-500'
                    : trend.direction === 'down'
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {trend.value}
              </span>
            </div>
          )}
          
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
        
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;