import React from 'react';

interface FilterPanelProps {
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  maxCookingTime: number;
  onCookingTimeChange: (time: number) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedDifficulty,
  onDifficultyChange,
  maxCookingTime,
  onCookingTimeChange,
}) => {
  const difficulties = [
    { value: 'all', label: 'すべて' },
    { value: 'beginner', label: '初心者' },
    { value: 'intermediate', label: '中級者' },
    { value: 'advanced', label: '上級者' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">フィルター</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            難易度
          </label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <label key={difficulty.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty.value}
                  checked={selectedDifficulty === difficulty.value}
                  onChange={(e) => onDifficultyChange(e.target.value)}
                  className="w-4 h-4 text-orange-500 cursor-pointer"
                />
                <span className="ml-3 text-gray-700">{difficulty.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking Time Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            調理時間: 最大 {maxCookingTime} 分
          </label>
          <input
            type="range"
            min="5"
            max="180"
            step="5"
            value={maxCookingTime}
            onChange={(e) => onCookingTimeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>5分</span>
            <span>180分</span>
          </div>
        </div>
      </div>
    </div>
  );
};
